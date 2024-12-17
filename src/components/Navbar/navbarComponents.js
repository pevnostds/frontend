import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { cekToken } from "../../store/actions/authActions";

export const NavbarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(cekToken(token));
    }
  }, [dispatch, token, navigate]);
  const { user } = useSelector((state) => state.cekTokenReducer);
  const username = user ? user.username : null;
  const role = user ? user.role : null;

  const logout = () => {
    Swal.fire({
      title: "Anda Yakin Ingin Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire({
          title: "Logged out!",
          text: "Anda Berhasil Logout.",
          icon: "success",
        }).then(() => {
          navigate("/Login");
        });
      }
    });
  };

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="sb-topnav navbar navbar-expand-lg navbar-dark shadow-sm"
    >
      <Container>
        {/* Logo atau Brand */}
        <Navbar.Brand href="/Dashboard" className="d-flex align-items-center">
          <i
            className="bi bi-flower1 me-2 text-info"
            style={{ fontSize: "1.5rem" }}
          ></i>
          <span className="fw-bold text-uppercase">Bidan Neng</span>
        </Navbar.Brand>

        {/* Toggle Button untuk Mobile View */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Links di Navbar */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="/Dashboard"
              className={({ isActive }) =>
                isActive ? "nav-link text-light active" : "nav-link text-light"
              }
            >
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </NavLink>

            {role === "user" && (
              <>
                <NavLink
                  to="/Daftar/Pasien"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-light active"
                      : "nav-link text-light"
                  }
                >
                  <i className="bi bi-clipboard-check me-2"></i> Daftar Pasien
                </NavLink>
                <NavLink
                  to="/Riwayat"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-light active"
                      : "nav-link text-light"
                  }
                >
                  <i className="bi bi-clock-history me-2"></i> Riwayat
                </NavLink>
              </>
            )}

            {role === "admin" && (
              <>
                <NavLink
                  to="/Data/Pasien"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-light active"
                      : "nav-link text-light"
                  }
                >
                  <i className="bi bi-file-earmark-person me-2"></i> Data Pasien
                </NavLink>
                <NavLink
                  to="/Rekam-Medis"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-light active"
                      : "nav-link text-light"
                  }
                >
                  <i className="bi bi-folder2-open me-2"></i> Rekam Medis
                </NavLink>
                <NavLink
                  to="/Laporan"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-light active"
                      : "nav-link text-light"
                  }
                >
                  <i className="bi bi-bar-chart-line me-2"></i> Laporan
                </NavLink>
              </>
            )}
          </Nav>

          <Nav className="ms-auto d-flex align-items-center">
            <span className="text-light me-3 d-flex align-items-center">
              <i
                className="bi bi-person-circle me-2 text-warning"
                style={{ fontSize: "1.5rem" }}
              ></i>
              <span className="fw-semibold">{username}</span>
            </span>

            <NavDropdown
              id="navbarDropdown"
              align="end"
              menuVariant="dark"
              title={
                <i
                  className="bi bi-three-dots-vertical text-light"
                  style={{ fontSize: "1.2rem", cursor: "pointer" }}
                ></i>
              }
            >
              <NavDropdown.Item
                onClick={logout}
                className="d-flex align-items-center text-danger"
              >
                <i
                  className="bi bi-box-arrow-right me-2"
                  style={{ fontSize: "1rem" }}
                ></i>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
