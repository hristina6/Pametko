import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import './Sections.css'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import backgroundImage from '../assets/background_pdf.png'


import Tesseract from "tesseract.js";

const Board = forwardRef(({ problem, showCanvas, drawCallback, correctAnswer, onInfoMessageChange }, ref) => {
    const visualCanvasRef = useRef(null);
    const answerCanvasRef = useRef(null);
    const boardRef = useRef(null);

    const [infoMessage, setInfoMessage] = useState('Реши ја задачата! Можеш!');

    useImperativeHandle(ref, () => ({
        clearBoard: () => {
            const canvas = answerCanvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }));

const exportToPDF = () => {
  if (!boardRef.current) return;

  const bgImg = new Image();
  bgImg.src = backgroundImage;

  bgImg.onload = () => {
    html2canvas(boardRef.current, {
      scale: 2,
      logging: false,
      useCORS: true,
      backgroundColor: null,
    }).then((canvas) => {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgAspectRatio = bgImg.naturalWidth / bgImg.naturalHeight;
      let bgDisplayHeight = pageHeight;
      let bgDisplayWidth = bgDisplayHeight * imgAspectRatio;

      if (bgDisplayWidth > pageWidth) {
        bgDisplayWidth = pageWidth;
        bgDisplayHeight = bgDisplayWidth / imgAspectRatio;
      }

      const bgOffsetX = (pageWidth - bgDisplayWidth) / 2;
      const bgOffsetY = (pageHeight - bgDisplayHeight) / 2;

      pdf.addImage(
        bgImg,
        'PNG',
        bgOffsetX,
        bgOffsetY,
        bgDisplayWidth,
        bgDisplayHeight
      );

      const contentScale = 0.6;
      const contentWidth = pageWidth * contentScale;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      let contentOffsetX = 25; 
      let contentOffsetY = 40; 


      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        contentOffsetX, 
        contentOffsetY, 
        contentWidth,
        contentHeight
      );

      pdf.save('задача.pdf');
    });
  };

  bgImg.onerror = () => {
    console.error('Грешка при вчитување на позадинската слика');
  };
};
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

    const setInfo = (message) => {
        setInfoMessage(message);
        if (onInfoMessageChange) {
            onInfoMessageChange(message);
        }
    };

    function recognizeText() {
        const canvas = answerCanvasRef.current;
        if (!canvas) return;

        const dataUrl = canvas.toDataURL("image/png");
        console.log(dataUrl);
        Tesseract.recognize(
            dataUrl,
            "eng",
            {
                logger: (m) => console.log(m),
            }
        ).then(({data: {text}}) => {
            const userAnswer = parseFloat(text.trim());
            console.log("Recognized Answer:", userAnswer); // Debugging log
            console.log("Correct:", correctAnswer);
            if (!isNaN(userAnswer)) {
                if (userAnswer === correctAnswer) {
                    setInfo("Браво! Точен одговор!");
                } else {
                    setInfo("Неточен одговор. Обиди се повторно.");
                }
            } else {
                setInfo("Не го препознавам бројот.");
            }
        });
    }

    return (
        <div className="board_section" ref={boardRef}>
            <button 
                onClick={exportToPDF}
                className="pdf-export-button"
        
            >
                Превземи ја задачата
            </button>
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
                <button onClick={recognizeText} className="answer_button">Провери</button>
            </div>
        </div>
    )
});

export default Board;