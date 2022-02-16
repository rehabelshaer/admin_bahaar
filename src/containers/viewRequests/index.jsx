import React, { useState } from "react";
import axios from "../../library/helpers/axios";
import { Tag, Button, Popconfirm } from "antd";
import IndexMain from "../MainIndex/mainIndex";
import { useSelector } from "react-redux";
import { generateCols } from "../MainIndex/generateCol";
import { FaSearch, FaCity } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { SearchOutlined } from "@ant-design/icons";
import Accept from "./accept";
import config, { status } from "./config";
import { toast } from "react-toastify";
import { getPermissions } from "@iso/config/permissions";
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
    // {
    //   uniq: "q",
    //   type: "search",
    //   icon: <SearchOutlined />,
    //   placeholder: ["بحث", "Search ..."],
    //   key: "q",
    //   online: {
    //     status: true,
    //     url: "url",
    //     params: "",
    //   },
    //   hide: {
    //     onValue: "new",
    //     hiddenFilters: ["city_id", "fromTO"],
    //   },
    // },
    // {
    //   type: "select",
    //   placeholder: ["النوع", "Type"],
    //   icon: <MdDateRange />,
    //   key: "type",
    //   data: {
    //     isOnline: true,
    //       url: "cities",
    //     //   params: {},
    //     options: [
    //       { id: null, ["name_en"]: "All" },
    //     ],
    //     optionName: "name_en",
    //   },
    // },
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
      axios["post"](`request/${id}/${url}`, {
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
      {userData && (
        <Accept
          visible={visible}
          onCreate={(values) => {
            setFetcher((fetcher) => !fetcher);
            setUserData(null);

            setVisible(false);
          }}
          onCancel={() => {
            setVisible(false);
            setUserData(null);
          }}
          userData={userData}
        />
      )}
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
          getPermissions("adminRequests", "x") ? config.routes.add : false
        }
        // head filters table
        filters={filters}
        // columns table content
        editRowURL={
          getPermissions("adminRequests", "x") ? config.routes.edit : false
        }
        showRowURL={config.routes.show}
        deleteRow={{
          status: getPermissions("adminRequests", "delete"),
          deleteRecord,
        }}
        action={
          getPermissions("adminRequests", "delete") ||
          getPermissions("adminRequests", "update") ||
          true
        }
        attachExport={true}
        attachExportParams={{}}
        generalCols={generateCols([
          "sender",
          "email",
          "phone",
          "job_title",
          "data",
          "assignment",
          // {
          //   title: "assignment",

          //   key: "assignment",
          //   content: (text, record, index) => {
          //     return (
          //       <div>
          //         {record.status === 1 &&
          //         getPermissions("adminRequests", "assignRequest") ? (
          //           <Button
          //             type="primary"
          //             onClick={() => {
          //               setUserData(record);
          //               setVisible(true);
          //             }}
          //           >
          //             {"assignTo".translate()}
          //           </Button>
          //         ) : (
          //           <div>{text}</div>
          //         )}
          //       </div>
          //     );
          //   },
          // },
          {
            key: "status",

            content: (text, record) => (
              <Tag color={status[text].color}>
                {status[text][lang == "ar" ? "nameAr" : "nameEn"]}
              </Tag>
            ),
          },
          // {
          //   key: "changeStatus",

          //   content: (text, record) => (
          //     <>
          //       {record.status == 2 &&
          //       getPermissions("adminRequests", "changeStatus") ? (
          //         <Popconfirm
          //           placement="top"
          //           title={lang == "ar" ? "هل أنت موافق ؟" : "Are You Sure ?"}
          //           okText={lang == "ar" ? "الغاء" : "Ok"}
          //           onConfirm={() => changeStatus(record, "changeStatus")}
          //           cancelText={lang == "ar" ? "الغاء" : "Cancel"}
          //         >
          //           <Button style={{ width: "100px", textAlign: "center" }}>
          //             {status[3][lang == "ar" ? "nameAr" : "nameEn"]}
          //           </Button>
          //         </Popconfirm>
          //       ) : (
          //         ""
          //       )}
          //       {record.status == 3 ? (
          //         <div
          //           style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}
          //         >
          //           {getPermissions("adminRequests", "approve") && (
          //             <Popconfirm
          //               placement="top"
          //               title={
          //                 lang == "ar" ? "هل أنت موافق ؟" : "Are You Sure ?"
          //               }
          //               okText={lang == "ar" ? "الغاء" : "Ok"}
          //               onConfirm={() => changeStatus(record, "approve?send=1")}
          //               cancelText={lang == "ar" ? "الغاء" : "Cancel"}
          //             >
          //               <Button
          //                 type="primary"
          //                 style={{ width: "100px", textAlign: "center" }}
          //               >
          //                 {" "}
          //                 {status[4][lang == "ar" ? "nameAr" : "nameEn"]}
          //               </Button>
          //             </Popconfirm>
          //           )}
          //           {getPermissions("adminRequests", "reject") && (
          //             <Popconfirm
          //               placement="top"
          //               title={
          //                 lang == "ar" ? "هل أنت موافق ؟" : "Are You Sure ?"
          //               }
          //               okText={lang == "ar" ? "الغاء" : "Ok"}
          //               onConfirm={() => changeStatus(record, "reject")}
          //               cancelText={lang == "ar" ? "الغاء" : "Cancel"}
          //             >
          //               <Button
          //                 type="danger"
          //                 style={{ width: "100px", textAlign: "center" }}
          //               >
          //                 {" "}
          //                 {status[5][lang == "ar" ? "nameAr" : "nameEn"]}
          //               </Button>
          //             </Popconfirm>
          //           )}
          //         </div>
          //       ) : (
          //         ""
          //       )}
          //     </>
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
// administration_ar: "وكالة التحول الرقمي";
// administration_en: "Digital Transformation Agency";
// type_ar: "dfg";
// type_en: "Honoring";
