import React, { useState } from 'react';
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Login.css';

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: any): Promise<void> => {
    e.preventDefault();

    try {
      Swal.fire("Iniciando sesión...");
      Swal.showLoading();
      const response = await axios.post('http://localhost:4000/user/sign-in', { email, password });

      Swal.fire(response.data.msg, "", "success");
      navigate("/Home");

    } catch (error: any) {
      console.log(error.message);
      Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Ingresa tu correo"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button type="submit" className="login-btn">Iniciar Sesión</button>
        </form>
        <a className="nav-link" onClick={() => navigate("/")}>
          ¿No tienes cuenta? Regístrate
        </a>
      </div>
    </div>
  );
};

export default Login;
