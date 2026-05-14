// playfair.js — унифицированная версия

const ALPHABET = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ.,!';

/**
 * Построение матрицы 6×6 из ключа (единый способ)
 */
export function generateMatrix(key) {
  const cleanKey = key.toUpperCase().replace(/[^А-ЯЁ]/g, '');
  
  const seen = new Set();
  const chars = [];
  
  // Добавляем символы ключа
  for (const ch of cleanKey) {
    if (!seen.has(ch)) {
      seen.add(ch);
      chars.push(ch);
    }
  }
  
  // Добавляем остальные символы алфавита
  for (const ch of ALPHABET) {
    if (!seen.has(ch)) {
      seen.add(ch);
      chars.push(ch);
    }
  }
  
  // Берём первые 36 символов
  const cells = chars.slice(0, 36);
  
  // Формируем матрицу 6×6
  const matrix = [];
  for (let i = 0; i < 6; i++) {
    matrix.push(cells.slice(i * 6, i * 6 + 6));
  }
  
  return matrix;
}

/**
 * Поиск позиции символа в матрице
 */
function findPosition(matrix, char) {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      if (matrix[row][col] === char) {
        return { row, col };
      }
    }
  }
  return null;
}

/**
 * Удаление служебных "Х"
 */
function removeFillers(text) {
  return text
    .replace(/([А-ЯЁ])Х\1/g, '$1$1')
    .replace(/Х$/g, '');
}

/**
 * ШИФРОВАНИЕ ПЛЕЙФЕРА
 */
export function encryptPlayfair(plainText, key) {
  if (!key) return plainText;
  
  const matrix = generateMatrix(key);
  
  // Очищаем текст от не-букв
  const cleanText = plainText
    .toUpperCase()
    .replace(/[^А-ЯЁ]/g, '');
  
  // Разбиваем на пары
  const pairs = [];
  let i = 0;
  
  while (i < cleanText.length) {
    const a = cleanText[i];
    let b = cleanText[i + 1];
    
    if (!b) {
      b = 'Х';
      i += 1;
    } else if (a === b) {
      b = 'Х';
      i += 1;
    } else {
      i += 2;
    }
    
    pairs.push([a, b]);
  }
  
  let result = '';
  
  for (const [a, b] of pairs) {
    const posA = findPosition(matrix, a);
    const posB = findPosition(matrix, b);
    
    if (!posA || !posB) {
      result += a + b;
      continue;
    }
    
    // Одна строка
    if (posA.row === posB.row) {
      result += matrix[posA.row][(posA.col + 1) % 6];
      result += matrix[posB.row][(posB.col + 1) % 6];
    }
    // Один столбец
    else if (posA.col === posB.col) {
      result += matrix[(posA.row + 1) % 6][posA.col];
      result += matrix[(posB.row + 1) % 6][posB.col];
    }
    // Прямоугольник
    else {
      result += matrix[posA.row][posB.col];
      result += matrix[posB.row][posA.col];
    }
  }
  
  return result;
}

/**
 * ДЕШИФРОВКА ПЛЕЙФЕРА
 */
export function decryptPlayfair(cipherText, key, options = {}) {
  if (!key) return cipherText;
  
  const matrix = generateMatrix(key);
  
  const cleanText = cipherText
    .toUpperCase()
    .replace(/[^А-ЯЁ.,!]/g, '');
  
  const pairs = [];
  for (let i = 0; i < cleanText.length; i += 2) {
    const a = cleanText[i];
    const b = cleanText[i + 1] || 'Х';
    pairs.push([a, b]);
  }
  
  let result = '';
  
  for (const [a, b] of pairs) {
    const posA = findPosition(matrix, a);
    const posB = findPosition(matrix, b);
    
    if (!posA || !posB) {
      result += a + b;
      continue;
    }
    
    // Одна строка (сдвиг влево)
    if (posA.row === posB.row) {
      result += matrix[posA.row][(posA.col + 5) % 6];
      result += matrix[posB.row][(posB.col + 5) % 6];
    }
    // Один столбец (сдвиг вверх)
    else if (posA.col === posB.col) {
      result += matrix[(posA.row + 5) % 6][posA.col];
      result += matrix[(posB.row + 5) % 6][posB.col];
    }
    // Прямоугольник
    else {
      result += matrix[posA.row][posB.col];
      result += matrix[posB.row][posA.col];
    }
  }
  
  return options.removeFillers ? removeFillers(result) : result;
}