/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from '@emotion/styled'
import Header from '../components/header';

const UserCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid black;
`
const Info = styled.div`
  padding: 0.5rem;
`

export default function Scores(){
  return (
    <div css={css`
      height: 80vh;
      @media (max-height: 680px) {
        height: 65vh;
      }
      `}>
      <Header place='/config' name='Iniciar juego' name2='none'/>
      {localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')).map((score, index) =>
      <UserCard key={index}>
        <Info>{index+1}</Info>
        <Info>{score.name}</Info>
        <Info>{score.turns}/{score.total===-1?'Infinito':score.total}</Info>
        <Info>{score.date.slice(0,-29)}</Info>
        </UserCard>):<div css={css`
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          height: 100%;
          `}>Aún nadie ha completado un juego, anímate a poner tu nombre en esta lista!</div>}
    </div>
  )
}