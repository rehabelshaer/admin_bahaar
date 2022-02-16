import React, { useState, useEffect } from "react";
import "@ant-design/compatible/assets/index.css";
import { Select, Row, Input, Col, Form, Image, Table, Divider } from "antd";
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
import { generateCols } from "../MainIndex/generateCol";
import { LoadingOutlined } from "@ant-design/icons";

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
      setLoading(false);
      setUser(res.data.data);
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
          key: params.id ? config.titles.show : config.titles.add,
          to: params.id
            ? `${config.routes.show}${params.id}`
            : config.routes.add,
          title: params.id ? config.titles.show : config.titles.add,
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
                            {user?.sender}
                          </Descriptions.Item>
                          <Descriptions.Item label="المسمى الوظيفى">
                            {user?.job_title}
                          </Descriptions.Item>
                          <Descriptions.Item label="الادارة">
                            {getLang == "ar"
                              ? user?.administration_ar
                              : user?.administration_en}
                          </Descriptions.Item>
                          <Descriptions.Item label="رقم الجوال">
                            {user?.phone}
                          </Descriptions.Item>
                          <Descriptions.Item label="البريد الاكتروني">
                            {user?.email}
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
                        <Descriptions>
                          <Descriptions.Item label="نوع الطلب">
                            {getLang == "ar" ? user?.type_ar : user?.type_en}
                          </Descriptions.Item>
                        </Descriptions>
                        <h4>المستلم</h4>
                        <Table
                          pagination={false}
                          dataSource={[
                            {
                              key: "1",
                              receiver_administration_ar:
                                user?.receiver_administration_ar,
                              receiver_administration_en:
                                user?.receiver_administration_en,
                              receiver_email: user?.receiver_email,
                              receiver_job_title: user?.receiver_job_title,
                              receiver_name: user?.receiver_name,
                              receiver_phone: user?.receiver_phone,
                            },
                          ]}
                          columns={generateCols([
                            {
                              title: "name",
                              key: "receiver_name",
                              content: (text, record) => text,
                            },
                            {
                              title: "email",
                              key: "receiver_email",
                              content: (text, record) => text,
                            },
                            {
                              title: "phone",
                              key: "receiver_phone",
                              content: (text, record) => text,
                            },
                            {
                              title: "administration_en",
                              key: "receiver_administration_en",
                              content: (text, record) => text,
                            },
                            {
                              title: "administration_ar",
                              key: "receiver_administration_ar",
                              content: (text, record) => text,
                            },
                            {
                              title: "job_title",
                              key: "receiver_job_title",
                              content: (text, record) => text,
                            },
                          ])}
                        />
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

                        <Descriptions>
                          <Descriptions.Item>
                            {getLang == "ar"
                              ? user?.description
                              : user?.description}
                          </Descriptions.Item>
                        </Descriptions>

                        <h4>المرفقات</h4>
                        {user?.file && (
                          <div
                            style={{
                              width: "fit-content",
                              border: "1px solid #c4c1c1",
                              padding: "10px",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <Image width={100} height={100} src={user?.file} />
                          </div>
                        )}

                        <span></span>
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
