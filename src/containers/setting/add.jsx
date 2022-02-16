import React, { useState, useEffect } from "react";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Select, Row, Input, Col, notification } from "antd";
import { useHistory, useParams } from "react-router-dom";
import CardWraper from "../../components/new/CardWraper";
import PageWraper from "../../components/new/PageWraper";
import CustomButton from "../../components/new/CustomButton";
import Loader from "../../components/new/loader";
import enstance from "../../library/helpers/axios";
import { useDispatch } from "react-redux";
import IntlMessages from "@iso/components/utility/intlMessages";
import config from "./config";
import { toast } from "react-toastify";

const { Option } = Select;
const NewCountry = (props) => {
  const [isSubmiting, setSubmiting] = useState(false);
  const history = useHistory();
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getFieldDecorator, resetFields, validateFields } = props.form;
  const params = useParams();
  const dispatch = useDispatch();

  // const isLoggedIn = useSelector((state) => state.Auth.idToken);

  /////////////////////////////
  const getLang = () => {
    const roles = localStorage.getItem("lang");
    return roles;
  };

  /////////////////////////////////////////////////////////////

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      setUploading(true);
      if (!err) {
        setSubmiting(true);
        toast.promise(
          enstance[config?.api?.edit?.[0]?.method](`update-settings`, values, {
            headers: {},
          }),
          {
            pending: "Pending",
            success: {
              render(res) {
                // const key = res.data.data.data.map((e) => e.key);
                // const value = res.data.data.data.map((e) => e.value);

                setSubmiting(false);

                // let x = Object.entries(formData).map(([key, value]) => ({
                //   key: key,
                //   value: value,
                // }));
                // for (let [key, value] of formData.entries()) {
                //   console.log(key, value);
                // }
                // console.log(x);

                history.push(config.routes.index);
                return `👌 Update successfully`;
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
      }
    });
  };

  useEffect(() => {
    enstance[config?.api?.show?.[0]?.method](`show-settings`, {
      headers: {},
    }).then((res) => {
      let myobj = {};
      res.data.data.map((e) => {
        myobj[e.key] = e.value;
      });
      setCat(myobj);
      setLoading(false);
    });
  }, []);

  const props2 = {
    onRemove: (file) => {
      this.setState((state) => {
        const index = state.fileList.indexOf(file);
        const newFileList = state.fileList.slice();
        newFileList.splice(index, 1);
        return {
          fileList: newFileList,
        };
      });
    },

    beforeUpload: (file) => {
      console.log(file);
      setFileList([file]);

      return false;
    },
    fileList,
  };
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
        to: params.id ? `${config.routes.edit}${params.id}` : config.routes.add,
        title: params.id ? config.titles.edit : config.titles.add,
      },
    ],
  });

  return (
    <PageWraper>
      <div className="new_user_container">
        <Row>
          <Col span={24} style={{ marginTop: "1rem" }}>
            <CardWraper>
              {loading ? (
                <Loader />
              ) : (
                <Row>
                  <Col span={24}>
                    <Form
                      onSubmit={handleSubmit}
                      layout="vertical"
                      className="login-form"
                    >
                      <Form.Item
                        label={<IntlMessages id="About ar" />}
                        hasFeedback
                      >
                        {getFieldDecorator("about_ar", {
                          initialValue: cat?.about_ar,
                          rules: [
                            {
                              required: true,
                              message: <IntlMessages id="about_ar" />,
                            },
                          ],
                        })(<Input type="text" size="large" />)}
                      </Form.Item>

                      <Form.Item
                        label={<IntlMessages id="App name_ar" />}
                        hasFeedback
                      >
                        {getFieldDecorator("app_name_ar", {
                          initialValue: cat?.app_name_ar,
                          rules: [
                            {
                              required: true,
                              message: <IntlMessages id="app_name_ar" />,
                            },
                          ],
                        })(<Input type="text" size="large" />)}
                      </Form.Item>
                      <Form.Item
                        label={<IntlMessages id="Facebook_url" />}
                        hasFeedback
                      >
                        {getFieldDecorator("facebook_url", {
                          initialValue: cat?.facebook_url,
                          rules: [
                            {
                              required: true,
                              message: <IntlMessages id="facebook_url" />,
                            },
                          ],
                        })(<Input type="text" size="large" />)}
                      </Form.Item>
                      <Form.Item
                        label={<IntlMessages id="about_en" />}
                        hasFeedback
                      >
                        {getFieldDecorator("about_en", {
                          initialValue: cat?.about_en,
                          rules: [
                            {
                              required: true,
                              message: <IntlMessages id="about_en" />,
                            },
                          ],
                        })(<Input type="text" size="large" />)}
                      </Form.Item>
                      <Form.Item
                        label={<IntlMessages id="Facebook_url" />}
                        hasFeedback
                      >
                        {getFieldDecorator("value_added", {
                          initialValue: cat?.value_added,
                          rules: [
                            {
                              required: true,
                              message: <IntlMessages id="value_added" />,
                            },
                          ],
                        })(<Input type="text" size="large" />)}
                      </Form.Item>
                      <Form.Item
                        label={<IntlMessages id="Insurances_value" />}
                        hasFeedback
                      >
                        {getFieldDecorator("insurances_value", {
                          initialValue: cat?.insurances_value,
                          rules: [
                            {
                              required: true,
                              message: <IntlMessages id="insurances_value" />,
                            },
                          ],
                        })(<Input type="text" size="large" />)}
                      </Form.Item>

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
                          {isSubmiting && <Loader />}
                          <span>
                            {" "}
                            {params.id ? (
                              <IntlMessages id="Update" />
                            ) : (
                              <IntlMessages id="Update" />
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
                    </Form>
                  </Col>
                </Row>
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
  border: "1px solid #1b5b7e",
  borderRadius: "0.4rem",
};

const cancleButton = {
  background: "white",
  color: "#1b5b7e",
  padding: ".7rem 3rem",
  border: "1px solid #1b5b7e",
  marginLeft: "1rem",
};

export default Form.create({ name: "new-country" })(NewCountry);
