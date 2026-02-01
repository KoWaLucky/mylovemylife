// Даты: 5 августа — вместе, 8 августа — «да»
var START_DATE = new Date(2025, 7, 5);   // 5 августа 2025
var YES_DATE = new Date(2025, 7, 8);     // 8 августа 2025

function daysBetween(from, to) {
    var fromDay = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    var toDay = new Date(to.getFullYear(), to.getMonth(), to.getDate());
    return Math.floor((toDay - fromDay) / (1000 * 60 * 60 * 24));
}

function updateCounters() {
    var today = new Date();
    var together = daysBetween(START_DATE, today);
    var sinceYes = daysBetween(YES_DATE, today);
    if (together < 0) together = 0;
    if (sinceYes < 0) sinceYes = 0;

    var el1 = document.getElementById('days-together');
    var el2 = document.getElementById('days-since-yes');
    var el3 = document.getElementById('days-together-big');
    var el4 = document.getElementById('days-since-yes-big');
    if (el1) el1.textContent = together;
    if (el2) el2.textContent = sinceYes;
    if (el3) el3.textContent = together;
    if (el4) el4.textContent = sinceYes;
}

updateCounters();

// Сообщение дня — каждый день новое, чтобы хотелось заходить
var DAILY_MESSAGES = [
    'Ты — самое красивое, что случилось в моей жизни.',
    'Каждый день с тобой лучше предыдущего.',
    'Спасибо, что ты есть. Серьёзно.',
    'Ты делаешь меня лучше просто тем, что рядом.',
    'Я просыпаюсь и первая мысль — о тебе.',
    'Ты невероятная. Не забывай об этом.',
    'С тобой я дома, где бы мы ни были.',
    'Твоя улыбка — мой лучший день.',
    'Я горжусь тобой и тем, что мы вместе.',
    'Ты сильная, добрая и самая родная.',
    'Спасибо за каждое «да» — за первое свидание и за то, что согласилась быть моей.',
    'Я люблю тебя больше вчерашнего дня. Завтра буду любить ещё больше.',
    'Ты — моё солнышко. Буквально.',
    'Рядом с тобой я тот, кем хочу быть.',
    'Ты заслуживаешь всего самого хорошего. Я постараюсь это дать.',
    'Каждый день с тобой — подарок.',
    'Ты прекрасна. Внутри и снаружи.',
    'Я верю в нас. Спасибо, что веришь в меня.',
    'Ты — причина, по которой я улыбаюсь.',
    'Мне повезло. Каждый день.',
    'Ты не идеальная — ты лучше. Ты настоящая.',
    'Я буду рядом. Всегда.',
    'Ты вдохновляешь меня становиться лучше.',
    'С тобой я не боюсь будущего.',
    'Ты — мой человек. И я твой.',
    'Спасибо за терпение, за любовь и за то, что ты есть.',
    'Ты делаешь обычные дни особенными.',
    'Я люблю тебя. Просто напоминание на сегодня.',
    'Ты — наше лучшее решение. Оба «да» — твои.',
    'Каждый день с момента 5 августа — твой и наш.',
    'Ты — моя семья. Моя команда. Моё всё.'
];

function getDailyMessage() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var dayOfYear = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    var index = dayOfYear % DAILY_MESSAGES.length;
    return DAILY_MESSAGES[index];
}

var dailyEl = document.getElementById('daily-message');
if (dailyEl) dailyEl.textContent = getDailyMessage();

// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => links.classList.remove('active'));
            let activeLink = document.querySelector('header nav a[href*="' + id + '"]');
            if (activeLink) activeLink.classList.add('active');
            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    let footer = document.querySelector('footer');
    footer.classList.toggle('show-animate', window.innerHeight + window.scrollY >= document.scrollingElement.scrollHeight);
};

// Галерея — лайтбокс
let lightbox = document.getElementById('lightbox');
let lightboxImg = lightbox && lightbox.querySelector('.lightbox-img');
let lightboxCaption = lightbox && lightbox.querySelector('.lightbox-caption');
let galleryItems = document.querySelectorAll('.gallery-item');
let currentIndex = 0;

function openLightbox(index) {
    if (!lightbox || !galleryItems.length) return;
    currentIndex = index;
    let item = galleryItems[index];
    lightboxImg.src = item.querySelector('img').src;
    lightboxCaption.textContent = item.getAttribute('data-caption') || item.querySelector('figcaption').textContent;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
}

function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(currentIndex);
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

if (lightbox) {
    var closeBtn = lightbox.querySelector('.lightbox-close');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    var nextBtn = lightbox.querySelector('.lightbox-next');
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
});

// ——— Мини-игры (всегда случайная) ———
var MEMORY_IMAGES = [
    'images/ngyana.jpg',
    'images/yanamili.jpg',
    'images/novgodYana.jpg',
    'images/yanakatok.jpg'
];

function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i];
        a[i] = a[j];
        a[j] = t;
    }
    return a;
}

function pickRandomGame(excludeId) {
    var list = MINIGAMES.filter(function (g) { return g.id !== excludeId; });
    if (list.length === 0) list = MINIGAMES;
    return list[Math.floor(Math.random() * list.length)];
}

var MINIGAMES = [
    {
        id: 'memory',
        name: 'Память',
        desc: 'Собери пары — найди две одинаковые картинки!',
        init: function (container) {
            container.innerHTML = '<div class="memory-game"><div class="memory-cards" id="memory-cards"></div><div class="memory-status"><span>Ходов: <strong id="moves">0</strong></span><button type="button" class="btn memory-restart" id="memory-restart">Заново</button></div></div>';
            var cardsEl = document.getElementById('memory-cards');
            var movesEl = document.getElementById('moves');
            var restartBtn = document.getElementById('memory-restart');
            if (!cardsEl) return;
            var pairs = MEMORY_IMAGES.concat(MEMORY_IMAGES);
            var state = { moves: 0, flipped: [], matched: 0 };
            function render() {
                cardsEl.innerHTML = '';
                state.flipped = [];
                shuffle(pairs).forEach(function (src) {
                    var card = document.createElement('div');
                    card.className = 'memory-card';
                    card.dataset.src = src;
                    card.innerHTML = '<div class="card-back"><i class="bx bx-heart"></i></div><div class="card-front"><img src="' + src + '" alt=""></div>';
                    card.addEventListener('click', function () {
                        if (card.classList.contains('flipped') || card.classList.contains('matched') || state.flipped.length === 2) return;
                        card.classList.add('flipped');
                        state.flipped.push(card);
                        if (state.flipped.length === 2) {
                            state.moves++;
                            if (movesEl) movesEl.textContent = state.moves;
                            if (state.flipped[0].dataset.src === state.flipped[1].dataset.src) {
                                state.flipped.forEach(function (c) { c.classList.add('matched'); });
                                state.matched += 2;
                                state.flipped = [];
                                if (state.matched === pairs.length) setTimeout(function () { alert('Ты собрала все пары за ' + state.moves + ' ходов! ♥'); }, 300);
                            } else {
                                var f = state.flipped.slice();
                                setTimeout(function () { f.forEach(function (c) { c.classList.remove('flipped'); }); state.flipped = []; }, 600);
                            }
                        }
                    });
                    cardsEl.appendChild(card);
                });
            }
            render();
            if (restartBtn) restartBtn.onclick = function () { state.moves = 0; state.matched = 0; state.flipped = []; if (movesEl) movesEl.textContent = '0'; render(); };
        }
    },
    {
        id: 'catch',
        name: 'Поймай сердечки',
        desc: 'Кликай по сердечкам — за 10 секунд набери как можно больше очков!',
        init: function (container) {
            container.innerHTML = '<div class="catch-game"><div class="catch-score">Очки: <strong id="catch-score">0</strong> | Время: <strong id="catch-time">10</strong> сек</div><div class="catch-area" id="catch-area"></div><button type="button" class="btn catch-start" id="catch-start">Старт</button></div>';
            var area = document.getElementById('catch-area');
            var scoreEl = document.getElementById('catch-score');
            var timeEl = document.getElementById('catch-time');
            var startBtn = document.getElementById('catch-start');
            if (!area) return;
            var score = 0, timeLeft = 0, timerId = null, spawnId = null;
            function createHeart() {
                var h = document.createElement('div');
                h.className = 'catch-heart';
                h.innerHTML = '<i class="bx bxs-heart"></i>';
                h.style.left = Math.random() * (100 - 8) + '%';
                h.style.top = Math.random() * (100 - 8) + '%';
                h.onclick = function () {
                    score++;
                    if (scoreEl) scoreEl.textContent = score;
                    h.remove();
                };
                area.appendChild(h);
            }
            function tick() {
                timeLeft--;
                if (timeEl) timeEl.textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(timerId);
                    clearInterval(spawnId);
                    startBtn.disabled = false;
                    startBtn.textContent = 'Ещё раз';
                    alert('Время! Ты набрала ' + score + ' очков ♥');
                }
            }
            startBtn.onclick = function () {
                if (timerId) return;
                area.innerHTML = '';
                score = 0;
                timeLeft = 10;
                if (scoreEl) scoreEl.textContent = '0';
                if (timeEl) timeEl.textContent = '10';
                startBtn.disabled = true;
                timerId = setInterval(tick, 1000);
                spawnId = setInterval(createHeart, 600);
            };
        }
    },
    {
        id: 'tap',
        name: 'Жми сердечко',
        desc: 'За 10 секунд нажми на сердечко как можно больше раз!',
        init: function (container) {
            container.innerHTML = '<div class="tap-game"><div class="tap-score">Нажатий: <strong id="tap-score">0</strong> | Время: <strong id="tap-time">10</strong> сек</div><div class="tap-heart-wrap"><button type="button" class="tap-heart" id="tap-heart"><i class="bx bxs-heart"></i></button></div><button type="button" class="btn tap-start" id="tap-start">Старт</button></div>';
            var scoreEl = document.getElementById('tap-score');
            var timeEl = document.getElementById('tap-time');
            var heartBtn = document.getElementById('tap-heart');
            var startBtn = document.getElementById('tap-start');
            if (!heartBtn) return;
            var score = 0, timeLeft = 0, timerId = null;
            heartBtn.disabled = true;
            function tick() {
                timeLeft--;
                if (timeEl) timeEl.textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(timerId);
                    heartBtn.disabled = true;
                    startBtn.disabled = false;
                    startBtn.textContent = 'Ещё раз';
                    alert('Время! Ты нажала ' + score + ' раз ♥');
                }
            }
            heartBtn.onclick = function () {
                if (heartBtn.disabled) return;
                score++;
                if (scoreEl) scoreEl.textContent = score;
            };
            startBtn.onclick = function () {
                if (timerId) return;
                score = 0;
                timeLeft = 10;
                if (scoreEl) scoreEl.textContent = '0';
                if (timeEl) timeEl.textContent = '10';
                startBtn.disabled = true;
                heartBtn.disabled = false;
                timerId = setInterval(tick, 1000);
            };
        }
    },
    {
        id: 'slot',
        name: 'Три в ряд',
        desc: 'Крути барабаны — совпадут три символа, получишь приз!',
        init: function (container) {
            var symbols = ['♥', '★', '♦', '♠', '♣'];
            container.innerHTML = '<div class="slot-game"><div class="slot-reels" id="slot-reels"><span class="slot-reel" id="slot-reel-0">?</span><span class="slot-reel" id="slot-reel-1">?</span><span class="slot-reel" id="slot-reel-2">?</span></div><p class="slot-result" id="slot-result"></p><button type="button" class="btn slot-spin" id="slot-spin">Крутить</button></div>';
            var reel0 = document.getElementById('slot-reel-0');
            var reel1 = document.getElementById('slot-reel-1');
            var reel2 = document.getElementById('slot-reel-2');
            var resultEl = document.getElementById('slot-result');
            var spinBtn = document.getElementById('slot-spin');
            if (!reel0) return;
            spinBtn.onclick = function () {
                spinBtn.disabled = true;
                resultEl.textContent = '';
                var spins = 15 + Math.floor(Math.random() * 10);
                var step = 0;
                var interval = setInterval(function () {
                    reel0.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                    reel1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                    reel2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
                    step++;
                    if (step >= spins) {
                        clearInterval(interval);
                        var a = reel0.textContent, b = reel1.textContent, c = reel2.textContent;
                        if (a === b && b === c) {
                            resultEl.textContent = 'Три в ряд! Ты выиграла ♥';
                            resultEl.className = 'slot-result slot-win';
                        } else {
                            resultEl.textContent = 'Попробуй ещё!';
                            resultEl.className = 'slot-result';
                        }
                        spinBtn.disabled = false;
                    }
                }, 80);
            };
        }
    },
    {
        id: 'guess',
        name: 'Угадай число',
        desc: 'Я загадал число от 1 до 10. Угадай с трёх попыток!',
        init: function (container) {
            container.innerHTML = '<div class="guess-game"><input type="number" min="1" max="10" class="guess-input" id="guess-input" placeholder="1–10"><button type="button" class="btn guess-btn" id="guess-btn">Проверить</button><p class="guess-hint" id="guess-hint"></p><button type="button" class="btn guess-new" id="guess-new">Новая игра</button></div>';
            var input = document.getElementById('guess-input');
            var btn = document.getElementById('guess-btn');
            var hint = document.getElementById('guess-hint');
            var newBtn = document.getElementById('guess-new');
            if (!input) return;
            var secret = 1 + Math.floor(Math.random() * 10);
            var attempts = 3;
            function reset() {
                secret = 1 + Math.floor(Math.random() * 10);
                attempts = 3;
                hint.textContent = '';
                input.value = '';
                input.disabled = false;
                btn.disabled = false;
            }
            btn.onclick = function () {
                var n = parseInt(input.value, 10);
                if (n < 1 || n > 10) { hint.textContent = 'Введи число от 1 до 10'; return; }
                attempts--;
                if (n === secret) {
                    hint.textContent = 'Угадала! Это было ' + secret + ' ♥';
                    hint.className = 'guess-hint guess-win';
                    input.disabled = true;
                    btn.disabled = true;
                    return;
                }
                hint.textContent = (n < secret ? 'Больше' : 'Меньше') + '. Осталось попыток: ' + attempts;
                hint.className = 'guess-hint';
                if (attempts <= 0) {
                    hint.textContent = 'Попытки кончились. Было число ' + secret + '. Ещё раз?';
                    input.disabled = true;
                    btn.disabled = true;
                }
            };
            newBtn.onclick = reset;
        }
    }
];

function runRandomGame(excludeId) {
    var descEl = document.getElementById('minigame-desc');
    var container = document.getElementById('minigame-container');
    if (!container) return;
    var game = pickRandomGame(excludeId);
    if (descEl) descEl.textContent = game.desc;
    container.className = 'minigame-container minigame-' + game.id;
    game.init(container);
    return game.id;
}

var currentGameId = null;
currentGameId = runRandomGame(null);

document.getElementById('btn-random-game').addEventListener('click', function () {
    currentGameId = runRandomGame(currentGameId);
});
