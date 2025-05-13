import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import {
  Table,
  Button,
  Container,
  Navbar,
  Nav
} from "react-bootstrap";

const Dashboard = () => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const loadActions = async () => {
      try {
        const ids = [1, 2, 3]; // trocar por lógica real de listagem quando disponível
        const responses = await Promise.all(ids.map(id => api.get(`/${id}`)));
        setActions(responses.map(r => r.data));
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

  return (
    <>
      {/* Header fixo */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>📈 Finlytics</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="success" href="/nova-acao">
              ➕ Nova Ação
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Conteúdo centralizado com fundo claro */}
      <Container
        fluid
        className="d-flex justify-content-center py-5"
        style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
      >
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          <h2 className="text-center mb-4">📊 Dashboard de Ações</h2>
          <div className="table-responsive">
            <Table striped bordered hover className="align-middle text-center">
              <thead>
                <tr>
                  <th>ID</th>
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
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {actions.map((action) => (
                  <tr key={action.id}>
                    <td>{action.id}</td>
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
                      <Button variant="warning" size="sm" className="me-2" disabled>
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteAction(action.id)}
                      >
                        Excluir
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
