import { Card, Container, Table } from "react-bootstrap";
import { useState } from "react";
import { laporanActions } from "../../store/actions/laporanActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export const LaporanComponent = () => {
  const [tanggalAwal, setTanggalAwal] = useState("");
  const dispatch = useDispatch();
  const { laporan} = useSelector((state) => state.getLaporanReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tanggalAwal) {
      Swal.fire({
        title: "Gagal!",
        text: "Harap Isi Tanggal",
        icon: "error",
      });
      return;
    }
    dispatch(laporanActions(tanggalAwal));
  };

  
  return (
    <>
      <Container fluid>
        <Card className="mt-4 shadow-lg border-0 bg-light rounded">
          <Card.Header className="bg-primary text-white text-center py-3 rounded-top">
            <h4 className="mb-0">
              <b>Laporan Pasien</b>
            </h4>
          </Card.Header>
          <Card.Body className="p-4">
            <div className="d-flex justify-content-center mb-4">
              <form onSubmit={handleSubmit} className="d-flex align-items-end p-3 rounded shadow-sm border">
                <div className="me-3">
                  <label htmlFor="tanggalAwal" className="form-label fw-bold">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    id="tanggalAwal"
                    value={tanggalAwal}
                    onChange={(e) => setTanggalAwal(e.target.value)}
                    className="form-control shadow-sm"
                    min="2020-01-01"
                    max="2025-12-31"
                  />
                </div>
                <button type="submit" className="btn btn-primary shadow">
                  <i className="bi bi-search me-2"></i>Cari
                </button>
              </form>
            </div>
            <Table
              striped
              bordered
              hover
              responsive
              size="sm"
              className="shadow bg-dark text-white rounded text-center"
              variant="dark"
            >
              <thead className="bg-primary text-white">
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Tanggal</th>
                  <th>Keluhan</th>
                  <th>Diagnosis</th>
                </tr>
              </thead>
              <tbody>
                {laporan && laporan.length > 0 ? (
                  laporan.map((data, index) => (
                    <tr key={index}>
                      <td className="text-white">{index + 1}</td>
                      <td className="text-white">{data.pasiens.nama}</td>
                      <td className="text-white">
                        {new Date(data.tanggal).toLocaleDateString()}
                      </td>
                      <td className="text-white">{data.keluhan}</td>
                      <td className="text-white">{data.diagnosis}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-white">
                      Tidak ada data tersedia.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
  
};
