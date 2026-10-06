let quizQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const quizQuestionEl = document.getElementById('quiz-question');
const quizFinalEl = document.getElementById('quiz-final');
const progressTextEl = document.getElementById('quiz-progress-text');
const progressFillEl = document.getElementById('quiz-progress-fill');
const confettiContainer = document.getElementById('confetti-container');
const alertOverlay = document.getElementById('alert-overlay');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function showMessage(message) {
  quizQuestionEl.innerHTML = `<p class="regular quiz-question-text">${escapeHtml(message)}</p>`;
}

async function loadQuiz() {
  showMessage('Carregando perguntas...');
  try {
    const quizResponse = await fetch('/api/quizzes');
    if (!quizResponse.ok) throw new Error('Quiz indisponível');
    const quizzes = await quizResponse.json();
    if (!quizzes.length) throw new Error('Nenhum quiz cadastrado');

    const questionsResponse = await fetch(`/api/quizzes/${quizzes[0].id}/perguntas`);
    if (!questionsResponse.ok) throw new Error('Perguntas indisponíveis');
    const rows = await questionsResponse.json();

    quizQuestions = rows.map((row, index) => ({
      text: `${index + 1}. ${row.pergunta}`,
      options: row.opcoes.map((label, optionIndex) => ({
        value: String(optionIndex),
        label
      })),
      correct: String(row.resposta_correta),
      explanation: row.explicacao
    }));

    if (!quizQuestions.length) throw new Error('Nenhuma pergunta cadastrada');
    renderQuestion();
  } catch (error) {
    showMessage('Não foi possível carregar o quiz. Confira a configuração seguindo o GUIA-DE-INSTALACAO.md.');
    progressTextEl.textContent = 'Banco não conectado';
  }
}

function updateProgress() {
  const total = quizQuestions.length;
  progressTextEl.textContent = `Pergunta ${Math.min(currentQuestionIndex + 1, total)} de ${total}`;
  progressFillEl.style.width = `${(currentQuestionIndex / total) * 100}%`;
}

function renderQuestion() {
  answered = false;
  const question = quizQuestions[currentQuestionIndex];
  quizQuestionEl.innerHTML = `
    <p class="regular quiz-question-text">${escapeHtml(question.text)}</p>
    <div class="quiz-options">
      ${question.options.map(opt => `<button type="button" class="quiz-option" data-value="${escapeHtml(opt.value)}">${escapeHtml(opt.label)}</button>`).join('')}
    </div>
    <div class="quiz-next-wrapper">
      <button type="button" id="quiz-next-btn" class="quiz-btn hidden">${currentQuestionIndex === quizQuestions.length - 1 ? 'Ver resultado' : 'Próxima pergunta'}</button>
    </div>`;
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
    if (btn.dataset.value === question.correct) btn.classList.add('correct');
    else if (btn === selectedBtn) btn.classList.add('wrong');
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
  if (currentQuestionIndex < quizQuestions.length) renderQuestion();
  else showFinalResults();
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
    <div style="text-align:center"><button type="button" id="quiz-restart-btn" class="quiz-btn">Refazer o Quiz</button></div>`;
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
  for (let i = 0; i < 60; i++) {
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

loadQuiz();
