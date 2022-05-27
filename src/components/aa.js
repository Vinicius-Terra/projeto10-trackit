
import { useState, useEffect } from 'react';
import styled from 'styled-components';

function Habit({
    key,
    id ,
    name,
    days,
    }){ 


    return (
        <>
            <Habit>
                <h3>{name}</h3>
                {CallDays}
            </Habit>
        </>
        );
    
}

export default Day;








const Daystyle = styled.div`
   
width: 30px;
height: 30px;

background: ${props => props.primary ? "palevioletred" : "white"};
border: 1px solid #D5D5D5;
border-radius: 5px;

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