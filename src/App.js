import React from "react";
import NavBar from "./components/Navigation/NavBar";
import GridContainer from "./components/GridContainer/GridContainer";
import Rules from "./components/Rules/Rules";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1>Let's Populate Mars!</h1>
      <GridContainer />
      <Rules />
    </div>
  );
}

export default App;
