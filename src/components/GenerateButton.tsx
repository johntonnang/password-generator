import React from 'react';
import { passwordStore } from '../stores/passwordStore';

interface GenerateButtonProps {
  generateButtonLabel: string;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  generateButtonLabel,
}) => {
  const calculateStrength = () => {
    const lengthSlider = document.getElementById(
      'length-slider'
    ) as HTMLInputElement | null;
    const includeUppercase = document.getElementById(
      'includeUppercase'
    ) as HTMLInputElement | null;
    const includeLowercase = document.getElementById(
      'includeLowercase'
    ) as HTMLInputElement | null;
    const includeNumbers = document.getElementById(
      'includeNumbers'
    ) as HTMLInputElement | null;
    const includeSymbols = document.getElementById(
      'includeSymbols'
    ) as HTMLInputElement | null;

    if (
      !lengthSlider ||
      !includeUppercase ||
      !includeLowercase ||
      !includeNumbers ||
      !includeSymbols
    ) {
      return;
    }

    const length = parseInt(lengthSlider.value);

    if (length === 0) {
      const strengthText = document.getElementById('strength-text');
      if (strengthText) {
        strengthText.textContent = '';
      }
      const rects = document.querySelectorAll(
        '.strength-inner-wrapper .rectangle'
      );
      rects.forEach((rect) => {
        (rect as HTMLElement).style.backgroundColor = 'transparent';
        (rect as HTMLElement).style.border =
          '2px solid var(--color-almost-white)';
      });
      return;
    }

    const checks = [
      includeUppercase.checked,
      includeLowercase.checked,
      includeNumbers.checked,
      includeSymbols.checked,
    ];

    const checkedCount = checks.filter(Boolean).length;

    let strength = 'TOO WEAK!';
    let color = 'var(--color-red)';
    let border = 'none';
    let filledRects = 1;

    if (length >= 5 && length <= 15 && checkedCount > 1) {
      strength = 'WEAK';
      color = 'var(--color-orange)';
      border = 'none';
      filledRects = 2;
    }
    if (length >= 10 && checkedCount > 2) {
      strength = 'MEDIUM';
      color = 'var(--color-yellow)';
      border = 'none';
      filledRects = 3;
    }
    if (length >= 12 && checkedCount === 4) {
      strength = 'STRONG';
      color = 'var(--color-neon-green)';
      border = 'none';
      filledRects = 4;
    }

    const strengthText = document.getElementById('strength-text');
    if (strengthText) {
      strengthText.textContent = strength;
    }
    const rects = document.querySelectorAll(
      '.strength-inner-wrapper .rectangle'
    );
    rects.forEach((rect, index) => {
      if (index < filledRects) {
        (rect as HTMLElement).style.backgroundColor = color;
        (rect as HTMLElement).style.border = border;
      } else {
        (rect as HTMLElement).style.backgroundColor = 'transparent';
        (rect as HTMLElement).style.border =
          '2px solid var(--color-almost-white)';
      }
    });
  };

  const generatePassword = () => {
    const lengthSlider = document.getElementById(
      'length-slider'
    ) as HTMLInputElement | null;
    const includeUppercase = document.getElementById(
      'includeUppercase'
    ) as HTMLInputElement | null;
    const includeLowercase = document.getElementById(
      'includeLowercase'
    ) as HTMLInputElement | null;
    const includeNumbers = document.getElementById(
      'includeNumbers'
    ) as HTMLInputElement | null;
    const includeSymbols = document.getElementById(
      'includeSymbols'
    ) as HTMLInputElement | null;

    if (
      !lengthSlider ||
      !includeUppercase ||
      !includeLowercase ||
      !includeNumbers ||
      !includeSymbols
    ) {
      return '';
    }

    const length = parseInt(lengthSlider.value);
    const includeUppercaseChecked = includeUppercase.checked;
    const includeLowercaseChecked = includeLowercase.checked;
    const includeNumbersChecked = includeNumbers.checked;
    const includeSymbolsChecked = includeSymbols.checked;

    let charset = '';
    if (includeUppercaseChecked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercaseChecked) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbersChecked) charset += '0123456789';
    if (includeSymbolsChecked) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  };

  const handleGenerateButtonClick = () => {
    const password = generatePassword();
    passwordStore.set(password);
    calculateStrength();
  };

  return (
    <>
      <button
        id="generate-button"
        className="body-text"
        onClick={handleGenerateButtonClick}
      >
        {generateButtonLabel}
      </button>
    </>
  );
};

export default GenerateButton;
