/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Logo from "../static/images/gameLogo.png";
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
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
export default function Header({turns,setTurns,turnMemory,place,name,place2,name2}){
  return(
    <HeaderContainer>
      <img css={css`cursor: pointer;`} onClick={()=>window.location.replace('/')} height='50' src={Logo} alt='img'/>
      {name2?name2==='none'?null:<Link to={place2}>{name2}</Link>:<div>Turnos: {turns<0?'Infinitos':turns}</div>}
      <Link to={place} onClick={()=>setTurns(turnMemory)}>{name}</Link>
    </HeaderContainer>
  )
}