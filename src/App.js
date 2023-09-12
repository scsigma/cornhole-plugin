import React, { useState } from 'react';

const App = () => {
  const [bagCoordinates, setBagCoordinates] = useState([]);
  
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

    console.log("Bag coordinates", bagCoordinates);
  };

  return (
    <div className="cornhole-game" style={{ border: "blue 2px solid", width: "600px", height: "300px", position:"relative"}}>
      <div className="board" onClick={handleBoardClick} style={{ border: "red 2px solid", width: "200px", height: "75px" , marginLeft: "100px", marginTop: "100px", position:"absolute"}}>
        {/* Render bags at bagCoordinates */}
        {/* {bagCoordinates.map((coordinates, index) => (
          // <div key={index} className="bag" style={{ left: coordinates.x, top: coordinates.y, width: "10px", height: "10px", backgroundColor:"red", position: "fixed" }}></div>
          <div key={index} className="bag" style={{ left: coordinates['x for css'] - 5, top: coordinates['y for css'] - 5, width: "10px", height: "10px", backgroundColor:"red", position: "fixed" }}></div>
        ))} */}
        <div className='actual-board' style={{ border: "black 1px solid", width: "100px", height: "37.5px", left: "20px", top: "20px", position: "absolute" }} ></div>
      </div>
      {bagCoordinates.map((coordinates, index) => (
          // <div key={index} className="bag" style={{ left: coordinates['x for data'], top: coordinates['y for data'], width: "10px", height: "10px", backgroundColor:"red", position: "absolute" }}></div>
          <div key={index} className="bag" style={{ left: coordinates['x for css'] - 5, top: coordinates['y for css'] - 5, width: "10px", height: "10px", backgroundColor:"red", position: "absolute" }}></div>
        ))}
    </div>
  );
}

export default App;