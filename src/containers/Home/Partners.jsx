import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  Coordinate,
  Interaction,
  getTheme,
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
const Charts = (props) => {
   if(props&&props.data){
            props.data.length = 4


         
           }


  const cols = {
    percent: {
      formatter: (val) => {
        val = val * 100 + "%";
        return val;
      },
    },
  };
//   const [mychart, setmychart] = useState([]);
//   useEffect(() => {
//      if(props&&props.data){
//       props.data.length = 4
   

//        setData(data);
//      }
     
//   }, []);
const data = [
   { role: 'Doctor', count: 40, percent: 0.4 },
   { role: 'Nurse', count: 21, percent: 0.21 },
   { role: '事例三', count: 17, percent: 0.17 },
   { role: '事例四', count: 13, percent: 0.13 },
];

  return (
      <Card>
      <CardContent >
      <Title level={4}>{props.title}</Title>
      <Chart height={250} data={   props?.data?.map((e)=>({

role: e.role.charAt(0).toUpperCase() + e.role.slice(1),
count: e.count,
percent:
  Math.round(
    (e.count /
      props.data.reduce(
        (ac, current) => ac + current.count,
        0
      )) *
      100
  ) / 100,
}))} scale={cols} autoFit>
			<Coordinate type="theta" radius={0.75} />
			<Tooltip showTitle={false} />
			<Axis visible={false} />
			<Interval
				position="percent"
				adjust="stack"
            color={["role", props.colors]}
				style={{
					lineWidth: 1,
					stroke: '#fff',
				}}
				label={['count', {
					content: (data) => {
						return `${data.role}:  ${data.count } `;
					},
				}]}
				state={{
					selected: {
						style: (t) => {
							const res = getTheme().geometries.interval.rect.selected.style(t);
							return { ...res, fill: 'red' }
						}
					}
				}}
			/>
			<Interaction type='element-single-selected' />
		</Chart>
      </CardContent>
    </Card>
    
  );
};
export default Charts;

