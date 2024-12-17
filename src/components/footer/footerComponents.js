import { Container, Row, Col } from "react-bootstrap";

export const FooterComponent = () => {
  return (
    <>
      <footer className="bg-dark text-white py-3 mt-2">
        <Container>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={6} className="text-center text-md-start">
              <h5 className="mb-3">About Us</h5>
              <p>
                Buka Setiap Hari Dari Jam 08:00 - 21:00 ,Lokasi Jl. Haji Kamil,
                Kelurahan Wijaya Pura, Kecamatan Jambi Selatan, Kota Jambi.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-start">
              <h5 className="mb-3">Follow Us</h5>
              <div>
                <a href="https://whatsapp.com" className="text-white me-3">
                  <i className="bi bi-whatsapp" style={{ fontSize: "30px" }} />
                </a>
                <a href="https://instagram.com" className="text-white me-3">
                  <i className="bi bi-instagram" style={{ fontSize: "30px" }} />
                </a>
              </div>
            </Col>
          </Row>

          <hr className="my-4 border-light" />

          <Row className="d-flex justify-content-center">
            <Col className="text-center">
              <p>&copy; 2024 Your Company. All Rights Reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};
