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
  Interval,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";
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





export default function Clusteredstacked (props)  {

    
 
  
    return (<Card>
      <CardContent >
      <Title level={4}>{props.title}</Title>
      <Chart height={300} padding="auto" data={props.data.data} autoFit>
      <Interval
        adjust={[
         {
            type: 'dodge',
            marginRatio: 0,
          },
        ]}
        color={["visit_type",props.colors]}
        position="actor*order_count"
      />
      <Tooltip shared />
      <Legend dx={20} name='visit_type' visible={true} />

    </Chart>
        </CardContent>
    </Card>
    );
  
}
