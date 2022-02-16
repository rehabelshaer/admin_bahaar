import React from "react";
import { useDispatch } from "react-redux";
import Popover from "@iso/components/uielements/popover";
import IntlMessages from "@iso/components/utility/intlMessages";
import authAction from "@iso/redux/auth/actions";
import TopbarDropdownWrapper from "./TopbarDropdown.styles";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import IconSlider from "./bright/bright";

const { logout } = authAction;

export default function TopbarUser() {
  const [visible, setVisibility] = React.useState(false);
  const dispatch = useDispatch();
  function handleVisibleChange() {
    setVisibility((visible) => !visible);
  }

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      {/* <Link className="isoDropdownLink" to={'/dashboard/my-profile'}>
        <IntlMessages id="topbar.myprofile" />
      </Link>
      <a className="isoDropdownLink" href="# ">
        <IntlMessages id="themeSwitcher.settings" />
      </a>
      <a className="isoDropdownLink" href="# ">
        <IntlMessages id="sidebar.feedback" />
      </a>
      <a className="isoDropdownLink" href="# ">
        <IntlMessages id="topbar.help" />
      </a> */}
      {/* <a className="isoDropdownLink" href="# ">
      <LanguageSwitcher />

      </a> 
      */}
      <div>
        <IconSlider min={30} max={100} />
      </div>

      <div className="isoDropdownLink" onClick={() => dispatch(logout())}>
        <IntlMessages id="topbar.logout" />
      </div>
    </TopbarDropdownWrapper>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      arrowPointAtCenter={true}
      placement="bottomLeft"
    >
      <div className="isoImgWrapper">
        <Avatar icon={<UserOutlined />} />{" "}
        <span className="userActivity online" />
      </div>
    </Popover>
  );
}
