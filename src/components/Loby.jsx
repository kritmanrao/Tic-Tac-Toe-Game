import { useState } from "react";
import Box from "./Box.jsx";

function Loby() {
  const [turn, setTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState([0, 0]);
  const [winningCells, setWinningCells] = useState([]);

  const [box, setBox] = useState(
    Array(3)
      .fill()
      .map(() => Array(3).fill(0))
  );
  const [moves, setMoves] = useState([]);
  const [name, setName] = useState({
    player1: "Player 1",
    player2: "Player 2",
  });

  const playMusic = (url) => setTimeout(() => new Audio(url).play(), 0);

  const clearBoard = () => {
    setBox(
      Array(3)
        .fill()
        .map(() => Array(3).fill(0))
    );
    setMoves([]);
    setGameOver(false);
    setWinningCells([]);
  };

  const checkWinner = (board, player) => {
    const lines = [
      // rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // cols
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];
  
    for (const line of lines) {
      if (line.every(([r, c]) => board[r][c] === player)) {
        setWinningCells(line);
        setGameOver(true);
        setWinner(prev => {
          const copy = [...prev];
          copy[player - 1]++;
          return copy;
        });
        playMusic("https://assets.mixkit.co/active_storage/sfx/600/600-preview.mp3");
        setTimeout(() => {
          clearBoard();
          setWinningCells([]);
        }, 1000);
        return;
      }
    }
  
    if (moves.length === 8) {
      playMusic("https://cdn.pixabay.com/audio/2022/12/13/audio_34d1e8985e.mp3");
      setTimeout(() => {
        clearBoard();
        setWinningCells([]);
      }, 1000);
    }
  };
  

  const handleClick = (i, j) => {
    if (gameOver || box[i][j]) return;

    const player = turn ? 1 : 2;
    const sound = turn
      ? "https://cdn.pixabay.com/audio/2025/01/20/audio_9afb73ceb5.mp3"
      : "https://cdn.pixabay.com/audio/2023/06/15/audio_a0e2c53290.mp3";
    playMusic(sound);

    const newBox = box.map((row, rowIdx) =>
      row.map((cell, colIdx) => (rowIdx === i && colIdx === j ? player : cell))
    );

    setBox(newBox);
    setMoves([...moves, [i, j]]);
    checkWinner(newBox, player);
    setTurn(!turn);
  };

  const handleUndoClick = () => {
    if (!moves.length) return;
    const [[i, j], ...restMoves] = moves.slice(-1).concat(moves.slice(0, -1));
    const updatedBox = box.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === i && cIdx === j ? 0 : cell))
    );
    setBox(updatedBox);
    setMoves(restMoves);
    setTurn(!turn);
  };

  const handleReset = () => {
    clearBoard();
    setWinner([0, 0]);
    setTurn(true);
  };

  return (
    <div className="app">
      <div className="score">
        {["player1", "player2"].map((key, idx) => (
          <div
            key={key}
            className={`${turn === (idx === 0) ? `active${idx + 1}` : ""} ${
              idx === 0 ? "left p2" : "right p1"
            }`}
          >
            <input
              className={`auto-width-input ${idx === 0 ? "p2" : "p1"}`}
              value={name[key]}
              onChange={(e) =>
                setName((n) => ({ ...n, [key]: e.target.value }))
              }
            />
            <span className="sc">: {winner[idx]}</span>
          </div>
        ))}
      </div>

      <div className="main">
        {box.map((row, i) =>
          row.map((val, j) => (
            <Box
              key={`${i}_${j}`}
              val={val}
              handleClick={() => handleClick(i, j)}
              highlight={winningCells.some(([x, y]) => x === i && y === j)}
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
