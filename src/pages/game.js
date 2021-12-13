import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Game(){
  const [box, setBox] = useState('initial');

  return(
    <>
      <div>soy game</div>
      <div className='game-field'>
        
      </div>
      <Link to="/">Home</Link>
    </>
  )
}