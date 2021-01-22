import React from "react";
import "./style.css";

const Loader = () => {
  return (
    <div
      className="absolute top-0 bottom-0 right-0 left-0 z-30"
      style={{ background: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className=" w-full h-full flex justify-center justify-items-center items-center">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
