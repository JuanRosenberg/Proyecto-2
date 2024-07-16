// Definición de la clase Quiz
class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.quizContainer = document.createElement('div');
        this.quizContainer.id = 'quiz-container';
        document.body.appendChild(this.quizContainer);
    }

    // Método para iniciar el cuestionario
    startQuiz() {
        this.renderQuestion();
    }

    // Método para renderizar una pregunta
    renderQuestion() {
        this.quizContainer.innerHTML = '';

        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
            return;
        }

        var question = this.questions[this.currentQuestionIndex];
        var questionContainer = document.createElement('div');
        questionContainer.classList.add('question-container');
        questionContainer.id = 'question' + (this.currentQuestionIndex + 1);

        var questionText = document.createElement('h2');
        questionText.textContent = "Pregunta " + (this.currentQuestionIndex + 1) + ": " + question.question;
        questionContainer.appendChild(questionText);

        question.options.forEach((option, optionIndex) => {
            var label = document.createElement('label');
            var radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'q' + (this.currentQuestionIndex + 1);
            radio.value = option;
            label.appendChild(radio);
            label.appendChild(document.createTextNode(' ' + option));
            questionContainer.appendChild(label);
            questionContainer.appendChild(document.createElement('br'));
        });

        var answerButton = document.createElement('button');
        answerButton.textContent = 'Responder';
        answerButton.onclick = () => {
            this.checkAnswer(question.answer);
        };
        questionContainer.appendChild(answerButton);

        var feedback = document.createElement('p');
        feedback.id = 'feedback-q' + (this.currentQuestionIndex + 1);
        questionContainer.appendChild(feedback);

        this.quizContainer.appendChild(questionContainer);
    }

    // Método para verificar la respuesta seleccionada
    checkAnswer(correctAnswer) {
        var questionId = 'q' + (this.currentQuestionIndex + 1);
        var selectedAnswer = document.querySelector('input[name="' + questionId + '"]:checked');
        var feedbackContainer = document.getElementById('feedback-' + questionId);

        if (!selectedAnswer) {
            feedbackContainer.textContent = "Por favor selecciona una respuesta.";
            return;
        }

        var userAnswer = selectedAnswer.value;

        if (userAnswer === correctAnswer) {
            feedbackContainer.textContent = "¡Respuesta correcta!";
            this.correctAnswers++;
        } else {
            feedbackContainer.textContent = "Respuesta incorrecta. La respuesta correcta es: " + correctAnswer;
            this.incorrectAnswers++;
        }

        // Pasar a la siguiente pregunta
        this.currentQuestionIndex++;
        setTimeout(() => {
            this.renderQuestion();
        }, 1000); // Espera 1 segundo antes de mostrar la siguiente pregunta
    }

    // Método para mostrar los resultados finales
    showResults() {
        this.quizContainer.innerHTML = '';

        var resultContainer = document.createElement('div');
        resultContainer.id = 'result-container';
        var resultText = document.createElement('p');
        resultText.textContent = 'Respuestas correctas: ' + this.correctAnswers + ', Respuestas incorrectas: ' + this.incorrectAnswers;
        resultContainer.appendChild(resultText);
        this.quizContainer.appendChild(resultContainer);
    }
}

// Crear una instancia del cuestionario
var questions = [
    {
        question: "¿Quien gano el mundial del año 1930?",
        options: ["Uruguay", "Argentina", "Alemania"],
        answer: "Uruguay"
    },
    {
        question: "¿Quien gano el mundial del año 1934?",
        options: ["Italia", "Checoslovaquia", "Uruguay"],
        answer: "Italia"
    },
    {
        question: "¿Quien gano el mundial del año 1938?",
        options: ["Italia", "Hungria", "Panama"],
        answer: "Italia"
    },
    {
        question: "¿Quien gano el mundial del año 1950?",
        options: ["Uruguay", "Brasil", "Chile"],
        answer: "Uruguay"
    },
    {
        question: "¿Quien gano el mundial del año 1954?",
        options: ["Alemania Federal", "Hungria", "Yugoslavia"],
        answer: "Alemania Federal"
    },
    {
        question: "¿Quien gano el mundial del año 1958?",
        options: ["Brasil", "Suecia", "Argentina"],
        answer: "Brasil"
    },
    { 
        question: "¿Quien gano el mundial del año 1962?",
        options: ["Brasil", "Checoslovaquia", "Huganda"],
        answer: "Brasil"
    },
    {
        question: "¿Quien gano el mundial del año 1966?",
        options: ["Inglaterra", "Alemania Federal", "Brasil"],
        answer: "Inglaterra"
    },
];
var quiz = new Quiz(questions);
quiz.startQuiz();
