const $ = (id) => document.getElementById(id);
const screens = ['modeSelect', 'home', 'groupSetup', 'memoryRules', 'memory', 'wordRules', 'words', 'quizRules', 'quiz', 'groupScore', 'podium', 'finish'];
const asset = (name) => `assets/${name}`;
const levels = [
  {
    id: 1,
    title: 'MEMORIZE KONSEP',
    memorizeTime: 10,
    answerTime: 10,
    cards: [
      { symbol: '10', image: 'assets/Ac.png' },
      { symbol: '4', image: 'assets/air_mendidih.png' },
      { symbol: '7', image: 'assets/ambil_minum.png' },
      { symbol: '6', image: 'assets/celcius.png' },
      { symbol: 'A', image: 'assets/es.png' }
    ]
  },
  {
    id: 2,
    title: 'INGAT FENOMENANYA',
    memorizeTime: 20,
    answerTime: 15,
    cards: [
      { symbol: '9', image: 'assets/kedinginan.png' },
      { symbol: 'Q', image: 'assets/ice_cream.png' },
      { symbol: '8', image: 'assets/kepanasan.png' },
      { symbol: '5', image: 'assets/panas.png' },
      { symbol: '1', image: 'assets/pratikum.png' },
      { symbol: '2', image: 'assets/sakit.png' },
      { symbol: 'J', image: 'assets/suhu.png' }
    ]
  },
  {
    id: 3,
    title: 'INGAT & ANALISIS',
    memorizeTime: 30,
    answerTime: 20,
    cards: [
      { symbol: '10', image: 'assets/Ac.png' },
      { symbol: 'K', image: 'assets/termometer.png' },
      { symbol: '4', image: 'assets/air_mendidih.png' },
      { symbol: 'A', image: 'assets/es.png' },
      { symbol: 'J', image: 'assets/suhu.png' },
      { symbol: '6', image: 'assets/celcius.png' },
      { symbol: '2', image: 'assets/sakit.png' },
      { symbol: '3', image: 'assets/suhu_badan.png' },
      { symbol: '8', image: 'assets/kepanasan.png' },
      { symbol: '9', image: 'assets/kedinginan.png' }
    ]
  }
];
const WORDS = ['SUHU', 'CELSIUS', 'KELVIN', 'REAMUR', 'FAHRENHEIT', 'TERMOMETER', 'PEMUAIAN', 'BIMETAL', 'MUTLAK', 'RAKSA', 'ALKOHOL', 'DERAJAT'];
const QUIZ_TIME = 30;
const QUIZ_LIMIT = 2;
const MEMORY_MAX_ATTEMPTS = 3;
const backgroundMusic = new Audio(asset('audio/background.mp3'));
backgroundMusic.loop = true;
backgroundMusic.preload = 'none';
backgroundMusic.volume = 0.3;
let audioContext = null;
const quizQuestions = [
  { prompt: 'Suhu suatu benda adalah besaran yang menyatakan ...', options: ['jumlah energi dalam benda', 'derajat panas atau dinginnya suatu benda', 'kalor yang dikandung benda', 'massa partikel benda'], answer: 1, explanation: 'Suhu adalah besaran fisika yang menyatakan derajat panas atau dinginnya suatu benda.' },
  { prompt: 'Alat ukur yang digunakan untuk mengukur suhu secara akurat adalah ...', options: ['barometer', 'hidrometer', 'termometer', 'kalorimeter'], answer: 2, explanation: 'Termometer adalah alat yang dirancang khusus untuk mengukur suhu dengan skala yang akurat.' },
  { prompt: 'Zat cair yang paling sering digunakan untuk mengisi pipa kapiler termometer laboratorium adalah ...', options: ['air dan minyak', 'raksa dan alkohol', 'raksa dan air', 'alkohol dan minyak'], answer: 1, explanation: 'Raksa dan alkohol sering digunakan karena memuai secara teratur seiring kenaikan suhu.' },
  { prompt: 'Salah satu keuntungan menggunakan raksa sebagai pengisi termometer adalah ...', options: ['harganya sangat murah', 'dapat mengukur suhu yang sangat rendah', 'tidak membasahi dinding kaca', 'aman dan tidak beracun'], answer: 2, explanation: 'Raksa memiliki kelebihan yaitu warnanya mengkilap, memuai teratur, dan tidak membasahi dinding kaca tabung.' },
  { prompt: 'Skala termometer yang ditetapkan sebagai Standar Internasional (SI) adalah ...', options: ['Celsius', 'Reamur', 'Fahrenheit', 'Kelvin'], answer: 3, explanation: 'Kelvin ditetapkan sebagai satuan Sistem Internasional (SI) untuk suhu karena titik bawahnya dimulai dari nol mutlak.' },
  { prompt: 'Suhu titik didih air pada tekanan 1 atmosfer dalam skala Celsius ditetapkan pada angka ...', options: ['0 °C', '80 °C', '100 °C', '212 °C'], answer: 2, explanation: 'Pada termometer skala Celsius, titik beku air ditetapkan 0 °C dan titik didih air 100 °C.' },
  { prompt: 'Suhu 40 °C jika dikonversikan ke dalam skala Reamur menjadi ...', options: ['32 °R', '45 °R', '50 °R', '72 °R'], answer: 0, explanation: 'Rumus konversi C ke R adalah (4/5) × T(°C). Jadi (4/5) × 40 = 32 °R.' },
  { prompt: 'Sebuah benda diukur suhunya menunjukkan angka 50 °C. Suhu benda tersebut dalam skala Fahrenheit adalah ...', options: ['90 °F', '122 °F', '140 °F', '162 °F'], answer: 1, explanation: 'Rumus konversi C ke F adalah (9/5 × C) + 32. Jadi (9/5 × 50) + 32 = 90 + 32 = 122 °F.' },
  { prompt: 'Suhu 0 K (Nol Mutlak) berarti ...', options: ['suhu saat air membeku', 'suhu terendah di mana partikel zat berhenti bergerak', 'suhu kamar normal', 'suhu saat es mencair'], answer: 1, explanation: 'Suhu nol mutlak (0 Kelvin) adalah suhu secara teoretis terendah, di mana pergerakan kinetik materi benar-benar berhenti.' },
  { prompt: 'Perbandingan skala termometer Celsius, Reamur, dan Fahrenheit berturut-turut adalah ...', options: ['5 : 4 : 9', '4 : 5 : 9', '9 : 5 : 4', '5 : 9 : 4'], answer: 0, explanation: 'Rentang skala Celsius=100, Reamur=80, Fahrenheit=180. Diserhanakan menjadi perbandingan 5 : 4 : 9.' },
  { prompt: 'Keping bimetal terbuat dari dua logam berbeda yang disatukan. Jika dipanaskan, bimetal akan melengkung ke arah logam yang ...', options: ['koefisien muainya lebih besar', 'lebih tebal', 'koefisien muainya lebih kecil', 'berwarna lebih gelap'], answer: 2, explanation: 'Saat dipanaskan, logam dengan koefisien muai besar bertambah panjang lebih banyak, sehingga bimetal melengkung ke arah logam bermuai kecil.' },
  { prompt: 'Celah pada rel kereta api sengaja dibuat dengan tujuan ...', options: ['menghemat besi rel', 'agar kereta tidak anjlok', 'memberi ruang pemuaian saat siang hari yang panas', 'mengurangi gesekan roda'], answer: 2, explanation: 'Rel kereta akan memuai (bertambah panjang) saat suhu panas. Celah mencegah rel bengkok melengkung.' },
  { prompt: 'Peristiwa menyusutnya air ketika dipanaskan dari suhu 0 °C hingga 4 °C disebut ...', options: ['pemuaian volume', 'kapilaritas', 'anomali air', 'kondensasi'], answer: 2, explanation: 'Berbeda dari zat pada umumnya yang memuai jika dipanaskan, air justru menyusut dari 0-4 °C. Hal langka ini dinamakan anomali air.' },
  { prompt: 'Kaca jendela biasanya dipasang sedikit longgar pada bingkainya agar ...', options: ['kaca tidak pecah saat memuai di siang hari', 'kaca mudah dilepas', 'udara dapat masuk', 'kaca tidak berembun'], answer: 0, explanation: 'Bingkai yang longgar memberi ruang bagi kaca untuk bertambah luas (memuai) saat siang yang terik agar kaca terhindar dari keretakan.' },
  { prompt: 'Suhu badan rata-rata orang sehat berkisar di 37 °C. Jika dinyatakan dalam skala Kelvin adalah ...', options: ['273 K', '300 K', '310 K', '370 K'], answer: 2, explanation: 'Rumusnya K = C + 273. Maka 37 + 273 = 310 K.' },
  { prompt: 'Termometer klinis atau termometer badan biasanya hanya memiliki skala suhu dengan rentang pendek, yaitu ...', options: ['0 °C hingga 100 °C', '35 °C hingga 42 °C', '30 °C hingga 50 °C', '0 °C hingga 50 °C'], answer: 1, explanation: 'Karena suhu tubuh manusia hidup tidak pernah turun di bawah 35 °C atau di atas 42 °C, rentang skalanya dibuat khusus.' },
  { prompt: 'Sebuah kawat tembaga memanjang ketika dipanaskan. Hal ini disebut peristiwa ...', options: ['pemuaian panjang', 'pemuaian luas', 'pemuaian volume', 'penyusutan ruang'], answer: 0, explanation: 'Kawat adalah benda 1 dimensi (dominan panjang), maka pertambahan ukurannya ketika terkena panas disebut pemuaian panjang.' },
  { prompt: 'Koefisien muai panjang adalah angka yang menunjukkan ...', options: ['kemampuan menahan panas', 'pertambahan panjang zat setiap kenaikan suhu 1 °C', 'pertambahan berat zat', 'batas titik leleh'], answer: 1, explanation: 'Koefisien muai panjang (alpha) menyatakan ukuran pertambahan panjang suatu benda per satuan panjang tiap naik 1 °C.' },
  { prompt: 'Keunggulan alkohol dibandingkan raksa sebagai zat pengisi termometer adalah ...', options: ['dapat mengukur suhu yang sangat tinggi', 'warnanya mengkilap sehingga mudah dilihat', 'dapat mengukur suhu yang sangat rendah', 'harganya jauh lebih mahal'], answer: 2, explanation: 'Alkohol membeku pada suhu yang sangat rendah (sekitar -112 °C), sehingga termometer alkohol sangat andal dipakai di daerah bersalju.' },
  { prompt: 'Balon udara panas dapat mengudara karena udara di dalam balon yang dipanaskan akan mengalami ...', options: ['pemuaian volume dan massa jenis mengecil', 'penyusutan massa dan memberat', 'perubahan warna gas', 'pembekuan dan penyusutan'], answer: 0, explanation: 'Gas di dalam balon memuai (bertambah volume) saat panas. Akibatnya gas menjadi kurang padat (massa jenis turun) sehingga bisa terbang melayang.' }
];
const SIZE = 13;
const DIRS = [[0, 1], [1, 0], [1, 1], [-1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1]];
let gameMode = 'solo';
let groups = [{ name: 'Kelompok 1', score: 0 }, { name: 'Kelompok 2', score: 0 }, { name: 'Kelompok 3', score: 0 }];
let currentGroupIndex = 0;
let score = 0, memoryScore = 0, wordScore = 0, quizScore = 0, timer = null, memoryTimer = null, answerTimer = null, level = 0, selected = [], memoryCards = [], memoryOrder = [], memoryPhase = '';
let memorizeRemaining = 30, answerRemaining = 30, memoryTimedOut = false, memoryAttemptsLeft = MEMORY_MAX_ATTEMPTS;
let grid = [], placements = {}, cellEls = [], foundWords = new Set(), selecting = false, path = [], startCell = null;
let quizUsed = new Set(), quizOrder = [], quizRemaining = QUIZ_TIME, quizTimerStartedAt = 0, currentQuizIndex = -1;

function show(id) {
  screens.forEach((screen) => {
    const screenElement = $(screen);
    if (screenElement) screenElement.classList.toggle('active', screen === id);
  });

  const stageLabel = $('stageLabel');
  if (stageLabel) {
    stageLabel.textContent = id === 'words' || id === 'wordRules' ? 'MISI 02' : id === 'quiz' || id === 'quizRules' ? 'MISI 03' : id === 'finish' || id === 'podium' ? 'SELESAI' : id === 'groupSetup' ? 'SETUP' : id === 'modeSelect' ? 'MODE' : 'MISI 01';
  }
  updateGroupHud();
}
function updateGroupHud() {
  const currentGroup = groups[currentGroupIndex];
  const showGroupHud = gameMode === 'group';
  const groupHudItem = $('groupHudItem');
  const roundHudItem = $('roundHudItem');
  const currentGroupLabel = $('currentGroupLabel');
  const roundLabel = $('roundLabel');

  if (groupHudItem) groupHudItem.style.display = showGroupHud ? '' : 'none';
  if (roundHudItem) roundHudItem.style.display = showGroupHud ? '' : 'none';
  if (currentGroupLabel) currentGroupLabel.textContent = showGroupHud && currentGroup ? currentGroup.name : '-';
  if (roundLabel) roundLabel.textContent = showGroupHud && currentGroup ? `${currentGroupIndex + 1} dari ${groups.length}` : '-';
}
function updateScore() {
  score = Math.round(memoryScore + wordScore + quizScore);
  $('scoreLabel').textContent = score;
  $('scoreLabel').classList.remove('score-bump');
  void $('scoreLabel').offsetWidth;
  $('scoreLabel').classList.add('score-bump');
}
function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}
function clearTimer() {
  if (timer) clearInterval(timer);
  if (memoryTimer) clearInterval(memoryTimer);
  if (answerTimer) clearInterval(answerTimer);
  timer = null;
  memoryTimer = null;
  answerTimer = null;
}

function unlockAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!audioContext && AudioContextClass) audioContext = new AudioContextClass();
  if (audioContext?.state === 'suspended') audioContext.resume().catch(() => {});
  backgroundMusic.play().catch(() => {});
}

function playCountdownSound(secondsRemaining) {
  if (!audioContext || secondsRemaining < 1 || secondsRemaining > 10) return;
  const oscillator = audioContext.createOscillator();
  const volume = audioContext.createGain();
  const startAt = audioContext.currentTime;
  oscillator.type = 'sine';
  oscillator.frequency.value = secondsRemaining <= 3 ? 1040 : 780;
  volume.gain.setValueAtTime(0.0001, startAt);
  volume.gain.exponentialRampToValueAtTime(0.12, startAt + 0.01);
  volume.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.16);
  oscillator.connect(volume);
  volume.connect(audioContext.destination);
  oscillator.start(startAt);
  oscillator.stop(startAt + 0.17);
}

document.addEventListener('pointerdown', unlockAudio, { once: true });
document.addEventListener('keydown', unlockAudio, { once: true });

function renderGroupInputs() {
  $('groupList').innerHTML = groups.map((group, index) => `<div class="group-row"><span class="group-number">${String(index + 1).padStart(2, '0')}</span><input class="group-input" type="text" maxlength="30" value="${group.name}" aria-label="Nama kelompok ${index + 1}"><button class="remove-group" type="button" data-index="${index}" ${groups.length <= 2 ? 'disabled' : ''}>- HAPUS</button></div>`).join('');
  $('groupList').querySelectorAll('.group-input').forEach((input, index) => {
    input.oninput = () => { groups[index].name = input.value; updateGroupSetupState(); updateGroupHud(); };
  });
  $('groupList').querySelectorAll('.remove-group').forEach((button) => {
    button.onclick = () => { groups.splice(Number(button.dataset.index), 1); renderGroupInputs(); };
  });
  updateGroupSetupState();
}
function updateGroupSetupState() {
  const validGroups = groups.filter((group) => group.name.trim()).length;
  $('startGame').disabled = validGroups < 2;
  $('groupSetupNote').textContent = `${validGroups} kelompok siap · minimal 2, maksimal 6`;
  updateGroupHud();
}
function startGroupGame() {
  const names = groups.map((group) => group.name.trim());
  if (names.filter(Boolean).length < 2) return;
  groups = names.filter(Boolean).slice(0, 6).map((name) => ({ name, score: 0 }));
  currentGroupIndex = 0;
  score = 0;
  memoryScore = 0;
  wordScore = 0;
  quizScore = 0;
  updateScore();
  show('home');
  $('statusLabel').textContent = 'SIAP MEMULAI';
}
function startSoloGame() {
  gameMode = 'solo';
  currentGroupIndex = 0;
  score = 0;
  memoryScore = 0;
  wordScore = 0;
  quizScore = 0;
  updateScore();
  show('home');
  $('statusLabel').textContent = 'SIAP MEMULAI';
}
function saveGroupScore() {
  if (!groups[currentGroupIndex]) return;
  groups[currentGroupIndex].score = Math.round(memoryScore + wordScore + quizScore);
  $('groupResultName').textContent = groups[currentGroupIndex].name;
  $('groupMemoryScore').textContent = Math.round(memoryScore);
  $('groupWordScore').textContent = Math.round(wordScore);
  $('groupQuizScore').textContent = Math.round(quizScore);
  $('groupResultTotal').textContent = groups.reduce((total, group) => total + group.score, 0);
}
function nextGroup() {
  if (gameMode === 'solo') {
    showSoloFinish();
    return;
  }
  if (currentGroupIndex >= groups.length - 1) { showPodium(); return; }
  currentGroupIndex += 1;
  score = 0;
  memoryScore = 0;
  wordScore = 0;
  quizScore = 0;
  updateScore();
  show('home');
  $('statusLabel').textContent = 'SIAP MEMULAI';
}
function showPodium() {
  clearTimer();
  const ranking = [...groups].sort((a, b) => b.score - a.score);
  const medals = ['🥇', '🥈', '🥉'];
  const classes = ['place-first', 'place-second', 'place-third'];
  $('podiumStage').innerHTML = [1, 0, 2].map((rankIndex) => {
    const group = ranking[rankIndex];
    return `<div class="podium-place ${classes[rankIndex]}"><span class="podium-medal">${group ? medals[rankIndex] : '—'}</span><strong>${group ? group.name : 'Belum ada'}</strong><b>${group ? group.score : 0} poin</b></div>`;
  }).join('');
  $('rankingTable').innerHTML = ranking.length > 3 ? `<div class="ranking-heading"><span>PERINGKAT</span><span>KELOMPOK</span><span>SKOR</span></div>${ranking.slice(3).map((group, index) => `<div class="ranking-row"><span>${index + 4}</span><strong>${group.name}</strong><b>${group.score}</b></div>`).join('')}` : '';
  $('podiumConfetti').innerHTML = Array.from({ length: 20 }, (_, index) => `<i style="--i:${index}"></i>`).join('');
  $('podiumFinalScore').textContent = ranking.reduce((total, group) => total + group.score, 0);
  show('podium');
}
function resetAll() {
  clearTimer();
  groups = [{ name: 'Kelompok 1', score: 0 }, { name: 'Kelompok 2', score: 0 }, { name: 'Kelompok 3', score: 0 }];
  currentGroupIndex = 0;
  score = 0;
  memoryScore = 0;
  wordScore = 0;
  quizScore = 0;
  renderGroupInputs();
  updateScore();
  gameMode = 'solo';
  show('modeSelect');
}

function showSoloFinish() {
  $('finishEyebrow').textContent = 'SOLO MISSION SELESAI';
  $('finishTitle').textContent = 'Skor terbaikmu sudah tercatat!';
  $('finishMessage').textContent = 'Hebat! Kamu berhasil menyelesaikan tiga misi secara mandiri.';
  $('soloFinalScore').textContent = Math.round(memoryScore + wordScore + quizScore);
  show('finish');
}

$('startMemory').onclick = () => show('memoryRules');
$('chooseSolo').onclick = startSoloGame;
$('chooseGroup').onclick = () => { gameMode = 'group'; renderGroupInputs(); show('groupSetup'); $('statusLabel').textContent = 'SIAP MEMBENTUK TIM'; };
$('addGroup').onclick = () => { if (groups.length < 6) { groups.push({ name: `Kelompok ${groups.length + 1}`, score: 0 }); renderGroupInputs(); } };
$('startGame').onclick = startGroupGame;
$('nextGroup').onclick = nextGroup;
$('resetAll').onclick = resetAll;
$('beginMemory').onclick = () => { score = 0; memoryScore = 0; wordScore = 0; quizScore = 0; level = 0; updateScore(); startLevel(); };
$('restart').onclick = () => { clearTimer(); score = 0; memoryScore = 0; wordScore = 0; quizScore = 0; level = 0; updateScore(); show('home'); };

function startLevel() {
  show('memory');
  clearTimer();
  memoryPhase = 'show';
  selected = [];
  memoryAttemptsLeft = MEMORY_MAX_ATTEMPTS;
  const currentLevel = levels[level];
  memoryCards = shuffle(currentLevel.cards.map((card, id) => ({ ...card, id })));
  memoryOrder = memoryCards.map((card) => card.id);
  $('levelLabel').textContent = `${currentLevel.id} / ${levels.length}`;
  $('memoryKicker').textContent = `LEVEL ${currentLevel.id} · ${currentLevel.title}`;
  $('memoryTitle').textContent = 'Ingat urutannya';
  $('memoryInstruction').textContent = 'Hafalkan gambar dan urutannya.';
  $('memoryFeedback').innerHTML = '';
  $('answer').innerHTML = '';
  $('answer').style.display = 'none';
  $('choices').innerHTML = '';
  renderCards(false);
  memoryTimedOut = false;
  memorizeRemaining = currentLevel.memorizeTime;
  $('timeLabel').textContent = `${memorizeRemaining} detik`;
  if (memorizeRemaining <= 10) playCountdownSound(memorizeRemaining);
  memoryTimer = setInterval(() => {
    memorizeRemaining -= 1;
    $('timeLabel').textContent = `${memorizeRemaining} detik`;
    playCountdownSound(memorizeRemaining);
    if (memorizeRemaining <= 0) {
      clearTimer();
      memoryTimedOut = true;
      closeMemory();
    }
  }, 1000);
}

function renderCards(closed) {
  $('cards').style.setProperty('--card-count', memoryCards.length);
  $('cards').style.setProperty('--cards-max-width', `${memoryCards.length * 150 + (memoryCards.length - 1) * 12}px`);
  $('cards').innerHTML = memoryCards.map((card) => `<button class="card ${closed ? 'closed' : ''}" data-id="${card.id}" type="button"><span class="card-front"><img src="${card.image}" alt="Kartu"></span><span class="card-back"><img src="${asset('kartu_belakang.png')}" alt="Belakang kartu"></span></button>`).join('');
}
function closeMemory() {
  memoryPhase = 'answer';
  selected = [];
  memoryAttemptsLeft = MEMORY_MAX_ATTEMPTS;
  $('memoryTitle').textContent = 'Sekarang, susun kembali';
  $('memoryInstruction').textContent = 'Pilih kartu dari kiri ke kanan. Kamu punya 3 kesempatan.';
  renderCards(true);
  $('answer').innerHTML = '';
  $('answer').style.display = 'flex';
  $('choices').innerHTML = shuffle(memoryCards).map((card) => `<button class="choice" data-id="${card.id}" type="button">${card.symbol}</button>`).join('');
  $('choices').querySelectorAll('.choice').forEach((button) => {
    button.disabled = false;
    button.classList.remove('selected');
    button.onclick = null;
    button.addEventListener('click', () => chooseMemory(Number(button.dataset.id), button), { once: false });
  });
  const currentLevel = levels[level];
  answerRemaining = currentLevel.answerTime;
  $('timeLabel').textContent = `${answerRemaining} detik`;
  answerTimer = setInterval(() => {
    answerRemaining -= 1;
    $('timeLabel').textContent = `${answerRemaining} detik`;
    playCountdownSound(answerRemaining);
    if (answerRemaining <= 0) {
      clearTimer();
      memoryTimedOut = true;
      memoryAttemptsLeft = 0;
      finishMemoryLevel(false, true);
    }
  }, 1000);
}
function chooseMemory(id, button) {
  if (memoryPhase !== 'answer' || selected.includes(id)) return;
  selected.push(id);
  button.disabled = true;
  button.classList.add('selected');
  $('answer').innerHTML = selected.map((item) => `<span class="slot">${memoryCards.find((card) => card.id === item).symbol}</span>`).join('');
  if (selected.length !== memoryOrder.length) return;

  const correct = selected.every((item, index) => item === memoryOrder[index]);
  if (correct) {
    finishMemoryLevel(true, false);
    return;
  }

  memoryAttemptsLeft -= 1;
  const attemptsRemaining = Math.max(0, memoryAttemptsLeft);
  if (attemptsRemaining <= 0) {
    finishMemoryLevel(false, false);
    return;
  }

  const attemptsText = `Jawaban belum tepat. Sisa ${attemptsRemaining} kesempatan.`;
  $('memoryFeedback').innerHTML = `<div class="feedback bad"><h3>Belum tepat</h3><p>${attemptsText}</p></div>`;
  selected = [];
  $('answer').innerHTML = '';
  $('answer').style.display = 'flex';
  $('choices').querySelectorAll('.choice').forEach((choiceButton) => {
    choiceButton.disabled = false;
    choiceButton.classList.remove('selected');
  });
}

function finishMemoryLevel(correct, timedOut) {
  if (memoryPhase === 'feedback') return;
  clearTimer();
  memoryPhase = 'feedback';

  if (correct) {
    const currentLevel = levels[level];
    const levelPoints = (answerRemaining / currentLevel.answerTime) * (100 / levels.length);
    memoryScore = Math.min(100, memoryScore + levelPoints);
    updateScore();
    $('memoryFeedback').innerHTML = `<div class="feedback good"><h3>Benar!</h3><p>Level ini menghasilkan ${Math.round(levelPoints)} poin.</p></div>`;
    setTimeout(advanceMemoryLevel, 700);
    return;
  }

  const failureTitle = timedOut ? 'Waktu habis' : 'Kesempatan habis';
  $('memoryFeedback').innerHTML = `
    <div class="feedback bad">
      <h3>${failureTitle}</h3>
      <p>Anda gagal menjawab ronde ini.</p>
      <button class="button" id="memoryNextButton" type="button">NEXT →</button>
    </div>
  `;
  $('memoryNextButton').onclick = advanceMemoryLevel;
}

function advanceMemoryLevel() {
  if (level < levels.length - 1) {
    level += 1;
    startLevel();
  } else {
    show('wordRules');
    $('statusLabel').textContent = 'GAME 1 SELESAI';
  }
}

$('beginWords').onclick = startWords;
$('beginQuiz').onclick = startQuiz;
function emptyGrid() { return Array.from({ length: SIZE }, () => Array(SIZE).fill(null)); }
function tryPlace(word, target) {
  for (let attempt = 0; attempt < 300; attempt += 1) {
    const direction = DIRS[Math.floor(Math.random() * DIRS.length)];
    const row = Math.floor(Math.random() * SIZE), column = Math.floor(Math.random() * SIZE);
    const endRow = row + direction[0] * (word.length - 1), endColumn = column + direction[1] * (word.length - 1);
    if (endRow < 0 || endRow >= SIZE || endColumn < 0 || endColumn >= SIZE) continue;
    const cells = [];
    let valid = true;
    for (let index = 0; index < word.length; index += 1) {
      const currentRow = row + direction[0] * index, currentColumn = column + direction[1] * index;
      if (target[currentRow][currentColumn] && target[currentRow][currentColumn] !== word[index]) { valid = false; break; }
      cells.push([currentRow, currentColumn]);
    }
    if (!valid) continue;
    cells.forEach(([currentRow, currentColumn], index) => { target[currentRow][currentColumn] = word[index]; });
    return cells;
  }
  return null;
}
function buildWords() {
  grid = emptyGrid(); placements = {};
  WORDS.slice().sort((a, b) => b.length - a.length).forEach((word) => { const cells = tryPlace(word, grid); if (cells) placements[word] = cells; });
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let row = 0; row < SIZE; row += 1) for (let column = 0; column < SIZE; column += 1) if (!grid[row][column]) grid[row][column] = letters[Math.floor(Math.random() * letters.length)];
}
function startWords() {
  show('words'); foundWords = new Set(); wordScore = 0; wordTimerStartedAt = Date.now(); buildWords(); renderWordList(); renderGrid();
  $('wordCount').textContent = `0 / ${WORDS.length}`; $('wordStatus').textContent = 'Seret dari huruf awal ke huruf akhir.';
  let remaining = 60;
  $('timeLabel').textContent = `${remaining} detik`;
  clearTimer();
  timer = setInterval(() => {
    remaining -= 1;
    $('timeLabel').textContent = `${remaining} detik`;
    playCountdownSound(remaining);
    if (remaining <= 0) {
      clearTimer();
      $('wordStatus').textContent = `Waktu habis. Kamu menemukan ${foundWords.size} dari ${WORDS.length} istilah.`;
      setTimeout(() => show('quizRules'), 700);
    }
  }, 1000);
}
function renderWordList() { $('wordList').innerHTML = WORDS.map((word) => `<span class="word" id="word-${word}">${word}</span>`).join(''); }
function renderGrid() {
  const gridElement = $('wordGrid'); gridElement.innerHTML = ''; cellEls = [];
  for (let row = 0; row < SIZE; row += 1) {
    const rowCells = [];
    for (let column = 0; column < SIZE; column += 1) {
      const cell = document.createElement('button'); cell.className = 'cell'; cell.type = 'button'; cell.textContent = grid[row][column]; cell.dataset.row = row; cell.dataset.column = column;
      gridElement.appendChild(cell); rowCells.push(cell);
    }
    cellEls.push(rowCells);
  }
  bindDragSelection();
  $('lines').innerHTML = '';
}
function cellFromPoint(event) {
  const element = document.elementFromPoint(event.clientX, event.clientY);
  return element && element.classList.contains('cell') ? element : null;
}
function cellsInLine(first, last) {
  const rowDelta = last[0] - first[0], columnDelta = last[1] - first[1];
  const rowDistance = Math.abs(rowDelta), columnDistance = Math.abs(columnDelta);
  const isStraight = rowDelta === 0 || columnDelta === 0 || rowDistance === columnDistance;
  if (rowDistance === 0 && columnDistance === 0) return [first];
  if (!isStraight) return null;
  const steps = Math.max(rowDistance, columnDistance);
  const rowStep = rowDelta === 0 ? 0 : rowDelta / rowDistance;
  const columnStep = columnDelta === 0 ? 0 : columnDelta / columnDistance;
  return Array.from({ length: steps + 1 }, (_, index) => [first[0] + rowStep * index, first[1] + columnStep * index]);
}
function markSelecting(cells) { document.querySelectorAll('.cell.selecting').forEach((cell) => cell.classList.remove('selecting')); path = cells || []; path.forEach(([row, column]) => { const cell = cellEls[row]?.[column]; if (cell) cell.classList.add('selecting'); }); }
function bindDragSelection() {
  const gridElement = $('wordGrid');
  gridElement.onpointerdown = (event) => { const cell = cellFromPoint(event); if (!cell) return; selecting = true; startCell = [+cell.dataset.row, +cell.dataset.column]; gridElement.setPointerCapture(event.pointerId); markSelecting([startCell]); };
  gridElement.onpointermove = (event) => { if (!selecting || !startCell) return; const cell = cellFromPoint(event); if (!cell) return; const endCell = [+cell.dataset.row, +cell.dataset.column]; const nextPath = cellsInLine(startCell, endCell); markSelecting(nextPath || [startCell]); };
  gridElement.onpointerup = (event) => { if (!selecting || !startCell) return; const endCellEl = cellFromPoint(event) || (path.length ? cellEls[path[path.length - 1][0]]?.[path[path.length - 1][1]] : null); if (!endCellEl) { selecting = false; markSelecting([]); return; } const endCell = [+endCellEl.dataset.row, +endCellEl.dataset.column]; const cells = cellsInLine(startCell, endCell); selecting = false; if (gridElement.hasPointerCapture(event.pointerId)) gridElement.releasePointerCapture(event.pointerId); markSelecting([]); checkWord(cells); };
}
function checkWord(cells) {
  if (!cells) { $('wordStatus').textContent = 'Pilih garis lurus dari huruf awal ke huruf akhir.'; return; }
  const chosen = new Set(cells.map((cell) => cell.join(',')));
  const word = WORDS.find((item) => !foundWords.has(item) && placements[item] && placements[item].length === cells.length && placements[item].every((cell) => chosen.has(cell.join(','))));
  if (!word) { $('wordStatus').textContent = 'Belum cocok, coba seret kata lain.'; return; }
  foundWords.add(word); $('word-' + word).classList.add('found');
  wordScore = Math.min(100, wordScore + 10);
  updateScore();
  cells.forEach(([row, column]) => cellEls[row][column].classList.add('found'));
  $('wordCount').textContent = `${foundWords.size} / ${WORDS.length}`;
  $('wordStatus').textContent = foundWords.size === WORDS.length ? 'Semua istilah ditemukan!' : 'Benar! Cari istilah berikutnya.';
  if (foundWords.size === WORDS.length) {
    clearTimer();
    setTimeout(() => show('quizRules'), 500);
  }
}

let wordTimerStartedAt = 0;
function remainingWordSeconds() { return Math.max(0, 60 - Math.floor((Date.now() - wordTimerStartedAt) / 1000)); }

function startQuiz() {
  clearTimer();
  show('quiz');
  quizUsed = new Set();
  quizOrder = shuffle(quizQuestions.map((_, index) => index));
  quizScore = 0;
  currentQuizIndex = -1;
  $('quizQuestion').classList.add('hidden');
  renderQuizNumbers();
  $('quizCount').textContent = `0 / ${QUIZ_LIMIT}`;
  $('statusLabel').textContent = 'PILIH NOMOR';
  updateScore();
}

function renderQuizNumbers() {
  $('quizNumbers').innerHTML = quizQuestions.map((question, index) => `<button class="quiz-number" type="button" data-index="${index}" ${quizUsed.has(index) ? 'disabled' : ''}>${index + 1}</button>`).join('');
  $('quizNumbers').querySelectorAll('.quiz-number').forEach((button) => {
    button.onclick = () => selectQuizQuestion(Number(button.dataset.index));
  });
}

function selectQuizQuestion(index) {
  if (quizUsed.has(index)) return;
  clearTimer();
  currentQuizIndex = index;
  quizUsed.add(index);
  quizRemaining = QUIZ_TIME;
  renderQuizNumbers();
  const question = quizQuestions[quizOrder[index]];
  const questionArea = $('quizQuestion');
  questionArea.classList.remove('hidden');
  questionArea.innerHTML = `<p class="eyebrow">NOMOR ${index + 1}</p><h3>${question.prompt}</h3><p class="quiz-timer">Waktu menjawab: <span id="quizTimer">${quizRemaining} detik</span></p><div class="quiz-options">${question.options.map((option, optionIndex) => `<button class="quiz-option" type="button" data-option="${optionIndex}">${String.fromCharCode(65 + optionIndex)}. ${option}</button>`).join('')}</div>`;
  questionArea.querySelectorAll('.quiz-option').forEach((button) => {
    button.onclick = () => answerQuiz(Number(button.dataset.option), question);
  });
  $('statusLabel').textContent = `SOAL ${quizUsed.size} / ${QUIZ_LIMIT}`;
  quizTimerStartedAt = Date.now();
  timer = setInterval(() => {
    quizRemaining -= 1;
    const timerLabel = $('quizTimer');
    if (timerLabel) timerLabel.textContent = `${quizRemaining} detik`;
    $('timeLabel').textContent = `${quizRemaining} detik`;
    playCountdownSound(quizRemaining);
    if (quizRemaining <= 0) { clearTimer(); answerQuiz(null, question); }
  }, 1000);
}

function answerQuiz(optionIndex, questionOverride) {
  if (currentQuizIndex < 0 && !questionOverride) return;
  clearTimer();
  const activeQuestionIndex = currentQuizIndex >= 0 ? quizOrder[currentQuizIndex] : null;
  const question = questionOverride || quizQuestions[activeQuestionIndex];
  if (!question) return;
  const correct = optionIndex === question.answer;
  const earned = correct ? Math.round((quizRemaining / QUIZ_TIME) * 100) : 0;
  quizScore += earned;
  updateScore();
  const questionArea = $('quizQuestion');
  questionArea.querySelectorAll('.quiz-option').forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) button.classList.add('correct');
    if (index === optionIndex && !correct) button.classList.add('wrong');
  });
  const resultTitle = correct ? `Benar! +${earned} poin` : optionIndex === null ? 'Waktu habis · 0 poin' : 'Belum tepat · 0 poin';
  questionArea.insertAdjacentHTML('beforeend', `<div class="quiz-result"><h3>${resultTitle}</h3><p class="quiz-explanation"><b>Pembahasan:</b> ${question.explanation}</p><button class="button quiz-next" id="nextQuiz" type="button">${quizUsed.size === QUIZ_LIMIT ? 'LIHAT HASIL' : 'KEMBALI KE NOMOR SOAL'}</button></div>`);
  $('nextQuiz').onclick = nextQuizStep;
  currentQuizIndex = -1;
}

function nextQuizStep() {
  if (quizUsed.size === QUIZ_LIMIT) {
    if (gameMode === 'solo') {
      $('roundScoreEyebrow').textContent = 'SOLO · HASIL MISI';
      $('groupScoreTitle').textContent = 'Skor Permainanmu';
      $('groupResultName').style.display = 'none';
      $('groupMemoryScore').textContent = Math.round(memoryScore);
      $('groupWordScore').textContent = Math.round(wordScore);
      $('groupQuizScore').textContent = Math.round(quizScore);
      $('groupResultTotal').textContent = Math.round(memoryScore + wordScore + quizScore);
      $('nextGroup').textContent = 'LIHAT HASIL AKHIR →';
      show('groupScore');
      return;
    }
    saveGroupScore();
    $('roundScoreEyebrow').textContent = 'GILIRAN SELESAI';
    $('groupScoreTitle').textContent = 'Skor Kelompok Ini';
    $('groupResultName').style.display = '';
    $('nextGroup').textContent = currentGroupIndex >= groups.length - 1 ? 'LIHAT PODIUM →' : `GILIRAN ${groups[currentGroupIndex + 1].name.toUpperCase()} →`;
    show('groupScore');
    return;
  }
  $('quizQuestion').classList.add('hidden');
  $('timeLabel').textContent = '-';
  $('statusLabel').textContent = 'PILIH NOMOR';
}

renderGroupInputs();
show('modeSelect');
