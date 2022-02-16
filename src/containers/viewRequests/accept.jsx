import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "../../library/helpers/axios";
import "antd/dist/antd.css";
import {
  Button,
  Modal,
  DatePicker,
  notification,
  Form,
  Input,
  Select,
} from "antd";
const { Option } = Select;

const getLang = () => {
  const roles = localStorage.getItem("lang");
  return roles;
};
export default function CollectionCreateForm({
  visible,
  onCreate,
  onCancel,
  userData: { id, status },
}) {
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios["get"](`${"hrEmployees"}`, {
      headers: {},
    }).then((res) => {
      setUser(res.data.data);
    });
  }, []);

  return (
    <Modal
      visible={visible}
      title={"assignTo".translate()}
      okText={"Assign".translate()}
      cancelText={"Cancel".translate()}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            let endPoint = `assignRequest/${id}`;
            axios
              .post(endPoint, values, {
                // headers: {
                //   Authorization: `Bearer ${token}`,
                // },
              })
              .then((res) => {
                notification.success({
                  message: res.data.message,
                });
                onCreate(values);
              })
              .catch((err) => {
                notification.error({
                  message: err?.responsive?.data?.message || "An Error Occured",
                });
              });

            form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        // initialValues={{}}
      >
        <Form.Item
          name="assignTo"
          label={"assignTo".translate()}
          rules={[
            {
              required: true,
              message: "Please input your date of contract!",
            },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            size="large"
            allowClear
          >
            {user?.map((type) => (
              <Option value={type.id}>
                {getLang == "ar" ? type?.name : type?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
