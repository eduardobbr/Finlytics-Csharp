import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Table, Button, Container, Navbar, Nav, Badge } from "react-bootstrap";

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

      <Container fluid className="py-5" style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
        <div className="mx-auto shadow-sm p-4 bg-white rounded-4" style={{ maxWidth: "100%", overflowX: "auto" }}>
          <h2 className="text-center mb-4 text-secondary">📊 Dashboard de Ações</h2>

          <Table striped bordered hover responsive className="align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Empresa</th>
                <th>Ticker</th>
                <th>Data da Compra</th>
                <th>Moeda</th>
                <th>Preço de Compra</th>
                <th>Preço Atual</th>
                <th>Taxa de Compra</th>
                <th>Qtd</th>
                <th>Seta</th>
                <th>Upside</th>
                <th>Downside</th>
                <th>Qualidade</th>
                <th>Lucro / Prejuízo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((action) => {
                const lucro = calcularLucro(action);
                const valor = parseFloat(lucro);
                return (
                  <tr key={action.id}>
                    <td className="text-nowrap">{action.companyName}</td>
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
                      <Badge bg={valor >= 0 ? "success" : "danger"}>
                        R${lucro}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEdit(action.id)}
                          title="Editar"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deleteAction(action.id)}
                          title="Excluir"
                        >
                          <FaTrashAlt />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
