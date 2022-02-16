import React, { useState } from "react";
import axios from "../../library/helpers/axios";
import { notification, Tag, Button, Popconfirm,Avatar } from "antd";
import IndexMain from "../MainIndex/mainIndex";
import { useSelector } from "react-redux";
import { generateCols } from "../MainIndex/generateCol";
import { FaSearch, FaCity, FaGlobe, FaUsers } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { SearchOutlined } from "@ant-design/icons";
import config, { rolesIndex } from "./config";
import { toast } from "react-toastify";
import { isActive } from "./config";
import { status } from "./config";

import { getPermissions } from "@iso/config/permissions";
import moment from "moment-hijri";
const lang = localStorage.getItem("lang");

const Countries = () => {
  const [fetcher, setFetcher] = useState(0);
  const [userData, setUserData] = useState(null);
  const [visible, setVisible] = useState(false);

  const token = useSelector((state) => state.Auth.idToken);

  const deleteRecord = ({ id }) => {
    toast.promise(
      axios[config.api.delete?.[0]?.method](`${config.api.delete?.[1]}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      {
        pending: "Pending",
        success: {
          render(res) {
            setFetcher((fetcher) => !fetcher);
            console.log(res.data);
            return `👌 ${res.data.data.message}`;
          },
          // other options
          icon: "🟢",
        },
        error: {
          render(err) {
            return `🤯 ${
              err?.data?.response?.data?.message || "Backend Error Occured"
            }`;
          },
          // other options
          //    icon: "🟢",
        },
      }
    );
  };

  const changeStatus = ({ id }, url) => {
    toast.promise(
      axios["post"](
        `/${url}/${id}`,
        { is_blocked: "0" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      {
        pending: "Pending",
        success: {
          render(res) {
            setFetcher((fetcher) => !fetcher);
            console.log(res.data);
            return `👌 ${res.data.data.message}`;
          },

          // other options
          icon: "🟢",
        },
        error: {
          render(err) {
            return `🤯 ${
              err?.response?.data?.message || "Backend Error Occured"
            }`;
          },
          // other options
          //    icon: "🟢",
        },
      }
    );
  };
  const unChangeStatus = ({ id }, url) => {
    toast.promise(
      axios["post"](
        `/${url}/${id}`,
        { is_blocked: "1" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
      {
        pending: "Pending",
        success: {
          render(res) {
            setFetcher((fetcher) => !fetcher);
            console.log(res.data);
            return `👌 ${res.data.data.message}`;
          },

          // other options
          icon: "🟢",
        },
        error: {
          render(err) {
            return `🤯 ${
              err?.response?.data?.message || "Backend Error Occured"
            }`;
          },
          // other options
          //    icon: "🟢",
        },
      }
    );
  };

  const filters = [
    {
      uniq: "search",
      type: "search",
      icon: <SearchOutlined />,
      placeholder: ["بحث", "Search ..."],
      key: "search",
      online: {
        status: true,
        url: "url",
        params: "",
      },
      hide: {
        onValue: "new",
        hiddenFilters: ["city_id", "fromTO"],
      },
    },

    {
      uniq: "role",
      type: "select",
      icon: <FaUsers />,
      placeholder: ["Role", "Role"],
      key: "role",
      data: {
        isOnline: false,
        options: [
          { id: null, ["name"]: "All" },
          { id: 'client', ["name"]: "Client" },
          { id: 'owner', ["name"]: "Owner" },
      
      
      ],
        optionName: "name",
      },
    },
  ];

  return (
    <>
      <IndexMain
        //call index request
        fetcher={fetcher}
        // index url
        indexRequest={config.api.index}
        // Breadcrumb
        Breadcrumb={{
          type: "SET",
          payload: [
            {
              key: config.routes.indexKey,
              to: config.routes.index,
              title: config.routes.indexTitle,
            },
          ],
        }}
        // head table content
        addRowURL={
       //   getPermissions("users", "create") ? config.routes.add : 
          false
        }
        // head filters table
        filters={filters}
        // columns table content
        editRowURL={
       //   getPermissions("users", "update") ? config.routes.edit :
           false
        }
           showRowURL={config.routes.show}
        deleteRow={{ status: false, deleteRecord }}
        action={
          // getPermissions("users", "delete") ||
          // getPermissions("users", "update") ||
     //     false
     true
        }

        generalCols={generateCols([
          {
            title: "Avatar",
            key: "profile_image",
            content: (text, record) => {
              let parts = record?.name?.toUpperCase().split(" ");
              let x = parts?.[0]?.[0] ?? "";
              let y = parts?.[1]?.[0] ?? "";
              return (
                <Avatar
                  size={64}
                  src={text}
                  style={{
                    backgroundColor:
                     "#f56a00",
                  }}
                  icon={x + y}
                />
              );
            },
          },

          "name",
          "email",
          {
            key:"phone",
            content:(text,record)=>record.country_code+text
          },
          {
            key:"user_type",
            content:(text,record)=>text==1?"Client":"Owner"
          },
          {
            key:"account_type",
            content:(text,record)=>text==1?"Individual":"Company"
          },

          {
            key: "status",
            dataIndex: "change_blocked_status",

            content: (text, record) => (
              <>
                {record.is_block === 1 ? (
                  <Popconfirm
                    placement="top"
                    title={lang == "ar" ? "هل أنت موافق ؟" : "Are You Sure ?"}
                    okText={lang == "ar" ? "موافق" : "Ok"}
                    onConfirm={() => {
                      changeStatus(record, "change_blocked_status");
                    }}
                    cancelText={lang == "ar" ? "الغاء" : "Cancel"}
                  >
                  <Button style={{margin:"3px",width:"100px"}} type="primary">
                        Unblock
                      </Button>
                  </Popconfirm>
                ) : (
                  <Popconfirm
                    placement="top"
                    title={lang == "ar" ? "هل أنت موافق ؟" : "Are You Sure ?"}
                    okText={lang == "ar" ? "موافق" : "Ok"}
                    onConfirm={() => {
                      unChangeStatus(record, "change_blocked_status");
                    }}
                    cancelText={lang == "ar" ? "الغاء" : "Cancel"}
                  >
                                   <Button style={{margin:"3px",width:"100px"}} type="danger">

                        Block
                        </Button>

                  </Popconfirm>
                )}
              </>
            ),
          },
    

          // {
          //   key: "created_at",

          //   content: (text, record) => (
          //     <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          //       <Tag color="blue">{text}  </Tag>
          //     </div>
          //   ),
          // },
        ])}
        options={[]}
        // add table props here
      />
    </>
  );
};
export default Countries;

