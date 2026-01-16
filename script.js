const quizData = [
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correct: 3
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Cascading Simple Sheets",
            "Cars SUVs Sailboats"
        ],
        correct: 1
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hypertext Markup Language",
            "Hypertext Markdown Language",
            "Hyperloop Machine Language",
            "Helicopters Terminals"
        ],
        correct: 0
    },
    {
        question: "Which year was JavaScript launched?",
        options: ["1996", "1995", "1994", "None"],
        correct: 1
    },
    {
        question: "Symbol for comments in JS?",
        options: ["<!-- -->", "#", "//", "/* */"],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = null;

/* DOM */
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionCountSpan = document.getElementById("question-count");
const progressBar = document.getElementById("progress-bar");

const finalScoreSpan = document.getElementById("final-score");
const feedbackText = document.getElementById("feedback-text");

/* Events */
startBtn.onclick = startQuiz;
nextBtn.onclick = nextQuestion;
restartBtn.onclick = () => location.reload();

/* Functions */
function switchScreen(from, to) {
    from.classList.remove("active");
    to.classList.add("active");
}

function startQuiz() {
    switchScreen(startScreen, quizScreen);
    loadQuestion();
}

function loadQuestion() {
    const q = quizData[currentQuestionIndex];

    questionText.textContent = q.question;
    questionCountSpan.textContent =
        `Question ${currentQuestionIndex + 1}/${quizData.length}`;

    progressBar.style.width =
        (currentQuestionIndex / quizData.length) * 100 + "%";

    optionsContainer.innerHTML = "";
    selectedOptionIndex = null;
    nextBtn.disabled = true;

    q.options.forEach((opt, i) => {
        const div = document.createElement("div");
        div.className = "option-btn";
        div.textContent = opt;

        div.onclick = () => selectOption(i, div);

        optionsContainer.appendChild(div);
    });
}

function selectOption(i, el) {
    document.querySelectorAll(".option-btn")
        .forEach(o => o.classList.remove("selected"));

    el.classList.add("selected");
    selectedOptionIndex = i;
    nextBtn.disabled = false;
}

function nextQuestion() {
    if (selectedOptionIndex === quizData[currentQuestionIndex].correct) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    switchScreen(quizScreen, resultScreen);

    finalScoreSpan.textContent = score;

    const percent = (score / quizData.length) * 100;

    if (percent >= 80) feedbackText.textContent = "Excellent! 🎉";
    else if (percent >= 50) feedbackText.textContent = "Good Job 👍";
    else feedbackText.textContent = "Keep Practicing 📚";
}
