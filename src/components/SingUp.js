import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import logo from "../assets/images/logo.png"
import Loading from "./Loading.jsx";


function SingUP() {

  const token = localStorage.getItem("token")
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
	email: "",
	name: "",
	image: "",
	password: ""
});


  function Sing(event) {

    event.preventDefault();

    setIsLoad(true)

    const body = { ...form,
    };

    console.log(body)
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      body
    );
    promise.then((res) => {
      alert("sucesso :3")  
      setIsLoad(false)
      console.log(res.data);
      navigate('/');

    });

    promise.catch((res) => {
      setIsLoad(false)
      console.log(res.data);
      alert("Dados Invalidos, tente novamente")
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
        <p>Cadastrar</p>
      )
    }

  }

  function handleForm (e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    }) 
  }

  const callLoading = Load()

  return (
    <Homee>
      <img src={logo} alt={"logo"}></img>
      <form onSubmit={Sing}>
        <div>
          <input type="email" placeholder="email"
            name="email" disabled={isLoad}
            onChange={handleForm}  value={form.email} required />
        </div>
        <div>
          <input type="text" placeholder="senha"
          name="password" disabled={isLoad}
          onChange={handleForm}  value={form.password} required/>
        </div>
        <div>
          <input type="url" placeholder="image"
          name="image" disabled={isLoad}
          onChange={handleForm}  value={form.image} required/>
        </div>
        <div>
          <input type="text" placeholder="nome"
          name="name" disabled={isLoad}
          onChange={handleForm}  value={form.name} required/>
        </div>
        <div>
          <button type="submit" disabled={isLoad}>{callLoading}</button>
        </div>
      </form>
      <Link to="/"><h2>Já tem uma conta? Faça login!</h2></Link>
    </Homee>
  )
}

export default SingUP;

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

// {createdAt: "2022-05-26T19:43:44.032Z"
// email: "terra@terra.com"
// id: 3295
// image: "https://sm.ign.com/ign_br/screenshot/default/avatar-the-last-airbender-toph-cosplay-1259316_jby4.jpg"
// name: "terra"
// password: "terra"
// updatedAt: "2022-05-26T19:43:44.032Z"}