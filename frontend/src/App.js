import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import BaseRouter from "./routes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <BaseRouter />
      </Router>
    </div>
  );
}

export default App;
