import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import EarningCard2 from "@iso/Mcomponents/cards/EarningCard/index2";
import EarningCard3 from "@iso/Mcomponents/cards/EarningCard/index3";
import EarningCard4 from "@iso/Mcomponents/cards/EarningCard/index4";
import EarningCard5 from "@iso/Mcomponents/cards/EarningCard/index5";
import EarningCard6 from "@iso/Mcomponents/cards/EarningCard/index6";
import EarningCard from "@iso/Mcomponents/cards/EarningCard/index1";
import TotalChartCard from "@iso/Mcomponents/cards/TotalChartCard";
import PopularCard from "@iso/Mcomponents/cards/PopularCard";
import axios, { URL } from "../../library/helpers/axios";
import { Statistic, Card, Row, Col } from "antd";

import LoaderWave from "@iso/Mcomponents/extended/Loader/loaderWave";

export const gridSpacing = 3;
export const drawerWidth = 260;
const Dashboard = () => {
  const dispatch = useDispatch();
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  dispatch({
    type: "SET",
    payload: [],
  });

  const [chartData, setChartData] = useState(null);
  const [chartDataNew, setChartDataNew] = useState(null);
  const [paitent, setPitent] = useState(null);

  const fetchData = () => {
    setLoading(true);

    const params = {};

    setLoading(true);
    axios["get"]("statistics", {
      headers: {},
      params,
    })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  return !loading ? (
    <div style={{ margin: "20px", marginTop: "50px" }}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid spacing={gridSpacing} container>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <EarningCard
                data={`${data?.amountPaid} £`}
                label={"Total Amount "}
                color="orange"
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <EarningCard2 data={data?.branches} label={"Branches"} />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <EarningCard3
                data={data?.hourlyOrdersDone}
                label={"Confirmed Orders Last 24 Hrs"}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <EarningCard4
                data={data?.hourlyOrdersPending}
                title={"Pending Orders Last 24 Hrs"}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <EarningCard6
                data={data?.ordersAccepted}
                label={"Compeleted Orders"}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <EarningCard5
                data={data?.ordersRejected}
                label={"Cancelled Orders"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  ) : (
    <LoaderWave />
  );
};

export default Dashboard;
