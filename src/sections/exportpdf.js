import { jsPDF } from 'jspdf';

export const generatePdf = (problems) => {
  const doc = new jsPDF();
  
  // Наслов со боја
  doc.setTextColor(33, 150, 243); // Синја боја за наслов
  doc.setFontSize(20);
  doc.text('Your solved problems', 105, 20, { align: 'center' });
  
  let yPosition = 30;

  problems.forEach((problem, index) => {
    // Основен текст црн
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    
    // Број на проблемот со боја
    doc.setTextColor(233, 30, 99); // Розова боја
    doc.setFont('helvetica', 'bold');
    doc.text(`Problem ${index + 1}:`, 14, yPosition);
    doc.setFont('helvetica', 'normal');
    
    yPosition += 7;
    
    // Текст на проблемот со здебелени букви
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    const problemText = doc.splitTextToSize(`${problem.problem}`, 180);
    doc.text(problemText, 14, yPosition);
    doc.setFont('helvetica', 'normal');
    yPosition += problemText.length * 7;
    
    // Тема со боја
    doc.setTextColor(76, 175, 80); // Зелена боја
    doc.text(`Theme: ${problem.theme}`, 14, yPosition);
    yPosition += 7;
    
    // Тежина со ЕДНА боја (виолетова) за сите нивоа
    doc.setTextColor(156, 39, 176); // Виолетова боја за сите тежини
    doc.text(`Difficulty: ${problem.difficulty}`, 14, yPosition);
    yPosition += 7;
    
    // Одговор со боја
    doc.setTextColor(255, 152, 0); // Портокалова боја
    doc.text(`Answer: ${problem.answer_int}`, 14, yPosition);
    yPosition += 7;
    
    // Декоративна линија помеѓу проблемите
    if (index < problems.length - 1) {
      doc.setDrawColor(156, 39, 176); // Виолетова боја
      doc.line(10, yPosition + 5, 200, yPosition + 5);
      yPosition += 15;
    }
    
    // Нова страница ако е потребно
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Слики (поедноставено)
    if (problem.answer_img) {
      doc.addPage();
      doc.setTextColor(33, 150, 243); // Синја боја
      doc.text('Answer Image:', 14, 20);
      yPosition = 30;
    }
    
    if (problem.notes_img) {
      doc.addPage();
      doc.setTextColor(33, 150, 243); // Синја боја
      doc.text('Notes:', 14, 20);
      yPosition = 30;
    }
  });

  return doc;
};

// Нема потреба од getDifficultyColor функцијата сега

export const exportProblems = async (showConfirmation = true) => {
  try {
    const response = await fetch('http://localhost:5000/api/bag');
    const problems = await response.json();

    if (!problems || problems.length === 0) {
      alert('Немате зачувано проблеми во Bag!');
      return false;
    }

    const shouldExport = showConfirmation 
      ? window.confirm('Дали сакате да го симнете вашиот фајл?') 
      : true;

    if (!shouldExport) return false;

    const pdfDoc = generatePdf(problems);
    pdfDoc.save('мои_решени_задачи.pdf');
    
    return true;
    
  } catch (error) {
    console.error('Грешка при експорт:', error);
    alert('Неуспешен експорт. Обидете се повторно.');
    return false;
  }
};