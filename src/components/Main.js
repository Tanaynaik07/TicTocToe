import React, { useState, useEffect } from 'react';
import xImage from '../assests/cross.png'; // Import the X image
import oImage from '../assests/zero.png'; // Import the O image
import "../components/main.css";

const Main = () => {
    const [winner, setWinner] = useState("");
    const [turn, setTurn] = useState("X");
    const [xMarks, setXMarks] = useState(Array(9).fill(false)); // Array to track X's for tic-tac-toe
    const [oMarks, setOMarks] = useState(Array(9).fill(false)); // Array to track O's for tic-tac-toe
    const [clickPositions, setClickPositions] = useState({
        rows: [],
        cols: []
    }); // Array to track row and column positions of clicks
    const [markCount, setMarkCount] = useState({ X: 0, O: 0 }); // Object to track the count of X and O marks

    useEffect(() => {
        const winner = calculateWinner(xMarks, oMarks);
        if (winner) {
            console.log(winner);
            // Handle winner logic here, like displaying a message or resetting the game
        }
    }, [xMarks, oMarks]);

  const handleBoxClick = (index) => {
    // Check if the box is already marked or if the game is over
    if (xMarks[index] || oMarks[index] || calculateWinner(xMarks, oMarks)) {
        return;
    }

    // Toggle between X and O
    const nextMark = turn === "X" ? "O" : "X";
    setTurn(nextMark);

    // Update the state with the new array
    const newXMarks = [...xMarks];
    const newOMarks = [...oMarks];
    if (nextMark === "X") {
        newXMarks[index] = true;
        setXMarks(newXMarks);
    } else {
        newOMarks[index] = true;
        setOMarks(newOMarks);
    }

    // Update click positions
    const newRow = Math.floor(index / 3) + 1; // Calculate row position (1-based index)
    const newCol = index % 3 + 1; // Calculate column position (1-based index)
    setClickPositions({
        rows: [...clickPositions.rows, newRow],
        cols: [...clickPositions.cols, newCol]
    });

    // Update mark count
    const newMarkCount = { ...markCount };
    newMarkCount[nextMark]++;
    setMarkCount(newMarkCount);

    // Check if the current player has made 4 marks, if so, remove the oldest mark
    if (newMarkCount[nextMark] === 4) {
        const marksToRemove = nextMark === "X" ? newXMarks : newOMarks;
        const oldestMarkIndex = marksToRemove.findIndex(mark => mark === true);
        marksToRemove[oldestMarkIndex] = false;
        if (nextMark === "X") {
            setXMarks(marksToRemove);
        } else {
            setOMarks(marksToRemove);
        }
        newMarkCount[nextMark]--;
        setMarkCount(newMarkCount);
    }
}


    // Helper function to calculate the winner
    const calculateWinner = (xMarks, oMarks) => {
        // Array of winning combinations
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        // Check for a winner
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (xMarks[a] && xMarks[a] === xMarks[b] && xMarks[a] === xMarks[c]) {
                setWinner("Winner is: X");
                return "X";
            }
            if (oMarks[a] && oMarks[a] === oMarks[b] && oMarks[a] === oMarks[c]) {
                setWinner("Winner is: O");
                return "O";
            }
        }

        // If no winner yet
        return null;
    }

    return (
        <div id="main">
            <h1>{winner}</h1>
            <div className='grid-container'>
                {Array.from({ length: 9 }, (_, index) => {
                    const isMarkedX = xMarks[index];
                    const isMarkedO = oMarks[index];
                    return (
                        <div
                            key={index}
                            className={`box ${isMarkedX ? 'X' : ''} ${isMarkedO ? 'O' : ''}`}
                            onClick={() => handleBoxClick(index)}
                        >
                            {isMarkedX && <img className='image' src={xImage} alt="X" />}
                            {isMarkedO && <img className='image' src={oImage} alt="O" />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Main;
