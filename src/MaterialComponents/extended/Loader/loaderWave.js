import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import waveLoading from "../../../assets/loaders/waveLoading.gif";
const LoaderWave = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={waveLoading} title="loading" />
    </div>
  );
};

export default LoaderWave;
