const cardsData = [
  { name: 'Claude', color: '#8B5CF6' },
  { name: 'GPT', color: '#3B82F6' },
  { name: 'Gemini', color: '#10B981' },
  { name: 'DeepSeek', color: '#F59E0B' },
  { name: 'MCP', color: '#EC4899' },
  { name: 'IDE', color: '#6366F1' },
  { name: 'CLI', color: '#14B8A6' },
  { name: 'GitHub', color: '#6B7280' },
  { name: 'Firebase', color: '#EF4444' },
  { name: 'Agent', color: '#F97316' }
];

let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let timer = 0;
let timerInterval = null;
let isLocked = false;

function initGame() {
  flippedCards = [];
  matchedCount = 0;
  moves = 0;
  timer = 0;
  isLocked = false;
  clearInterval(timerInterval);
  timerInterval = null;
  document.getElementById('matches').textContent = '0';
  document.getElementById('moves').textContent = '0';
  document.getElementById('timer').textContent = '0:00';

  const pairs = cardsData.flatMap(card => [card, card]);
  const shuffled = shuffle(pairs);
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  shuffled.forEach((card, i) => {
    const el = document.createElement('div');
    el.className = 'card';
    el.dataset.index = i;
    el.dataset.name = card.name;
    el.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-back"></div>
        <div class="card-face card-front" style="background: ${card.color}; color: #fff;">${card.name}</div>
      </div>
    `;
    el.addEventListener('click', () => flipCard(el));
    grid.appendChild(el);
  });
}

function flipCard(el) {
  if (isLocked) return;
  if (el.classList.contains('flipped')) return;
  if (el.classList.contains('matched')) return;
  if (!timerInterval) startTimer();

  el.classList.add('flipped');
  flippedCards.push(el);

  if (flippedCards.length === 2) {
    moves++;
    document.getElementById('moves').textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  isLocked = true;
  const [a, b] = flippedCards;

  if (a.dataset.name === b.dataset.name) {
    a.classList.add('matched');
    b.classList.add('matched');
    matchedCount++;
    document.getElementById('matches').textContent = matchedCount;
    flippedCards = [];
    isLocked = false;

            if (matchedCount === 10) {
      clearInterval(timerInterval);
      setTimeout(showModal, 600);
    }
async function clearBoard() {
  if (!confirm('確定清除所有「記憶翻牌」的排行榜資料？此操作無法復原！')) return;
  const btn = document.querySelector('.clear-btn');
  btn.textContent = '清除中...';
  btn.disabled = true;
  const ok = await clearLeaderboard('memory-match');
  btn.textContent = ok ? '✅ 已清除' : '❌ 清除失敗';
  await updateLeaderboard();
  setTimeout(() => { btn.textContent = '🗑 清除排行榜資料'; btn.disabled = false; }, 1500);
}

updateLeaderboard();
  } else {
    a.classList.add('wrong');
    b.classList.add('wrong');
    setTimeout(() => {
      a.classList.remove('flipped', 'wrong');
      b.classList.remove('flipped', 'wrong');
      flippedCards = [];
      isLocked = false;
    }, 800);
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    document.getElementById('timer').textContent = formatTime(timer);
  }, 1000);
}

async function showModal() {
  document.getElementById('finalMoves').textContent = moves;
  document.getElementById('finalTime').textContent = formatTime(timer);
  document.getElementById('modal').classList.add('show');
  await loadLeaderboard();
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
}

async function submitScore() {
  const name = document.getElementById('playerName').value.trim() || '匿名玩家';
  const btn = document.querySelector('.name-input button');
  btn.textContent = '儲存中...';
  btn.disabled = true;
  const ok = await saveScore(name, Math.max(100, 1000 - moves * 10), timer, 'memory-match');
  btn.textContent = ok ? '✅ 已儲存' : '❌ 儲存失敗';
  document.getElementById('playerName').value = '';
  await loadLeaderboard();
  await updateLeaderboard();
  setTimeout(() => { btn.textContent = '儲存分數'; btn.disabled = false; }, 2000);
}

function reshuffle() {
  if (matchedCount > 0 && !confirm('重新洗牌將重置所有進度，確定嗎？')) return;
  closeModal();
  initGame();
}

function revealAll() {
  document.querySelectorAll('.card:not(.matched)').forEach(el => {
    el.classList.add('flipped');
  });
}

function hideAll() {
  document.querySelectorAll('.card:not(.matched)').forEach(el => {
    el.classList.remove('flipped', 'wrong');
  });
  flippedCards = [];
}

function renderRank(list) {
  return list.map((item, i) =>
    `<li>
      <span class="rank-num">#${i + 1}</span>
      <span class="rank-name">${item.playerName}</span>
      <span class="rank-score">${item.score}</span>
      <span class="rank-time">${formatTime(item.time)}</span>
    </li>`
  ).join('');
}

async function loadLeaderboard() {
  const list = await getLeaderboard('memory-match', 10);
  document.getElementById('modalRankList').innerHTML = renderRank(list);
}

async function updateLeaderboard() {
  const list = await getLeaderboard('memory-match', 10);
  document.getElementById('mainRankList').innerHTML = renderRank(list);
}

updateLeaderboard();
initGame();
