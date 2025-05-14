import { useEffect, useRef } from 'react'
import './Sections.css'

function Board({ problem, showCanvas, drawCallback }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (showCanvas && canvasRef.current && drawCallback) {
            drawCallback(canvasRef.current);
        }
    }, [showCanvas, drawCallback]);

    return (
        <div className="board_section">
            <div className="equation_value">
                {showCanvas && <canvas ref={canvasRef} id="equationBox" />}
                <h2>{problem}</h2>
            </div>
            <div className="solution_canvas">
                <p>Решение?</p>
            </div>
        </div>
    )
}

export default Board;
