import { useState, useEffect } from 'react'
import { useParams } from "react-router";
import { useRef } from 'react';

//FILES
import './Sites.css'
//COMPONENTS
import Board from "../sections/Board.jsx";
import BoardTools from "../sections/BoardTools.jsx";
import NoteTools from "../sections/NoteTools.jsx";
//IMAGES
import BackButton from '../assets/BackButton.svg';
import WoodenBoard from '../assets/Wooden_Board.svg';

function Platform() {
    const [currentProblem, setCurrentProblem] = useState('');
    const [theme, setTheme] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [drawCallback, setDrawCallback] = useState(null);

    const { category } = useParams();

    const notebookCanvasRef = useRef(null);
    const boardRef = useRef(null);
    const hasInitialized = useRef(false);


    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [infoMessage, setInfoMessage] = useState('Реши ја задачата!');

    const handleInfoMessageChange = (message) => {
        setInfoMessage(message);
    };

    let apiProblem = '';
    let boardProblem = '';

    useEffect(() => {
        const canvas = notebookCanvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        canvas.width = 720;
        canvas.height = 320;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;

        let drawing = false;

        const startDraw = (e) => {
            drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        };

        const draw = (e) => {
            if (!drawing) return;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        };

        const stopDraw = () => {
            drawing = false;
            ctx.closePath();
        };

        canvas.addEventListener("mousedown", startDraw);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDraw);
        canvas.addEventListener("mouseleave", stopDraw);

        return () => {
            canvas.removeEventListener("mousedown", startDraw);
            canvas.removeEventListener("mousemove", draw);
            canvas.removeEventListener("mouseup", stopDraw);
            canvas.removeEventListener("mouseleave", stopDraw);
        };
}, []);




    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function isPrime(num) {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }

    function drawSquares(canvas, num1, num2) {
        const visualcanvas = canvas;
        const ctx2 = visualcanvas.getContext("2d");

        // Define square parameters
        const size = 20; // Size of first set of squares (green)
        const size2 = 20 * 10; // Size of blue squares (tens)
        const padding = 10; // Padding between squares
        const verticalPadding = 5; // Vertical space between rows
        const maxSquaresPerRow = 10; // Max squares per row for blue

        // Determine width of a single row of blue squares (up to 10 squares)
        const blueRowWidth = Math.min(num1, maxSquaresPerRow) * (size + padding);

        // Calculate the number of rows for blue squares (tens)
        const blueRows = Math.ceil(num1 / maxSquaresPerRow);
        const blueHeight = blueRows * (size2 + verticalPadding);

        // Calculate the number of columns and height for green squares (ones)
        const greenColumns = Math.ceil(num2 / 5); // Stack up to 5 per column
        const greenHeight = 5 * (size + verticalPadding); // Height for green squares stack

        // Set the canvas size dynamically
        visualcanvas.width = blueRowWidth + greenColumns * (size + 2 * padding);
        visualcanvas.height = Math.max(blueHeight, greenHeight) + 2 * padding;

        // Clear previous drawings
        ctx2.clearRect(0, 0, visualcanvas.width, visualcanvas.height);

        // Draw border
        ctx2.beginPath();
        ctx2.rect(0, 0, visualcanvas.width, visualcanvas.height);
        ctx2.strokeStyle = "black";
        ctx2.lineWidth = 3;
        ctx2.stroke();

        // Align yPos for both blue and green squares from the bottom
        let xPos = padding;
        let yPos = visualcanvas.height - padding - size2; // Start from the bottom for blue squares (tens)

        // Draw blue squares (tens)
        for (let i = 0; i < num1; i++) {
            ctx2.fillStyle = "blue";
            ctx2.fillRect(xPos, yPos, size, size2);
            ctx2.strokeRect(xPos, yPos, size, size2);

            xPos += size + padding;

            // Move to the next row if needed
            if ((i + 1) % maxSquaresPerRow === 0) {
                xPos = padding;
                yPos += size2 + verticalPadding;
            }
        }

        // Reset position for green squares (ones) to start from the bottom, aligned with blue squares
        xPos = blueRowWidth + padding; // Aligns with the first blue row
        yPos = visualcanvas.height - padding - size; // Align bottom of green squares with blue squares

        // Draw green squares (ones) stacked vertically up to 5 in a column
        for (let i = 0; i < num2; i++) {
            ctx2.fillStyle = "green";
            ctx2.fillRect(xPos, yPos, size, size);
            ctx2.strokeRect(xPos, yPos, size, size);

            yPos -= size + verticalPadding; // Move up with padding between boxes

            // Move to the next column if needed (every 5 green squares)
            if ((i + 1) % 5 === 0) {
                xPos += size + padding; // Move to the next column
                yPos = visualcanvas.height - padding - size; // Reset y position to bottom of next column
            }
        }
    }

    useEffect(() => {
        if (category && !hasInitialized.current) {
            hasInitialized.current = true;
            generateProblem(category, getRandom(1, 3));
        }
    }, [category]);

    function fetchSolution(problem) {
        fetch(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(problem)}`)
            .then(response => response.text())
            .then(answer => {
                console.log(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(problem)}`)
                setCorrectAnswer(parseFloat(answer)); // Store as a number
                console.log("Correct Answer from API:", correctAnswer); // Debugging log
            })
            .catch(error => console.error('Error fetching solution:', error));
    }

    function generateProblem(t, d) {
        setTheme(t);
        setDifficulty(d);

        if (t === "СОБИРАЊЕ") {

            //num1 + num2 = total
            let total = getRandom(d === 2 ? 11 : 1, d === 2 ? 20 : 10); // Random sum between 0 and 10
            let num1 = getRandom(1, total); // First number
            let num2 = total - num1; // Second number, lower/equal than remaining number to equal sum

            apiProblem = `${num1}+${num2}`;
            boardProblem = apiProblem;
        }

        if (t === "ОДЗЕМАЊЕ") {

            //total - num1 = num2
            let total = getRandom(1, d === 2 ? 20 : 10);
            let num1 = getRandom(1, total);
            let num2 = total - num1;
            apiProblem = `${total}-${num1}`;
            boardProblem = apiProblem;
        }

        if (t === "СПОРЕДБА") {

            let num1 = getRandom(1, 10);  // First number
            let num2 = getRandom(1, 10);  // Second number
            if (num2 === num1) {
                num2 = getRandom(1, 10);
            }

            let compareBool = getRandom(1,3);
            if (compareBool === 1) {
                if (num1 < num2) {
                    apiProblem = `${num1}`;
                    boardProblem = `Помалo? ${num1} или ${num2}`;
                } else {
                    apiProblem = `${num2}`;
                    boardProblem = `Помалo? ${num1} или ${num2}`;
                }
            }
            else {
                if (num1 > num2) {
                    apiProblem = `${num1}`;
                    boardProblem = `Поголемo? ${num1} или ${num2}`;
                } else {
                    apiProblem = `${num2}`;
                    boardProblem = `Поголемo? ${num1} или ${num2}`;
                }
            }
        }

        if (t === "БРОЕЊЕ") {

            let total = getRandom(11,99);
            let huns = Math.floor(total / 100);
            let tens = Math.floor(total / 10);
            let ones = total % 10;

            const draw = (canvas) => drawSquares(canvas, tens, ones);
            setDrawCallback(() => draw); // Set the drawing function

            apiProblem = `${huns}*100+${tens}*10+${ones}`;
            // boardProblem = `${huns}*100+${tens}*10+${ones}`;
        }

        if (t === "МНОЖЕЊЕ") { //left * right = total

            let total;
            for (let i = 0; i < 1000; i++) {
                total = getRandom(2,20); // 18
                if (!isPrime(total)) break;
            }

            let left, right;
            for (let i = 0; i < 100; i++) { // Tries up to 100 times to find valid numbers
                left = getRandom(2, total / 2); // 6
                if (total % left === 0) {
                    right = total * left;  // x = 3
                    break; // Exit loop when valid numbers are found
                }
            }
            apiProblem = `${total}/${left}`;

            if (d === 1) {
                boardProblem = `${left}*${total/left}`;
            } else {
                boardProblem = `${left} * x = ${total}`;
            }
        }

        if (t === "ДЕЛЕЊЕ") {
            let total;
            for (let i = 0; i < 1000; i++) {
                total = getRandom(2,20); // 20
                if (!isPrime(total)) break;
            }

            let left, right;
            for (let i = 0; i < 100; i++) { // Tries up to 10 times to find valid numbers
                left = getRandom(2, total / 2); // 2
                if (total % left === 0) {
                    right = total / left;  // x = 10
                    break; // Exit loop when valid numbers are found
                }
            }


            apiProblem = `${total}/${left}`;
            if (d === 1) {
                boardProblem = `${total}/${left}`;
            } else {
                boardProblem = `${total} / x = ${left}`;
            }

        }

        setCurrentProblem(boardProblem);
        console.log("Current:", currentProblem);

        // Fetch the solution from Math.js API
        fetchSolution(apiProblem);
        console.log(boardProblem);
        console.log(t);
        console.log(d);
    }

  return (
    <>
        <div className="platform">
            <div className="breadcrumbs">
                <p>Задача: {theme}</p>
                <p>Степен: {difficulty}</p>
            </div>
            <div className="door"><a href="/"><img className="back_button" src={BackButton} alt="back_button"/></a></div>
            <div className="board">
                <Board ref={boardRef} problem={currentProblem} showCanvas={theme === "БРОЕЊЕ"}
                       drawCallback={drawCallback} correctAnswer={correctAnswer}
                       onInfoMessageChange={handleInfoMessageChange}></Board>
            </div>
            <div className="board_tools"><BoardTools boardRef={boardRef}></BoardTools></div>
            <div className="info">
                <p className="pametko_message">{infoMessage}</p>
                <img className="name_board" alt="name_board" src={WoodenBoard}/>
                <h2 className="kid_name">Паметко</h2>
            </div>
            <div className="note_tools"><NoteTools notebookRef={notebookCanvasRef}></NoteTools></div>
            <div className="notebook">
                <canvas ref={notebookCanvasRef} className="notebook_canvas" style={{overflow: "hidden"}}/>
            </div>
        </div>
    </>
  )
}

export default Platform;

