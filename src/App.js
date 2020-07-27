import React from "react";
import NavBar from "./components/Navigation/NavBar";
import GridContainer from "./components/GridContainer/GridContainer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1>Let's Populate Mars!</h1>
      <GridContainer />
    </div>
  );
}

export default App;
