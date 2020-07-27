import React from "react";
import Grid from "../Grid/Grid";
const GridContainer = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "80%",
        margin: "0 auto"
      }}
    >
      <Grid />
    </div>
  );
};

export default GridContainer;
