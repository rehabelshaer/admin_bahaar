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

export default function Users (props){




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
    return (    <Card>
      <CardContent >
      <Title level={4}>{props.title}</Title>

        <Chart
          data={props?.newData?.map((e)=>({
            name:props?.labels?.[e[props.status]],
           count: e.count,
           "sum price":props.type=='count'?e.count:`${e.sum_price} £`
           
           }))}
          padding={[60, 20, 40, 60]}
          scale={scale}
          autoFit
          height={250}
        >
          <Axis
            name="count"
            labels={null}
            title={null}
            line={null}
            tickLine={null}
          />
          {/* <Interval
            position="name*count"
            
          /> */}
               {/* <Point
            position="name*count"
            size={60}
            shape={[
              "name",
              function(name) {
                return ["image", imageMap[name]];
              }
            ]}
          /> */}
          <Tooltip />
          <Legend name='name' visible={false} />

          <Interval 
            position="name*count"
            label="sum price"
            color={["name", props.colors]}

          />
        </Chart>
        </CardContent>
    </Card>
    );
  
}


