/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TurnContext, BoardContext } from '../components/contexts/gameContext';
import Header from '../components/header';

const BoardField = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-gap: 0.6rem;
  height: 70vh;
  width: 70vh;
#sunken{
  cursor: default;
  background: black;
}
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
  const [ sunkenShips, setSunkenShips ] = useState({});
  const sample = {'Nave de batalla':4,'Crucero':3,'Destructor':2,'Submarino':1};
  const axisSample = {0:'a',1:'b',2:'c',3:'d',4:'e',5:'f',6:'g',7:'h',8:'i',9:'j'};
  const axisReversed = {'a':0,'b':1,'c':2,'d':3,'e':4,'f':5,'g':6,'h':7,'i':8,'j':9};

  useEffect(()=>{
    if(turns === 0){
      setStatus('Game Over');
    }
    const keys = Object.keys(sunkenShips);
    keys.forEach(ship=>{
      if(sunkenShips[ship].size === sample[ship.slice(0,-2)]){
        sunkenShips[ship].position.posX.forEach((x,i)=>{
          const container = document.getElementsByClassName(`${x} ${sunkenShips[ship].position.posY[i]}`)[0];
          container.setAttribute('id','sunken');
          setStatus(`${ship.slice(0,-2)} hundido`)
          setSunkenShips({...sunkenShips,[ship]:{...sunkenShips[ship],size:-1}});
        });
      }
    })
    if(keys.length === 10){
      if(keys.every(ship=>sunkenShips[ship].size === -1)){
        setStatus('Ganaste!');
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[sunkenShips, turns])

  function BoxHandler(e){
    const xIndex = e.target.className[0];
    const yIndex = e.target.className[2];
    const box = board[axisReversed[xIndex]][+yIndex];
    if(!e.target.id && turns !== 0&& !(status==="Ganaste!")){
      if(box==='w'){
        e.target.setAttribute('id', 'failed');
        setStatus('Fallaste!');
      }else{
        e.target.setAttribute('id', 'colission');
          if(sunkenShips[box]){
            setSunkenShips({...sunkenShips,[box]:{'size':sunkenShips[box].size+1,'position':{'posX':[...sunkenShips[box].position.posX,xIndex],'posY':[...sunkenShips[box].position.posY,yIndex]}}});
          }else{
            setSunkenShips({...sunkenShips,[box]:{'size':1,'position':{'posX':[xIndex],'posY':[yIndex]}}});
          }
        setStatus(`Impacto en ${box.slice(0,-2)}`);
      }
      setTurns(turns-1);
    }
  }
  function saveData(e){
    e.preventDefault();
    localStorage.getItem('users')?localStorage.setItem('users',JSON.stringify([...JSON.parse(localStorage.getItem('users')),{'name':e.target.nickname.value,'turns':turnMemory-turns,'total':turnMemory,'date':new Date().constructor()}])):localStorage.setItem('users',JSON.stringify([{'name':e.target.nickname.value,'turns':turnMemory-turns,'total':turnMemory,'date':new Date().constructor()}]));
    window.location.replace('/scores')
  }
  return(
    <>
    {board?
      <> 
      <Header turns={turns} setTurns={setTurns} turnMemory={turnMemory} place='/config' name='Atrás'/>
        <Information>
          <div css={css`background:blue;`}>Agua</div>
          <div css={css`background:green;`}>Tiro fallido</div>
          <div css={css`background:red;`}>Tiro certero</div>
          <div css={css`background:black;`}>Unidad abatida</div>
        </Information>
        <Status>{status}</Status>
        <BoardField className="board">
          {board.map((element,indexX)=>element.map((item,indexY)=><Box key={`${indexX} ${indexY}`} className={`${axisSample[indexX]} ${indexY}`} onClick={(e)=>BoxHandler(e)}></Box>))}
        </BoardField>
        {(status === 'Game Over'||status==='Ganaste!') && <Information css={css`left:80%;`}>
          <Link to="/config" onClick={()=>setTurns(turnMemory)}>Volver a jugar</Link>
          <form onSubmit={(e)=>saveData(e)}>
            <input css={css`
              margin-top: 1rem;
              height: 2rem;
              border-radius: 4px;
              border: 1px solid black;
              `} type="text" name='nickname' placeholder="Nickname" required/>
            <input css={css`
              height: 2.2rem;
              border-radius: 4px;
              border: 1px solid black;
              `} type="submit" value="Guardar"/>
          </form>
          </Information>}
      </>
      :<div css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        `}><div>Intenta volviendo a configuración para iniciar un nuevo juego.</div>
        <Link to="/config" onClick={()=>setTurns(turnMemory)}>Iniciar juego</Link></div>}
    </>
  )
}