import { questionBank } from './questions.js';

class SoundManager {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    playCorrect() {
        this.init();
        this.beep(600, 0.1, 'sine');
        setTimeout(() => this.beep(900, 0.2, 'sine'), 100);
    }

    playWrong() {
        this.init();
        this.beep(300, 0.1, 'sawtooth');
        setTimeout(() => this.beep(200, 0.3, 'sawtooth'), 100);
    }

    playClick() {
        this.init();
        this.beep(800, 0.05, 'square', 0.1);
    }

    playFanfare() {
        this.init();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            setTimeout(() => this.beep(freq, 0.2, 'sine', 0.15), i * 150);
        });
        // Extra celebration
        setTimeout(() => {
            this.beep(1046.50, 0.1, 'sine', 0.1);
            this.beep(1318.51, 0.4, 'sine', 0.2);
        }, 700);
    }

    beep(freq, duration, type, volume = 0.2) {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(volume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }
}

class SpeechManager {
    constructor() {
        this.synth = window.speechSynthesis;
    }

    speak(text) {
        // Stop any current speech
        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'vi-VN';
        utterance.rate = 1.2; // Faster rate as requested
        utterance.pitch = 1.1; // Slightly higher/friendlier pitch

        this.synth.speak(utterance);
    }
}

class QuizGame {
    constructor() {
        this.score = 0;
        this.currentQuestions = [];
        this.currentIndex = 0;
        this.timer = null;
        this.timeLeft = 10;
        this.playerName = 'Bé yêu';
        this.maxQuestions = 5;
        this.soundManager = new SoundManager();
        this.speechManager = new SpeechManager();

        // DOM Elements
        this.screens = {
            home: document.getElementById('home-screen'),
            game: document.getElementById('game-screen'),
            result: document.getElementById('result-screen')
        };
        this.playerInput = document.getElementById('player-name');
        this.scoreDisplay = document.getElementById('score-display');
        this.countDisplay = document.getElementById('question-count');
        this.timerBar = document.getElementById('timer-bar');
        this.qText = document.getElementById('q-text');
        this.qIcon = document.getElementById('q-icon');
        this.optionsBox = document.getElementById('options-box');
        this.finalScore = document.getElementById('final-score');
        this.leaderboardList = document.getElementById('leaderboard-list');
        this.feedback = document.getElementById('feedback');
        this.btnRestart = document.getElementById('btn-restart');

        this.init();
    }

    init() {
        // Category selection
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                this.soundManager.playClick();
                const category = card.dataset.category;
                this.startGame(category);
            });
        });

        this.btnRestart.addEventListener('click', () => {
            this.soundManager.playClick();
            this.showScreen('home');
        });

        // Keyboard support
        window.addEventListener('keydown', (e) => {
            if (this.screens.game.classList.contains('active')) {
                const buttons = this.optionsBox.querySelectorAll('button');
                if (e.key === '1' && buttons[0]) buttons[0].click();
                if (e.key === '2' && buttons[1]) buttons[1].click();
            }
        });

        // Load player name if exists
        const savedName = localStorage.getItem('kidquiz_last_name');
        if (savedName) this.playerInput.value = savedName;
    }

    showScreen(name) {
        Object.values(this.screens).forEach(s => s.classList.remove('active'));
        this.screens[name].classList.add('active');
    }

    startGame(category) {
        this.playerName = this.playerInput.value.trim() || 'Bé yêu';
        localStorage.setItem('kidquiz_last_name', this.playerName);
        this.currentCategory = category;

        // 20 questions for reading, 10 for others
        this.maxQuestions = (category === 'reading') ? 20 : 10;

        // Prepare questions
        const questions = [...questionBank[category]];
        this.currentQuestions = questions.sort(() => Math.random() - 0.5).slice(0, this.maxQuestions);

        this.score = 0;
        this.currentIndex = 0;
        this.showScreen('game');
        this.loadQuestion();
    }

    loadQuestion() {
        if (this.currentIndex >= this.currentQuestions.length) {
            this.endGame();
            return;
        }

        const q = this.currentQuestions[this.currentIndex];
        this.qText.textContent = q.question;
        // Icon rendering in question is removed as requested
        if (this.qIcon) this.qIcon.style.display = 'none';

        this.scoreDisplay.textContent = `Điểm: ${this.score}`;
        this.countDisplay.textContent = `${this.currentIndex + 1}/${this.currentQuestions.length}`;

        // Read question aloud
        let speechText = "";
        if (this.currentCategory === 'reading' && q.speechPrompt) {
            speechText = q.speechPrompt;
        } else {
            speechText = `${q.question}. ${q.options[0].text} hay ${q.options[1].text}?`;
        }
        this.speechManager.speak(speechText);

        // Render options (Randomized order)
        this.optionsBox.innerHTML = '';
        const randomizedOptions = [...q.options].sort(() => Math.random() - 0.5);

        randomizedOptions.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-option';
            btn.innerHTML = `
                <span class="option-icon">${opt.icon}</span>
                <span class="option-text">${opt.text}</span>
                <span class="option-key">${index + 1}</span>
            `;
            btn.onclick = () => this.handleAnswer(opt.text, btn);
            this.optionsBox.appendChild(btn);
        });

        this.startTimer();
    }

    startTimer() {
        clearInterval(this.timer);
        this.timeLeft = 10;
        this.updateTimerBar();

        this.timer = setInterval(() => {
            this.timeLeft -= 0.1;
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.handleAnswer(null); // Time out
            }
            this.updateTimerBar();
        }, 100);
    }

    updateTimerBar() {
        const percentage = (this.timeLeft / 10) * 100;
        this.timerBar.style.width = `${percentage}%`;

        if (this.timeLeft < 3) {
            this.timerBar.style.background = '#FF6B6B';
        } else {
            this.timerBar.style.background = '#FFE66D';
        }
    }

    handleAnswer(selected, element = null) {
        this.speechManager.synth.cancel(); // Stop talking when answer is picked
        clearInterval(this.timer);
        const q = this.currentQuestions[this.currentIndex];
        const isCorrect = selected === q.answer;

        // Disable all buttons
        const buttons = this.optionsBox.querySelectorAll('button');
        buttons.forEach(b => b.style.pointerEvents = 'none');

        if (isCorrect) {
            this.score += 10;
            if (element) element.classList.add('correct-option');
            this.showFeedback('✅');
            this.soundManager.playCorrect();
        } else {
            if (element) {
                element.classList.add('wrong-option');
                this.screens.game.classList.add('shake');
                setTimeout(() => this.screens.game.classList.remove('shake'), 300);
            }
            this.showFeedback('❌');
            this.soundManager.playWrong();

            // Highlight correct one
            buttons.forEach(b => {
                const optText = b.querySelector('.option-text').textContent;
                if (optText === q.answer) b.classList.add('correct-option');
            });
        }

        setTimeout(() => {
            this.currentIndex++;
            this.loadQuestion();
        }, 1500);
    }

    showFeedback(icon) {
        this.feedback.textContent = icon;
        this.feedback.classList.add('show');
        setTimeout(() => this.feedback.classList.remove('show'), 1000);
    }

    endGame() {
        this.showScreen('result');
        this.finalScore.textContent = this.score;
        this.saveScore();
        this.renderLeaderboard();
        this.soundManager.playFanfare();

        const maxPossible = this.currentQuestions.length * 10;
        const ratio = this.score / maxPossible;

        const msg = ratio >= 0.8 ? "Bé xuất sắc quá! 🌟" :
            ratio >= 0.5 ? "Bé làm tốt lắm! 👍" : "Bé cố gắng hơn lần sau nhé! ❤️";
        document.getElementById('result-msg').textContent = msg;
    }

    saveScore() {
        if (this.score === 0) return; // Don't save zero scores
        let scores = JSON.parse(localStorage.getItem('kidquiz_leaderboard') || '[]');
        scores.push({ name: this.playerName, score: this.score, date: new Date().toLocaleDateString() });
        scores.sort((a, b) => b.score - a.score);
        scores = scores.slice(0, 5);
        localStorage.setItem('kidquiz_leaderboard', JSON.stringify(scores));
    }

    renderLeaderboard() {
        const scores = JSON.parse(localStorage.getItem('kidquiz_leaderboard') || '[]');
        this.leaderboardList.innerHTML = scores.map((s, i) => `
            <div class="leaderboard-item">
                <span>${i + 1}. ${s.name}</span>
                <span style="font-weight: 700">${s.score}đ</span>
            </div>
        `).join('') || '<p>Chưa có kỷ lục nào</p>';
    }
}

// Initialize when DOM ready
window.addEventListener('DOMContentLoaded', () => {
    new QuizGame();
});
