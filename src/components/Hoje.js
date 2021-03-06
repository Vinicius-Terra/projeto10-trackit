
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "dayjs/locale/pt-br";

import UserContext from "../contexts/UserContext";
import Loading from "./Loading.jsx";
import HabitToday from "./HabitToday"

function Hoje() {

    
    const userImage = localStorage.getItem("userImage")
    const token = localStorage.getItem("token")
    const [habts, setHabts] = useState([]);
    const [isLoad, setIsLoad] = useState(false);
    const [dailyProgress, setDailyProgress] = useState(0);

    
    const currentDate = dayjs().locale('pt-br').format("dddd, D/MM");

    console.log(token)

    useEffect(() => {
        
        setIsLoad(true);

        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"

        const config = {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        }
        
        const request = axios.get(url, config);

        
		request.then(res => {
            console.log(res);
            setHabts(res.data);
            setIsLoad(false);


		});

        request.catch(res => {
            setIsLoad(false);
            console.log(res.data);
            alert("algo de errado");
		});
	}, []);

    useEffect(() => {
        daylyProgresSeter ()
        HabitsPorcent ()
    }, [habts]);

    function CreatContent () {

        console.log(habts.length)
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
                <HabitToday 
                key={index} 
                id = {obj.id}
                name= {obj.name}
                done= {obj.done}
                currentSequence= {obj.currentSequence} 
                highestSequence = {obj.highestSequence}
                changeHabitStaus={() => changeHabitStaus(index)}
                />
                );

            return (                
            <UserDailyHabitsList>
                {HabitsComponentes}
            </UserDailyHabitsList>)
          }
    
      }

      function HabitsPorcent () {

        console.log(dailyProgress)


        if (dailyProgress === 0 ) {
            return (
                <TopBar>
                    <p>Nenhum hábito concluído ainda</p>
                </TopBar>
        )} else {
            return (
                <TopBar progress={true}>
                    <p>{dailyProgress}% dos hábitos concluídos</p>
                </TopBar>
        )}

      }



      function daylyProgresSeter () {

        
        const finishedHabitsCounter = habts.filter((habit) => habit.done === true).length;
        const progress = Math.ceil(finishedHabitsCounter / habts.length * 100);

        setDailyProgress(progress);

      }

      function changeHabitStaus(index) {
        const newDailyHabits = [...habts];
        const habit = newDailyHabits[index];

        if (habit.done) {
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`;
            axios.post(URL, {}, {
                headers: {Authorization: `Bearer ${token}`}
            })
            habit.currentSequence -= 1;
        } else {
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`;
            axios.post(URL, {}, {
                headers: {Authorization: `Bearer ${token}`}
            })
            habit.currentSequence += 1;
        }

        habit.done = !habit.done;

        setHabts(newDailyHabits);
        daylyProgresSeter(newDailyHabits);
        
    }



const CallContent = CreatContent() 
const TodayHabitsPorcent = HabitsPorcent()



return (
    <Homee>
        <Header>
        <h1>TrackIt</h1>
        <img src={userImage} alt={userImage}></img>
        </Header>
        <Contains>
            <h2>{currentDate}</h2> 
            <h2>{TodayHabitsPorcent}</h2> 
        </Contains>
        <Contains2>
            {CallContent}
        </Contains2>
        <Footer>
            <BoxLink to={`/habitos`}>
                Hábitos
            </BoxLink>
            <Link to={`/Hoje`}>
            <DailyProgressbar>
            <CircularProgressbar background={true} backgroundPadding={6} value={dailyProgress} text="Hoje"/>
            </DailyProgressbar>
            </Link>
            <BoxLink to={`/historico`}>
                Histórico
            </BoxLink>
        </Footer>
    </Homee>
)
}

export default Hoje;

const Homee = styled.div`
    width: 100%;
    height: 100px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 150px 0 0 0;

    h3 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;

        color: #666666;
        margin: 0 0 8px 0;
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
const Contains2 = styled.div` 

margin-top: 50px;
width: 100%;
height: 100%;
display: flex;
justify-content: space-between;


color: #52B6FF;

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

const TopBar = styled.div `
    width: 100%;
    height: 200px;
    margin-bottom: 80px;
    font-family: 'Lexend Deca', sans-serif;
    margin-bottom:50px;

    h2 {
        font-size: 22px;
        line-height: 30px;
        color: #126BA5;
        
    }
    p {
        font-size: 18px;
        line-height: 22px;
        color: ${props => props.progress ? "#8FC549" : "#BABABA" };
        margin-bottom:50px;
    }
`;
const UserDailyHabitsList = styled.div `
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 26px;
    width: 100%;
`;
const DailyProgressbar = styled.div `
    margin-bottom: 40px;
    height: 90px;
    width: 90px;
    .CircularProgressbar-path {
        stroke: #FFFFFF;
    }
    .CircularProgressbar-trail {
        stroke: #52B6FF;
    }
    .CircularProgressbar-text {
        fill: #FFFFFF;
    }
    .CircularProgressbar-background {
        fill: #52B6FF;
    }
`;

const BoxLink = styled(Link) `
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    text-decoration: none;
    color: #52B6FF;
`