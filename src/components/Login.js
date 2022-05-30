
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import UserContext from "../contexts/UserContext";

import logo from "../assets/images/logo.png"
import Loading from "./Loading.jsx";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate();

  const { setUserImage} = useContext(UserContext);

  function login(event) {
    // faz o login e armazene o token no local storage

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
      localStorage.setItem("token", (res.data.token));
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
      <img src={logo} alt={"logo"}></img>
      <form onSubmit={login}>
        <div>
          <input type="email" value={email} placeholder="email"
            onChange={e => setEmail(e.target.value) } 
            required disabled={isLoad}/>
        </div>
        <div>
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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;

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
    width: 250px;
    height: 250px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  input {
    width: 303px;
    height: 45px;

    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 25px;
    color: #DBDBDB;

    margin-bottom: 6px;
  }


 button {
    width: 303px;
    height: 45px;

    background: #52B6FF;
    border-radius: 4.63636px;
    border: 1px;
    font-size: 22px;
    cursor: pointer;
    margin-bottom: 25px;
    font-family: "Righteous", cursive;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 21px;
    line-height: 26px;
    text-align: center;

    color: #FFFFFF;
  }

  button:hover {
    background-color: var(--cor-yyy);
    margin-bottom: 25px;
  }
`;
