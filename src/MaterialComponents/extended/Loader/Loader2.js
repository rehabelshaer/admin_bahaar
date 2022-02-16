import React from "react";
import "./loader2.css";

const Loader = () => {
  return (
    <svg
      className="ccontainer"
      height={210}
      width={650}
      xmlns="http://www.w3.org/2000/svg"
      viewport="0 0 60 60"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path
        className="spinner"
        stroke="#09a"
        fill="none"
        strokeWidth={2}
        strokeLinejoin="round"
        d="M0,90L250,90Q257,60 262,87T267,95 270,88 273,92t6,35 7,-60T290,127 297,107s2,-11 10,-10 1,1 8,-10T319,95c6,4 8,6 10,-17s2,10 9,11h210"
      />
    </svg>
  );
};

export default Loader;
