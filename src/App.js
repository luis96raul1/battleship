/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './components/contexts/gameContext';

import Title from './pages/title';
import Config from './pages/config';
import Game from './pages/game';
import Scores from './pages/scores';

const cssGlobal = css`
  a {
    font-size: 1.5rem;
    text-decoration: none;
    color: #fff;
    background: gray;
    padding: 0.5rem;
    border-radius: 8px;
    margin-top: 3rem;
    &:hover{
      box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.5);
      cursor: pointer;
      background: linear-gradient(to bottom, #E54F1B, #9D3201);
    }
  }
  .selected{
      box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.5);
      cursor: pointer;
      background: linear-gradient(to bottom, #E54F1B, #9D3201);
    }
  body { 
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center; 
    margin: 0;
    align-items: center;
    height: 100vh;
   }
`

function App() {
  return (
    <GameProvider>
      <Global styles={cssGlobal}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Title/>}/>
          <Route path="/config" element={<Config/>}/>
          <Route path="/game" element={<Game/>}/>
          <Route path="/scores" element={<Scores/>}/>
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;
