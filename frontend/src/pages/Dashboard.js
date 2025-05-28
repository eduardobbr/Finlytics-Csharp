import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Importar o hook de navegação
import { api } from "../services/api";
import { FaEdit, FaTrashAlt } from "react-icons/fa";  // Importando os ícones do react-icons
import {
  Table,
  Button,
  Container,
  Navbar,
  Nav
} from "react-bootstrap";

const Dashboard = () => {
  const [actions, setActions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadActions = async () => {
      try {
        const response = await api.get("/");
        setActions(response.data);
      } catch (err) {
        console.error("Erro ao carregar ações:", err);
      }
    };

    loadActions();
  }, []);

  const deleteAction = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta ação?")) {
      try {
        await api.delete(`/${id}`);
        setActions(actions.filter(a => a.id !== id));
      } catch (err) {
        alert("Erro ao excluir.");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/editar-acao/${id}`);
  };

  const calcularLucro = (action) => {
    const lucro = (action.currentPrice - action.purchasePrice) * action.quantity - action.purchaseFee;
    return lucro.toFixed(2);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>📈 Finlytics</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="success" href="/nova-acao">➕ Nova Ação</Button>
            <Button variant="warning" href="/historico" className="ms-2">🗑️ Histórico</Button>
          </Nav>
        </Container>
      </Navbar>

      <Container fluid className="d-flex justify-content-center py-5" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          <h2 className="text-center mb-4">📊 Dashboard de Ações</h2>
          <div className="table-responsive">
            <Table striped bordered hover className="align-middle text-center">
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Ticker</th>
                  <th>Data da Compra</th>
                  <th>Moeda</th>
                  <th>Preço de Compra</th>
                  <th>Preço Atual</th>
                  <th>Taxa de Compra</th>
                  <th>Quantidade</th>
                  <th>Seta</th>
                  <th>Upside (%)</th>
                  <th>Downside (%)</th>
                  <th>Qualidade</th>
                  <th><strong>Lucro / Prejuízo (R$)</strong></th> {/* Nova coluna */}
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {actions.map((action) => (
                  <tr key={action.id}>
                    <td>{action.companyName}</td>
                    <td>{action.ticker}</td>
                    <td>{new Date(action.purchaseDate).toLocaleDateString()}</td>
                    <td>{action.currency}</td>
                    <td>R${action.purchasePrice}</td>
                    <td>R${action.currentPrice}</td>
                    <td>R${action.purchaseFee}</td>
                    <td>{action.quantity}</td>
                    <td>{action.probabilityArrow}</td>
                    <td>{action.upside}%</td>
                    <td>{action.downside}%</td>
                    <td>{action.quality}</td>
                    <td>
                      {(() => {
                        const lucro = calcularLucro(action);
                        const valor = parseFloat(lucro);
                        return (
                          <span style={{ color: valor >= 0 ? "green" : "red" }}>
                            R${lucro}
                          </span>
                        );
                      })()}
                    </td>
                    <td>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEdit(action.id)}>
                        <FaEdit />
                      </Button>
                      <Button variant="outline-danger" size="sm" className="ms-2" onClick={() => deleteAction(action.id)}>
                        <FaTrashAlt />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;