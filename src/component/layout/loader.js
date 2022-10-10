import React from "react";
// import { SyncOutlined } from "@ant-design/icons";

const Loader = ({ fontSize, full }) => {
  const style = { position: "fixed", top: 0, left: 0, width: "100%", background: "rgb(0,0,0,0.3)" };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...(full ? style : {}),
      }}
    >
      Loading...
      {/* <SyncOutlined spin style={{ fontSize }} /> */}
    </div>
  );
};

export default Loader;
