import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Title from './pages/title';
import Config from './pages/config';
import Game from './pages/game';
import PostGame from './pages/postGame';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Title/>}/>
        <Route path="/config" element={<Config/>}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="/postGame" element={<PostGame/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
