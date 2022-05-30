
import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import UserContext from "../contexts/UserContext";
import axios from "axios";

import Loading from './Loading';

function HabitCreator({
    isHabitCreatorVisible,
    setIsHabitCreatorVisible,
    reload,
    setReload
    }){ 

    const [name, setName] = useState("");
    const [days, setDays] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const token = localStorage.getItem("token")


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
          setName("")
          setDays([])
          console.log(res.data);
          setIsHabitCreatorVisible(false)
          setReload(!reload);
        });
    
        promise.catch((res) => {
          setIsLoad(false)
    
          console.log(res.data);
          alert("Erro inesperado")
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
              <Texto>
                <p>Entrar</p>
              </Texto>
          )
        }
    
      }

      
    return (
    <HabitCreatorStyle isHabitCreatorVisible={isHabitCreatorVisible}>
        <form onSubmit={post}>
            <div>
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
            <Buttona disabled={isLoad} 
            onClick={()=>{setIsHabitCreatorVisible(false)}}>
                Cancelar
            </Buttona> 
            <ButtonSubmit type="submit" disabled={isLoad}>
            {callLoading}
            </ButtonSubmit>
        </form>

    </HabitCreatorStyle>
        );
    
}

export default HabitCreator;


{/* 

    <div>
        <button type="submit" disabled={isLoad} >{callLoading}</button>
    </div>

*/}





const HabitCreatorStyle = styled.div`
   
    padding: 18px 0 23px 0;
    margin-top: 20px;   
    width: 100%;
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    position: relative;

    display: ${props => props.isHabitCreatorVisible ? "flex" : "none"};
    flex-direction: column;
    align-items: center;

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

  }


    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;

        color: #666666;
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

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 4px 0 0;

p {
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 26px;

    color: ${props => props.isSelected ? 
        "#FFFFFF;" : 
        "#DBDBDB;"};
}
`;


const Contain = styled.div`
   
    margin: 8px 0 0 0 ;
    width: 220px;
    height: 30px;
    display: flex;
    align-items: center;

`;

const Contain2 = styled.div`
   

    display: flex;
    align-items: center;

`;


const ButtonSubmit = styled.button`
   
    position: absolute;
    bottom: 20px;
    right: 20px;
    margin: 20px 0 0 0;
    width: 84px;
    height: 35px;
    border: 1px solid #52B6FF;

    
    background: #52B6FF;
    border-radius: 5px;
    text-align: center;


`;

const Texto = styled.div`
   
    p{

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    /* identical to box height */

    text-align: center;

    color: #FFFFFF;
    }


`;

const Buttona = styled.div`
   
    
    position: absolute;
    bottom: 26px;
    right: 130px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;


    text-align: center;

    color: #52B6FF;



`;