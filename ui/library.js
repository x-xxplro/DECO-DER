const cipherLibrary = {
  caesar: {
    name: 'ЦЕЗАРЬ',
    icon: 'caesar',
    history: `
      <p>Шифр Цезаря — один из самых древних и простых методов шифрования. Назван в честь римского императора Гая Юлия Цезаря, который использовал его для секретной переписки со своими генералами (100–44 гг. до н.э.).</p>
      <p>Светоний описывает, что Цезарь шифровал послания, заменяя каждую букву на ту, что находится в алфавите тремя позициями далее. Это делало текст нечитаемым для вражеских шпионов, перехватывающих гонцов.</p>
    `,
    principle: `
      <p><strong>Принцип работы:</strong> Каждая буква открытого текста заменяется буквой, смещённой на фиксированное число позиций в алфавите. Ключом является число сдвига (от 1 до 32 для русского алфавита).</p>
      <p><strong>Формула шифрования:</strong> E(x) = (x + k) mod 33</p>
      <p><strong>Формула расшифровки:</strong> D(x) = (x - k) mod 33</p>
      <p>Где x — позиция буквы (0-32), k — сдвиг, 33 — размер русского алфавита (включая Ё).</p>
    `,
    example: `
      <div class="example-block">
        <div class="example-step">
          <span class="example-label">Открытый текст:</span>
          <span class="example-value">ПРИВЕТ</span>
        </div>
        <div class="example-step">
          <span class="example-label">Сдвиг:</span>
          <span class="example-value">3</span>
        </div>
        <div class="example-step">
          <span class="example-label">Шифротекст:</span>
          <span class="example-value highlight">ТУЛЁХЗ</span>
        </div>
        <div class="example-note">Примечание: Алфавит включает букву Ё (позиция 6)</div>
      </div>
    `,
    weakness: `
      <p>Шифр крайне уязвим для частотного анализа и полного перебора (брутфорса). Всего 32 возможных ключа для русского алфавита — перебор занимает секунды даже вручную. В реальных задачах сдвиг часто маскируется ключевым словом, но это не спасает от криптоанализа.</p>
    `
  },
  
  atbash: {
    name: 'АТБАШ',
    icon: 'atbash',
    history: `
      <p>Шифр Атбаш — древний еврейский метод шифрования, упоминаемый в Книге Иеремии (Ветхий Завет). Название происходит от принципа замены: первая буква алфавита (Алеф) заменяется на последнюю (Тав), вторая (Бет) — на предпоследнюю (Шин), отсюда АТ-БАШ.</p>
      <p>Изначально применялся для сокрытия религиозных текстов, а позже использовался каббалистами для мистических интерпретаций Торы. Для русского языка применяется аналогичный принцип зеркального отображения алфавита.</p>
    `,
    principle: `
      <p><strong>Принцип работы:</strong> Русский алфавит «отражается зеркально» — первая буква (А) заменяется на последнюю (Я), вторая (Б) на предпоследнюю (Ю), и так далее. Буква Ё занимает свою позицию в алфавите (6-я буква после Е).</p>
      <p><strong>Формула:</strong> i' = 32 - i, где i — позиция буквы (0-32), 32 — индекс последней буквы Я.</p>
      <p>Фактически это частный случай шифра Цезаря со сдвигом 32. Интересен тем, что функция шифрования и расшифровки совпадают.</p>
    `,
    example: `
      <div class="example-block">
        <div class="example-step">
          <span class="example-label">Открытый текст:</span>
          <span class="example-value">ШИФР</span>
        </div>
        <div class="example-step">
          <span class="example-label">Алгоритм:</span>
          <span class="example-value">Ш(24)→Ь(8), И(8)→Ф(21), Ф(21)→И(8), Р(17)→Й(15)</span>
        </div>
        <div class="example-step">
          <span class="example-label">Шифротекст:</span>
          <span class="example-value highlight">ЬФИЙ</span>
        </div>
        <div class="example-note">Примечание: Позиции букв в алфавите от 0 (А) до 32 (Я), Ё на позиции 6</div>
      </div>
    `,
    weakness: `
      <p>Метод не имеет ключа — преобразование фиксировано. Если противник знает, что используется Атбаш, расшифровка мгновенна. Подходит только для сокрытия от случайного взгляда или как первый шаг в многослойном шифровании.</p>
    `
  },
  
  polybius: {
    name: 'ПОЛИБИЙ',
    icon: 'polybius',
    history: `
      <p>Квадрат Полибия изобретён древнегреческим историком Полибием (II век до н.э.). Изначально использовался для передачи сообщений с помощью факелов в ночное время: количество факелов в двух группах указывало строку и столбец.</p>
      <p>Позже метод стал основой для многих шифров, включая шифр ADFGVX, использовавшийся немцами в Первой мировой войне. Для русского языка используется расширенная сетка 6×6 для размещения всех 33 букв алфавита.</p>
    `,
    principle: `
      <p><strong>Принцип работы:</strong> Для русского алфавита используется квадрат 6×6 (36 ячеек), в который помещаются 33 буквы + 3 символа (обычно точка, запятая, пробел). Каждая буква кодируется парой чисел — номером строки и столбца (от 11 до 66).</p>
      <p>Сетка заполняется стандартным порядком букв, либо с использованием ключевого слова для перемешивания. Координаты передаются как двузначные числа, например: 11=А, 12=Б, 13=В и так далее.</p>
    `,
    example: `
      <div class="example-block">
        <div class="example-step">
          <span class="example-label">Сетка 6×6 (первые строки):</span>
          <div class="mini-grid">
            <div class="mini-grid-row">1: А(11) Б(12) В(13) Г(14) Д(15) Е(16)</div>
            <div class="mini-grid-row">2: Ё(21) Ж(22) З(23) И(24) Й(25) К(26)</div>
            <div class="mini-grid-row">3: Л(31) М(32) Н(33) О(34) П(35) Р(36)</div>
          </div>
        </div>
        <div class="example-step">
          <span class="example-label">Открытый текст:</span>
          <span class="example-value">КОД</span>
        </div>
        <div class="example-step">
          <span class="example-label">Шифротекст:</span>
          <span class="example-value highlight">26 34 15</span>
        </div>
        <div class="example-note">Примечание: К=26 (2 строка, 6 столбец), О=34 (3 строка, 4 столбец), Д=15 (1 строка, 5 столбец)</div>
      </div>
    `,
    weakness: `
      <p>Фактически это простая замена, но вместо букв используются числа. Уязвим для частотного анализа — наиболее частые числа соответствуют наиболее частым буквам. Количество информации удваивается (одна буква → две цифры), что замедляет передачу сообщения.</p>
    `
  },
  
  vigenere: {
    name: 'ВИЖЕНЕР',
    icon: 'vigenere',
    history: `
      <p>Шифр Виженера впервые описан Джованом Баттистой Беллазо в 1553 году, но ошибочно приписывается Блезу де Виженеру (1586). Долгое время назывался «le chiffre indéchiffrable» — «нерасшифровываемый шифр».</p>
      <p>Только в 1863 году Фридрих Касиски разработал метод его взлома, определив длину ключевого слова. Шифр активно использовался конфедератами в Гражданской войне США. Для русского языка адаптируется с использованием 33-буквенного алфавита.</p>
    `,
    principle: `
      <p><strong>Принцип работы:</strong> Полиалфавитный шифр — каждая буква сдвигается на разное количество позиций в зависимости от ключевого слова. Используется таблица Виженера (tabula recta) размером 33×33.</p>
      <p><strong>Формула:</strong> C[i] = (P[i] + K[i mod len]) mod 33</p>
      <p>Где P — открытый текст, K — ключ (переводится в числовые значения позиций букв), 33 — размер русского алфавита.</p>
    `,
    example: `
      <div class="example-block">
        <div class="example-step">
          <span class="example-label">Открытый текст:</span>
          <span class="example-value">СЕКРЕТ</span>
        </div>
        <div class="example-step">
          <span class="example-label">Ключ:</span>
          <span class="example-value">КЛЮЧ</span>
        </div>
        <div class="example-step">
          <span class="example-label">Расчёт:</span>
          <span class="example-value">С(17)+К(11)=Ё(28), Е(5)+Л(12)=Р(17), К(11)+Ю(29)=Я(40→7)...</span>
        </div>
        <div class="example-step">
          <span class="example-label">Шифротекст:</span>
          <span class="example-value highlight">ЁРЯТЗФ</span>
        </div>
      </div>
    `,
    weakness: `
      <p>Уязвим для метода Касиски (поиск повторяющихся фрагментов шифротекста для определения длины ключа). Короткий ключ легко взламывается частотным анализом по позициям. Современные компьютеры взламывают шифр Виженера любой длины ключа за доли секунды. Однако при очень длинном ключе (длиннее сообщения) и случайном ключе становится шифром Вернама — теоретически стойким.</p>
    `
  },
  
  morse: {
    name: 'МОРЗЕ',
    icon: 'morse',
    history: `
      <p>Азбука Морзе разработана Сэмюэлем Морзе и Альфредом Вейлем в 1838 году для телеграфной связи. Первое сообщение «What hath God wrought» отправлено 24 мая 1844 года из Вашингтона в Балтимор.</p>
      <p>Стала международным стандартом связи, особенно в морском деле и авиации. Сигнал SOS (... --- ...) — самый известный сигнал Морзе, принятый в 1906 году. Для русского языка существует адаптированная версия с учётом кириллических символов.</p>
    `,
    principle: `
      <p><strong>Принцип работы:</strong> Каждая буква и цифра кодируется уникальной последовательностью коротких (точка) и длинных (тире) сигналов. Длительность тире в 3 раза больше точки. Пауза между буквами — 3 точки, между словами — 7 точек.</p>
      <p>Это не шифрование в классическом смысле, а кодирование. Однако при отсутствии таблицы у перехватчика служит базовой защитой.</p>
    `,
    example: `
      <div class="example-block">
        <div class="example-step">
          <span class="example-label">Текст:</span>
          <span class="example-value">МИР</span>
        </div>
        <div class="example-step">
          <span class="example-label">Код Морзе:</span>
          <span class="example-value highlight">-- .. .-.</span>
        </div>
        <div class="example-step">
          <span class="example-label">Русские буквы:</span>
          <span class="example-value">М(--) И(..) Р(.-.)</span>
        </div>
      </div>
    `,
    weakness: `
      <p>Полностью открытый стандарт — таблица кодирования общеизвестна в интернете и специализированных справочниках. Не обеспечивает секретности, только преобразует формат для передачи. Основная защита — в незнании кодов человеком, перехватившим сигнал. Для криптоанализа достаточно найти таблицу Морзе.</p>
    `
  },
  
  playfair: {
    name: 'ПЛЕЙФЕР',
    icon: 'playfair',
    history: `
      <p>Шифр Плейфера изобретён Чарльзом Уитстоном в 1854 году, но назван в честь лорда Лайона Плейфера, который продвигал его использование. Применялся британскими войсками во Второй англо-бурской войне и Первой мировой войне.</p>
      <p>Был основным шифром британской армии до появления машинного шифрования. Для русского языка используется матрица 6×6, так как русский алфавит содержит 33 буквы (против 26 в английском).</p>
    `,
    principle: `
      <p><strong>Принцип работы:</strong> Биграммный шифр — шифрует пары букв одновременно на основе матрицы 6×6, заполненной ключевым словом и оставшимися буквами алфавита. При нечётном количестве букв добавляется символ 'Х'.</p>
      <p><strong>Правила замены пары (при расшифровке):</strong><br>
      ▸ Если буквы в одной строке — берётся буква <b>СЛЕВА</b> от каждой (циклически)<br>
      ▸ Если в одном столбце — берётся буква <b>СВЕРХУ</b> от каждой (циклически)<br>
      ▸ Если в разных строках и столбцах — берутся буквы на <b>противоположных углах прямоугольника</b></p>
    `,
    example: `
      <div class="example-block">
        <div class="example-step">
          <span class="example-label">Ключ:</span>
          <span class="example-value">ШИФР</span>
        </div>
        <div class="example-step">
          <span class="example-label">Открытый текст:</span>
          <span class="example-value">ПРИВЕТ</span>
        </div>
        <div class="example-step">
          <span class="example-label">Пары:</span>
          <span class="example-value">ПР-ИВ-ЕТ</span>
        </div>
        <div class="example-step">
          <span class="example-label">Шифротекст:</span>
          <span class="example-value highlight">УДЧФОИ</span>
        </div>
        <div class="example-note">Примечание: Для русского языка используется матрица 6×6, включающая все 33 буквы + символы ., ! и пробел</div>
      </div>
    `,
    weakness: `
      <p>Уязвим для частотного анализа биграмм — определённые пары букв в русском языке встречаются чаще других (ст, но, то, на и т.д.). Размер матрицы фиксирован (6×6 = 36 ячеек), что позволяет разместить все буквы без потерь. Современными методами (например, с использованием индекса совпадений) взламывается достаточно быстро при наличии достаточно длинного шифротекста (более 100-200 символов).</p>
    `
  }
};

export function renderLibrary() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="library-container">
      <header class="library-header">
        <div class="header-line">
          <span class="prompt-symbol">></span>
        </div>
        <h1 class="main-title" style="font-size: 2.3rem;">
          <span class="glitch-text" data-text="БИБЛИОТЕКА">БИБЛИОТЕКА</span>
        </h1>
        <div class="subtitle-container">
          <span class="line-decoration"></span>
          <p class="subtitle">Классические шифры</p>
          <span class="line-decoration"></span>
        </div>
        <p style="text-align: center; opacity: 0.7; margin-bottom: 2rem;">
          Изучите историю и принципы работы каждого шифра перед практическим взломом
        </p>
      </header>

      <div class="library-grid">
        ${Object.entries(cipherLibrary).map(([id, cipher]) => `
          <div class="library-card" onclick="window.showCipherDetail('${id}')">
            <div class="library-card-header">
              <span class="card-number">[${cipher.name}]</span>
              <span class="card-arrow">→</span>
            </div>
            <h3 class="library-card-title">${cipher.name}</h3>
            <div class="library-card-preview">
              ${cipher.history.substring(0, 150)}...
            </div>
            <div class="library-card-footer">
              <span class="card-action">[ ПОДРОБНЕЕ ]</span>
            </div>
          </div>
        `).join('')}
      </div>

      <button class="nav-button" onclick="location.hash='#'" style="margin: 2rem auto; display: flex;">
        [ НА ГЛАВНУЮ ]
      </button>
    </div>

    <!-- Контейнер для детального просмотра -->
    <div id="cipherDetail" style="display: none;"></div>
  `;

  // Функция показа детальной информации о шифре
  window.showCipherDetail = function(cipherId) {
    const cipher = cipherLibrary[cipherId];
    if (!cipher) return;
    
    const detailContainer = document.getElementById('cipherDetail');
    detailContainer.innerHTML = `
      <div class="detail-overlay" onclick="window.hideCipherDetail()">
        <div class="detail-content" onclick="event.stopPropagation()">
          <div class="detail-header">
            <span class="prompt-symbol">></span>
            <h2>${cipher.name}</h2>
            <button class="detail-close" onclick="window.hideCipherDetail()">[X]</button>
          </div>
          
          <div class="detail-body">
            <!-- История -->
            <section class="detail-section">
              <h3 class="detail-section-title">
                <span class="section-icon">📜</span>
                ИСТОРИЧЕСКАЯ СПРАВКА
              </h3>
              <div class="detail-text">
                ${cipher.history}
              </div>
            </section>
            
            <!-- Принцип работы -->
            <section class="detail-section">
              <h3 class="detail-section-title">
                <span class="section-icon">⚙</span>
                ПРИНЦИП РАБОТЫ
              </h3>
              <div class="detail-text">
                ${cipher.principle}
              </div>
            </section>
            
            <!-- Пример -->
            <section class="detail-section">
              <h3 class="detail-section-title">
                <span class="section-icon">💡</span>
                ПРИМЕР
              </h3>
              <div class="detail-text">
                ${cipher.example}
              </div>
            </section>
            
            <!-- Уязвимости -->
            <section class="detail-section">
              <h3 class="detail-section-title">
                <span class="section-icon">⚠</span>
                УЯЗВИМОСТИ
              </h3>
              <div class="detail-text">
                ${cipher.weakness}
              </div>
            </section>
          </div>
          
          <div class="detail-footer">
            <button class="nav-button" onclick="location.hash='#game?cipher=${cipherId}'; window.hideCipherDetail();">
              [ ПОПРОБОВАТЬ ВЗЛОМАТЬ ]
            </button>
            <button class="nav-button" onclick="window.hideCipherDetail()">
              [ НАЗАД К БИБЛИОТЕКЕ ]
            </button>
          </div>
        </div>
      </div>
    `;
    
    detailContainer.style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

  // Функция скрытия детальной информации
  window.hideCipherDetail = function() {
    const detailContainer = document.getElementById('cipherDetail');
    detailContainer.style.display = 'none';
    document.body.style.overflow = '';
  };
}