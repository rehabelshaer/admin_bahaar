import React, { useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import image from "../../../assets/logo/logo_bahar.png";
import { useSelector, useDispatch } from "react-redux";
import Button from "@iso/components/uielements/button";
import IntlMessages from "@iso/components/utility/intlMessages";
import authAction from "@iso/redux/auth/actions";
import appAction from "@iso/redux/app/actions";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import profileActions from "../../../redux/profile/actions";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, notification, Alert } from "antd";
import axios from "../../../library/helpers/axios";
import logo from "../../../assets/logo/icon-2.svg";
import useWindowSize from "@iso/lib/hooks/useWindowSize";
import { privateSub } from "../../../router";
import { Typography, Space } from "antd";
// import SignUp from "../SignUp/SignUp";
import "./style.css";
//import Input from "@iso/components/uielements/input";
import SignInStyleWrapper from "./SignIn.styles";
const { Text, Title } = Typography;

const { login, logout } = authAction;

const { clearMenu } = appAction;
const lang = window.localStorage.getItem("lang");

// id='matrix3D'
function SignIn(props) {
  document.getElementById("root").style.width = "inherit";

  const [switcher, setSwitcher] = React.useState({
    switchCtn: "is-txr",
    switchC: "is-hidden",
    Container: "is-txl",
    bContainer: "is-z200",
  });
  const onSwitch = (e) => {
    setSwitcher(e);
  };

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector((state) => state.Auth.idToken);
  const { width, height } = useWindowSize();
  const [authError, setAuthError] = useState(null);

  const [, setRedirectToReferrer] = React.useState(false);
  const [, setIslogged] = React.useState(false);
  const [islogin, setIsLogin] = useState(false);

  React.useEffect(() => {
    if (isLoggedIn) {
      setRedirectToReferrer(true);
      window.location.href = privateSub;
    }
  }, [isLoggedIn]);

  function handleLogin(e) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        axios
          .post("login", {
            email: values.email,
            password: values.password,
          })
          .then((res) => {
            const token = res.data.token;
            let permissions = {};
            res.data.data.permissions.forEach((data, index) => {
              if (typeof permissions[data.name.split("_")[1]] != "object") {
                permissions[data.name.split("_")[1]] = {};
              }
              Object.defineProperty(
                permissions[data.name.split("_")[1]],
                [data.name.split("_")[0]],
                {
                  enumerable: true,
                  configurable: true,
                  writable: true,
                  value: 1,
                }
              );
            });
            res.data.data.permissions = permissions;
            dispatch(profileActions.fetchProfileDataSuccess(res.data.data));
            dispatch(login(token, res.data.data));
            dispatch(clearMenu());
            localStorage.setItem("profile", JSON.stringify(res.data.data));
            //   (res.data.data.role!='Supplier')?(history.push('/dashboard')):(
            window.location.href = privateSub;
            //)
            setLoading(false);
          })
          .catch((err) => {
            window.localStorage.removeItem("bt");
            //    dispatch(login());
            notification["error"]({
              message: "Authentication Error",
              description:
                err.response && err.response.data.message
                  ? err.response.data.message
                  : "Your account not correct ",
            });
            setLoading(false);
          });
      }
    });
  }
  // let { from } = location.state || { from: { pathname: '/dashboard' } };

  //function sign in
  const isSign = () => {
    // if (islogin) {
    //   <SignIn />;
    // }
  };
  const { getFieldDecorator } = props.form;
  return (
    !isLoggedIn && (
      <div>
        <SignInStyleWrapper dir="rtl" className="isoSignInPage">
          <img style={{ zIndex: "10", margin: "50px auto" }} src={image}></img>
          <div className="isoLoginContentWrapper">
            <div className="isoLoginContent">
              <div>
                <button
                  onClick={isSign()}
                  className="sign-item"
                  style={{ marginBottom: "30px", cursor: "pointer" }}
                >
                  Sign Up
                </button>
              </div>

              <div className="isoLogoWrapper">
                <div style={{ textAlign: "center", textTransform: "none" }}>
                  <h3 style={{ paddingBottom: "6px", fontSize: "35px" }}>
                    Sign in
                  </h3>
                  <span style={{ fontSize: "17px", color: "#638ec3" }}>
                    Hello Captain
                  </span>
                </div>
              </div>
              <div className="isoSignInForm">
                {authError && (
                  <Alert
                    message="Authentication Error"
                    description={authError}
                    type="error"
                    style={{ marginBottom: "1rem" }}
                    showIcon
                  />
                )}

                <Form onSubmit={handleLogin} className="login-form">
                  <Text
                    style={{ marginBottom: ".5em", color: "#638ec3" }}
                    level={6}
                    type="secondary"
                  >
                    E-mail
                  </Text>
                  <Form.Item hasFeedback>
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                        {
                          type: "email",
                          message: "The input is not valid E-email!",
                        },
                      ],
                    })(
                      <Input
                        className="input"
                        style={{ borderRadius: "6px" }}
                        // size="large"
                        // prefix={
                        //   <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                        // }
                        placeholder={
                          lang == "ar" ? "البريد الألكتروني" : "email"
                        }
                        // placeholder={lang == "ar" ? "رقم الهاتف" : "phone"}
                      />
                    )}
                  </Form.Item>
                  <Text
                    style={{ marginBottom: ".5em", color: "#638ec3" }}
                    level={6}
                    type="secondary"
                  >
                    Password
                  </Text>
                  <Form.Item hasFeedback>
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your Password!",
                        },
                      ],
                    })(
                      <Input.Password
                        style={{ borderRadius: "6px" }}
                        placeholder={lang == "ar" ? "كلمة المرور" : "Password"}
                        // prefix={
                        //   <LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                        // }
                        iconRender={(visible) =>
                          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                      />
                    )}
                  </Form.Item>
                  <div className="isoInputWrapper">
                    <Button
                      className="btn-sign"
                      // style={{ background: "#E7C795" }}
                      dir="ltr"
                      type="primary"
                      loading={loading}
                      htmlType="submit"
                      block
                    >
                      <IntlMessages id="Sign in" />
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </SignInStyleWrapper>{" "}
      </div>
    )
  );
}

export default Form.create({ name: "login" })(SignIn);
