import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { createPasien,dataPasiens } from "../../../store/actions/pasienActions";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

export const PasienTambah = () => {
  const decodedToken = jwtDecode(localStorage.getItem("token"));
  const userId = decodedToken?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    umur: "",
    jenis_kelamin: "",
    user_id: userId,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nama, alamat, umur, jenis_kelamin, user_id } = formData;

    if (!nama || !alamat || !umur || !jenis_kelamin || !user_id) {
      Swal.fire({
        title: "Error!",
        text: "Semua Data Harus Diisi",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (isNaN(umur) || umur <= 0) {
      Swal.fire({
        title: "Error!",
        text: "Umur harus berupa angka lebih dari 0",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const result = await dispatch(createPasien(formData));
    console.log("result",result);
    if (result.status === "201") {
      Swal.fire({
        title: "Sukses!",
        text: result.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      dispatch(dataPasiens()); 
      navigate("/Daftar/Pasien");
    }
    if (result.status === "error") {
      Swal.fire({
        title: "Gagal!",
        text: result.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  

  return (
    <Container className="mt-5">
      <Card className="bg-dark text-white shadow-lg">
        <Card.Header className="text-center">
          <h4><b>Registrasi Pasien</b></h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} sm={6}>
                <Form.Group controlId="nama">
                  <Form.Label><b>Nama Pasien</b></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    required
                    className="mb-3"
                  />
                </Form.Group>
              </Col>
  
              <Col xs={12} sm={6}>
                <Form.Group controlId="alamat">
                  <Form.Label><b>Alamat</b></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan alamat"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleInputChange}
                    required
                    className="mb-3"
                  />
                </Form.Group>
              </Col>
  
              <Col xs={12} sm={6}>
                <Form.Group controlId="jenis_kelamin">
                  <Form.Label><b>Jenis Kelamin</b></Form.Label>
                  <Form.Control
                    as="select"
                    name="jenis_kelamin"
                    value={formData.jenis_kelamin}
                    onChange={handleInputChange}
                    required
                    className="mb-3"
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="L">Laki-Laki</option>
                    <option value="P">Perempuan</option>
                  </Form.Control>
                </Form.Group>
              </Col>
  
              <Col xs={12} sm={6}>
                <Form.Group controlId="umur">
                  <Form.Label><b>Umur</b></Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Masukkan umur"
                    name="umur"
                    value={formData.umur}
                    onChange={handleInputChange}
                    required
                    className="mb-3"
                  />
                </Form.Group>
              </Col>
  
              <Form.Control
                type="hidden"
                name="user_id"
                value={formData.user_id}
              />
            </Row>
            
            <div className="d-flex justify-content-center mt-3">
              <Button variant="primary" type="submit" size="sm" className="px-5 py-2">
                Daftar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
  
};
