import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // Adicione isso

import { api } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
  Navbar,
  Nav
} from "react-bootstrap";

const EditAction = () => {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();
  const [form, setForm] = useState({
    ticker: "",
    companyName: "",
    purchaseDate: "",
    currency: "BRL",
    purchasePrice: "",
    currentPrice: "",
    purchaseFee: "",
    quantity: "",
    probabilityArrow: "Up",
    upside: "",
    downside: "",
    quality: ""
  });
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(false);

  // Carregar os dados da ação para edição
  useEffect(() => {
    const loadAction = async () => {
      try {
        const response = await api.get(`/${id}`);
        setForm(response.data);
      } catch (err) {
        console.error("Erro ao carregar dados da ação:", err);
      }
    };

    loadAction();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    try {
      await api.put(`/${id}`, form);
      setSucesso(true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setErro("Erro ao atualizar a ação. Verifique os campos.");
    }
  };

  return (
    <>
      {/* Header */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>📈 Finlytics</Navbar.Brand>
          <Nav className="ms-auto">
            <Button variant="light" href="/">
              🏠 Dashboard
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Formulário */}
      <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh", backgroundColor: "#f8f9fa" }}>
        <Card className="shadow-sm w-100" style={{ maxWidth: "900px" }}>
          <Card.Body>
            <Card.Title className="mb-4 text-center fs-4">
              ✏️ Editar Ação
            </Card.Title>

            {erro && <Alert variant="danger">{erro}</Alert>}
            {sucesso && (
              <Alert variant="success">✅ Ação atualizada com sucesso!</Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Ticker</Form.Label>
                    <Form.Control
                      name="ticker"
                      value={form.ticker}
                      onChange={handleChange}
                      required
                      placeholder="Ex: PETR4"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Empresa</Form.Label>
                    <Form.Control
                      name="companyName"
                      value={form.companyName}
                      onChange={handleChange}
                      required
                      placeholder="Ex: Petrobras"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Data da Compra</Form.Label>
                    <Form.Control
                      type="date"
                      name="purchaseDate"
                      value={form.purchaseDate}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Moeda</Form.Label>
                    <Form.Control
                      name="currency"
                      value={form.currency}
                      onChange={handleChange}
                      required
                      placeholder="Ex: BRL"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Preço de Compra</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="purchasePrice"
                      value={form.purchasePrice}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Preço Atual</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="currentPrice"
                      value={form.currentPrice}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Taxa de Compra</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="purchaseFee"
                      value={form.purchaseFee}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control
                      type="number"
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Seta de Probabilidade</Form.Label>
                    <Form.Select
                      name="probabilityArrow"
                      value={form.probabilityArrow}
                      onChange={handleChange}
                    >
                      <option value="Up">⬆️ Up</option>
                      <option value="Down">⬇️ Down</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Qualidade</Form.Label>
                    <Form.Control
                      type="number"
                      name="quality"
                      value={form.quality}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Upside (%)</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="upside"
                      value={form.upside}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Downside (%)</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      name="downside"
                      value={form.downside}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={() => navigate("/")}>
                  ← Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  💾 Atualizar Ação
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default EditAction;
