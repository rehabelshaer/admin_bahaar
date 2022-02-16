import React, { useState, useEffect } from "react";
import { Chart, Point, Line, Axis, Area, Tooltip, Coordinate } from "bizcharts";
import DataSet from "@antv/data-set";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Menu,
  MenuItem,
  //   Typography,
} from "@material-ui/core";
import { Typography } from "antd";

const { Title } = Typography;

function Visit(props) {
  const { DataView } = DataSet;

  const dv = new DataView().source(props.data.data);
  dv.transform({
    type: "fold",
    fields: props.data.types,
    key: "user", // key字段
    value: "score", // value字段
  });

  return (
    <Card>
      <CardContent>
        <Title level={4}>{props.title}</Title>
        <Chart
          height={250}
          data={dv?.rows}
          autoFit
          scale={{
            score: {
              //   min: 0,
              //   max: 80,
            },
          }}
          interactions={["legend-highlight"]}
        >
          <Coordinate type="polar" radius={0.8} />
          <Tooltip shared />
          <Point
            position="item*score"
            color={["user", props.colors]}
            shape="circle"
          />
          <Line position="item*score" color={["user", props.colors]} size="2" />
          <Area position="item*score" color={["user", props.colors]} />
          {
            // 棱角和圆形，默认圆形
          }
          <Axis name="score" grid={{ line: { type: "line" } }} />
          {
            // 不需要轴的最外圈
          }
          <Axis name="item" line={false} />
        </Chart>
      </CardContent>
    </Card>
  );
}

export default Visit;
