export function initRouter() {
  window.removeEventListener('hashchange', route);
  window.addEventListener('hashchange', route);
  route();
}

async function route() {
  const hash = location.hash || '#';
  console.log('Router: текущий хэш =', hash);
  
  // Показываем индикатор загрузки
  const app = document.getElementById('app');
  app.innerHTML = '<div class="loading"><span class="prompt">></span> Загрузка...</div>';
  
  try {
    if (hash.startsWith('#game?')) {
      const params = new URLSearchParams(hash.split('?')[1]);
      if (params.get('level')) {
        console.log('Запуск игры с уровнем...');
        const { renderGame } = await import('./ui/gameView.js');
        renderGame();
      } else {
        console.log('Показываем выбор уровня...');
        const { renderLevelSelect } = await import('./ui/levelSelect.js');
        renderLevelSelect();
      }
    } else if (hash.startsWith('#library')) {
      console.log('Загружаем библиотеку...');
      const { renderLibrary } = await import('./ui/library.js');
      renderLibrary();
    } else if (hash.startsWith('#achievements')) {
      console.log('Загружаем достижения...');
      const { renderAchievements } = await import('./ui/achievements.js');
      renderAchievements();
    } else {
      console.log('Загружаем главный экран...');
      const { renderHome } = await import('./ui/home.js');
      renderHome();
    }
  } catch (error) {
    console.error('Ошибка в роутере:', error);
    document.getElementById('app').innerHTML = `
      <div style="color: red; padding: 20px;">
        <h2>> ОШИБКА ЗАГРУЗКИ</h2>
        <p>${error.message}</p>
        <button onclick="location.hash='#'">[ НА ГЛАВНУЮ ]</button>
      </div>
    `;
  }
}