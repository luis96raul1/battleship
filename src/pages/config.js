import { Link } from 'react-router-dom';

export default function config(){
  return (
    <>
      <div>soy configuracion</div>
      <Link to="/game">Iniciar partida</Link>
      <Link to ="/">Home</Link>
    </>
  )
}