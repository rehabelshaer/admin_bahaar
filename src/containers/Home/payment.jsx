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

export default class Users extends React.Component {
  render() {
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
        <Chart
          data={data}
          padding={[60, 20, 40, 60]}
          scale={scale}
          autoFit
          height={210}
        >
          <Axis
            name="vote"
            labels={null}
            title={null}
            line={null}
            tickLine={null}
          />
          <Interval
            position="name*vote"
            color={["name", ["#7f8da9", "#fec514", "#db4c3c", "#daf0fd"]]}
          />
          <Tooltip />
          <Interval 
            position="name*vote"
            label="name"
          />
        </Chart>
    );
  }
}


