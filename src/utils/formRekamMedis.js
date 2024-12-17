import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  createRekamMedis,
  updateRekamMedis,
} from "../store/actions/rekammedisActions";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import React, { useEffect } from "react";

export const FormSubmit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pasien_id: "",
    tanggal: "",
    keluhan: "",
    diagnosis: "",
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
    const { pasien_id, tanggal, keluhan, diagnosis } = formData;
    if (!pasien_id || !tanggal || !keluhan || !diagnosis) {
      Swal.fire({
        title: "Error!",
        text: "Semua Data Harus Diisi",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const result = await dispatch(createRekamMedis(formData));
    console.log(result);
    if (result.status === "success") {
      Swal.fire({
        title: "Sukses!",
        text: result.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      setFormData({
        pasien_id: "",
        tanggal: "",
        keluhan: "",
        diagnosis: "",
      });
      navigate("/Rekam-Medis");
    } else if (result.status === "error") {
      Swal.fire({
        title: "Gagal!",
        text: result.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return { formData, handleInputChange, handleSubmit };
};

export const FormEdit = ({ showForm, closeForm, modalForm, pasiens }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pasien_id: "",
    tanggal: "",
    keluhan: "",
    diagnosis: "",
  });

  useEffect(() => {
    if (modalForm) {
      setFormData({
        pasien_id: modalForm.pasien_id.id || "",
        tanggal: modalForm.tanggal || "",
        keluhan: modalForm.keluhan || "",
        diagnosis: modalForm.diagnosis || "",
      });
    }
  }, [modalForm]);

  const ubahInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { pasien_id, tanggal, keluhan, diagnosis } = formData;

    if (!pasien_id || !tanggal || !keluhan || !diagnosis) {
      Swal.fire({
        title: "Error!",
        text: "Semua Data Harus Di Isi",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    dispatch(updateRekamMedis(modalForm?.id,formData))
      .then(() => {
        Swal.fire({
          title: "Sukses!",
          text: "Data Berhasil Diperbaharui.",
          icon: "success",
          confirmButtonText: "OK",
        });
          navigate("/Rekam-Medis");
      })
      .catch((error) => {
        Swal.fire({
          title: "Gagal!",
          text: "Terjadi Kesalahan Saat Update",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error updating:", error);
      });
    closeForm();
  };
  if (!modalForm) return null;

  return (
    <Modal show={showForm} onHide={closeForm}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h4>
            Edit Rekam Medis <b>{modalForm.pasien_id.nama}</b>
          </h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="pasien_id" className="mb-2">
            <Form.Label>
              {" "}
              <b>Nama</b>{" "}
            </Form.Label>
            <Form.Control
              as="select"
              name="pasien_id"
              value={formData.pasien_id}
              onChange={ubahInput}
              required
            >
              <option value="">Pilih Pasien</option>
              {pasiens?.map((pasien) => (
                <option key={pasien.id} value={pasien.id}>
                  {pasien.nama}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="tanggal" className="mb-2">
            <Form.Label>
              {" "}
              <b>Tanggal</b>{" "}
            </Form.Label>
            <Form.Control
              type="date"
              name="tanggal"
              value={formData.tanggal ? new Date(formData.tanggal).toISOString().split("T")[0] : ""}
              onChange={ubahInput}
              required
            />
          </Form.Group>

          <Form.Group controlId="keluhan" className="mb-2">
            <Form.Label>
              {" "}
              <b>Keluhan</b>{" "}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="keluhan"
              value={formData.keluhan}
              onChange={ubahInput}
              required
            />
          </Form.Group>

          <Form.Group controlId="diagnosis" className="mb-3">
            <Form.Label>
              {" "}
              <b>Diagnosis</b>{" "}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="diagnosis"
              value={formData.diagnosis}
              onChange={ubahInput}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Simpan
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
