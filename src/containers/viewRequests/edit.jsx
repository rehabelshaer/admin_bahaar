// import React, { useState, useEffect } from "react";
// import { Form } from "@ant-design/compatible";
// import "@ant-design/compatible/assets/index.css";
// import { Select, Row, Input, Col, notification } from "antd";
// import { useHistory, useParams } from "react-router-dom";
// import CardWraper from "../../components/new/CardWraper";
// import PageWraper from "../../components/new/PageWraper";
// import CustomButton from "../../components/new/CustomButton";
// import Loader from "../../components/new/loader";
// import enstance from "../../library/helpers/axios";
// import { useDispatch } from "react-redux";
// import IntlMessages from "@iso/components/utility/intlMessages";
// import config from "./config";
// import { toast } from "react-toastify";

// const { Option } = Select;
// const NewCountry = (props) => {
//   const [isSubmiting, setSubmiting] = useState(false);
//   const history = useHistory();
//   const [cat, setCat] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { getFieldDecorator, resetFields, validateFields } = props.form;
//   const params = useParams();
//   const dispatch = useDispatch();

//   // const isLoggedIn = useSelector((state) => state.Auth.idToken);

//   /////////////////////////////
//   const getLang = () => {
//     const roles = localStorage.getItem("lang");
//     return roles;
//   };

//   /////////////////////////////////////////////////////////////

//   const [fileList, setFileList] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     validateFields((err, values) => {
//       const formData = new FormData();
//       if (fileList[0]) {
//         formData.append("image", fileList[0]);
//       }

//       for (var key in values) {
//         formData.append(key, values[key]);
//       }
//       setUploading(true);
//       if (!err) {
//         setSubmiting(true);
//         // values.role = "super_admin";

//         toast.promise(
//           enstance[
//             cat ? config?.api?.edit?.[0]?.method : config?.api?.add?.[0]?.method
//           ](
//             cat
//               ? `${config?.api?.edit?.[1]}${params?.id}`
//               : config?.api?.add?.[1],
//             values,
//             {
//               headers: {},
//             }
//           ),

//           {
//             pending: "Pending",
//             success: {
//               render(res) {
//                 setSubmiting(false);
//                 history.push(config.routes.index);
//                 return `👌 ${res.data.data.message}`;
//               },
//               // other options
//               icon: "🟢",
//             },
//             error: {
//               render(err) {
//                 setSubmiting(false);
//                 return `🤯 ${
//                   err?.data?.response?.data?.message || "Backend Error Occured"
//                 }`;
//               },
//               // other options
//               //    icon: "🟢",
//             },
//           }
//         );
//       }
//     });
//   };

//   useEffect(() => {
//     if (params.id) {
//       setLoading(true);
//       enstance[config?.api?.show?.[0]?.method](
//         `${config?.api?.show?.[1]}${params.id}`,
//         {
//           headers: {},
//         }
//       ).then((res) => {
//         setLoading(false);
//         setCat(res.data.data);
//       });
//     }
//   }, []);

//   const props2 = {
//     onRemove: (file) => {
//       this.setState((state) => {
//         const index = state.fileList.indexOf(file);
//         const newFileList = state.fileList.slice();
//         newFileList.splice(index, 1);
//         return {
//           fileList: newFileList,
//         };
//       });
//     },

//     beforeUpload: (file) => {
//       console.log(file);
//       setFileList([file]);

//       return false;
//     },
//     fileList,
//   };
//   dispatch({
//     type: "SET",
//     payload: [
//       {
//         key: config.routes.indexKey,
//         to: config.routes.index,
//         title: config.routes.indexTitle,
//       },
//       {
//         key: params.id ? config.titles.edit : config.titles.add,
//         to: params.id ? `${config.routes.edit}${params.id}` : config.routes.add,
//         title: params.id ? config.titles.edit : config.titles.add,
//       },
//     ],
//   });

//   return (
//     <PageWraper>
//       <div className="new_user_container">
//         <Row>
//           <Col span={24} style={{ marginTop: "1rem" }}>
//             <CardWraper>
//               {loading ? (
//                 <Loader />
//               ) : (
//                 <Row>
//                   <Col span={24}>
//                     <Form
//                       onSubmit={handleSubmit}
//                       layout="vertical"
//                       className="login-form"
//                     >
//                       <Form.Item
//                         label={<IntlMessages id="title_en" />}
//                         hasFeedback
//                       >
//                         {getFieldDecorator("title_en", {
//                           initialValue: cat ? cat.title_en : "",
//                           rules: [
//                             {
//                               required: true,
//                               message: <IntlMessages id="title_en" />,
//                             },
//                           ],
//                         })(<Input type="text" size="large" />)}
//                       </Form.Item>
//                       <Form.Item
//                         label={<IntlMessages id="title_ar" />}
//                         hasFeedback
//                       >
//                         {getFieldDecorator("title_ar", {
//                           initialValue: cat ? cat.title_ar : "",
//                           rules: [
//                             {
//                               required: true,
//                               message: <IntlMessages id="title_ar" />,
//                             },
//                           ],
//                         })(<Input type="text" size="large" />)}
//                       </Form.Item>

//                       {/*
//                       <>
//                       <Form.Item label="Upload Image" hasFeedback>
//         <Upload {...props2}>
//           <Button >Select File</Button>
//         </Upload>
//         </Form.Item>
//       </> */}

//                       <div
//                         style={{
//                           display: "block",
//                           marginTop: "1.2rem",
//                           textAlign: "center",
//                         }}
//                       >
//                         <CustomButton
//                           styles={{ padding: ".7rem 4rem" }}
//                           type="submit"
//                         >
//                           {isSubmiting && <Loader />}
//                           <span>
//                             {" "}
//                             {params.id ? (
//                               <IntlMessages id="global.submit" />
//                             ) : (
//                               <IntlMessages id="global.submit" />
//                             )}{" "}
//                           </span>
//                         </CustomButton>
//                         <CustomButton
//                           type="button"
//                           handleClick={() => {
//                             history.push(config.routes.index);
//                           }}
//                           styles={cancleButton}
//                         >
//                           <IntlMessages id="global.cancel" />
//                         </CustomButton>
//                       </div>
//                     </Form>
//                   </Col>
//                 </Row>
//               )}
//             </CardWraper>
//           </Col>
//         </Row>
//       </div>
//     </PageWraper>
//   );
// };

// const inputStyle = {
//   width: "100%",
//   border: "1px solid rgb(2, 167, 159)",
//   borderRadius: "0.4rem",
// };

// const cancleButton = {
//   background: "white",
//   color: "rgb(2, 167, 159)",
//   padding: ".7rem 3rem",
//   border: "1px solid rgb(2, 167, 159)",
//   marginLeft: "1rem",
// };

// export default Form.create({ name: "new-country" })(NewCountry);

import React, { useState, useEffect } from "react";
import "@ant-design/compatible/assets/index.css";
import { Select, Row, Input, Col, Form, Radio, Divider } from "antd";
import { useHistory, useParams } from "react-router-dom";
import CardWraper from "../../components/new/CardWraper";
import PageWraper from "../../components/new/PageWraper";
import CustomButton from "../../components/new/CustomButton";
import Loader from "../../components/new/loader";
import enstance from "../../library/helpers/axios";
import { useDispatch } from "react-redux";
import IntlMessages from "@iso/components/utility/intlMessages";
import { Transfer, Button, Descriptions } from "antd";
import config from "./config";
import { toast } from "react-toastify";
import { InboxOutlined } from "@ant-design/icons";

import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./style.css";
const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;
const profile = JSON.parse(localStorage.getItem("profile"));
const validateEmail = (email) =>
  email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
const NewCountry = (props) => {
  const [isSubmiting, setSubmiting] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const [uplodedList, setUplodedList] = useState([]);

  const dispatch = useDispatch();
  const getLang = localStorage.getItem("lang");
  const [types, setTypes] = useState(null);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);

  const [cheak, setCheak] = useState("" + profile.id);
  const [form] = Form.useForm();
  useEffect(() => {
    setLoading(true);
    enstance[config.api.show[0].method](`${config.api.show[1]}${params.id}`, {
      headers: {},
    }).then((res) => {
      setUser(res.data.data);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    enstance
      .get(`requestTypes`, {
        headers: {},
      })
      .then((res) => {
        setTypes(res.data.data);
      });
  }, []);

  useEffect(() => {
    dispatch({
      type: "SET",
      payload: [
        {
          key: config.routes.indexKey,
          to: config.routes.index,
          title: config.routes.indexTitle,
        },
        {
          key: params.id ? config.titles.edit : config.titles.add,
          to: params.id
            ? `${config.routes.edit}${params.id}`
            : config.routes.add,
          title: params.id ? config.titles.edit : config.titles.add,
        },
      ],
    });
  }, []);

  const onFinish = (values) => {
    if (values.receiver_id == "yes" && users?.id) {
      values.receiver_id = users.id;
    }
    const formData = new FormData();
    if (uplodedList[0]) {
      formData.append("file", uplodedList[0]);
    }
    for (let key in values) {
      formData.append(key, values[key]);
    }
    setSubmiting(true);
    toast.promise(
      enstance["post"]("requests", formData, {
        headers: {},
      }),
      {
        pending: "Pending",
        success: {
          render(res) {
            setSubmiting(false);
            history.push(config.routes.index);
            return `👌 ${res.data.data.message}`;
          },
          // other options
          icon: "🟢",
        },
        error: {
          render(err) {
            setSubmiting(false);
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
  // {console.log(Object.entries(cat).map(([key,value])=>[key,value]))}

  return (
    <PageWraper>
      <div className="new_user_container">
        <Row>
          <Col span={24} style={{ marginTop: "1rem" }}>
            <CardWraper>
              {loading ? (
                <Loader />
              ) : (
                <Form
                  initialValues={{
                    cheak: "" + profile.id,
                    description: user?.description,
                  }}
                  form={form}
                  layout="vertical"
                  name="register"
                  onFinish={onFinish}
                >
                  <Row>
                    <Divider orientation="left">عنوان الطلب</Divider>
                    <Col
                      className="col-service"
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xl={24}
                    >
                      <div className="section-service">
                        <h4>بيانات مقدم الطلب</h4>

                        <Descriptions>
                          <Descriptions.Item label="اسم مقدم الطلب ">
                            احمد محمد
                          </Descriptions.Item>
                          <Descriptions.Item label="المسمى الوظيفى">
                            موظف
                          </Descriptions.Item>
                          <Descriptions.Item label="الادارة">
                            وكالة التحول الرقمي
                          </Descriptions.Item>
                          <Descriptions.Item label="رقم الجوال">
                            ٠١٠٢٠٠٢٨٣٧٧
                          </Descriptions.Item>
                          <Descriptions.Item label="البريد الاكتروني">
                            test@gmail.com
                          </Descriptions.Item>
                        </Descriptions>
                      </div>
                    </Col>

                    <Col
                      className="col-service"
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xl={24}
                    >
                      <div className="section-service">
                        <h4>تفاصيل الطلب</h4>

                        <Form.Item
                          name="type_id"
                          label="نوع الطلب"
                          rules={[
                            {
                              required: true,
                              message: "Please select your request type!",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            optionFilterProp="children"
                            size="large"
                            allowClear
                          >
                            {types?.map((type) => (
                              <Option value={type.id}>
                                {getLang == "ar"
                                  ? type?.title_ar
                                  : type?.title_en}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="receiver_id"
                          label={"هل تريد التقديم لزميل اخر".translate()}
                          rules={[
                            {
                              required: true,
                              message: "Please input your name!",
                              whitespace: true,
                            },
                          ]}
                        >
                          <Radio.Group
                            onChange={(e) => {
                              setCheak(e.target.value);
                            }}
                          >
                            <Radio value={"yes"}> نعم</Radio>
                            <Radio value={"" + profile.id}>لا</Radio>
                          </Radio.Group>
                        </Form.Item>

                        {cheak == "yes" && (
                          <Row justify="center" gutter={[10, 5]}>
                            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                              <h5>البريد الألكتروني</h5>
                              <Input
                                onChange={(e) => {
                                  const email = e.target.value;
                                  // validateEmail(email)
                                  if (
                                    email.includes("@") &&
                                    email.includes(".")
                                  ) {
                                    enstance
                                      .post(
                                        `user`,
                                        {
                                          email,
                                        },
                                        {
                                          headers: {},
                                        }
                                      )
                                      .then((res) => {
                                        setUsers(res.data.data);
                                      })
                                      .catch(() => {
                                        setUsers(null);
                                      });
                                  }
                                }}
                              />
                            </Col>
                            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                              <h5>اسم مستقبل الطلب</h5>

                              <Input value={users?.name} disabled />
                            </Col>
                            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                              <h5>المسمى الوظيفى</h5>
                              <Input value={users?.job_title} disabled />
                            </Col>
                            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                              <h5>اسم الادارة التابع لها</h5>
                              <Input
                                value={
                                  getLang == "ar"
                                    ? users?.administration_ar
                                    : users?.administration_en
                                }
                                disabled
                              />
                            </Col>
                            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                              <h5>رقم الجوال</h5>
                              <Input value={users?.phone} disabled />
                            </Col>
                          </Row>
                        )}
                      </div>
                    </Col>

                    <Col
                      className="col-service"
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xl={24}
                    >
                      <div className="section-service">
                        <h4>تفاصيل المشاركة</h4>

                        <Form.Item
                          name="description"
                          rules={[
                            {
                              required: true,
                              message: "Please input your name!",
                              whitespace: true,
                            },
                          ]}
                        >
                          <TextArea rows={4} />
                        </Form.Item>
                        <h4>المرفقات</h4>
                        <Dragger
                          beforeUpload={(file) => {
                            setUplodedList([file]);
                            return false;
                          }}
                          fileList={uplodedList}
                          multiple={false}
                          listType="picture-card"
                          // onPreview={handlePreview}
                          progress={{
                            strokeColor: {
                              "0%": "#108ee9",
                              "100%": "#87d068",
                            },
                            strokeWidth: 4,
                            format: (percent) =>
                              `${parseFloat(percent.toFixed(1))}%`,
                          }}
                          onRemove={(e) => {
                            setUplodedList([]);
                          }}
                          style={{
                            display: "inline-flex",
                            marginBottom: "10px",
                            opacity: uplodedList.length >= 1 ? "50%" : "100%",
                            pointerEvents:
                              uplodedList.length >= 1 ? "none" : "auto",
                          }}
                        >
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined
                              style={{ color: "rgb(2, 167, 159)" }}
                            />
                          </p>
                          <p className="ant-upload-text">اضافة مرفقات</p>
                          <p className="ant-upload-hint">
                            PNG او Word او PDF يمكنك رفع ملفات بصفة
                          </p>
                        </Dragger>

                        <span></span>
                        <Form.Item>
                          <div
                            style={{
                              display: "block",
                              marginTop: "1.2rem",
                              textAlign: "center",
                            }}
                          >
                            <CustomButton
                              styles={{ padding: ".7rem 4rem" }}
                              type="submit"
                            >
                              {isSubmiting && (
                                <LoadingOutlined
                                  style={{ fontSize: 24 }}
                                  spin
                                />
                              )}
                              <span>
                                {" "}
                                {params.id ? (
                                  <IntlMessages id="global.submit" />
                                ) : (
                                  <IntlMessages id="global.submit" />
                                )}{" "}
                              </span>
                            </CustomButton>
                            <CustomButton
                              type="button"
                              handleClick={() => {
                                history.push(config.routes.index);
                              }}
                              styles={cancleButton}
                            >
                              <IntlMessages id="global.cancel" />
                            </CustomButton>
                          </div>
                        </Form.Item>
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
            </CardWraper>
          </Col>
        </Row>
      </div>
    </PageWraper>
  );
};

const inputStyle = {
  width: "100%",
  border: "1px solid #02a79f ",
  borderRadius: "0.4rem",
};

const cancleButton = {
  background: "white",
  color: "#02a79f ",
  padding: ".7rem 3rem",
  border: "1px solid #02a79f ",
  marginLeft: "1rem",
};

export default NewCountry;
