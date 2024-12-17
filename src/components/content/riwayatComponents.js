import React, { useEffect } from "react";
import { Table, Card,Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cekToken } from "../../store/actions/authActions";
import {
  dataRekamMedisByUser,
  dataRekamMedisById,
} from "../../store/actions/rekammedisActions";
import { useNavigate } from "react-router-dom";
export const RiwayatComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate;
  const token = localStorage.getItem("token");
  const { user } = useSelector((state) => state.cekTokenReducer);
  const { dataRekam } = useSelector(
    (state) => state.getRekamMedisByUserReducer
  );
  const { data } = useSelector((state) => state.getRekamMedisReducer);
  const id = user ? user.id : null;
  useEffect(() => {
    if (token) {
      dispatch(cekToken(token));
    }
  }, [dispatch, token, navigate]);

  useEffect(() => {
    if (id) {
      dispatch(dataRekamMedisByUser(id));
    }
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (dataRekam?.data?.id) {
      dispatch(dataRekamMedisById(dataRekam.data.id));
    }
  }, [dispatch, dataRekam]);

  const dataRekamMedis = Array.isArray(data?.data) ? data.data : [];
  console.log(dataRekamMedis);

  return (
    <>
      <Card className="mx-3 mt-4 shadow-lg rounded">
        <Card.Header className="bg-dark text-white text-center">
          <h4><b>Riwayat Rekam Medis</b></h4>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {!dataRekamMedis || dataRekamMedis.length === 0 ? (
              <div className="text-center">
                <h3 className="text-muted">Data Rekam Medis Anda Kosong</h3>
                <p className="text-secondary">Belum ada rekam medis yang tercatat.</p>
              </div>
            ) : (
              <Table striped variant="dark" size="sm" responsive className="text-center">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Pasien</th>
                    <th>Tanggal</th>
                    <th>Keluhan</th>
                    <th>Diagnosis</th>
                  </tr>
                </thead>
                <tbody>
                  {dataRekamMedis.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        <Badge bg="info" className="text-dark">
                          {index + 1}
                        </Badge>
                      </td>
                      <td>{item.pasiens.nama}</td>
                      <td>{new Date(item.tanggal).toLocaleDateString()}</td>
                      <td>{item.keluhan}</td>
                      <td>{item.diagnosis}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
  
};
