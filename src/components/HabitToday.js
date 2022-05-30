import { useState, useEffect } from 'react';
import styled from 'styled-components';
import React from 'react'
import {  Trash } from 'react-ionicons'


function HabitToday({
    name,
    done,
    currentSequence,
    highestSequence
    }){ 



    return (
        <>
            <Habitstyle>
                <Contain>
                    <h3>{name}</h3>
                    <p>{currentSequence}</p>
                    <p>{highestSequence}</p>
                </Contain>
            </Habitstyle>
        </>
        );
    
}

export default HabitToday;

const Habitstyle = styled.div`
    width: 100%;
    height: 91px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
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


const Contain = styled.div`
   
    width: 100%;
    height: 100%;
    display: flex;

    p {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 16px;
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