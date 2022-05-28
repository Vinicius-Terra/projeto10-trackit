import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import UserContext from "../contexts/UserContext";
import Loading from "./Loading.jsx";
import Habit from "./Habit"
import HabitCreator from "./HabitCreator";

function Habits() {

    
    const { userImage, token} = useContext(UserContext);
    const [habts, setHabts] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [isHabitCreatorVisible, setIsHabitCreatorVisible] = useState(false);

    console.log(isHabitCreatorVisible)
    useEffect(() => {
        
        setIsLoad(true);
        const config = {
            headers: {
                "Authorization": `Bearer ${token}` 
            }
        }
        
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

        
		request.then(res => {
            console.log(res.data);
            setHabts(res.data);
            setIsLoad(false);
		});

        request.catch(res => {
            setIsLoad(false);
            console.log(res.data);
            alert("algo de errado");
		});
	}, []);


    

    function CreatContent () {


        if (isLoad){
          return (
            <Loading/>
          )
        }
        else if (habts.length === 0){
          return (
            <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
          )
        }
        else if (habts.length > 0){
            
            let HabitsComponentes = habts.map((obj, index) =>  
                <Habit 
                key={index} 
                id = {obj.id}
                name= {obj.name}
                days= {obj.days} />
                );

            return ([HabitsComponentes])
          }
    
      }


    const CallContent = CreatContent() 


    return (
        <Homee>
            <Header>
            <h1>TrackIt</h1>
            <img src={userImage} alt={userImage}></img>
            </Header>
            <Contains>
                <h2>Meus hábitos</h2> 
                <Buttons onClick={()=>setIsHabitCreatorVisible(true)}>+</Buttons>
            </Contains>
            <HabitCreator 
            isHabitCreatorVisible={isHabitCreatorVisible}
            setIsHabitCreatorVisible={setIsHabitCreatorVisible}
            />
            {CallContent}
            <Footer>
                <Buttons>Hábitos</Buttons>
                <Buttons>Hoje</Buttons>
                <Buttons>Histórico</Buttons>
            </Footer>
        </Homee>
    )
}

export default Habits;

const Homee = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color:  #E5E5E5;


`;
const Footer = styled.div`
    
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    z-index: 1;
    width: 100%;
    height: 70px;
    position: fixed;

    display: flex;
    justify-content: space-around;
    align-items: center;

    h1 {  font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        line-height: 49px;


        color: #FFFFFF;
} 



`;

const Header = styled.div`
    
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    width: 100%;
    height: 70px;
    position: fixed;

    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    display: flex;
    justify-content: space-around;
    align-items: center;

    h1 {  font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        line-height: 49px;


        color: #FFFFFF;
} 


    img {  
        width: 51px;
        height: 51px;
        object-fit: cover;

        border-radius: 98.5px;

    } 

`;

const Buttons = styled.button` 
    
    width: 68px;
    height: 22px;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    text-align: center;


    color: #52B6FF;

    button:hover {
    background-color: var(--cor-yyy);
    margin-bottom: 30px;
  }
`;

const Contains = styled.div` 
    
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;


    color: #52B6FF;

`;