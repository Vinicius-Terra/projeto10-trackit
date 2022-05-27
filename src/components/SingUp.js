import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import Loading from "./Loading.jsx";


function SingUP() {

  const [token, setToken] = useState("");
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
      setToken(res.data.token);
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


// {createdAt: "2022-05-26T19:43:44.032Z"
// email: "terra@terra.com"
// id: 3295
// image: "https://sm.ign.com/ign_br/screenshot/default/avatar-the-last-airbender-toph-cosplay-1259316_jby4.jpg"
// name: "terra"
// password: "terra"
// updatedAt: "2022-05-26T19:43:44.032Z"}