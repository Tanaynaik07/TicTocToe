import React, { useState, useEffect } from 'react';
import xImage from '../assests/cross.png'; // Import the X image
import oImage from '../assests/zero.png'; // Import the O image
import "../components/main.css";
import { Link } from 'react-router-dom';

const Main2 = () => {


    const [winner, setWinner] = useState("Player1(O) V/S COM(X)");
    const [turn, setTurn] = useState("X"); // Corrected initialization
    const [xMarks, setXMarks] = useState([]); // Array to track X's for tic-tac-toe
    const [oMarks, setOMarks] = useState([]); // Array to track O's for tic-tac-toe

    const [fear, setFear] = useState(false);
    const [xWinCount, setXWinCount] = useState(0);
    const [oWinCount, setOWinCount] = useState(0);
    const [cond, setCond] = useState(0);
    const [clickPositions, setClickPositions] = useState({
        rows: [],
        cols: []
    }); // Array to track row and column positions of clicks
    const [markCount, setMarkCount] = useState({ X: 0, O: 0 }); // Object to track the count of X and O marks
    var boxes = document.getElementsByClassName("box");
    // Array of winning combinations
    let lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    useEffect(() => {
        const winner = calculateWinner(xMarks, oMarks);
        if (winner) {
          // console.log(winner);
            // Handle winner logic here, like displaying a message or resetting the game
        } else {
            // If no winner, and it's CPU turn, make CPU move
            if (turn === 'O') {
                const index = CpuMove(xMarks, oMarks);
                handleBoxClick(index);
            }
        }
    }, [xMarks, oMarks, turn]);

    const handleBoxClick = (index) => {
        // Check if the box is already marked or if the game is over
        // console.log( "abc: "+ cond)
        if (xMarks.includes(index) || oMarks.includes(index) || calculateWinner(xMarks, oMarks) || (cond===1)) {
            return;
        }

        // Toggle between X and O
        const nextMark = turn === "X" ? "O" : "X";
        setTurn(nextMark);

        // Update the state with the new array
        if (nextMark === "X") {
            setXMarks(prevXMarks => [...prevXMarks, index]);
        } else {
            setOMarks(prevOMarks => [...prevOMarks, index]);
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

        // Check if the current player has made 5 marks, if so, remove the oldest mark
        if (newMarkCount[nextMark] === 4) {
            if (nextMark === "X") {
                setXMarks(prevXMarks => prevXMarks.slice(1));
            } else {
                setOMarks(prevOMarks => prevOMarks.slice(1));
            }
            newMarkCount[nextMark]--;
            setMarkCount(newMarkCount);
        }
        // console.log("X: " + xMarks)
    }

    // Helper function to calculate the winner
    const calculateWinner = (xMarks, oMarks) => {


        // Check for a winner
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (xMarks.includes(a) && xMarks.includes(b) && xMarks.includes(c)) {

              // console.log("cond: " + cond)
                if (cond === 0) {
                  // console.log("COnd met 1")
                    setWinner("Winner is X");
                    setOWinCount(oWinCount + 1);
                    setCond(1);
                    return "X";
                }


            }
            if (oMarks.includes(a) && oMarks.includes(b) && oMarks.includes(c)) {

                if(cond===0){

                    setWinner("Winner is O");
                    setXWinCount(xWinCount + 1);
                    setCond(1);
                    return "O";
                }




            }
        }

        // If no winner yet
        return null;
    }

    const restart = () => {
        setMarkCount({ X: 0, O: 0 });
        setOMarks([]);
        setXMarks([]);
        setWinner("Player1(O) V/S COM(X)");
        setCond(0)
    }


    const defend = (xMarks, oMarks) => {
        // Get all available empty squares
        const emptySquares = Array.from({ length: 9 }, (_, index) => index).filter(index => !xMarks.includes(index) && !oMarks.includes(index));
        setFear(false)
        // If O has only one mark, place X randomly
        if (oMarks.length === 1) {
            // console.log("1 element only")
            return emptySquares[Math.floor(Math.random() * emptySquares.length)];
        }

        // If O has two marks
        if (oMarks.length === 2) {
            // Check if those 2 marks form a potential winning combination
            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (oMarks.includes(a) && oMarks.includes(b) && !oMarks.includes(c)) {
                    // If the two marks match a winning combination, place X to block it
                    setFear(true);
                    // console.log("Defend");

                    return c;
                }
                if (oMarks.includes(a) && oMarks.includes(c) && !oMarks.includes(b)) {
                    // console.log("Random 1");
                    setFear(true);
                    return b;
                }
                if (oMarks.includes(b) && oMarks.includes(c) && !oMarks.includes(a)) {
                    // console.log("Random 2");
                    setFear(true);
                    return a;
                }
            }
        }

        // If O has no potential winning combination, place X randomly
        return emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }


    const offense = (xMarks, oMarks) => {
        if (fear === false) {
            // console.log("Fear not there");
        }
        else if (fear === true) {
            // console.log("Fear present");
        }

        const emptySquares = Array.from({ length: 9 }, (_, index) => index).filter(index => !xMarks.includes(index) && !oMarks.includes(index));

        // If O has only one mark, place X randomly
        if (oMarks.length === 1) {
            // console.log("1 element only offense")
            return emptySquares[Math.floor(Math.random() * emptySquares.length)];
        }

        if (oMarks.length === 2) {
            // Check if those 2 marks form a potential winning combination
            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (xMarks.includes(a) && xMarks.includes(b) && !xMarks.includes(c)) {
                    // If the two marks match a winning combination, place X to block it

                    // console.log("offense");

                    return c;
                }
                if (xMarks.includes(a) && xMarks.includes(c) && !xMarks.includes(b)) {
                    // console.log("Random offense1");


                    return b;
                }
                if (xMarks.includes(b) && xMarks.includes(c) && !xMarks.includes(a)) {
                    // console.log("Random offense2");

                    return a;
                }
            }
        }

        // If O has no potential winning combination, place X randomly
        return emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }
    const randomStrategy = (strategy1, strategy2) => {
        let randomIndex = Math.floor(Math.random() * 2); // Generate a random index (0 or 1)
        var selectedStrategy = randomIndex === 0 ? strategy1 : strategy2; // Select the strategy based on the random index
        return selectedStrategy(); // Invoke the selected strategy and return its result
    };
    // Function to make CPU move
    const CpuMove = (xMarks, oMarks) => {
        // Logic to determine CPU move
        // This is just a placeholder, you should implement your own logic here
        // For example, you can randomly select an empty square or implement a basic AI
        const emptySquares = Array.from({ length: 9 }, (_, index) => index).filter(index => !xMarks.includes(index) && !oMarks.includes(index));


        // console.log("x: " + xMarks)
        // console.log(lines)

        for (let i = 0; i < 8; i++) {

            // console.log(lines[i], xMarks);
        }

        let strategy = randomStrategy(() => offense(xMarks, oMarks), () => defend(xMarks, oMarks));

        // console.log(strategy)
        // offense(xMarks,oMarks);
        return strategy;

    }

    return (
        <div id="main">
            <p>Each player gets 3 moves at the fourth move your first move get removed and it continues!</p>
            <h1>{winner}</h1>
            <div className='score'>
                <p>P1:{xWinCount}</p>
                <p>COM:{oWinCount}</p>
            </div>
            <div className='grid-container'>
                {Array.from({ length: 9 }, (_, index) => {
                    const isMarkedX = xMarks.includes(index);
                    const isMarkedO = oMarks.includes(index);
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
            <p id='crt-text'>Your Mark: O</p>

            <button onClick={restart} id='rst-btn'>Restart</button>
            <Link to="/two-players"><button id='player'>Switch to Two Players</button></Link>

        </div>
    );
}

export default Main2;
