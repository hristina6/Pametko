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
        problem: "Пример: 2+2", 
        answer_int: 4, 
        theme: "собирање", 
        difficulty: "лесно" 
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
    try {
      const response = await fetch('http://localhost:5000/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(file)
      });

      if (response.ok) {
        alert('Податоците се успешно зачувани!');
        setFile(null);
      }
    } catch (error) {
      console.error('Грешка', error);
    }
  };

  return (
    <div className="import-container">
      <h2>Импорт на математички проблеми</h2>
      
      <div className="template-section">
        <button onClick={downloadTemplate} className="action-button">
          Преземи темплејт (.xlsx)
        </button>
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
          Прикачи го пополнетиот темплејт
        </button>
        
        {file && (
          <div className="file-info">
            <p>✅ Фајлот е подготвен за внес ({file.length} записи)</p>
            <button onClick={saveToDatabase} className="save-button">
              Зачувај
            </button>
          </div>
        )}
      </div>

      <Link to="/" className="back-link">Назад кон почетната страна</Link>
    </div>
  );
}

export default Import;