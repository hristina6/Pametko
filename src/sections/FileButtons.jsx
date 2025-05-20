// FileButtons.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { exportProblems } from './exportpdf';
import './Sections.css';

const FileButtons = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleExportClick = () => {
    setShowExportModal(true);
  };

  const confirmExport = async () => {
    setShowExportModal(false);
    setIsExporting(true);
    await exportProblems(false); 
    setIsExporting(false);
  };

  const cancelExport = () => {
    setShowExportModal(false);
  };

  return (
    <div className="right_section">
      <div className="file_buttons">
        <Link to="/import">
          <button>Import</button>
        </Link>
        <button onClick={handleExportClick} disabled={isExporting}>
          {isExporting ? 'Се обработува...' : 'Export'}
        </button>
        <Link to="/bag">
          <button>Bag</button>
        </Link>
      </div>

      {/* Модален прозорец за потврда */}
      {showExportModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Потврда за експорт</h3>
            <p>Дали сакате да го симнете вашиот фајл?</p>
            <div className="modal-actions">
              <button onClick={confirmExport}>Да, симни</button>
              <button onClick={cancelExport}>Откажи</button>
            </div>
          </div>
        </div>
      )}

      <div className="kid_placeholder">
        <img src="src/assets/Kid.svg" alt="Kid illustration" />
      </div>
    </div>
  );
};

export default FileButtons;