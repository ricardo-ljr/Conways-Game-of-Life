import React from "react";
import Grid from "../Grid/Grid";
import Rules from "../Rules/Rules";
const GridContainer = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        // padding: "25px",
        margin: "0 auto"
      }}
    >
      <Grid />
    </div>
  );
};

export default GridContainer;
