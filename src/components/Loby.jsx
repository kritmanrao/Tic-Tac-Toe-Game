import { useState } from "react";
import Box from "./Box.jsx";

let turn = true;

var gameOver = false;
function Loby() {
  const [winner, setWinner] = useState([0, 0]);
  const [box, setBox] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [moves, setMoves] = useState([]);
  const [name, setName] = useState({
    player1: "Player 1",
    player2: "Player 2",
  });

  function checkWinner(newBox, p) {
    let chakeWinner = false;
    // rows
    for (let i = 0; i < 3; i++) {
      if (newBox[i][0] === p && newBox[i][1] === p && newBox[i][2] === p) {
        chakeWinner = true;
      }
    }

    // columns
    for (let i = 0; i < 3; i++) {
      if (newBox[0][i] === p && newBox[1][i] === p && newBox[2][i] === p) {
        chakeWinner = true;
      }
    }

    // diagonals
    if (newBox[0][0] === p && newBox[1][1] === p && newBox[2][2] === p) {
      chakeWinner = true;
    } else if (newBox[0][2] === p && newBox[1][1] === p && newBox[2][0] === p) {
      chakeWinner = true;
    }
    if (moves.length === 8 && chakeWinner == false) {
      playMusic('https://cdn.pixabay.com/audio/2022/12/13/audio_34d1e8985e.mp3');
      setTimeout(() => {
        clearBoxs();
      }, 1000);
    }
    if (chakeWinner == true) {
      gameOver = true;
      setWinner((curr) => {
        const arr = [...curr];
        arr[p - 1]++;
        return arr;
      });
      playMusic("https://assets.mixkit.co/active_storage/sfx/600/600-preview.mp3");
      setTimeout(() => { 
        clearBoxs();
      }, 1000);
    }
  }

  function addMove(i, j) {
    const newMoves = [...moves];
    newMoves.push([i, j]);
    setMoves(newMoves);
  }

  function playMusic(music) {
    setTimeout(() => {
      new Audio(music).play();
    }, 0);
  }

  async function handleClick(i, j) {
    if (gameOver) return;
    if (box[i][j]) return;
    addMove(i, j);

    playMusic(turn ? "https://cdn.pixabay.com/audio/2025/01/20/audio_9afb73ceb5.mp3" :"https://cdn.pixabay.com/audio/2023/06/15/audio_a0e2c53290.mp3");

    const newBox = box.map((row, rowIdx) =>
      row.map((cell, colIdx) => {
        if (rowIdx === i && colIdx === j) return turn ? 1 : 2;
        return cell;
      })
    );
    setBox(newBox);
    checkWinner(newBox, turn ? 1 : 2);
    turn = !turn;
  }

  function handleUndoClick() {
    if (moves.length) {
      const newMoves = [...moves];

      const index = newMoves[newMoves.length - 1];
      newMoves.pop();
      setMoves(newMoves);
      const i = index[0];
      const j = index[1];
      const newBox = box.map((row, rowIdx) =>
        row.map((cell, colIdx) => {
          if (rowIdx === i && colIdx === j) return 0;
          return cell;
        })
      );
      setBox(newBox);
      turn = !turn;
    }
  }

  function handleReset() {
    clearBoxs();
    setWinner([0, 0]);
    turn = true;
  }

  function clearBoxs() {
    setBox([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    gameOver = false;
    setMoves([]);
  }


  return (
    <div className="app">
      <div className="score">
        <div className={` ${turn ? "active1" : ""} left p2`}>
          <input className="auto-width-input p2"
            type="text"
            value={name.player1}
            onChange={(e) =>
              setName((ob) => ({ ...ob, player1: e.target.value }))
            }
          />
          <span className="sc">: {winner[0]}</span>
        </div>
        <div className={` ${!turn ? "active2" : ""} right p1`}>
          <input className="auto-width-input p1"
            type="text"
            value={name.player2}
            onChange={(e) =>
              setName((ob) => ({ ...ob, player2: e.target.value }))
            }
          />
          <span>: {winner[1]}</span>
        </div>
      </div>

      <div className="main">
        {box.map((row, i) =>
          row.map((val, j) => (
            <Box
              handleClick={() => handleClick(i, j)}
              val={val}
              key={`${i}_${j}`}
            />
          ))
        )}
      </div>

      <div className="mid">
        <div>
          <button className="btn" onClick={handleReset}>
            Reset
          </button>
          <button className="btn undo" onClick={handleUndoClick}>
            Undo
          </button>
        </div>
      </div>
    </div>
  );
}

export default Loby;
