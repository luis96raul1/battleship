/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TurnContext, BoardContext } from '../components/contexts/gameContext';
import Logo from "../static/images/gameLogo.png";

const Header = styled.div`
  background: linear-gradient(to bottom, #E54F1B, #9D3201);
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  position: fixed;
  top: 0;
  left: 0;
  color: white;
  font-size: 1.5rem;
  a {
    margin: 0;
    margin-right: 20px;
  }
`
const BoardField = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-gap: 0.6rem;
  height: 70vh;
  width: 70vh;
#failed{
  cursor: default;
  background: green;
}
#colission{
  cursor: default;
  background: red;
}
`
const Box = styled.div`
  background: blue;
  border-radius: 8px;
  cursor: pointer;
`
const Status = styled.div`
  text-align: center;
  padding: 1rem;
  font-size: 1.5rem;
`
const Information = styled.div`
  position: absolute;
  left: 3%;
  top: 30%;
  display: grid;
  grid
  height: 10%;
  color: white;
  font-size: 1.5rem;
  gap: 1rem;
  div{
    border-radius: 8px;
    padding: 0.5rem;
    text-align: center;
  }
`
export default function Game(){
  const { board } = useContext(BoardContext);
  const {turns, setTurns} = useContext(TurnContext);
  const [ status, setStatus ] = useState('');
  const [ turnMemory ] = useState(turns);
  const [ sunkenShips, setSunkenShips ] = useState(0);

  useEffect(()=>{
    if(turns === 0){
      setStatus('Game Over');
    }
    if(sunkenShips === 20){
      setStatus('Ganaste!');
    }
  },[sunkenShips,turns])

  function BoxHandler(e){
    console.log(board);
    const xIndex = e.target.className[0];
    const yIndex = e.target.className[2];
    const box = board[+xIndex][+yIndex];
    if(!e.target.id && turns !== 0){
      if(box==='w'){
        e.target.setAttribute('id', 'failed');
        setStatus('Fallaste!');
      }else{
        setSunkenShips(sunkenShips+1);
        e.target.setAttribute('id', 'colission');
        const boxArray = box.split(' ');
        boxArray.pop();
        setStatus(`Impacto en ${boxArray.length > 1 ? boxArray.join(' ') : boxArray}`);
      }
      setTurns(turns-1);
    }
  }
  return(
    <>
    <Header>
      <img css={css`cursor: pointer;`} onClick={()=>window.location.replace('/')} height='50' src={Logo} alt='img'/>
      <div>Turnos: {turns<0?'Infinitos':turns}</div>
      <Link to="/config" onClick={()=>setTurns(turnMemory)}>Atrás</Link>
    </Header>
    {board?
      <> 
        <Information>
          <div css={css`background:blue;`}>Agua</div>
          <div css={css`background:green;`}>Tiro fallido</div>
          <div css={css`background:red;`}>Tiro certero</div>
          <div css={css`background:black;`}>Unidad abatida</div>
        </Information>
        <Status>{status}</Status>
        <BoardField className="board">
          {board.map((element,indexX)=>element.map((item,indexY)=><Box key={`${indexX} ${indexY}`} className={`${indexX} ${indexY}`} onClick={(e)=>BoxHandler(e)}></Box>))}
        </BoardField>
        {(status === 'Game Over'||status==='Ganaste!') && <Information css={css`left:80%;`}>
          <Link to="/config" onClick={()=>setTurns(turnMemory)}>Volver a jugar</Link>
          <Link to="/scores">Últimos juegos</Link>
          </Information>}
      </>
      :<div>Intenta volviendo a configuración para iniciar un nuevo juego.</div>}
    </>
  )
}