import { Link } from 'react-router-dom';

export default function PostGame(){
  return (
    <>
      <div>Soy postgame</div>
      <Link to="/config">Volver a jugar</Link>
      <Link to="/">Volver al inicio</Link>
    </>
  )
}