
import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import UserContext from "../contexts/UserContext";
import axios from "axios";

import Loading from './Loading';

function HabitCreator({
    isHabitCreatorVisible,
    setIsHabitCreatorVisible ,
    }){ 

    const [name, setName] = useState("");
    const [days, setDays] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const {token} = useContext(UserContext);


    function post(event) {
    
        event.preventDefault();
    
        setIsLoad(true)
    
        if(days.length === 0){
            setIsLoad(false)
            alert("selecione ao menos um dia")
            return
        }

        const body = {
            name,
            days
        }

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.post(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
          body, config
        );

        promise.then((res) => {
          setIsLoad(false)
          console.log(res.data);
          setIsHabitCreatorVisible(false)
        });
    
        promise.catch((res) => {
          setIsLoad(false)
    
          console.log(res.data);
          alert("Login e/ou Senha incorretos")
        });
      }

      function ToogleMe(num) {

        const isSelected = days.some((ele) => ele === num);

        if (isSelected) {
            let newDays = days.filter((ele)=> ele != num)
            console.log(newDays)
            setDays(newDays)
        }
        else {
            setDays([...days,num])
        }

      }

      const callLoading = Load()

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

      
    return (
    <HabitCreatorStyle isHabitCreatorVisible={isHabitCreatorVisible}>
        <form onSubmit={post}>
            <div>
                <h5>Nome do comprador:</h5>
                <input type="text" value={name} placeholder="nome do hábito"
                onChange={e => setName(e.target.value) } 
                required disabled={isLoad}/>
            </div>
            <Contain>
                <Day isSelected = {days.some((ele) => ele === 1)} 
                    onClick={()=>ToogleMe(1)} disabled={isLoad}>
                    <p>D</p>
                </Day>
                <Day isSelected = {days.some((ele) => ele === 2)} 
                    onClick={()=>ToogleMe(2)} disabled={isLoad}>
                    <p>S</p>
                </Day>
                <Day isSelected = {days.some((ele) => ele === 3)} 
                    onClick={()=>ToogleMe(3)} disabled={isLoad}>
                    <p>T</p>
                </Day>
                <Day isSelected = {days.some((ele) => ele === 4)} 
                    onClick={()=>ToogleMe(4)} disabled={isLoad}>
                    <p>Q</p>
                </Day>
                <Day isSelected = {days.some((ele) => ele === 5)} 
                    onClick={()=>ToogleMe(5)} disabled={isLoad}>
                    <p>Q</p>
                </Day>
                <Day isSelected = {days.some((ele) => ele === 6)} 
                    onClick={()=>ToogleMe(6)} disabled={isLoad}>
                    <p>S</p>
                </Day>
                <Day isSelected = {days.some((ele) => ele === 7)} 
                    onClick={()=>ToogleMe(7)} disabled={isLoad}>
                    <p>S</p>
                </Day>
            </Contain>
            <div>
                <button disabled={isLoad} 
                onClick={()=>{setIsHabitCreatorVisible(false)}}>
                    das
                </button>
                <button type="submit" disabled={isLoad} >{callLoading}</button>
            </div>
        </form>
    </HabitCreatorStyle>
        );
    
}

export default HabitCreator;








const HabitCreatorStyle = styled.div`
   
width: 100%;
height: 180px;
background: #FFFFFF;
border-radius: 5px;

display: ${props => props.isHabitCreatorVisible ? "flex" : "none"};
flex-direction: column;


p {
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;

    color: #666666;
    margin: 0 0 8px 0;
}
`;

const Day = styled.div`
   
    width: 30px;
    height: 30px;

    background: ${props => props.isSelected ? 
        "#CFCFCF" : 
        "white"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;

p {
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;

    color: black;
    margin: 0 0 8px 0;
}
`;


const Contain = styled.div`
   
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

`;