import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NovaAcao from "./pages/NovaAcao";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/nova-acao" element={<NovaAcao />} />
      </Routes>
    </Router>
  );
}

export default App;
