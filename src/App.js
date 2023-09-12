import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';


const App = () => {
  const [bagCoordinates, setBagCoordinates] = useState([]);

  const [playerA, setPlayerA] = useState({ name: "Player A", coordinates: []});
  const [playerB, setPlayerB] = useState({ name: "Player B", coordinates: []})

  const [currentPlayer, setCurrentPlayer] = useState('Player A');
  
  const handleBoardClick = (event) => {
    const { clientX, clientY } = event;
    console.log("clientX", clientX);
    console.log("clientY", clientY)
  
    // Get the parent div element (the board in this case).
    const board = document.querySelector('.board');
  
    // Get the position of the board relative to the viewport.
    const boardRect = board.getBoundingClientRect();
    console.log("boardRect", boardRect);
  
    // Calculate coordinates relative to the board.
    const xRelativeToBoard = clientX - boardRect.left;
    const yRelativeToBoard = clientY - boardRect.top;
  
    // Now, xRelativeToBoard and yRelativeToBoard are relative to the board.
    console.log(`Relative to board - X: ${xRelativeToBoard}, Y: ${yRelativeToBoard}`);

    // Update the state with the new bag placement.
    // setBagCoordinates([...bagCoordinates, [xRelativeToBoard,yRelativeToBoard]]);
    setBagCoordinates([...bagCoordinates, {'x for data': xRelativeToBoard,'y for data': yRelativeToBoard, 'x for css': clientX, 'y for css': clientY}]);

    // Give the player their new score
    givePlayersScore({'x for data': xRelativeToBoard,'y for data': yRelativeToBoard, 'x for css': clientX, 'y for css': clientY})

    console.log("Bag coordinates", bagCoordinates);
  };

  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === 'Player A' ? 'Player B' : 'Player A');
  }

  const givePlayersScore = (obj) => {
    if (currentPlayer === 'Player A') {
      const newCoordinates = [...playerA.coordinates, {'x for data': obj['x for data'],'y for data': obj['y for data'], 'x for css': obj['x for css'], 'y for css': obj['y for css'] }]
      setPlayerA({ ...playerA,  coordinates: newCoordinates })
    } else {
      const newCoordinates = [...playerB.coordinates, {'x for data': obj['x for data'],'y for data': obj['y for data'], 'x for css': obj['x for css'], 'y for css': obj['y for css'] }]
      setPlayerB({ ...playerB, coordinates: newCoordinates })
    }
  }


  return (
    <div className='main-div' style={{ flex:true}}>
      <div className="cornhole-game" style={{ border: "blue 2px solid", width: "600px", height: "300px", position:"relative"}}>
            <div className="board" onClick={handleBoardClick} style={{ border: "red 2px solid", width: "200px", height: "75px" , marginLeft: "100px", marginTop: "100px", position:"absolute"}}>
              {/* Render bags at bagCoordinates */}
              {/* {bagCoordinates.map((coordinates, index) => (
                // <div key={index} className="bag" style={{ left: coordinates.x, top: coordinates.y, width: "10px", height: "10px", backgroundColor:"red", position: "fixed" }}></div>
                <div key={index} className="bag" style={{ left: coordinates['x for css'] - 5, top: coordinates['y for css'] - 5, width: "10px", height: "10px", backgroundColor:"red", position: "fixed" }}></div>
              ))} */}
              <div className='actual-board' style={{ border: "black 1px solid", width: "100px", height: "37.5px", left: "20px", top: "20px", position: "absolute" }} ></div>
            </div>
            {/* {bagCoordinates.map((coordinates, index) => (
                // <div key={index} className="bag" style={{ left: coordinates['x for data'], top: coordinates['y for data'], width: "10px", height: "10px", backgroundColor:"red", position: "absolute" }}></div>
                <div key={index} className="bag" style={{ left: coordinates['x for css'] - 5, top: coordinates['y for css'] - 5, width: "10px", height: "10px", backgroundColor: `${currentPlayer === 'Player A' ? 'red' : 'blue'}`, position: "absolute" }}></div>
            ))} */}

            {playerA.coordinates.map((coordinates, index) => (
                // <div key={index} className="bag" style={{ left: coordinates['x for data'], top: coordinates['y for data'], width: "10px", height: "10px", backgroundColor:"red", position: "absolute" }}></div>
                <div key={index} className="playerA-bag" style={{ left: coordinates['x for css'] - 5, top: coordinates['y for css'] - 5, width: "10px", height: "10px", backgroundColor: "red", position: "absolute" }}></div>
            ))}

            {playerB.coordinates.map((coordinates, index) => (
                // <div key={index} className="bag" style={{ left: coordinates['x for data'], top: coordinates['y for data'], width: "10px", height: "10px", backgroundColor:"red", position: "absolute" }}></div>
                <div key={index} className="playerB-bag" style={{ left: coordinates['x for css'] - 5, top: coordinates['y for css'] - 5, width: "10px", height: "10px", backgroundColor: "blue", position: "absolute" }}></div>
            ))}
      </div>


      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Player A</Th>
            <Th>Player B</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* <Tr>
            <Td>Player A name</Td>
            <Td>Player A score</Td>
          </Tr>
          <Tr>
            <Td>player b name</Td>
            <Td>player b score</Td>
          </Tr> */}
            {/* {bagCoordinates.map((coordinates, index) => (
                // <div key={index} className="bag" style={{ left: coordinates['x for data'], top: coordinates['y for data'], width: "10px", height: "10px", backgroundColor:"red", position: "absolute" }}></div>
                // <div key={index} className="bag" style={{ left: coordinates['x for css'] - 5, top: coordinates['y for css'] - 5, width: "10px", height: "10px", backgroundColor:"red", position: "absolute" }}></div>
                <Tr>
                  
                </Tr>
            ))} */}
        </Tbody>
      </Table>


      <Button onClick={switchPlayer}>
        Switch to {currentPlayer === 'Player A' ? 'Player B' : 'Player A'}'s Turn
      </Button>
    </div>
    
  );
}

export default App;