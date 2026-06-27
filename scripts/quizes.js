const quizQuestions = [
    {
        text: '1. O feminicídio considera qualquer assassinato de mulher como crime hediondo, independentemente da motivação?',
        options: [{ value: 'a', label: 'Verdadeiro' }, { value: 'b', label: 'Falso' }],
        correct: 'b'
    },
    {
        text: '2. A Lei Maria da Penha prevê medidas protetivas de urgência, como o afastamento do agressor e a proibição de contato com a vítima?',
        options: [{ value: 'a', label: 'Verdadeiro' }, { value: 'b', label: 'Falso' }],
        correct: 'a'
    },
    {
        text: '3. A Lei do Minuto Seguinte garante atendimento imediato e gratuito às vítimas de violência sexual, mesmo sem a apresentação de boletim de ocorrência?',
        options: [{ value: 'a', label: 'Verdadeiro' }, { value: 'b', label: 'Falso' }],
        correct: 'a'
    },
    {
        text: '4. A Lei do Stalking considera crime a perseguição repetitiva que pode ocorrer tanto presencialmente quanto no ambiente digital?',
        options: [{ value: 'a', label: 'Verdadeiro' }, { value: 'b', label: 'Falso' }],
        correct: 'a'
    },
    {
        text: '5. A Lei Carolina Dieckmann (Lei nº 12.737/2012) tornou crime a invasão de computadores ou telemóveis alheios, desde que o dispositivo esteja protegido por algum mecanismo de segurança (como uma password ou padrão de bloqueio) e que a invasão ocorra sem autorização.',
        options: [{ value: 'a', label: 'Verdadeiro' }, { value: 'b', label: 'Falso' }],
        correct: 'a'
    },
    {
        text: '6. “Foi só uma brincadeira” elimina o constrangimento da vítima?',
        options: [{ value: 'a', label: 'Verdadeiro' }, { value: 'b', label: 'Falso' }],
        correct: 'b'
    },
    {
        text: '7. A Lei do Sinal Vermelho (Lei nº 14.188/2021) instituiu o programa de cooperação Sinal Vermelho contra a Violência Doméstica, permitindo que a vítima desenhe um "X" na mão, preferencialmente na cor vermelha, como sinal de socorro para que atendentes de farmácias, repartições públicas ou estabelecimentos privados acionem a polícia.',
        options: [{ value: 'a', label: 'Verdadeiro' }, { value: 'b', label: 'Falso' }],
        correct: 'a'
    },
    {
        text: '8. A Lei Lola (Lei nº 13.642/2018) atribuiu à Polícia Federal a investigação de crimes praticados na internet que espalhem conteúdo misógino (ódio ou aversão a mulheres), desde que apresentem repercussão interestadual ou internacional.',
        options: [{ value: 'a', label: 'Verdadeiro' }, { value: 'b', label: 'Falso' }],
        correct: 'a'
    },
    {
        text: '9. A Lei Carolina Dieckmann (Lei nº 12.737/2012) prevê que a invasão de computadores ou celulares só é considerada crime se o proprietário do dispositivo for uma figura pública ou pessoa politicamente exposta (PPE).',
        options: [{ value: 'a', label: 'Verdadeiro' }, { value: 'b', label: 'Falso' }],
        correct: 'b'
    }
];

const quizQuestionEl = document.getElementById('quiz-question');
const quizFinalEl = document.getElementById('quiz-final');
const progressTextEl = document.getElementById('quiz-progress-text');
const progressFillEl = document.getElementById('quiz-progress-fill');
const confettiContainer = document.getElementById('confetti-container');
const alertOverlay = document.getElementById('alert-overlay');

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function updateProgress() {
    const total = quizQuestions.length;
    progressTextEl.textContent = `Pergunta ${Math.min(currentQuestionIndex + 1, total)} de ${total}`;
    progressFillEl.style.width = `${(currentQuestionIndex / total) * 100}%`;
}

function renderQuestion() {
    answered = false;
    const question = quizQuestions[currentQuestionIndex];

    quizQuestionEl.classList.remove('question-enter');
    quizQuestionEl.classList.add('question-exit');

    quizQuestionEl.innerHTML = `
        <p class="regular quiz-question-text">${question.text}</p>
        <div class="quiz-options">
            ${question.options.map(opt => `<button type="button" class="quiz-option" data-value="${opt.value}">${opt.label}</button>`).join('')}
        </div>
        <div class="quiz-next-wrapper">
            <button type="button" id="quiz-next-btn" class="quiz-btn hidden">${currentQuestionIndex === quizQuestions.length - 1 ? 'Ver resultado' : 'Próxima pergunta'}</button>
        </div>
    `;

    requestAnimationFrame(() => {
        quizQuestionEl.classList.remove('question-exit');
        quizQuestionEl.classList.add('question-enter');
    });

    updateProgress();

    quizQuestionEl.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => handleAnswer(btn, question));
    });

    document.getElementById('quiz-next-btn').addEventListener('click', goToNextQuestion);
}

function handleAnswer(selectedBtn, question) {
    if (answered) return;
    answered = true;

    const isCorrect = selectedBtn.dataset.value === question.correct;

    quizQuestionEl.querySelectorAll('.quiz-option').forEach(btn => {
        btn.disabled = true;
        if (btn.dataset.value === question.correct) {
            btn.classList.add('correct');
        } else if (btn === selectedBtn) {
            btn.classList.add('wrong');
        }
    });

    if (isCorrect) {
        score++;
        launchConfetti();
    } else {
        showAlert();
    }

    document.getElementById('quiz-next-btn').classList.remove('hidden');
}

function goToNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        renderQuestion();
    } else {
        showFinalResults();
    }
}

function showFinalResults() {
    progressFillEl.style.width = '100%';
    progressTextEl.textContent = `Pergunta ${quizQuestions.length} de ${quizQuestions.length}`;

    quizQuestionEl.classList.add('hidden');
    quizFinalEl.classList.remove('hidden');

    const total = quizQuestions.length;
    let resultClass = 'error';
    if (score === total) resultClass = 'success';
    else if (score > total / 2) resultClass = 'medium';

    quizFinalEl.innerHTML = `
        <p id="quiz-results" class="${resultClass}">Você acertou ${score} de ${total} perguntas!</p>
        <div style="text-align: center;">
            <button type="button" id="quiz-restart-btn" class="quiz-btn">Refazer o Quiz</button>
        </div>
    `;
    quizFinalEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    document.getElementById('quiz-restart-btn').addEventListener('click', restartQuiz);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizFinalEl.classList.add('hidden');
    quizQuestionEl.classList.remove('hidden');
    renderQuestion();
}

function launchConfetti() {
    const colors = ['#2563eb', '#facc15', '#28a745', '#dc3545', '#a855f7'];
    const pieceCount = 60;

    for (let i = 0; i < pieceCount; i++) {
        const piece = document.createElement('span');
        piece.className = 'confetti-piece';
        piece.style.left = `${Math.random() * 100}vw`;
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = `${1 + Math.random() * 1.2}s`;
        piece.style.animationDelay = `${Math.random() * 0.3}s`;
        piece.style.setProperty('--rotation', `${Math.random() * 360}deg`);
        confettiContainer.appendChild(piece);

        piece.addEventListener('animationend', () => piece.remove());
    }
}

function showAlert() {
    alertOverlay.classList.remove('hidden');
    alertOverlay.classList.add('alert-shake');

    setTimeout(() => {
        alertOverlay.classList.remove('alert-shake');
        alertOverlay.classList.add('hidden');
    }, 1400);
}

renderQuestion();
