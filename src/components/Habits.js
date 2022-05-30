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

    
    const { userImage} = useContext(UserContext);
    const token = localStorage.getItem("token")
    const [habts, setHabts] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [isHabitCreatorVisible, setIsHabitCreatorVisible] = useState(false);
    const [isConfirDeleteVisible, setIsConfirDeleteVisible] = useState(false);
    const [idHabitDelete, setIdHabitDelete] = useState("");
    const [reload, setReload] = useState(false);

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
	}, [reload]);



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
                days= {obj.days}
                setIsConfirDeleteVisible= {setIsConfirDeleteVisible} 
                setIdHabitDelete = {setIdHabitDelete}
                />
                );

            return ([HabitsComponentes])
          }
    
      }

    function DeleteHabit () {


        if (isConfirDeleteVisible){
          return (
            <Blur isConfirDeleteVisible={isConfirDeleteVisible}>
                <Confirm>
                    <button onClick={()=>setIsConfirDeleteVisible(false)}>
                        Cancelar
                    </button>
                    <button onClick={()=>PostDeleteHabit()}>
                        Deletar
                    </button>
                </Confirm>
            </Blur>
          )
        }
        else{
          return (
              <>
              </>
          )
        }

      }

    function PostDeleteHabit () {
    
        if(idHabitDelete){


            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }

            const promise = axios.delete(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabitDelete}`,
            config
            );

            promise.then((res) => {
            console.log(res.data);
            setIsConfirDeleteVisible(false)
            setReload(!reload);
            });
        
            promise.catch((res) => {
            console.log(res.data);
            setIsConfirDeleteVisible(false)
            setReload(!reload);
            });
        }

      }

    const CallContent = CreatContent() 

    const CallDeleteHabit = DeleteHabit() 

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
            reload={reload}
            setReload={setReload}
            />
            {CallContent}
            {CallDeleteHabit}
            <Footer>
                <Link to={`/habitos`}>
                    <Buttons>Hábitos</Buttons>
                </Link>
                <Link to={`/hoje`}>
                    <Buttons>Hoje</Buttons>
                </Link>
                <Buttons>Histórico</Buttons>
            </Footer>
        </Homee>
    )
}

export default Habits;

const Homee = styled.div`

    padding: 90px 18px 0 18px;
    width: 100%;
    height: 100%;
    position: relative;
    background-color:  #F2F2F2;

    p {
        margin-top: 28px ;
    }


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
    
    width: 40px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;

    background: #52B6FF;
    border-radius: 4.63636px;
    border: 1px solid #52B6FF;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 27px;
    line-height: 34px;

    text-align: center;

    color: #FFFFFF;
`;

const Contains = styled.div` 
    
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;


    color: #52B6FF;


    h2 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 23px;
        line-height: 29px;

        color: #126BA5;

    }
`;

const Blur = styled.div` 
    
    width: 100%;
    height: 100vh;
    display: ${props => props.isConfirDeleteVisible ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0%;

    background: rgba(0, 0, 0, 0.6);

`;

const Confirm = styled.div` 
    
    width: 300px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;

    background: white;

    button {
        width: 70px;
        height: 50px;

        justify-content: center;
        align-items: center;

        background: blue;
    }

`;