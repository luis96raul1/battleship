/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom';
import styled from "@emotion/styled";
import { useContext } from 'react';
import { TurnContext, BoardContext } from '../components/contexts/gameContext';
import BoardGenerate from '../components/functionalities/boardGenerator';
import Header from '../components/header';

const ConfigBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Options = styled.div`
  display: flex;
  width: 15vw;
`
const Option = styled.input`
  width: 100%;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`
export default function Config(){
  const {turns, setTurns } = useContext(TurnContext);
  const {setBoard} = useContext(BoardContext);
  const navigate = useNavigate();

  function Redirecting(e){
    e.preventDefault();
    setBoard(BoardGenerate());
    navigate('/game');
  }

  return (
    <>
      <Header place='/' name='Home' place2='/scores' name2='Puntuaciones'/>
      <ConfigBody>
        <div>Selecciona la dificultad o elije la cantidad de turnos que desees:</div>
        <Form onSubmit={(e)=>Redirecting(e)}>
          <div><input css={css`
            width: 14.5vw;
            height: 2.5vh;
            text-align: center; 
            font-size: 1.5rem;
            border-radius: 4px;
            border: 1px solid black;
            `} type='text' placeholder='cantidad de turnos' pattern="(^[1-9]\d*$|infinito)+" value={turns<=-1?'infinito' : turns} onChange={(e)=> setTurns(e.target.value)} required/></div>
          <Options> 
            <Option className={(turns>=101||turns<=-1)?'selected':''} onClick={()=>setTurns(-1)} type='button' value='Facil'/>
            <Option className={(turns>=51&&turns<=100)?'selected':''} onClick={()=>setTurns(100)} type='button' value='Medio'/>
            <Option className={(turns>=1&&turns<=50)?'selected':''} onClick={()=>setTurns(50)} type='button' value='Dificil'/>
          </Options>
          <input css={css`
              margin-top: 1.5rem;
              width: 7vw;
              height: 4vh;
              font-size: 1.5rem;
              background: linear-gradient(to bottom, #E54F1B, #9D3201);
              border: none;
              border-radius: 8px;
              color: white;
              cursor: pointer;
            `} type='submit' value='Jugar'/>
        </Form>
      </ConfigBody>
    </>
  )
}