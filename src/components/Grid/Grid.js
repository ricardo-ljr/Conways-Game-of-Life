import React, { useState, useRef, useCallback, useEffect } from "react";
import "./Grid.css";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Board } from "./GridStyles";
import { produce } from "immer";
import { textAlign } from "@material-ui/system";

const numRows = 25;
const numColss = 35;

const alive = 1;
const dead = 0;

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

const useStyles = makeStyles(theme => ({
  root: {
    width: "30%"
  },
  margin: {
    height: theme.spacing(3)
  }
}));

const marks = [
  {
    value: 5,
    label: "5"
  },
  {
    value: 15,
    label: "15"
  },
  {
    value: 25,
    label: "25"
  },
  {
    value: 35,
    label: "35"
  },
  {
    value: 45,
    label: "45"
  },
  {
    value: 55,
    label: "55"
  },
  {
    value: 65,
    label: "65"
  },
  {
    value: 75,
    label: "75"
  }
];

function valuetext(value) {
  return `${value}`;
}

const Grid = () => {
  const [numCols, setNumCols] = useState(numColss);

  const sliderChange = (e, newValue) => {
    setNumCols(newValue);
  };

  const clearGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  };

  const [grid, setGrid] = useState(() => {
    return clearGrid();
  });

  const [start, setStart] = useState(false); // Hold state for running algorithms
  const [generations, setGenerations] = useState(0);

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
    setTimeout(startSimulation, 200);
  }, []);

  const next = () => {
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
  };

  const width = 20;
  const height = 20;

  return (
    <div className="grid-container">
      <div style={{ width: "50%", margin: "0 auto" }}>
        <Typography id="discrete-slider-custom" gutterBottom>
          Increase Columns
        </Typography>
        <Slider
          max={75}
          defaultValue={numCols}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-custom"
          step={5}
          valueLabelDisplay="auto"
          marks={marks}
          onChange={sliderChange}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          className="grid-cells"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numCols}, 20px)`,
            margin: "2% auto ",
            justifyContent: "center"
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
                }}
                style={{
                  width: width,
                  height: height,
                  backgroundColor: grid[i][j] ? "#FFD700" : "red",
                  border: "solid 1px black",
                  margin: "0 auto"
                }}
              />
            ))
          )}
        </div>
      </div>
      <div className="controls">
        <button
          onClick={() => {
            setStart(!start);
            if (!start) {
              startRef.current = true;
              startSimulation();
            }
          }}
        >
          {start ? "Stop" : "Start"}
        </button>
        <button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.8 ? 1 : 0))
              );
            }

            setGrid(rows);
          }}
        >
          Shuffle
        </button>
        <button
          onClick={() => {
            next();
            setGenerations(generations + 1);
          }}
        >
          Next
        </button>
        <button
          onClick={() => {
            setGrid(clearGrid());
            setGenerations(0);
          }}
        >
          Clear
        </button>
      </div>
      <p>Generations: {generations}</p>
    </div>
  );
};

export default Grid;
