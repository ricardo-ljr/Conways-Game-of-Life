import React from "react";
import NavBar from "./components/Navigation/NavBar";
import Grid from "./components/Grid/Grid";
import Rules from "./components/Rules/Rules";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1>Let's Populate Mars!</h1>
      <Grid />
      <Rules />
    </div>
  );
}

export default App;
