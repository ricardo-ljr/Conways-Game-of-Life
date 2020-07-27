import React, { useState, useRef, useCallback } from "react";
import { Board } from "./GridStyles";
import { produce } from "immer";

const numRows = 25;
const numCols = 35;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const Grid = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });
  const [start, setStart] = useState(false); // Hold state for running algorithms

  const startRef = useRef(start);
  startRef.current = start;

  const startSimulation = useCallback(() => {
    if (!startRef.current) {
      return;
    }

    setGrid(grid => {
      return produce(grid, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += grid[newI][newJ];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (grid[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });
    setTimeout(startSimulation, 500);
  }, []);

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
        <button
          style={{ width: "40px" }}
          onClick={() => {
            setStart(!start);
            if (!start) {
              startRef.current = true;
              startSimulation();
            }
          }}
        >
          {start ? "stop" : "start"}
        </button>
      </div>
    </>
  );
};

export default Grid;
