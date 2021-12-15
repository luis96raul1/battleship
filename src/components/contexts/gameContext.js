import { createContext, useState } from "react";

export const TurnContext = createContext();
export const BoardContext = createContext();

export const GameProvider = ({ children }) => {
  const [turns, setTurns] = useState('cantidad de turnos');
  const [board, setBoard] = useState();

  return(
    <BoardContext.Provider value={{board, setBoard}}>
      <TurnContext.Provider value={{ turns, setTurns}}>
        {children}
      </TurnContext.Provider>
    </BoardContext.Provider>
  )
}