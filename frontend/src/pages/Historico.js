import React, { useEffect, useState } from "react";
import { Table, Button, Container, Navbar, Nav, Badge } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";

function Historico() {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = () => {
    fetch("http://localhost:5039/api/StockActions/deleted")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar dados.");
        return res.json();
      })
      .then((json) => {
        setDados(json);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar histórico:", err);
        setCarregando(false);
      });
  };

  const deleteAction = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir permanentemente esta ação?")) {
      try {
        await fetch(`http://localhost:5039/api/StockActions/hard/${id}`, {
          method: "DELETE",
        });
        setDados((dados) => dados.filter((item) => item.id !== id));
      } catch (err) {
        alert("Erro ao excluir definitivamente.");
        console.error(err);
      }
    }
  };

  const calcularLucro = (item) => {
    const lucro = (item.currentPrice - item.purchasePrice) * item.quantity - item.purchaseFee;
    return lucro.toFixed(2);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>📈 Finlytics</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="secondary" href="/" className="me-2">
              📋 Ver Tabela
            </Button>
            <Button variant="success" href="/nova-acao">
              ➕ Nova Ação
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container
        fluid
        className="py-5"
        style={{ minHeight: "100vh", backgroundColor: "#f4f6f9" }}
      >
        <div className="mx-auto shadow-sm p-4 bg-white rounded-4" style={{ maxWidth: "100%", overflowX: "auto" }}>
          <h2 className="text-center mb-4 text-secondary">🗑️ Histórico de Ações Deletadas</h2>

          {carregando ? (
            <div className="text-center">
              <div className="spinner-border" role="status" />
              <p>Carregando...</p>
            </div>
          ) : dados.length === 0 ? (
            <p className="text-center">Nenhum dado encontrado.</p>
          ) : (
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
                  <th>Data da Exclusão</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((item) => {
                  const lucro = calcularLucro(item);
                  const valor = parseFloat(lucro);
                  return (
                    <tr key={item.id}>
                      <td className="text-nowrap">{item.companyName}</td>
                      <td>{item.ticker}</td>
                      <td>{new Date(item.purchaseDate).toLocaleDateString()}</td>
                      <td>{item.currency}</td>
                      <td>R${item.purchasePrice}</td>
                      <td>R${item.currentPrice}</td>
                      <td>R${item.purchaseFee}</td>
                      <td>{item.quantity}</td>
                      <td>{item.probabilityArrow}</td>
                      <td>{item.upside}%</td>
                      <td>{item.downside}%</td>
                      <td>{item.quality}</td>
                      <td>
                        <Badge bg={valor >= 0 ? "success" : "danger"}>
                          R${lucro}
                        </Badge>
                      </td>
                      <td>{new Date(item.dateDeleted).toLocaleDateString()}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => deleteAction(item.id)}
                            title="Excluir permanentemente"
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
          )}
        </div>
      </Container>
    </>
  );
}

export default Historico;
