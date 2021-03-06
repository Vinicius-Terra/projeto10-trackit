import { useState, useEffect } from 'react';
import styled from 'styled-components';
import React from 'react'
import { render } from 'react-dom'
import {  Trash } from 'react-ionicons'


function Habit({
    id ,
    name,
    days,
    setIsConfirDeleteVisible,
    setIdHabitDelete
    }){ 


    function ToDelete () {

        setIdHabitDelete(id)
        setIsConfirDeleteVisible(true)
    }

    function Days () {

        const weeck = [0,1,2,3,4,5,6]
        const Letters = ["D","S","T","Q","Q",'S',"S"]

        let DaysComponentes = weeck.map((num, index) =>  
                <Day key={index} isSelected = {days.some((ele) => ele === num)} >
                    <p>{Letters[num]}</p>

                </Day>
        );

        return (<Contain>{[DaysComponentes]}</Contain>)

    }

    const CallDays = Days()

    return (
        <>
            <Habitstyle>
                <Contain>
                    <h3>{name}</h3>
                    <Trash
                    color={'#00000'}
                    height="30px"
                    width="20px"
                    onClick={()=>ToDelete()}
                    />
                </Contain>
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
    justify-content: center;
    margin: 10px 0 0 0;

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