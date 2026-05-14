const MORSE_MAP = {
  'А': '.-', 'Б': '-...', 'В': '.--', 'Г': '--.', 'Д': '-..', 'Е': '.',     
  'Ё': '.', 'Ж': '...-', 'З': '--..', 'И': '..', 'Й': '.---', 'К': '-.-',    
  'Л': '.-..', 'М': '--', 'Н': '-.', 'О': '---', 'П': '.--.', 'Р': '.-.',
  'С': '...', 'Т': '-', 'У': '..-', 'Ф': '..-.', 'Х': '....', 'Ц': '-.-.',
  'Ч': '---.', 'Ш': '----', 'Щ': '--.-', 'Ъ': '--.--', 'Ы': '-.--', 'Ь': '-..-', 
  'Э': '..-..', 'Ю': '..--', 'Я': '.-.-',
  '0': '-----',   '1': '.----',   '2': '..---',   '3': '...--',
  '4': '....-',   '5': '.....',   '6': '-....',   '7': '--...',
  '8': '---..',   '9': '----.',
  // Служебные
  ' ': '/'
};

// Для обратного преобразования учитываем, что Е и Ё имеют одинаковый код
const REVERSE_MAP = new Map();
for (const [char, code] of Object.entries(MORSE_MAP)) {
  // Если код уже есть, не перезаписываем (E останется, Ё не перезапишет)
  if (!REVERSE_MAP.has(code)) {
    REVERSE_MAP.set(code, char);
  }
}

export function morseToText(morseCode) {
  const words = morseCode.trim().split('/').map(w => w.trim());
  return words.map(word => 
    word.split(' ').map(symbol => REVERSE_MAP.get(symbol) || '?').join('')
  ).join(' ');
}


export function textToMorse(text) {
  return text.toUpperCase().split('').map(ch => {
    if (ch === ' ') return '/';
    return MORSE_MAP[ch] || '?';
  }).join(' ');
}

export function getMorseTable() {
  return { ...MORSE_MAP };
}