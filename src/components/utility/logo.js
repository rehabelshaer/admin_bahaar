import React from "react";
import { Link } from "react-router-dom";
import siteConfig from "@iso/config/site.config";

export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/admin">
              <img
                style={{ width: "50%" }}
                src={require("../../assets/logo/logo_bahar.png")}
                alt=""
              />
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link to="/admin">
            <img
              style={{ width: "35%" }}
              src={require("../../assets/logo/logo_bahar.png")}
              alt=""
            />
          </Link>
        </h3>
      )}
      <div style={{ background: "#ccc", height: "1px", margin: "0 7px" }}></div>
    </div>
  );
};
