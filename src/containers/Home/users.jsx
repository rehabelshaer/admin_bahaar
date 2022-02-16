import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
  Point,
  Interval
} from "bizcharts";
import {
   Avatar,
   Card,
   CardContent,
   Grid,
   makeStyles,
   Menu,
   MenuItem,
   // Typography,
 } from "@material-ui/core";
 import { Typography } from "antd";
 const { Title } = Typography;

export default function Users (props) {
    var data = [
      {
        name: "John",
        vote: 35654
      },
      {
        name: "Damon",
        vote: 65456
      },
      {
        name: "Patrick",
        vote: 45724
      },
      {
        name: "Mark",
        vote: 13654
      }
    ];
    var imageMap = {
      // John: "https://zos.alipayobjects.com/rmsportal/mYhpaYHyHhjYcQf.png",
      // Damon: "https://zos.alipayobjects.com/rmsportal/JBxkqlzhrlkGlLW.png",
      // Patrick: "https://zos.alipayobjects.com/rmsportal/zlkGnEMgOawcyeX.png",
      // Mark: "https://zos.alipayobjects.com/rmsportal/KzCdIdkwsXdtWkg.png"
    };
    const scale = {
      vote: {
        min: 0
      }
    };
    return (
      <Card>
      <CardContent >
      <Title level={4}>{props.title}</Title>
        <Chart
          data={props.data}
          padding={[60, 20, 40, 60]}
          scale={scale}
          autoFit
          height={305}
        >
          <Axis
            name="count"
            labels={null}
            title={null}
            line={null}
            tickLine={null}
          />
          <Interval
            position="role*count"
            color={["role", ["#7f8da9", "#fec514", "#db4c3c", "#daf0fd"]]}
          />
          <Tooltip />
          <Interval 
            position="role*count"
            label="role"
          />
        </Chart>
        </CardContent>
    </Card>
    );
  
}


