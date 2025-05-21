import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import './Import.css';

function Import() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const downloadTemplate = () => {
    const templateData = [
      { 
        problem: "Пример: 2 - 2", 
        answer_int: 0,
        theme: "Пример: одземање", 
        difficulty: "Пример: 1(лесно) - Стави бројка"
      }
    ];
    
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Проблеми");
    XLSX.writeFile(wb, "math_problems_template.xlsx");
  };


  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      setFile(jsonData);
    };
    reader.readAsArrayBuffer(uploadedFile);
  };


  const saveToDatabase = async () => {
    if (!file || file.length === 0) {
      alert('Нема податоци за зачувување!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(file)
      });
  
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Неуспешно зачувување');
      }
  
      alert(`${result.message}\nЗачувани IDs: ${result.ids.join(', ')}`);
      setFile(null);
    } catch (error) {
      console.error('Детали за грешката:', error);
      alert(`Грешка: ${error.message}\n${error.details || ''}`);
    }
  };

  return (
    <div className="import-container">
      <h2>Импорт на математички проблеми</h2>
      
      <div className="template-section">
        <button onClick={downloadTemplate} className="action-button">
          Превземи темплејт (.xlsx)
        </button>
        <p className="hint-text">Пополнете го темплејтот и прикачете го подолу</p>
      </div>

      <div className="upload-section">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".xlsx,.xls,.csv"
          style={{ display: 'none' }}
        />
        <button 
          onClick={() => fileInputRef.current.click()} 
          className="action-button"
        >
          Import на фајл
        </button>
        
        {file && (
          <div className="file-info">
            <p>✅ Подготвен запис</p>
            <button onClick={saveToDatabase} className="save-button">
              Зачувај во Azure база
            </button>
          </div>
        )}
      </div>

      <Link to="/" className="back-link">Назад кон почетна</Link>
    </div>
  );
}

export default Import;