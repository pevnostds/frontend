import { Col, Row, Card, Table, Form, Button, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { dataRekamMedis } from "../../store/actions/rekammedisActions";
import { dataPasiens } from "../../store/actions/pasienActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  searchDataRekam,
  deleteData,
  ModalRekamMedis,
} from "../../utils/function";
import { FormSubmit, FormEdit } from "../../utils/formRekamMedis";

export const RekamMedisComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data } = useSelector((state) => state.getRekamMedisReducer);
  const { pasiens } = useSelector((state) => state.pasienReducer);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [modalForm, setModalForm] = useState(null);
  const { formData, handleInputChange, handleSubmit } = FormSubmit();

  useEffect(() => {
    if (location.pathname.includes("/Rekam-Medis")) {
      dispatch(dataRekamMedis());
      dispatch(dataPasiens());
    }
  }, [location, dispatch]);

  useEffect(() => {
    if (data && data.length > 0) {
      setFilterData(data);
    }
  }, [data]);

  const deleteHandle = (pasienId) => {
    deleteData(pasienId, dispatch);
  };

  const openModal = (data) => {
    setModalData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  const openForm = (data) => {
    setModalForm(data);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setModalForm(null);
  };

  return (
    <>
      <Row className="mt-4 mx-3">
        <Col xs={12} md={8}>
          <Card className="shadow-lg rounded">
            <Card.Header className="bg-primary text-white text-center">
              <b>DATA REKAM MEDIS</b>
            </Card.Header>
            <Card.Body>
              {/* Form Input */}
              <div className="d-flex justify-content-between mb-4">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) =>
                    searchDataRekam(e, setSearchTerm, setFilterData, data)
                  }
                  className="mr-sm-2 w-50"
                />
              </div>

              <Table
                striped
                bordered
                hover
                responsive
                size="sm"
                variant="dark"
                className="text-center"
              >
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>NAMA PASIEN</th>
                    <th>TANGGAL</th>
                    <th>AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {filterData.length > 0 ? (
                    filterData.map((data, index) => (
                      <tr key={data.id}>
                        <td className="text-center align-middle">
                          <Badge bg="primary">{index + 1}</Badge>
                        </td>
                        <td className="text-center align-middle">
                          {data.pasien_id.nama}
                        </td>
                        <td className="text-center align-middle">
                          {new Date(data.tanggal)
                            .toISOString()
                            .substring(0, 10)}
                        </td>
                        <td className="text-center align-middle">
                          <div className="mx-3">
                            <NavLink
                              className="btn btn-warning btn-sm mx-3"
                              onClick={(e) => {
                                e.preventDefault();
                                openModal(data);
                              }}
                            >
                              <i className="bi bi-journal-check"></i>
                            </NavLink>
                            <NavLink
                              className="btn btn-success btn-sm"
                              onClick={(e) => {
                                e.preventDefault();
                                openForm(data);
                              }}
                            >
                              <i className="bi bi-pen-fill"></i>
                            </NavLink>

                            <NavLink
                              to="#"
                              onClick={() => deleteHandle(data.id)}
                              className="btn btn-danger btn-sm mx-3"
                            >
                              <i className="bi bi-trash-fill"></i>
                            </NavLink>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center align-middle">
                        Tidak ada data tersedia.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={4}>
          <Card className="shadow-lg rounded">
            <Card.Header className="bg-success text-white text-center">
              <b>TAMBAH REKAM MEDIS</b>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="pasien_id" className="mb-3">
                  <Form.Label>
                    <b>Nama Pasien</b>
                  </Form.Label>
                  <Form.Select
                    name="pasien_id"
                    value={formData.pasien_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih Pasien</option>
                    {pasiens?.map((pasien) => (
                      <option key={pasien.id} value={pasien.id}>
                        {pasien.nama}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="tanggal" className="mb-3">
                  <Form.Label>
                    <b>Tanggal</b>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="keluhan" className="mb-3">
                  <Form.Label>
                    <b>Keluhan</b>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Masukkan Keluhan"
                    name="keluhan"
                    value={formData.keluhan}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="diagnosis" className="mb-3">
                  <Form.Label>
                    <b>Diagnosis</b>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Masukkan Diagnosis"
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100">
                  Tambah Rekam Medis
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ModalRekamMedis
        showModal={showModal}
        closeModal={closeModal}
        modalData={modalData}
      />
      <FormEdit
        showForm={showForm}
        closeForm={closeForm}
        modalForm={modalForm}
        pasiens={pasiens}
      />
    </>
  );
};
