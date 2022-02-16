import React, { useState, useEffect } from "react";
import "@ant-design/compatible/assets/index.css";
import { Select, Row, Input, Col, Form } from "antd";
import { useHistory, useParams } from "react-router-dom";
import CardWraper from "../../components/new/CardWraper";
import PageWraper from "../../components/new/PageWraper";
import CustomButton from "../../components/new/CustomButton";
import Loader from "../../components/new/loader";
import enstance from "../../library/helpers/axios";
import { useDispatch } from "react-redux";
import IntlMessages from "@iso/components/utility/intlMessages";
import { Transfer, Button } from 'antd';
import config from "./config";
import { toast } from "react-toastify";
const { Option } = Select;

const NewCountry = (props) => {
  const [isSubmiting, setSubmiting] = useState(false);
  const history = useHistory();
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();
  const [targetKeys , setTargetKeys] = useState([])
  const [mockData , setMockData] = useState([])
  useEffect(() => {
    enstance
      .get(`permissions`, {
        headers: {},
      })
      .then((res) => {
        setMockData(res.data.data.map(e=>({...e,key:e.id})));
      });
  }, []);
  const getLang = localStorage.getItem("lang");
  useEffect(() => {
    if (params.id) {
      setLoading(true);
      enstance[config?.api?.show?.[0]?.method](
        `${config?.api?.show?.[1]}${params.id}`,
        {
          headers: {},
        }
      ).then((res) => {
        setCat(res.data.data);
        setTargetKeys(res.data.data.permissions.map(e=>e.id))
        setLoading(false);

      });
    }
  }, []);

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
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    values.permission=targetKeys
    setSubmiting(true);
    toast.promise(
      enstance[
        cat ? config?.api?.edit?.[0]?.method : config?.api?.add?.[0]?.method
      ](
        cat ? `${config?.api?.edit?.[1]}${params?.id}` : config?.api?.add?.[1],
        values,
        {
          headers: {},
        }
      ),
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


const handleChange = (targetKeys) => {
   setTargetKeys(targetKeys)
   console.log(targetKeys)
};

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
                      form={form}
                      layout="vertical"
                      name="register"
                      onFinish={onFinish}
                      initialValues={cat && cat }
                      scrollToFirstError
                    >
                      <Form.Item
                        name="name"
                        label={"name".translate()}
                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      
                      <Form.Item
                        name="permissions"
                        label={"permissions".translate()}
                        rules={[
                          {
                            required: targetKeys.length>0?false:true,
                            message: "Please input your permissions!",
                           
                          },
                        ]}
                      >
                            <Transfer
        dataSource={mockData}
        oneWay={true}
        showSearch
        listStyle={{width:"100%",height:400}}
        targetKeys={targetKeys&&targetKeys}
        onChange={handleChange}
        render={item => ` - ${item.name.replace('_'," ")}`}
      />
        </Form.Item>
                      {/* <Form.Item
                        name="title_en"
                        label={"title_en".translate()}
                        rules={[
                          {
                            required: true,
                            message: "Please input your title en!",
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="title_ar"
                        label={"title_ar".translate()}
                        rules={[
                          {
                            required: true,
                            message: "Please input your title ar!",
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        name="description_en"
                        label={"description_en".translate()}
                        rules={[
                          {
                            required: true,
                            message: "Please input your description en!",
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="description_ar"
                        label={"description_ar".translate()}
                        rules={[
                          {
                            required: true,
                            message: "Please input your description ar!",
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item> */}

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
                            {isSubmiting && <Loader />}
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
