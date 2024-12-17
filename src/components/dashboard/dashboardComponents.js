import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
// import { FaHeartbeat, FaBaby, FaComments, FaSyringe } from "rea  ct-icons/fa";
export const Dashboard = () => {
  return (
    <>
      <Container fluid className="mt-3">
        <Row className="mb-4">
          <Col md={6}>
            <Card
              className="text-center bg-danger text-white shadow-lg rounded"
              style={{ height: "100%" }}
            >
              <Card.Body>
                <h4>
                  <i className="bi bi-clock me-2"></i> Jam Operasional
                </h4>
                <p>
                  <b>Setiap Hari</b>
                </p>
                <p>
                  <b>08:00 - 21:00</b>
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card
              className="text-center bg-success text-white shadow-lg rounded"
              style={{ height: "100%" }}
            >
              <Card.Body>
                <h4>
                  <i className="bi bi-signpost-2-fill me-2"></i> Alamat
                </h4>
                <p>
                  <b>
                    Jl. Haji Kamil, Kelurahan Wijaya Pura, Kecamatan Jambi
                    Selatan, Kota Jambi.
                  </b>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Card className="shadow-lg border-0 rounded">
              <Card.Body>
                <h3 className="text-primary mb-4 text-center">Layanan Kami</h3>
                <Row>
                  <Col md={6}>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex align-items-center">
                        <i
                          className="bi bi-heart-pulse-fill me-3 text-danger"
                          style={{ fontSize: "1.2rem" }}
                        ></i>
                        <b>Cek Kesehatan</b>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center">
                        <i
                          className="bi bi-patch-check-fill me-3 text-success"
                          style={{ fontSize: "1.2rem" }}
                        ></i>
                        <b>Periksa Kandungan</b>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center">
                        <i
                          className="bi bi-house-fill me-3 text-success"
                          style={{ fontSize: "1.2rem" }}
                        ></i>
                        <b>Persalinan</b>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col md={6}>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex align-items-center">
                        <i
                          className="bi bi-chat-dots-fill me-3 text-info"
                          style={{ fontSize: "1.2rem" }}
                        ></i>
                        <b>Konsultasi Kesehatan</b>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center">
                        <i
                          className="bi bi-capsule me-3 text-warning"
                          style={{ fontSize: "1.2rem" }}
                        ></i>
                        <b>Suntik KB</b>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center">
                        <i
                          className="bi bi-patch-check-fill me-3 text-success"
                          style={{ fontSize: "1.2rem" }}
                        ></i>
                        <b>Imunisasi</b>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body className="text-center"> 
                <h4 className="text-primary">Contact</h4>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex align-items-center">
                    <i
                      className="bi bi-whatsapp me-3 text-success"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    <b>Whatsapp : +6283174663345</b>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <i
                      className="bi bi-envelope me-3 text-success"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    <b>Email : owner@gmail.com</b>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
