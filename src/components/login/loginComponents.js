import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { useNavigate,NavLink } from "react-router-dom";
import { login, cekToken } from "../../store/actions/authActions";
import Swal from "sweetalert2";
import "./login.css"

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(login(email, password));

    if (result.success) {
      Swal.fire({
        title: "Berhasil!",
        text: result.message,
        icon: "success",
      });
      navigate("/dashboard");
    } else {
      Swal.fire({
        title: "Gagal Login!",
        text: result.message,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(cekToken(token)).then((response) => {
        if (response) {
          navigate("/Dashboard");
        }
      });
    } else {
      navigate("/Login");
    }
  }, [dispatch, navigate]);


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card login-card shadow-lg p-4">
        <div className="row">
          {/* Kolom untuk Form Login */}
          <div className="col-md-6">
          <h3 className="text-center mb-4 fw-bold">Sign in</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control input-field"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control input-field"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
                Sign In
              </button>
              </div>
          </form>
        </div>

          {/* Kolom untuk Ajakan Daftar */}
          <div className="col-md-6 text-center d-flex flex-column justify-content-center bg-success text-white rounded-right p-5">
            <h2>Halo!</h2>
            <p>Silahkan Registrasi Jika Belum Mempunyai Akun.</p>
            <NavLink to="/register" className="btn btn-outline-light btn-lg">Sign Up</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
