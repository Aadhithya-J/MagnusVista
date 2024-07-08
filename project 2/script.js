const quizForm = document.getElementById('quiz-form');
const questionContainer = document.getElementById('question-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const timerDisplay = document.getElementById('timer');
const pageNumberDisplay = document.getElementById('page-number');

let currentPage = 1;
const questionsPerPage = 5;
let timer;
let timeLeft = 120; 

let questions = [];
const userAnswers = {};

async function fetchQuestions() {
    const response = await fetch('questions.json');
    questions = await response.json();
    renderPage(currentPage);
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            saveUserAnswers(); 
            calculateScore();
            return;
        }
        timeLeft--;
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function renderPage(page) {
    questionContainer.innerHTML = '';
    const startIndex = (page - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    const currentQuestions = questions.slice(startIndex, endIndex);

    currentQuestions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<p>${question.question}</p>`;

        if (question.type === 'radio' || question.type === 'checkbox') {
            question.options.forEach((option, i) => {
                const input = document.createElement('input');
                input.type = question.type;
                input.name = `question-${question.id}`;
                input.value = i;
                if (userAnswers[question.id] && userAnswers[question.id].includes(i)) {
                    input.checked = true;
                }
                const label = document.createElement('label');
                label.textContent = option;
                questionDiv.appendChild(input);
                questionDiv.appendChild(label);
                questionDiv.appendChild(document.createElement('br'));
            });
        } else if (question.type === 'dropdown') {
            const select = document.createElement('select');
            select.name = `question-${question.id}`;
            question.options.forEach((option, i) => {
                const optionElem = document.createElement('option');
                optionElem.value = i;
                optionElem.textContent = option;
                if (userAnswers[question.id] && userAnswers[question.id] == i) {
                    optionElem.selected = true;
                }
                select.appendChild(optionElem);
            });
            questionDiv.appendChild(select);
        } else if (question.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.name = `question-${question.id}`;
            if (userAnswers[question.id]) {
                input.value = userAnswers[question.id];
            }
            questionDiv.appendChild(input);
        }

        questionContainer.appendChild(questionDiv);
    });

    pageNumberDisplay.textContent = `Page ${page}`;
    prevBtn.style.display = page === 1 ? 'none' : 'inline-block';
    nextBtn.style.display = page === Math.ceil(questions.length / questionsPerPage) ? 'none' : 'inline-block';
    submitBtn.style.display = page === Math.ceil(questions.length / questionsPerPage) ? 'inline-block' : 'none';
}

function calculateScore() {
    clearInterval(timer);
    let score = 0;

    questions.forEach(question => {
        const userAnswer = userAnswers[question.id];
        console.log(`Question ${question.id}: User answer: ${userAnswer}, Correct answer: ${question.correct}`);

        if (question.type === 'radio' || question.type === 'dropdown') {
            if (userAnswer && parseInt(userAnswer) === question.correct) {
                score++;
            }
        } else if (question.type === 'checkbox') {
            const correctAnswers = question.correct;
            if (userAnswer && JSON.stringify(correctAnswers.sort()) === JSON.stringify(userAnswer.sort())) {
                score++;
            }
        } else if (question.type === 'text') {
            if (userAnswer && userAnswer.trim().toLowerCase() === question.correct.toLowerCase()) {
                score++;
            }
        }
    });

    alert(`Your score is ${score}/${questions.length}`);
    console.log(`Final score: ${score}`);
}

function saveUserAnswers() {
    const formData = new FormData(quizForm);
    formData.forEach((value, key) => {
        const questionId = parseInt(key.split('-')[1]);
        const questionType = questions.find(q => q.id === questionId).type;

        if (questionType === 'checkbox') {
            if (!userAnswers[questionId]) {
                userAnswers[questionId] = [];
            }
            userAnswers[questionId].push(parseInt(value));
        } else {
            userAnswers[questionId] = value;
        }
    });
    console.log('User Answers:', userAnswers); 
}

prevBtn.addEventListener('click', () => {
    saveUserAnswers();
    if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
    }
});

nextBtn.addEventListener('click', () => {
    saveUserAnswers();
    if (currentPage < Math.ceil(questions.length / questionsPerPage)) {
        currentPage++;
        renderPage(currentPage);
    }
});

submitBtn.addEventListener('click', () => {
    saveUserAnswers();
    calculateScore();
});

document.addEventListener('DOMContentLoaded', fetchQuestions);
