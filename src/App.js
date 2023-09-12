import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';


const App = () => {
  const [bagCoordinates, setBagCoordinates] = useState([]);

  const [playerA, setPlayerA] = useState({ name: "Player A", coordinates: []});
  const [playerB, setPlayerB] = useState({ name: "Player B", coordinates: []})

  const [currentPlayer, setCurrentPlayer] = useState('Player A');

  const [playerTable, setPlayerTable] = useState([]);
  
  const handleBoardClick = async (event) => {
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
    setBagCoordinates([...bagCoordinates, {'x for data': xRelativeToBoard,'y for data': yRelativeToBoard, 'x for css': clientX, 'y for css': clientY, 'x for table': (xRelativeToBoard-480) / 10, 'y for table': (yRelativeToBoard-250) * -1/10}]);

    // Give the player their new score
    givePlayersScore({'x for data': xRelativeToBoard,'y for data': yRelativeToBoard, 'x for css': clientX, 'y for css': clientY, 'x for table': (xRelativeToBoard-480) / 10, 'y for table': (yRelativeToBoard-250) * -1/10})

    updatePlayerTable()
    console.log("PlayerTable", playerTable);
    console.log("Bag coordinates", bagCoordinates);
  };

  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === 'Player A' ? 'Player B' : 'Player A');
  }

  const givePlayersScore = (obj) => {
    if (currentPlayer === 'Player A') {
      const newCoordinates = [...playerA.coordinates, {'x for data': obj['x for data'],'y for data': obj['y for data'], 'x for css': obj['x for css'], 'y for css': obj['y for css'], 'x for table': obj['x for table'], 'y for table': obj['y for table'] }]
      setPlayerA({ ...playerA,  coordinates: newCoordinates })
    } else {
      const newCoordinates = [...playerB.coordinates, {'x for data': obj['x for data'],'y for data': obj['y for data'], 'x for css': obj['x for css'], 'y for css': obj['y for css'], 'x for table': obj['x for table'], 'y for table': obj['y for table'] }]
      setPlayerB({ ...playerB, coordinates: newCoordinates })
    }
  }

  const updatePlayerTable = () => {
    
    const playerAEntries = playerA.coordinates.map((entry) => {
      return entry['y for data'];
    })
    
    const playerBEntries = playerB.coordinates.map((entry) => {
      return entry['y for data'];
    })    

    // combine these two arrays into another array of objects
    // depends on which one is longer


    let tableArray;

    if (playerAEntries.length >= playerBEntries.length) {
      tableArray = playerAEntries.map((entry, index) => {
        return {'playerA': entry, 'playerB': playerBEntries[index] ? playerBEntries[index] : "empty"}
      })
    } else {
      tableArray = playerBEntries.map((entry, index) => {
        return {'playerA': playerAEntries[index] ? playerAEntries[index] : "empty", 'playerB': entry}
      })
    }

    setPlayerTable(tableArray)
  }


  return (
    <div className='main-div' style={{ flex:true}}>
      <div className="cornhole-game" style={{ border: "blue 2px solid", width: "1250px", height: "800px", position:"relative"}}>
            <div className="board" onClick={handleBoardClick} style={{ border: "black 1px solid", width: "750px", height: "500px" , position:"absolute", top: "15px", left:"15px"}}>
              <div className='hole' style={{ border: "black 1px solid", width: "60px", height: "60px" , position:"absolute", top: "220px", left:"450px", borderRadius:"50%"}}></div>
              <div className='actual-board' style={{ border: "black 1px solid", width: "480px", height: "240px", left: "130px", top: "130px", position: "absolute" }} ></div>
            </div>
            {bagCoordinates.map((coordinates, index) => (
                // <div key={index} className="bag" style={{ left: coordinates['x for data'], top: coordinates['y for data'], width: "10px", height: "10px", backgroundColor:"red", position: "absolute" }}></div>
                <div key={index} className="bag" style={{ left: coordinates['x for css'] - 5, top: coordinates['y for css'] - 5, width: "10px", height: "10px", backgroundColor: "red", position: "absolute", borderRadius:"50%" }}></div>
            ))}

            {/* {playerA.coordinates.map((coordinates, index) => (
                // <div key={index} className="bag" style={{ left: coordinates['x for data'], top: coordinates['y for data'], width: "10px", height: "10px", backgroundColor:"red", position: "absolute" }}></div>
                <div key={index} className="playerA-bag" style={{ left: coordinates['x for css'] - 5, top: coordinates['y for css'] - 5, width: "10px", height: "10px", backgroundColor: "red", position: "absolute", borderRadius:"50%" }}></div>
            ))}

            {playerB.coordinates.map((coordinates, index) => (
                // <div key={index} className="bag" style={{ left: coordinates['x for data'], top: coordinates['y for data'], width: "10px", height: "10px", backgroundColor:"red", position: "absolute" }}></div>
                <div key={index} className="playerB-bag" style={{ left: coordinates['x for css'] - 5, top: coordinates['y for css'] - 5, width: "10px", height: "10px", backgroundColor: "blue", position: "absolute", borderRadius:"50%" }}></div>
            ))} */}
      </div>


      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>X Coordinate</Th>
            <Th>Y Coordinate</Th>
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
            {bagCoordinates.map((coordinates, index) => (
                <Tr key={index} row={index}>
                  {/* <Td>{playerA.coordinates[index] ? playerA.coordinates[index]['y for data'] : "empty" }</Td>
                  <Td>{playerB.coordinates[index] ? playerB.coordinates[index]['y for data'] : "empty" }</Td> */}
                  <Td>{coordinates['x for table']}</Td>
                  <Td>{coordinates['y for table']}</Td>
                </Tr>
            ))}
        </Tbody>
      </Table>


      {/* <Button onClick={switchPlayer}>
        Switch to {currentPlayer === 'Player A' ? 'Player B' : 'Player A'}'s Turn
      </Button> */}
    </div>
    
  );
}

export default App;