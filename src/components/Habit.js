import { useState, useEffect } from 'react';
import styled from 'styled-components';

function Habit({
    id ,
    name,
    days,
    }){ 



    function Days () {

        const weeck = [1,2,3,4,5,6,7]
        const Letters = ["D","S","T","Q","Q",'S',"S"]

        let DaysComponentes = weeck.map((num, index) =>  
                <Day isSelected = {days.some((ele) => ele === num)} >
                    <p>{Letters[num]}</p>
                </Day>
        );

        return (<Contain>{[DaysComponentes]}</Contain>)

    }

    const CallDays = Days()

    return (
        <>
            <Habitstyle>
                <h3>{name}</h3>
                {CallDays}
            </Habitstyle>
        </>
        );
    
}

export default Habit;

const Habitstyle = styled.div`
    width: 100%;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

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

const Day = styled.div`
   
    width: 30px;
    height: 30px;

    background: ${props => props.isSelected ? 
    "--cor-selected: #CFCFCF;" : 
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