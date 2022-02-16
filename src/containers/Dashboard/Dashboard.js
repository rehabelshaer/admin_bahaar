import React, { useRef, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
import useWindowSize from "@iso/lib/hooks/useWindowSize";
import appActions from "@iso/redux/app/actions";
import ThemeSwitcher from "@iso/containers/ThemeSwitcher/ThemeSwitcher";
import siteConfig from "@iso/config/site.config";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import DashboardRoutes from "./DashboardRoutes";

import { DashboardContainer, DashboardGlobalStyles } from "./Dashboard.styles";

const { Content, Footer } = Layout;
const { toggleAll } = appActions;
const bgTheme = localStorage.getItem("backgroundColor");
const fgTheme = localStorage.getItem("forgroundColor");
const styles = {
  layout: { flexDirection: "row", overflowX: "hidden" },
  content: {
    padding: "55px 0 ",
    flexShrink: "0",
    background: bgTheme && bgTheme,
    position: "relative",
    boxShadow: "1px 1px 1px 1px black",
    overflowX: "hidden",
  },
  footer: {
    background: "#ffffff",
    textAlign: "center",
    borderTop: "1px solid #ededed",
  },
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const appHeight = useSelector((state) => state.App.height);
  const { width, height } = useWindowSize();
  const bright = useSelector((state) => state.bright.value);
  const ref = useRef();
  const [top, setTop] = useState(false);
  // The scroll listener
  const handleScroll = (e) => {
    let { scrollHeight, scrollTop, clientHeight } = e.target;
    if (scrollTop >= 30) {
      setTop(true);
    } else {
      setTop(false);
    }
  };

  React.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);
  return (
    <div style={{ filter: `brightness(${bright / 100})`, overflow: "hidden" }}>
      <DashboardContainer>
        <DashboardGlobalStyles />

        <Layout style={{}}>
          <Topbar top={top} />

          <Layout style={styles.layout}>
            <Sidebar />
            <Layout
              ref={ref}
              onScroll={handleScroll}
              className="isoContentMainLayout"
              style={{
                // height: appHeight - 52,
                height: appHeight + 39,

                // paddingTop: "50px",
              }}
            >
              <Content className="isomorphicContent" style={styles.content}>
                <DashboardRoutes />
                <Footer
                  style={{
                    textAlign: "center",
                    color: "black",
                    padding: "13px",
                    background: "white",
                    borderTop: "1px solid #4f4f4f45",
                    bottom: "0",
                    width: "100%",
                    height: "46px",
                    position: "absolute",
                  }}
                >
                  {siteConfig.footerText}{" "}
                  <a href="http://appssquare.com" target="_blank">
                    {" "}
                    Appssquare
                  </a>
                </Footer>
              </Content>
            </Layout>
          </Layout>

          {/* <ThemeSwitcher /> */}
        </Layout>
      </DashboardContainer>
      {/* <div
        style={{
          padding: "0px",
          // background: bgTheme&&bgTheme,
          background: "white",
          boxShadow: "rgb(0 0 0 / 40%) 0px 0px 2px 0px",
          borderRadius: "10px",
        }}
      > */}

      {/* </div> */}
    </div>
  );
}
