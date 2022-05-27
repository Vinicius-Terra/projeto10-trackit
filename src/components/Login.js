
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import UserContext from "../contexts/UserContext";

import Loading from "./Loading.jsx";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate();

  const { setUserImage, setToken} = useContext(UserContext);

  function login(event) {
    // faz o login e armazene o token no estado token

    event.preventDefault();

    setIsLoad(true)

    const body = {
      email,
      password
    };
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      body
    );
    promise.then((res) => {
      setIsLoad(false)
      console.log(res.data);
      setToken(res.data.token);
      setUserImage(res.data.image);
      navigate('/habitos')
    });

    promise.catch((res) => {
      setIsLoad(false)

      console.log(res.data);
      alert("Login e/ou Senha incorretos")
    });
  }

  function Load () {

    if (isLoad){
      return (
        <Loading/>
      )
    }
    else{
      return (
        <p>Entrar  </p>
      )
    }

  }

  const callLoading = Load()

  return (
    <Homee>
      <form onSubmit={login}>
        <div>
          <h5>Nome do comprador:</h5>
          <input type="email" value={email} placeholder="email"
            onChange={e => setEmail(e.target.value) } 
            required disabled={isLoad}/>
        </div>
        <div>
          <h5>CPF do comprador:</h5>
          <input type="text" value={password} placeholder="senha"
          onChange={e => setPassword(e.target.value)} 
          required disabled={isLoad}/>
        </div>
        <div>
          <button type="submit" disabled={isLoad} >{callLoading}</button>
        </div>
      </form>
      <Link to="/cadastro"><h2>Não tem uma conta? Cadastre-se!</h2></Link>
    </Homee>
  )
}

export default Login;

const Homee = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1;
  position: absolute;
  background-color: white;

  margin-bottom: 30px; 

 h1 {
  font-family: 'Playball';
  font-style: normal;
  font-weight: 400;
  font-size: 68.982px;
  line-height: 86px;

  text-align: center;

  color: #126BA5;
}

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-bottom: 10px;
  }

 button {
    width: 246px;
    height: 54px; 
    padding: 16px 22px;
    border-radius: 5px;
    color: var(--cor-fundo);
    border: 1px;
    font-size: 22px;
    cursor: pointer;
    margin-bottom: 30px;
    font-family: "Righteous", cursive;
  }

  button:hover {
    background-color: var(--cor-yyy);
    margin-bottom: 30px;
  }
`;
