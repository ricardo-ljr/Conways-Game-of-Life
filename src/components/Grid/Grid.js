import React, { useState } from "react";
import { Board } from "./GridStyles";
import { produce } from "immer";

const numRows = 25;
const numCols = 25;

const Grid = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  const width = 20;
  const height = 20;

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(newGrid);

                console.log(grid);
              }}
              style={{
                width: width,
                height: height,
                backgroundColor: grid[i][j] ? "#FFD700" : "red",
                border: "solid 1px black"
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Grid;
