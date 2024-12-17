import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../store/actions/authActions";
import Swal from "sweetalert2";
import "./register.css"

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role] = useState("user");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(role);
    e.preventDefault();
    if (password !== passwordConfirm) {
      Swal.fire({
        title: "Error",
        text: "Password dan konfirmasi password tidak cocok!",
        icon: "error",
      });
      return;
    }

    const result = await dispatch(
      register({
        username,
        email,
        password,
        passwordConfirm,
        role,
      })
    );
    console.log(result);
    if (result.success) {
      Swal.fire({
        title: "Berhasil!",
        text: result.message,
        icon: "success",
      });
      navigate("/dashboard");
    } else {
      Swal.fire({
        title: "Gagal Register!",
        text: result.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card register-card shadow-lg p-4 rounded-3">
        <h3 className="text-center mb-3 fw-bold">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control input-field"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control input-field"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control input-field"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordConfirm" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control input-field"
              id="passwordConfirm"
              placeholder="Confirm Password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>
          <input
            type="hidden"
            className="form-control"
            id="role"
            value={role}
            required
          />
          <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
            Register
          </button>
        </form>
        <p className="text-center mt-3">
          Sudah Mempunyai Akun ?<NavLink to="/login" className="text-primary fw-semibold">Login</NavLink>
        </p>
      </div>
    </div>
  );
};
