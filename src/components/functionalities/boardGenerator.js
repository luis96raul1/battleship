export default function BoardGenerate(){
  function arr2d(){
    var data = [];
    for (var i = 0; i < 10; i++) {
      data[i] = [];
      for (var j = 0; j < 10; j++) {
        data[i][j] = 'w';
      }
    }
    return data;
  }
  
  const board = arr2d();
  const fleet = [{'name':"Nave de batalla",'size':4,'quantity':1},
                {'name':"Crucero",'size':3,'quantity':2},
                {'name':"Destructor",'size':2,'quantity':3},
                {'name':"Submarino",'size':1,'quantity':4}];

  function GetAxis(boardSample, axis, position){
    let result = [];
    if (axis==='y'){
      for (let i = 0; i < 10; i++) {
        result.push(boardSample[i][position]);
      }
    }else{
      result = boardSample[position];
    }
      return result;
  }

  function UpdateBoard(boardSample, axis, position, value){
    if (axis==='y'){
      for (let i = 0; i < 10; i++) {
        boardSample[i][position]=value[i];
      }
    }else{
      boardSample[position] = value;
    }
    return boardSample;
  }

  function SetShip(axisValue, ship, shipPosition, number){
    const shipName = ship.name+ ' ' + number;
    const shipSize = ship.size;
    const shipSpace = axisValue.slice(shipPosition, shipPosition+shipSize);
    const response = [];
    if (shipSpace.length === shipSize){
      if (shipSpace.every((space)=>space==='w')){
        axisValue.map((space,index)=>
          (index>=shipPosition && index<shipPosition+shipSize)?response.push(shipName):response.push(space) 
        )
        return [true, response]
      }else{
        return [false]
      }
    }else{
      return [false]
    }
  }

  function SetShips(boardSample,fleet){
    // eslint-disable-next-line array-callback-return
    fleet.map((ship)=>{
      for (let i = 0; i < ship.quantity; i++) {
      let added = [false];
      while (!added[0]){
        const axis = Math.random()<0.5?'y':'x';
        const axisPosition = Math.floor(Math.random()*10);
        const shipPosition = Math.floor(Math.random()*10);
        const axisValue = GetAxis(boardSample, axis, axisPosition);
        added = SetShip(axisValue ,ship , shipPosition, i);
        if (added[0]){
          boardSample = UpdateBoard(boardSample, axis, axisPosition, added[1]);
        }
      } 
      }
    })
    return boardSample;
  }

  const response = SetShips(board, fleet);

  return response
}