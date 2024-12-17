import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  dataPasienById,
  updatePasien,
} from "../../../store/actions/pasienActions";
import { useParams,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const PasienEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pasienData = useSelector((state) => state.pasienReducer.pasiens);
  const error = useSelector((state) => state.pasienReducer.error);

  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    umur: "",
    jenis_kelamin: "",
    user_id: "",
  });

  useEffect(() => {
    dispatch(dataPasienById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (pasienData) {
      setFormData({
        nama: pasienData.nama || "",
        alamat: pasienData.alamat || "",
        umur: pasienData.umur || "",
        jenis_kelamin: pasienData.jenis_kelamin || "",
        user_id: pasienData.user?.id || ""
      });
    }
  }, [pasienData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nama, alamat, umur, jenis_kelamin, user_id } = formData;
  
    // Validasi jika ada field yang kosong
    if (!nama || !alamat || !umur || !jenis_kelamin || !user_id) {
      Swal.fire({
        title: "Error!",
        text: "Semua Data Harus Di Isi",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }
  

    dispatch(updatePasien(id, formData))
      .then(() => {
        Swal.fire({
          title: "Sukses!",
          text: "Data pasien berhasil diperbarui.",
          icon: "success",
          confirmButtonText: "OK"
        });
        navigate("/Data/Pasien"); 
      })
      .catch((error) => {
        Swal.fire({
          title: "Gagal!",
          text: "Terjadi kesalahan saat mengupdate data pasien.",
          icon: "error",
          confirmButtonText: "OK"
        });
        console.error("Error updating pasien:", error);
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container className="mt-5">
      <Card className="bg-dark text-white shadow-lg">
        <Card.Header className="text-center">
          <h4><b>Edit Pasien</b></h4>
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
                    className="text-center mb-3"
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
                    className="text-center mb-3"
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
                    className="text-center mb-3"
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
                    className="text-center mb-3"
                  />
                </Form.Group>
              </Col>
  
              <Form.Control
                type="hidden"
                name="user_id"
                value={formData.user_id}
                onChange={handleInputChange}
              />
            </Row>
  
            <div className="d-flex justify-content-center mt-4">
              <Button variant="primary" type="submit" size="sm" className="px-5 py-2">
                Update Pasien
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
  
};
