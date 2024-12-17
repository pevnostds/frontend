import { Container, Card, Table, Form, Col, Row, Badge,Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { dataPasiens } from "../../store/actions/pasienActions";
import { NavLink, useLocation } from "react-router-dom";
import { searchDataPasiens, deleteDataPasiens } from "../../utils/function";


export const PasienComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pasiens, loading } = useSelector((state) => state.pasienReducer);
  console.log(pasiens);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState(pasiens);

  useEffect(() => {
    if (location.pathname.includes("/Data/Pasien")) {
      dispatch(dataPasiens());
    }
  }, [location, dispatch]);

  useEffect(() => {
    if (pasiens && pasiens.length > 0) {
      setFilterData(pasiens);
    }
  }, [pasiens]);

  const deleteHandle = (pasienId) => {
    deleteDataPasiens(pasienId, dispatch);
  };

  //   Swal.fire({
  //     title: "Apakah Anda yakin?",
  //     text: "Data pasien ini akan dihapus!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Ya, Hapus!",
  //     cancelButtonText: "Batal",
  //     reverseButtons: true,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       dispatch(deletePasien(pasienId))
  //         .then(() => {
  //           Swal.fire("Dihapus!", "Data pasien telah dihapus.", "success");
  //           dispatch(dataPasiens());
  //         })
  //         .catch((error) => {
  //           Swal.fire(
  //             "Gagal!",
  //             "Terjadi kesalahan saat menghapus data pasien.",
  //             "error"
  //           );
  //           console.error("Error deleting pasien:", error);
  //         });
  //     }
  //   });
  // };

  return (
    <>
      <Container fluid className="py-3">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading...</p>
          </div>
        ) : (
          <Container className="mt-4">
            <Card className="shadow-lg">
              <Card.Header className="bg-primary text-white text-center">
                <h4>DATA PASIEN</h4>
              </Card.Header>
              <Card.Body>
                <Form inline className="mb-4">
                  <Row>
                    <Col xs="auto" className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) =>
                          searchDataPasiens(e, setSearchTerm, setFilterData, pasiens)
                        }
                        className="mr-sm-2 w-60"
                      />
                    </Col>
                  </Row>
                </Form>
                <Table striped bordered hover responsive variant="dark" className="text-center">
                  <thead>
                    <tr>
                      <th>NO</th>
                      <th>NAMA</th>
                      <th>ALAMAT</th>
                      <th>UMUR</th>
                      <th>JENIS KELAMIN</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData.length > 0 ? (
                      filterData.map((pasien, index) => (
                        <tr key={pasien.id}>
                          <td>
                            <Badge bg="info" className="text-dark">
                              {index + 1}
                            </Badge>
                          </td>
                          <td>{pasien.nama}</td>
                          <td>{pasien.alamat}</td>
                          <td>
                            <Badge bg="warning" className="text-dark">
                              {pasien.umur}
                            </Badge>
                          </td>
                          <td>
                            <Badge
                              bg={
                                pasien.jenis_kelamin === "L" ? "primary" : "secondary"
                              }
                            >
                              {pasien.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
                            </Badge>
                          </td>
                          <td>
                            <span>
                              <NavLink
                                to={`/Edit/Pasien/${pasien.id}`}
                                className="btn btn-warning btn-sm mx-1"
                                title="Edit Pasien"
                              >
                                <i className="bi bi-pen-fill"></i>
                              </NavLink>
                              <NavLink
                                to="#"
                                onClick={() => deleteHandle(pasien.id)}
                                className="btn btn-danger btn-sm mx-1"
                                title="Delete Pasien"
                              >
                                <i className="bi bi-trash-fill"></i>
                              </NavLink>
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          <p>No data available</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Container>
        )}
      </Container>
    </>
  );
  
};
