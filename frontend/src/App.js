import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NovaAcao from "./pages/NovaAcao";
import EditAction from "./pages/EditAction"; // Importar a nova página
import Historico from "./pages/Historico";  // Importando a página de Histórico
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/nova-acao" element={<NovaAcao />} />
        <Route path="/editar-acao/:id" element={<EditAction />} /> {/* Rota de edição */}
        <Route path="/historico" element={<Historico />} /> {/* Rota de Histórico */}
      </Routes>
    </Router>
  );
}

export default App;
