// DeleteHandler.js
import Swal from "sweetalert2";
import {
  deleteRekamMedis,
  dataRekamMedis,
} from "../store/actions/rekammedisActions";
import {
  dataPasiens,
  deletePasien
} from "../store/actions/pasienActions";
import { Button, Modal } from "react-bootstrap";

export const deleteData = (dataId, dispatch) => {
  Swal.fire({
    title: "Apakah Anda yakin?",
    text: "Data ini akan dihapus!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, Hapus!",
    cancelButtonText: "Batal",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(deleteRekamMedis(dataId))
        .then(() => {
          Swal.fire("Dihapus!", "Data telah dihapus.", "success");
         dispatch(dataRekamMedis())
        })
        .catch((error) => {
          Swal.fire(
            "Gagal!",
            "Terjadi kesalahan saat menghapus data.",
            "error"
          );
          console.error("Error:", error);
        });
    }
  });
};
export const deleteDataPasiens = (dataId, dispatch,navigate) => {
  Swal.fire({
    title: "Apakah Anda yakin?",
    text: "Data ini akan dihapus!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, Hapus!",
    cancelButtonText: "Batal",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(deletePasien(dataId))
        .then(() => {
          Swal.fire("Dihapus!", "Data telah dihapus.", "success");
         dispatch(dataPasiens())
        })
        .catch((error) => {
          Swal.fire(
            "Gagal!",
            "Terjadi kesalahan saat menghapus data.",
            "error"
          );
          console.error("Error:", error);
        });
    }
  });
};

export const searchDataPasiens = (e, setSearchTerm, setFilterData, data) => {
  const term = e.target.value;
  setSearchTerm(term);
  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(term.toLowerCase())
  );
  setFilterData(filteredData);
};

export const searchDataRekam = (e, setSearchTerm, setFilterData, data) => {
  const term = e.target.value;
  setSearchTerm(term);
  const filteredData = data.filter((item) =>
    item.pasien_id.nama.toLowerCase().includes(term.toLowerCase())
  );
  setFilterData(filteredData);
};

export const ModalRekamMedis = ({ showModal, closeModal, modalData }) =>{
  if (!modalData) return null;

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h4>
            Detail Rekam Medis <b>{modalData.pasien_id.nama}</b>{" "}
          </h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Nama Pasien:</strong> {modalData.pasien_id.nama}
        </p>
        <p>
          <strong>Tanggal:</strong> {new Date(modalData.tanggal)
                            .toISOString()
                            .substring(0, 10)}
        </p>
        <p>
          <strong>Keluhan:</strong> {modalData.keluhan}
        </p>
        <p>
          <strong>Diagnosis:</strong> {modalData.diagnosis}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
