import React, { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

// import Menu from "@iso/components/uielements/menu";
import IntlMessages from "@iso/components/utility/intlMessages";
import { Badge, Menu } from "antd";
import styled from "styled-components";
const { SubMenu } = Menu;

const SubCustomMenu = styled(SubMenu)``;

const stripTrailingSlash = (str) => {
  if (str.substr(-1) === "/") {
    return str.substr(0, str.length - 1);
  }
  return str;
};
export default React.memo(function SidebarMenu({
  singleOption,
  submenuStyle,
  submenuColor,
  ...rest
}) {
  // function handleVisibleChange() {
  //   console.log
  // }

  let match = useRouteMatch();

  const { key, label, leftIcon, children } = singleOption;
  const url = stripTrailingSlash(match.url);
  const notificationCounter =
    {
      Users: true,
      "/admin/Joinings": localStorage.getItem("countA"),
      "/admin/Modification-requests": localStorage.getItem("countB"),
    } || 0;
  if (children) {
    return (
      <SubCustomMenu
        key={key}
        className="sub-menu-custom"
        style={{}}
        title={
          <span className="isoMenuHolder">
            <Badge
              offset={[9, 6]}
              dot={notificationCounter[label]}
              size="small"
            >
              <span> {leftIcon}</span>
              <span className="nav-text">
                <IntlMessages id={label} />
              </span>
            </Badge>
          </span>
        }
        {...rest}
      >
        {children.map((child) => {
          const linkTo = child.withoutDashboard
            ? `/${child.key}`
            : `${url}/${child.key}`;
          return (
            //   <Popover
            //   content={}
            //   title="Title"
            //   trigger="click"
            //   visible={visible}
            //   onVisibleChange={handleVisibleChange}
            // >
            child.show ? (
              <Menu.Item style={{}} key={child.key}>
                <Link style={submenuColor} to={linkTo}>
                  <Badge
                    offset={[15, 6]}
                    count={notificationCounter[linkTo]}
                    size="small"
                  >
                    <IntlMessages id={child.label} />
                  </Badge>
                </Link>
              </Menu.Item>
            ) : null
          );
        })}
      </SubCustomMenu>
    );
  }

  return (
    <Menu.Item key={key} {...rest}>
      <Link
        to={`${url}${key == "admin" ? "" : "/"}${key == "admin" ? "" : key}`}
      >
        <span className="isoMenuHolder">
          <span style={submenuColor}>{leftIcon}</span>
          <span className="nav-text">
            <span style={submenuColor}>
              <IntlMessages id={label} />
            </span>
          </span>
        </span>
      </Link>
    </Menu.Item>
  );
});

// // border menu
// html[dir='rtl'] .ant-menu-vertical .ant-menu-item::after,html[dir='rtl']  .ant-menu-vertical-left .ant-menu-item::after,html[dir='rtl']  .ant-menu-vertical-right .ant-menu-item::after,html[dir='rtl']  .ant-menu-inline .ant-menu-item::after {

//   border-right: 5px solid #3aa6d3
//  !important ;}
//  .ant-menu-vertical .ant-menu-item::after, .ant-menu-vertical-left .ant-menu-item::after, .ant-menu-vertical-right .ant-menu-item::after, .ant-menu-inline .ant-menu-item::after {

//     border-right: 3px solid #3aa6d3
//  !important ;}

//   .ant-menu-item a:hover {
//     color: #3aa6d3
//  !important ;
// }
// .isomorphicSidebar .isoDashboardMenu .ant-menu-item-selected .nav-text {
//   color: #3aa6d3
//  !important ;
// }
// .isomorphicSidebar .isoDashboardMenu .ant-menu-item-selected svg {
//    color: #3aa6d3
//   !important;

// }
// .ant-menu-item:hover, .ant-menu-item-active, .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, .ant-menu-submenu-active, .ant-menu-submenu-title:hover {
//   color: #3aa6d3
//  !important ;
// }
// .ant-menu-submenu-selected {
//   color: #3aa6d3
//  !important ;
// }
