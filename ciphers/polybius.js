// polybius.js

// Русский алфавит (33 буквы)
const RU = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

// Сетка 6×6 для русского языка
const GRID = [
  ['А', 'Б', 'В', 'Г', 'Д', 'Е'],
  ['Ё', 'Ж', 'З', 'И', 'Й', 'К'],
  ['Л', 'М', 'Н', 'О', 'П', 'Р'],
  ['С', 'Т', 'У', 'Ф', 'Х', 'Ц'],
  ['Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь'],
  ['Э', 'Ю', 'Я', '.', ',', ' ']
];

// Создаём карту для быстрого поиска
const ENCODE_MAP = {};
const DECODE_MAP = {};

for (let row = 0; row < 6; row++) {
  for (let col = 0; col < 6; col++) {
    const char = GRID[row][col];
    const code = `${row + 1}${col + 1}`;
    ENCODE_MAP[char] = code;
    DECODE_MAP[code] = char;
  }
}

/**
 * Шифрование текста квадратом Полибия
 * @param {string} text - исходный текст
 * @returns {string} - зашифрованный текст (числа через пробел)
 */
export function encryptPolybius(text) {
  return text.split('').map(char => {
    if (char === ' ') return '66';
    return ENCODE_MAP[char] || '??';
  }).join(' ');
}

/**
 * Дешифрование текста квадратом Полибия
 * @param {string} ciphertext - зашифрованный текст (числа через пробел)
 * @returns {string} - расшифрованный текст
 */
export function decryptPolybius(ciphertext) {
  const codes = ciphertext.trim().split(/\s+/);
  return codes.map(code => {
    if (code === '66') return ' ';
    return DECODE_MAP[code] || '?';
  }).join('');
}

// Экспорт по умолчанию (для обратной совместимости)
export default {
  encryptPolybius,
  decryptPolybius,
  grid: GRID
};