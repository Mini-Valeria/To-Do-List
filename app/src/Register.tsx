import React, { useState } from 'react';
import Swal from "sweetalert2";
import axios from 'axios';
import { useNavigate } from "react-router-dom";  
import './Login.css';  

export const Register = () => {
  const [name, setName] = useState<string>(""); 
  const [email, setEmail] = useState<string>(""); 
  const [password, setPassword] = useState<string>(""); 
  const [rol, setRol] = useState<string>("Client") ;
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRol("Client")

    try {
      Swal.fire("Registrando usuario...");
      Swal.showLoading();

      const response = await axios.post('http://localhost:4000/user/register', { name, email, password, rol });

      Swal.fire(response.data.msg, "", "success");
      navigate("/Home"); 

    } catch (error: any) {  
      console.log(error.message);
      Swal.fire('Error', error.response?.data?.msg || 'Ocurrió un error al registrar el usuario.', error);
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className='customFont'>REGISTRO</h2>
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label htmlFor="name">Nombre de usuario</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              placeholder="Ingresa tu nombre de usuario"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
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
              placeholder="Crea una contraseña"
            />
          </div>
          <button type="submit" className="login-btn">Registrar</button>
          <button type="button" className="login-btn" onClick={goToLogin}>Login</button>
        </form>
      </div>
    </div>
  )
};

export default Register;
