import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import './Sections.css'

const Board = forwardRef(({ problem, showCanvas, drawCallback }, ref) => {
    const visualCanvasRef = useRef(null);
    const answerCanvasRef = useRef(null);
    
    useImperativeHandle(ref, () => ({
        clearBoard: () => {
            const canvas = answerCanvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }));

    //Visual Canvas
    useEffect(() => {
        if (showCanvas && visualCanvasRef.current && drawCallback) {
            drawCallback(visualCanvasRef.current);
        }
    }, [showCanvas, drawCallback]);

    //Answer Canvas
    useEffect(() => {
        const scale = 4;

        if (!answerCanvasRef.current) return;

        const canvas = answerCanvasRef.current;
        const ctx = canvas.getContext('2d');
        let drawing = false;

        const startDrawing = (event) => {
            drawing = true;
            const rect = canvas.getBoundingClientRect();
            const x = (event.clientX - rect.left) / scale;
            const y = (event.clientY - rect.top) / scale;
            ctx.beginPath();
            ctx.moveTo(x, y);
        };

        const draw = (event) => {
            if (!drawing) return;
            const rect = canvas.getBoundingClientRect();
            const x = (event.clientX - rect.left) / scale;
            const y = (event.clientY - rect.top) / scale;
            ctx.lineTo(x, y);
            ctx.stroke();
        };

        const stopDrawing = () => {
            drawing = false;
        };

        // Register event listeners
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseleave', stopDrawing);

        // Cleanup on unmount
        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseleave', stopDrawing);
        };
    }, []);

    return (
        <div className="board_section">
            <div className="equation_value">
                {showCanvas && <canvas ref={visualCanvasRef} id="equationBox" />}
                <h2>{problem}</h2>
            </div>
            <div className="solution_canvas">
                <p id="answer_text">Решение?</p>
                <div id="answer_canvas">
                    <canvas ref={answerCanvasRef} width="28" height="28"
                            style={{border:'1px dotted black', transform: 'scale(4)', filter: 'invert(100%)'}}/>
                </div>
                <button className="answer_button">Провери</button>
            </div>
        </div>
    )
});

export default Board;
