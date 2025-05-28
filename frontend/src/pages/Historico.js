import React, { useEffect, useState } from "react";
import { Table, Button, Container, Navbar, Nav } from "react-bootstrap";
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
                    method: "DELETE"
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
                className="d-flex justify-content-center py-5"
                style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
            >
                <div style={{ width: "100%", maxWidth: "1200px" }}>
                    <h2 className="text-center mb-4">🗑️ Histórico de Ações Deletadas</h2>

                    {carregando ? (
                        <div className="text-center">
                            <div className="spinner-border" role="status" />
                            <p>Carregando...</p>
                        </div>
                    ) : dados.length === 0 ? (
                        <p className="text-center">Nenhum dado encontrado.</p>
                    ) : (
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
                                        <th>Lucro / Prejuízo (R$)</th>
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
                                                <td>{item.companyName}</td>
                                                <td>{item.ticker}</td>
                                                <td>{new Date(item.purchaseDate).toLocaleDateString()}</td>
                                                <td>{item.currency}</td>
                                                <td>R${item.purchasePrice}</td>
                                                <td>R${item.currentPrice}</td>
                                                <td>R${item.purchaseFee}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.probabilityArrow}</td>
                                                <td>{item.upside}</td>
                                                <td>{item.downside}</td>
                                                <td>{item.quality}</td>
                                                <td style={{ color: valor >= 0 ? "green" : "red" }}>R${lucro}</td>
                                                <td>{new Date(item.dateDeleted).toLocaleDateString()}</td>
                                                <td>
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => deleteAction(item.id)}
                                                    >
                                                        <FaTrashAlt />
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
}

export default Historico;
