import { writeFileSync } from 'fs';
import { encryptPlayfair } from './ciphers/playfair.js';

// Русский алфавит (33 буквы)
const RU = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

// ==================== ФУНКЦИИ ШИФРОВАНИЯ ====================

function caesarEncrypt(text, shift) {
  return text.split('').map(ch => {
    const idx = RU.indexOf(ch);
    if (idx === -1) return ch;
    return RU[(idx + shift) % 33];
  }).join('');
}

function atbashEncrypt(text) {
  return text.split('').map(ch => {
    const idx = RU.indexOf(ch);
    if (idx === -1) return ch;
    return RU[32 - idx];
  }).join('');
}

function polybiusEncrypt(text) {
  const grid = [
    ['А', 'Б', 'В', 'Г', 'Д', 'Е'],
    ['Ё', 'Ж', 'З', 'И', 'Й', 'К'],
    ['Л', 'М', 'Н', 'О', 'П', 'Р'],
    ['С', 'Т', 'У', 'Ф', 'Х', 'Ц'],
    ['Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь'],
    ['Э', 'Ю', 'Я', ',', '.', ' ']
  ];
  
  const posMap = {};
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      posMap[grid[row][col]] = `${row + 1}${col + 1}`;
    }
  }
  
  return text.split('').map(ch => {
    if (ch === ' ') return '66';
    if (ch === ',') return '64';
    if (ch === '.') return '65';
    return posMap[ch] || '??';
  }).join(' ');
}

function vigenereEncrypt(text, key) {
  let result = '';
  for (let i = 0, j = 0; i < text.length; i++) {
    const ch = text[i];
    const idx = RU.indexOf(ch);
    if (idx === -1) {
      result += ch;
      continue;
    }
    const keyChar = key[j % key.length];
    const keyIdx = RU.indexOf(keyChar);
    result += RU[(idx + keyIdx) % 33];
    j++;
  }
  return result;
}

function morseEncrypt(text) {
  const morseMap = {
    'А': '.-', 'Б': '-...', 'В': '.--', 'Г': '--.', 'Д': '-..', 'Е': '.', 'Ё': '.',
    'Ж': '...-', 'З': '--..', 'И': '..', 'Й': '.---', 'К': '-.-', 'Л': '.-..',
    'М': '--', 'Н': '-.', 'О': '---', 'П': '.--.', 'Р': '.-.', 'С': '...',
    'Т': '-', 'У': '..-', 'Ф': '..-.', 'Х': '....', 'Ц': '-.-.', 'Ч': '---.',
    'Ш': '----', 'Щ': '--.-', 'Ъ': '--.--', 'Ы': '-.--', 'Ь': '-..-',
    'Э': '..-..', 'Ю': '..--', 'Я': '.-.-', ' ': '/'
  };
  return text.split('').map(ch => morseMap[ch] || ch).join(' ');
}

// ==================== СЛОВАРИ ====================

const words = {
  level1: [
    'ПРИВЕТ', 'ШИФР', 'ТАЙНА', 'КЛЮЧ', 'КОД', 'ЩИТ', 'МЕЧ', 'СВЕТ', 'ТЬМА', 'ЗНАК',
    'ВЕТЕР', 'ГОЛОС', 'СТЕНА', 'МОСТ', 'ЗАМОК', 'СЛЕД', 'ПУТЬ', 'ДОЖДЬ', 'ЗВУК', 'МАЯК'
  ],
  level2: [
    'СЕКРЕТНЫЙ КОД', 'ТАЙНОЕ ПОСЛАНИЕ', 'ШИФР ЦЕЗАРЯ', 'ВЗЛОМ ШИФРА',
    'ЗАЩИТА ДАННЫХ', 'КЛЮЧ ШИФРОВАНИЯ', 'ТАЙНАЯ ОПЕРАЦИЯ', 'СЕКРЕТНАЯ МИССИЯ',
    'КОДОВОЕ СЛОВО', 'АГЕНТ ПОД ПРИКРЫТИЕМ', 'ШИФРОВАННЫЙ КАНАЛ', 'ТАЙНЫЙ АГЕНТ',
    'СЕКРЕТНАЯ КОМНАТА', 'ЗАШИФРОВАННЫЙ ТЕКСТ', 'КРИПТОГРАФИЧЕСКИЙ КЛЮЧ',
    'ТАЙНАЯ ПЕРЕПИСКА', 'СЕКРЕТНЫЙ АРХИВ', 'ШИФРОВАЛЬНАЯ МАШИНА',
    'ТАЙНЫЙ ШИФР', 'КРИПТОАНАЛИТИК'
  ],
  level3: [
    'ПРИШЁЛ УВИДЕЛ ПОБЕДИЛ',
    'ЗНАНИЕ ЭТО СИЛА',
    'ИНФОРМАЦИЯ ПРАВИТ МИРОМ',
    'ШИФРЫ МЕНЯЮТ ИСТОРИЮ',
    'ТАЙНЫ ДОЛЖНЫ ОСТАВАТЬСЯ ТАЙНАМИ',
    'КРИПТОГРАФИЯ НАУКА О СЕКРЕТАХ',
    'КАЖДЫЙ ШИФР МОЖНО ВЗЛОМАТЬ',
    'БЕЗОПАСНОСТЬ ПРЕВЫШЕ ВСЕГО',
    'ДОВЕРЯЙ НО ПРОВЕРЯЙ',
    'ШИФРОВАНИЕ СПАСАЕТ ЖИЗНИ',
    'СЛОЖНЫЙ ПАРОЛЬ ЗАЛОГ УСПЕХА',
    'ТАЙНАЯ СВЯЗЬ РЕШАЕТ ИСХОД ВОЙНЫ',
    'КРИПТОГРАФЫ ГЕРОИ НЕВИДИМОГО ФРОНТА',
    'СЕКРЕТНАЯ ИНФОРМАЦИЯ ЦЕННЕЕ ЗОЛОТА',
    'ВЗЛОМ ШИФРА ЭТО ИСКУССТВО',
    'МАТЕМАТИКА ОСНОВА КРИПТОГРАФИИ',
    'КВАНТОВЫЕ КОМПЬЮТЕРЫ УГРОЗА ШИФРАМ',
    'ИСТОРИЯ ШИФРОВ ЭТО ИСТОРИЯ ВОЙН',
    'ЗАЩИТА ИНФОРМАЦИИ ЭТО ЗАЩИТА СВОБОДЫ',
    'НАСТОЯЩАЯ ТАЙНА НЕВИДИМА'
  ]
};

// Исторические справки
const histories = {
  level1: [
    'Короткое слово русского языка.',
    'Базовое слово для тренировки.',
    'Простое слово, чтобы размяться.',
    'Одно из частотных слов в криптографии.',
    'Слово, которое часто шифруют новички.'
  ],
  level2: [
    'Фраза, связанная с миром шифрования.',
    'Термин из области криптографии.',
    'Выражение, популярное среди криптографов.',
    'Фраза-пароль для доступа к секретам.',
    'Кодовое выражение агентов.'
  ],
  level3: [
    'Известное высказывание о шифрах.',
    'Цитата великого криптографа.',
    'Мудрость, скрытая за шифром.',
    'Историческая фраза о тайнах.',
    'Афоризм о безопасности информации.'
  ]
};

// Ключи для шифров
const vigenereKeys = ['КЛЮЧ', 'ШИФР', 'ТАЙНА', 'СЕКРЕТ', 'КОД', 'ЗАЩИТА', 'АГЕНТ', 'ВЗЛОМ', 'КРИПТО', 'МАСТЕР'];
const playfairKeys = ['ШИФР', 'КЛЮЧ', 'ТАЙНА', 'СЕКРЕТ', 'КОД'];

// ==================== ГЕНЕРАЦИЯ ====================

const tasks = [];
let id = 1;

const ciphers = [
  { name: 'caesar', generator: caesarEncrypt, settings: (level) => ({ shift: level === 1 ? 3 : level === 2 ? 7 : 11 }) },
  { name: 'atbash', generator: atbashEncrypt, settings: () => ({}) },
  { name: 'polybius', generator: polybiusEncrypt, settings: () => ({}) },
  { name: 'vigenere', generator: (text, level) => vigenereEncrypt(text, vigenereKeys[(level - 1) * 3 + Math.floor(Math.random() * 3)]), settings: (level) => ({ key: vigenereKeys[(level - 1) * 3] }) },
  { name: 'morse', generator: morseEncrypt, settings: () => ({}) },
  { name: 'playfair', generator: (text, level) => encryptPlayfair(text, playfairKeys[level - 1]), settings: (level) => ({ key: playfairKeys[level - 1] }) }
];

for (const cipher of ciphers) {
  for (let level = 1; level <= 3; level++) {
    const wordList = words['level' + level];
    const historyList = histories['level' + level];
    const settings = cipher.settings(level);
    
    for (let i = 0; i < wordList.length; i++) {
      const plaintext = wordList[i];
      let ciphertext;
      
      if (cipher.name === 'vigenere') {
        ciphertext = vigenereEncrypt(plaintext, settings.key);
      } else if (cipher.name === 'playfair') {
        ciphertext = encryptPlayfair(plaintext, settings.key);
      } else {
        ciphertext = cipher.generator(plaintext, level);
      }
      
      tasks.push({
        id: id++,
        cipher: cipher.name,
        level: level,
        plaintext: plaintext,
        ciphertext: ciphertext,
        settings: settings,
        history: historyList[i % historyList.length]
      });
    }
  }
}

// Записываем в файл
writeFileSync('./data/tasks.json', JSON.stringify(tasks, null, 2), 'utf-8');
console.log(`✅ Сгенерировано ${tasks.length} заданий`);
console.log('📁 Файл сохранён: ./data/tasks.json');