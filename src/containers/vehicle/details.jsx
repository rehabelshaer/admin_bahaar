import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CardWraper from "../../components/new/CardWraper";
import PageWraper from "../../components/new/PageWraper";
import Loader from "../../components/new/loader";
import enstance from "../../library/helpers/axios";
import { Descriptions, Divider, Table, Tag } from "antd";
import config from "./config";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";
import { generateCols } from "../MainIndex/generateCol";

// import { useSelector } from 'react-redux';

const UserDetails = () => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  // const isLoggedIn = useSelector((state) => state.Auth.idToken);

  ////////////////////////////////

  useEffect(() => {
    setLoading(true);
    enstance[config.api.show[0].method](`${config.api.show[1]}${params.id}`, {
      headers: {},
    }).then((res) => {
      setLoading(false);
      setUser(res.data.data);
    });
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
        key: config.titles.show,
        to: `${config.routes.show}${params.id}`,
        title: config.titles.show,
      },
    ],
  });

  return (
    <div className="user_details">
      <PageWraper>
        <div>
          <div style={{ marginTop: "1rem" }}>
            <CardWraper>
              {loading ? (
                <div className="text-center">
                  <Loader />
                </div>
              ) : (
                <>
                  <Descriptions>
                    <Descriptions.Item label={"name (en)".translate()}>
                      {user?.name_en}
                    </Descriptions.Item>
                    <Descriptions.Item label={"name (ar)".translate()}>
                      {user?.name_ar}
                    </Descriptions.Item>
                    <Descriptions.Item label={"brand".translate()}>
                      {user?.brand}
                    </Descriptions.Item>
                    <Descriptions.Item label={"created at".translate()}>
                      {user?.created_at}
                    </Descriptions.Item>
                    <Descriptions.Item label={"num of cabins".translate()}>
                      {user?.num_of_cabins}
                    </Descriptions.Item>
                    <Descriptions.Item label={"num of toilets".translate()}>
                      {user?.num_of_toilets}
                    </Descriptions.Item>
                    <Descriptions.Item label={"vehicle Width".translate()}>
                      {user?.vehicle_width}
                    </Descriptions.Item>
                    <Descriptions.Item label={"year".translate()}>
                      {user?.year}
                    </Descriptions.Item>
                    <Descriptions.Item label={"engine power".translate()}>
                      {user?.engine_power}
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={"vehicle back images".translate()}
                    >
                      <img
                        className="image_vehcile"
                        src={user?.vehicle_back_images}
                      ></img>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={"vehicle front images".translate()}
                    >
                      <img
                        className="image_vehcile"
                        src={user?.vehicle_front_images}
                      ></img>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={"vehicle inside images".translate()}
                    >
                      <img
                        className="image_vehcile"
                        src={user?.vehicle_inside_images}
                      ></img>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={"vehicle other images".translate()}
                    >
                      <img
                        className="image_vehcile"
                        src={user?.vehicle_other_images}
                      ></img>
                    </Descriptions.Item>
                  </Descriptions>
                </>
              )}
            </CardWraper>
          </div>
        </div>
      </PageWraper>
    </div>
  );
};

export default UserDetails;
