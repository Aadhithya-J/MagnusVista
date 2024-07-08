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

const questions = [
    { "id": 1, "type": "radio", "question": "1) Which country first colonized India?", "options": ["Portugal", "Dutch", "Britain", "France"], "correct": 0 },
    { "id": 2, "type": "checkbox", "question": "2) What are the official languages of India?", "options": ["Tamil", "Hindi", "Telugu", "English"], "correct": [1, 3] },
    { "id": 3, "type": "dropdown", "question": "3) What is the capital of Portugal?", "options": ["London", "Barcelona", "Lisbon", "Madrid"], "correct": 2 },
    { "id": 4, "type": "text", "question": "4) What is the largest mammal?", "correct": "Blue Whale" },
    { "id": 5, "type": "radio", "question": "5) How many sides are in Nanogon?", "options": ["7", "8", "9", "10"], "correct": 2 },
    { "id": 6, "type": "checkbox", "question": "6) What are the functions of OS?", "options": ["Memory management", "Storage management", "Resource management", "None of the above"], "correct": [0, 1, 2] },
    { "id": 7, "type": "dropdown", "question": "7) What is the second stage of Data Science Process?", "options": ["Goal Setting", "Data Mining", "Building a Model", "Data Acquisition"], "correct": 3 },
    { "id": 8, "type": "text", "question": "8) Who invented the Turing machine?", "correct": "Alan Turing" },
    { "id": 9, "type": "radio", "question": "9) What is the oldest software development model?", "options": ["Waterfall model", "Agile model", "Rapid Application model", "V shape model"], "correct": 0 },
    { "id": 10, "type": "checkbox", "question": "10) What are the non-linear data structures?", "options": ["Graph", "Stack", "Queue", "Tree"], "correct": [0, 3] },
    { "id": 11, "type": "dropdown", "question": "11) Which company developed Elden Ring?", "options": ["Santa Monica Studios", "Rockstar Games", "From Software", "Ubisoft"], "correct": 2 },
    { "id": 12, "type": "text", "question": "12) Who is the protagonist of God of War?", "correct": "Kratos" },
    { "id": 13, "type": "radio", "question": "13) How many protagonists are in GTA V?", "options": ["2", "3", "4", "5"], "correct": 1 },
    { "id": 14, "type": "checkbox", "question": "14) Who are the main characters in The Last Of Us?", "options": ["Tommy", "Rebecca", "Joel", "Ellie"], "correct": [2, 3] },
    { "id": 15, "type": "dropdown", "question": "15) In which game did Lady Dimitrescu appear?", "options": ["Resident Evil", "Bloodborne", "Dark Souls", "Devil May Cry"], "correct": 0 },
    { "id": 16, "type": "text", "question": "16) Who is the protagonist of Attack On Titan?", "correct": "Eren Yeager" },
    { "id": 17, "type": "radio", "question": "17) What is the real name of L in Death Note?", "options": ["Lelouch", "Levi", "Lawliet", "Laufey"], "correct": 2 },
    { "id": 18, "type": "checkbox", "question": "18) Who are the arch enemies?", "options": ["Gojo", "Yuji", "Mahito", "Nanami"], "correct": [1, 3] },
    { "id": 19, "type": "dropdown", "question": "19) Who is the strongest character in One Punch Man?", "options": ["Genos", "Boros", "Blast", "Saitama"], "correct": 3 },
    { "id": 20, "type": "text", "question": "20) What is the last name of Edward in Fullmetal Alchemist?", "correct": "Elric" }
];

const userAnswers = {};

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

document.addEventListener('DOMContentLoaded', () => {
    renderPage(currentPage);
    startTimer();
});
