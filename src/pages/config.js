import { Link, useNavigate } from 'react-router-dom';
import styled from "@emotion/styled";
import { useContext } from 'react';
import { TurnContext, BoardContext } from '../components/contexts/gameContext';
import BoardGenerate from '../components/functionalities/boardGenerator';

const ConfigBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    <ConfigBody>
      <div>Selecciona la dificultad o elije la cantidad de turnos que desees:</div>
      <form onSubmit={(e)=>Redirecting(e)} >
        <div><input type='text' pattern="([0-9]|infinito)+" value={turns<=-1?'infinito' : turns} onChange={(e)=> setTurns(e.target.value)} required/></div>
        <div> 
          <input className={(turns>=101||turns<=-1)?'selected':''} onClick={()=>setTurns(-1)} type='button' value='Facil'/>
          <input className={(turns>=51&&turns<=100)?'selected':''} onClick={()=>setTurns(100)} type='button' value='Medio'/>
          <input className={(turns>=1&&turns<=50)?'selected':''} onClick={()=>setTurns(50)} type='button' value='Dificil'/>
        </div>
        <input type='submit' value='Jugar'/>
      </form>
      <Link to ="/">Home</Link>
    </ConfigBody>
  )
}