const questionsList = [];
class Question {
    constructor(statement, alternatives = []) {
        this.statement = statement;
        this.alternatives = alternatives;
    }
}

questionsList.push(new Question(
    "Pergunta hipotética número 1.", [
        "Alternativa correta.",
        "Alternativa errada.",
        "Outra alternativa errada.",
        "Mais uma alternativa errada.",
    ]
));

questionsList.push(new Question(
    "Pergunta hipotética número 2.", [
        "Alternativa correta.",
        "Alternativa errada.",
        "Outra alternativa errada.",
        "Mais uma alternativa errada.",
    ]
));

// O script começa aqui...
document.addEventListener('DOMContentLoaded', () => {

    const quizSpaces = document.querySelectorAll('.quiz-space');

    for (var i = 0; i < quizSpaces.length; i++) {
        var newElement = document.createElement('p');
        newElement.textContent = questionsList[0].statement;
        quizSpaces[i].appendChild(newElement);

        for (var j = 0; j < questionsList[0].alternatives.length; j++) {
            newElement = document.createElement('button');
            newElement.textContent = questionsList[0].alternatives[j];
            quizSpaces[i].appendChild(newElement);
        }
    }
});
