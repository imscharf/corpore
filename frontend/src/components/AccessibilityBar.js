import React, { useState, useEffect } from 'react';
import { FaFont, FaMinus, FaPlus, FaAdjust } from 'react-icons/fa';

const AccessibilityBar = () => {
  const [fontSize, setFontSize] = useState(100); // Porcentagem inicial
  const [grayScale, setGrayScale] = useState(false);

  // Aplica o tamanho da fonte no elemento raiz HTML
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Aplica o filtro de escala de cinza no body
  useEffect(() => {
    if (grayScale) {
      document.body.style.filter = 'grayscale(100%)';
    } else {
      document.body.style.filter = 'none';
    }
  }, [grayScale]);

  const increaseFont = () => {
    if (fontSize < 150) setFontSize(fontSize + 10);
  };

  const decreaseFont = () => {
    if (fontSize > 70) setFontSize(fontSize - 10);
  };

  const toggleGrayScale = () => {
    setGrayScale(!grayScale);
  };

  return (
    <div className="accessibility-bar">
      <button onClick={decreaseFont} title="Diminuir Fonte" aria-label="Diminuir Fonte">
        <FaMinus size={12} /> <FaFont size={12} />
      </button>
      <button onClick={increaseFont} title="Aumentar Fonte" aria-label="Aumentar Fonte">
        <FaPlus size={12} /> <FaFont size={16} />
      </button>
      <button 
        onClick={toggleGrayScale} 
        title="Alternar Escala de Cinza" 
        aria-label="Alternar modo escala de cinza"
        className={grayScale ? 'active' : ''}
      >
        <FaAdjust />
      </button>
    </div>
  );
};

export default AccessibilityBar;