// Questions for the quiz
const quizQuestions = [
    {
        question: "What is the capital of Japan?",
        options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        correctAnswer: 2
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Number", "Boolean", "Character"],
        correctAnswer: 3
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Netscape", "Microsoft", "Google", "Sun Microsystems"],
        correctAnswer: 0
    },
    {
        question: "What is the correct syntax for a comment in JavaScript?",
        options: ["// comment", "/* comment */", "# comment", "$ comment"],
        correctAnswer: 0
    },
    {
        question: "Which of the following is used to declare a variable in JavaScript?",
        options: ["let", "var", "const", "All of the above"],
        correctAnswer: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

// Function to start the timer
function startTimer() {
    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("time-left").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion(); // Automatically move to the next question when time is up
        }
    }, 1000);
}

// Function to load the current question
function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    document.getElementById("question").innerText = question.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.innerHTML = `
            <input type="radio" name="option" id="option${index}" value="${index}">
            <label for="option${index}">${option}</label>
        `;
        optionsContainer.appendChild(optionElement);
    });

    document.getElementById("feedback").innerText = ''; // Clear feedback from previous question
    timeLeft = 30; // Reset time
    document.getElementById("time-left").innerText = timeLeft;
    startTimer();
}

// Function to handle "Next" button click
function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    
    // Check if an option is selected
    if (!selectedOption) {
        document.getElementById("feedback").innerText = "Please select an option!";
        return;
    }

    const selectedAnswer = parseInt(selectedOption.value);
    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;

    // Check if the answer is correct and update the score
    if (selectedAnswer === correctAnswer) {
        score++;
        document.getElementById("feedback").innerText = "Correct!";
    } else {
        document.getElementById("feedback").innerText = "Incorrect!";
    }

    // Go to next question or finish the quiz
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// Function to display the result at the end of the quiz
function showResult() {
    clearInterval(timer); // Stop the timer
    document.getElementById("quiz").style.display = "none";
    const result = document.getElementById("result");
    result.style.display = "block";
    document.getElementById("score").innerText = `You scored ${score} out of ${quizQuestions.length}`;
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    loadQuestion();
}

// Initial call to load the first question
loadQuestion();
