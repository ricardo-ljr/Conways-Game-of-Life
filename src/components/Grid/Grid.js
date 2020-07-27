import React from "react";
import { Board } from "./GridStyles";
const Grid = () => {
  const cellSize = 20;
  const width = 800;
  const height = 600;

  return (
    <>
      <h1>I'm a simple grid!</h1>
      <Board
        style={{
          width: width,
          height: height,
          backgroundSize: `${cellSize}px ${cellSize}px`
        }}
      ></Board>
    </>
  );
};

export default Grid;
