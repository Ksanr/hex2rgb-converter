import React, { useState } from 'react';
import PropTypes from 'prop-types';

function isValidHex(hex) {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

const ColorConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(null); // null - ещё не проверяли, true/false
  const [rgb, setRgb] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Проверяем только если длина равна 7 (включая #)
    if (value.length === 7) {
      const valid = isValidHex(value);
      setIsValid(valid);
      if (valid) {
        setRgb(hexToRgb(value));
        // Меняем фон body
        document.body.style.backgroundColor = value;
      } else {
        setRgb('');
      }
    } else {
      // Если длина не 7, сбрасываем состояние валидации
      setIsValid(null);
      setRgb('');
      // Фон не меняем
    }
  };

  // Определяем класс для результата
  let resultClass = 'result';
  if (isValid === false) {
    resultClass += ' error';
  }

  return (
    <label className="container">
      <input
        type="text"
        className="input-field"
        id="colorInput"
        placeholder="Введите код цвета..."
        value={inputValue}
        onChange={handleChange}
      />
      <span className={resultClass} id="result">
        {isValid === true && rgb}
        {isValid === false && 'Ошибка!'}
        {isValid === null && '\u00A0'} {/* неразрывный пробел для сохранения высоты */}
      </span>
    </label>
  );
};

export default ColorConverter;