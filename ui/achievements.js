import { getAchievements } from '../core/storage.js';

const allAchievements = [
  { id: 'first_hack', name: 'Первый взлом', desc: 'Разгадать любой шифр на любом уровне', icon: '🔓', category: 'novice', rarity: 'common', rarityName: 'Обычное' },
  { id: 'first_caesar', name: 'В духе Цезаря', desc: 'Разгадать шифр Цезаря на уровне «Новичок»', icon: '🏛️', category: 'novice', rarity: 'common', rarityName: 'Обычное' },
  { id: 'first_atbash', name: 'Зеркальный мир', desc: 'Разгадать шифр Атбаш на любом уровне', icon: '🪞', category: 'novice', rarity: 'common', rarityName: 'Обычное' },
  { id: 'first_polybius', name: 'Греческий квадрат', desc: 'Разгадать шифр Полибия на любом уровне', icon: '🏺', category: 'novice', rarity: 'common', rarityName: 'Обычное' },
  { id: 'first_vigenere', name: 'Нерасшифровываемый', desc: 'Разгадать шифр Виженера на любом уровне', icon: '🔑', category: 'novice', rarity: 'common', rarityName: 'Обычное' },
  { id: 'first_morse', name: 'Телеграфист', desc: 'Разгадать шифр Морзе на любом уровне', icon: '📡', category: 'novice', rarity: 'common', rarityName: 'Обычное' },
  { id: 'first_playfair', name: 'Играем честно', desc: 'Разгадать шифр Плейфера на любом уровне', icon: '🎯', category: 'novice', rarity: 'common', rarityName: 'Обычное' },
  
  { id: 'master_caesar', name: 'Мастер Цезаря', desc: 'Пройти шифр Цезаря на уровне «Криптограф»', icon: '👑', category: 'master', rarity: 'rare', rarityName: 'Редкое' },
  { id: 'master_atbash', name: 'Мастер зеркал', desc: 'Пройти шифр Атбаш на уровне «Криптограф»', icon: '💎', category: 'master', rarity: 'rare', rarityName: 'Редкое' },
  { id: 'master_polybius', name: 'Архитектор сетки', desc: 'Пройти шифр Полибия на уровне «Криптограф»', icon: '🏗️', category: 'master', rarity: 'rare', rarityName: 'Редкое' },
  { id: 'master_vigenere', name: 'Взломщик кодов', desc: 'Пройти шифр Виженера на уровне «Криптограф»', icon: '⚔️', category: 'master', rarity: 'rare', rarityName: 'Редкое' },
  { id: 'master_morse', name: 'Радист-ас', desc: 'Пройти шифр Морзе на уровне «Криптограф»', icon: '📻', category: 'master', rarity: 'rare', rarityName: 'Редкое' },
  { id: 'master_playfair', name: 'Лорд Плейфер', desc: 'Пройти шифр Плейфера на уровне «Криптограф»', icon: '🎩', category: 'master', rarity: 'rare', rarityName: 'Редкое' },
  
  { id: 'no_draft', name: 'Без черновика', desc: 'Разгадать любой шифр на уровне «Криптограф»', icon: '🧠', category: 'expert', rarity: 'epic', rarityName: 'Эпическое' },
  { id: 'speed_of_sound', name: 'Скорость звука', desc: 'Разгадать шифр менее чем за 20% времени', icon: '⚡', category: 'expert', rarity: 'epic', rarityName: 'Эпическое' },
  { id: 'first_try', name: 'С первой попытки', desc: 'Разгадать шифр без единой ошибки', icon: '🎯', category: 'expert', rarity: 'epic', rarityName: 'Эпическое' },
  { id: 'speed_demon', name: 'Демон скорости', desc: 'Разгадать шифр менее чем за 30 секунд', icon: '🔥', category: 'expert', rarity: 'legendary', rarityName: 'Легендарное' },
  { id: 'all_novice', name: 'Коллекционер новичка', desc: 'Пройти все 6 шифров на уровне «Новичок»', icon: '⭐', category: 'expert', rarity: 'rare', rarityName: 'Редкое' },
  { id: 'all_master', name: 'Легенда криптографии', desc: 'Пройти все 6 шифров на уровне «Криптограф»', icon: '🌟', category: 'expert', rarity: 'legendary', rarityName: 'Легендарное' },
  
  { id: 'perfect_run', name: 'Идеальный взлом', desc: 'Разгадать шифр за минимальное время без ошибок на «Криптографе»', icon: '💫', category: 'secret', rarity: 'mythic', rarityName: 'Мифическое' },
  { id: 'midnight_hacker', name: 'Полуночный хакер', desc: 'Разгадать шифр между 00:00 и 04:00', icon: '🌙', category: 'secret', rarity: 'mythic', rarityName: 'Мифическое' },
  { id: 'full_library', name: 'Профессор криптографии', desc: 'Прочитать все статьи в библиотеке шифров', icon: '📚', category: 'secret', rarity: 'legendary', rarityName: 'Легендарное' },
  { id: 'ten_hacks', name: 'Десятый взлом', desc: 'Разгадать 10 шифров суммарно', icon: '🔟', category: 'secret', rarity: 'epic', rarityName: 'Эпическое' },
  { id: 'fifty_hacks', name: 'Полтинник', desc: 'Разгадать 50 шифров суммарно', icon: '🏅', category: 'secret', rarity: 'legendary', rarityName: 'Легендарное' },
  { id: 'hundred_hacks', name: 'Взломщик столетия', desc: 'Разгадать 100 шифров', icon: '🏆', category: 'secret', rarity: 'mythic', rarityName: 'Мифическое' },
  { id: 'no_mistakes_day', name: 'День без ошибок', desc: 'Разгадать 3 шифра подряд без ошибок', icon: '✨', category: 'secret', rarity: 'epic', rarityName: 'Эпическое' },
  { id: 'collector', name: 'Коллекционер', desc: 'Разблокировать всё Новичка и Мастера', icon: '🗃️', category: 'secret', rarity: 'mythic', rarityName: 'Мифическое' },
  { id: 'glitch', name: 'Глюк в матрице', desc: 'Открыть карточку разработчика 10 раз', icon: '🌀', category: 'secret', rarity: 'legendary', rarityName: 'Легендарное' }
];

const categories = [
  { key: 'novice', name: 'НОВИЧОК', icon: '🟢' },
  { key: 'master', name: 'МАСТЕР', icon: '🔵' },
  { key: 'expert', name: 'ЭКСПЕРТ', icon: '🟣' },
  { key: 'secret', name: 'СЕКРЕТНЫЕ', icon: '🟡' }
];

const rarityColors = {
  common: { color: '#888', borderColor: '#555' },
  rare: { color: '#00BFFF', borderColor: '#00BFFF' },
  epic: { color: '#B347EA', borderColor: '#B347EA' },
  legendary: { color: '#FFD700', borderColor: '#FFD700' },
  mythic: { color: '#FF3333', borderColor: '#FF3333' }
};

export function renderAchievements() {
  const app = document.getElementById('app');
  const unlocked = getAchievements();
  const unlockedIds = unlocked.map(a => a.id);
  
  const totalUnlocked = unlockedIds.length;
  const totalAll = allAchievements.length;
  const percent = Math.round((totalUnlocked / totalAll) * 100);
  
  const catStats = categories.map(cat => {
    const catAchievements = allAchievements.filter(a => a.category === cat.key);
    const unlockedCount = catAchievements.filter(a => unlockedIds.includes(a.id)).length;
    return { ...cat, unlocked: unlockedCount, total: catAchievements.length };
  });
  
app.innerHTML = `
    <div class="achievements-container">
      <header class="achievements-header">
        <div class="header-line">
          <span class="prompt-symbol">></span>
        </div>
        <h1 class="main-title" style="font-size: 2.3rem;">
          <span class="glitch-text" data-text="ДОСТИЖЕНИЯ">ДОСТИЖЕНИЯ</span>
        </h1>
        <div class="subtitle-container">
          <span class="line-decoration"></span>
          <p class="subtitle">Ваши игровые победы</p>
          <span class="line-decoration"></span>
        </div>
        <p style="text-align: center; opacity: 0.7; margin-bottom: 2rem;">
          ${percent}% выполнено (${totalUnlocked}/${totalAll})
        </p>
      </header>

      <div class="stats-inline" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding: 1rem; background: rgba(0,0,0,0.3); border-left: 3px solid #00ff9d;">
        <div class="stats-percent" style="font-size: 1.5rem; font-weight: bold;">
          <span class="percent-value" style="color: #00ff9d;">${percent}%</span>
          <span class="percent-label" style="margin-left: 0.5rem; opacity: 0.7;">${totalUnlocked}/${totalAll}</span>
        </div>
        
        <div class="stats-categories" style="display: flex; gap: 1rem;">
          ${catStats.map(cat => `
            <div class="stats-cat-item" style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="stats-cat-icon">${cat.icon}</span>
              <span class="stats-cat-name" style="opacity: 0.8;">${cat.name}</span>
              <span class="stats-cat-count" style="color: #00ff9d;">${cat.unlocked}/${cat.total}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="library-grid achievements-grid">
        ${allAchievements.map(ach => {
          const isUnlocked = unlockedIds.includes(ach.id);
          const isSecretLocked = !isUnlocked && ach.category === 'secret';
          
          return `
            <div class="library-card achievement-card ${isUnlocked ? 'unlocked' : 'locked'}" style="opacity: ${isUnlocked ? 1 : 0.7};">
              <div class="library-card-header">
                <span class="card-number">${ach.icon}</span>
                <span class="card-arrow">${isUnlocked ? '✓' : '🔒'}</span>
              </div>
              <h3 class="library-card-title" style="font-size: 1.3rem;">${isSecretLocked ? '???' : ach.name}</h3>
              <div class="library-card-preview" style="font-size: 0.9rem;">
                ${isSecretLocked ? 'Условия получения скрыты' : ach.desc}
              </div>
              <div class="library-card-footer">
                <span class="card-action" style="color: ${isUnlocked ? rarityColors[ach.rarity]?.color || '#00ff9d' : '#666'}">
                  ${isUnlocked ? ach.rarityName : '[ ЗАКРЫТО ]'}
                </span>
                <span class="ach-cat-badge" style="margin-left: 0.5rem;">${categories.find(c => c.key === ach.category).icon}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <button class="nav-button" onclick="location.hash='#'" style="margin: 2rem auto; display: flex;">
        [ НА ГЛАВНУЮ ]
      </button>
    </div>
  `;
}