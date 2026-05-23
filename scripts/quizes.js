document.getElementById('submit-quiz').addEventListener('click', () => {
    const answers = {
        q1: 'b',
        q2: 'a',
        q3: 'a',
        q4: 'a',
        q5: 'a'
    };

    let score = 0;
    const totalQuestions = Object.keys(answers).length;

    for (const question in answers) {
        const radios = document.querySelectorAll(`input[name="${question}"]`);
        const correctAnswer = answers[question];

        radios.forEach(radio => {
            const label = radio.parentElement;

            // limpa estilos anteriores
            label.classList.remove('correct', 'wrong');

            if (radio.checked) {
                if (radio.value === correctAnswer) {
                    score++;
                    label.classList.add('correct');
                } else {
                    label.classList.add('wrong');
                }
            }

            // destaca a correta se o usuário errou
            if (radio.value === correctAnswer) {
                const selected = document.querySelector(`input[name="${question}"]:checked`);
                if (selected && selected.value !== correctAnswer) {
                    label.classList.add('correct');
                    label.style.fontWeight = 'bold';
                }
            }
        });
    }

    const resultsContainer = document.getElementById('quiz-results');
    resultsContainer.innerHTML = `Você acertou ${score} de ${totalQuestions} perguntas!`;

    // remove classes antigas
    resultsContainer.classList.remove('success', 'medium', 'error');

    if (score === totalQuestions) {
        resultsContainer.classList.add('success');
    } else if (score > totalQuestions / 2) {
        resultsContainer.classList.add('medium');
    } else {
        resultsContainer.classList.add('error');
    }

    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
});