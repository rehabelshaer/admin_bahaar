import React, { useState } from "react";
import axios from "../../library/helpers/axios";
import { notification, Tag } from "antd";
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
     //     getPermissions("users", "create") ? config.routes.add :
           false
        }
        // head filters table
        filters={filters}
        // columns table content
        editRowURL={
     //     getPermissions("users", "update") ? config.routes.edit : 
          false
        }
          showRowURL={config.routes.show}
        deleteRow={{ status: getPermissions("users", "delete"), deleteRecord }}
        action={
true
        }
        generalCols={generateCols([
          "name",
          "job_title",
          "nationality",
          {
            key: "phone",

            content: (text, record) => (record.code+record.mobile
            ),
          },          {
            key: "created_at",

            content: (text, record) => (
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <Tag color="blue">{text}</Tag>
              </div>
            ),
          },
          // {
          //   key: "is_active",

          //   content: (text, record) =>
          //     !text ? (
          //       <Tag color="#a82b31">{isActive[text]}</Tag>
          //     ) : (
          //       <Tag color="#248624">{isActive[text]}</Tag>
          //     ),
          // },
        ])}
        options={[]}
        // add table props here
      />
    </>
  );
};
export default Countries;

// captain_personal_images: ["https://bahar.appssquare.com/storage/529/cache:Compressor:IMG_20220213_155643775.jpg"]
// driving_license: "https://bahar.appssquare.com/storage/527/IMG_20220213_160359582.jpg"
// identity_image: "https://bahar.appssquare.com/storage/526/cache:Compressor:IMG_20220213_160312994.jpg"
// maritime_passport_number: "123456789012348678908888"
// national_id: "1234567890"
// naval_passport: "https://bahar.appssquare.com/storage/528/IMG_20220213_160411733.jpg"
// work_permit_number: "123456789654789063214560"