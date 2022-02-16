import React, { useState } from "react";
import axios from "../../library/helpers/axios";
import { notification, Tag, Button, Popconfirm } from "antd";
import IndexMain from "../MainIndex/mainIndex";
import { useSelector } from "react-redux";
import { generateCols } from "../MainIndex/generateCol";
import { FaSearch, FaCity, FaGlobe, FaUsers } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { SearchOutlined } from "@ant-design/icons";
import config, { rolesIndex } from "./config";
import { toast } from "react-toastify";
import { isActive } from "./config";

import { getPermissions } from "@iso/config/permissions";
import moment from "moment-hijri";
const lang = localStorage.getItem("lang");

const Countries = () => {
  const [fetcher, setFetcher] = useState(0);

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

  // const actions = [
  //   {
  //     title: "Actions",
  //     dataIndex: "id",
  //     key: "id",
  //     render: (text, record, index) => (
  //       <div style={{ color: "#646D82", cursor: "pointer" }} className="d-flex">
  //       </div>
  //     ),
  //   },
  // ];

  const filters = [
    {
      uniq: "q",
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
      uniq: "owner_id",
      type: "select",
      icon: <FaUsers />,
      placeholder: ["المالك", "Owner"],
      key: "owner_id",
      data: {
        isOnline: true,
        url: "users",
        params: {role:"owner"},
        options: [{ id: null, ["name"]: "All" }],
        optionName: "name",
      },
    },
    // {
    //   uniq: "fromTO",
    //   type: "dateFromTo",
    //   icon: <MdDateRange />,
    //   placeholder: {
    //     ar: ["تاريخ البدء", " تاريخ الانتهاء"],
    //     en: ["start date", "end date"],
    //   },
    //   key: ["from", "to"],
    //   data: {
    //     isOnline: false,
    //   },
    // },
  ];
  const changeStatus = ({ id }, url) => {
    toast.promise(
      axios["post"](
        `/${url}/${id}`,
        { admin_accept: "3" },
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
        { admin_accept: "2" },
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
          getPermissions("users", "create") ? config.routes.add : false
        }
        // head filters table
        filters={filters}
        // columns table content
        editRowURL={
          getPermissions("users", "update") ? config.routes.edit : false
        }
        showRowURL={config.routes.show}
        deleteRow={{ status: getPermissions("users", "delete"), deleteRecord }}
        action={
          getPermissions("users", "delete") ||
          getPermissions("users", "update") ||
          true
        }
        generalCols={generateCols([
          "name_en",
          "name_ar",
          "brand",
          "num_of_cabins",
          "num_of_toilets",
          {
            key: "status",
            content: (text, record) => (
              <div>
                <Popconfirm
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() =>
                    unChangeStatus(record, "change_vehicle_admin_accept_status")
                  }
                >
                  <Tag color="#87d068">
                    <a is_blocked href="#">
                      Approve
                    </a>
                  </Tag>
                </Popconfirm>
                <Popconfirm
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() =>
                    changeStatus(record, "change_vehicle_admin_accept_status")
                  }
                >
                  <Tag color="#f50">
                    <a is_blocked href="#">
                      Reject
                    </a>
                  </Tag>
                </Popconfirm>
              </div>
            ),
          },
          // {
          //   key: "vehicle_back_images",

          //   content: (text, record) => (
          //     <img
          //       style={{ width: "100px" }}
          //       src={record.vehicle_other_images}
          //     ></img>
          //   ),
          // },
          // {
          //   key: "created_at",

          //   content: (text, record) => (
          //     <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          //       <Tag color="cyan">{moment(text).format("iYYYY-iM-iD")} H</Tag>
          //       <Tag color="blue">{moment(text).format("YYYY-M-D")} G </Tag>
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
