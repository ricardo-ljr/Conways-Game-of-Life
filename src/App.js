import React from "react";
import NavBar from "./components/Navigation/NavBar";
import Grid from "./components/Grid/Grid";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1>Hello World</h1>
      <Grid />
    </div>
  );
}

export default App;
