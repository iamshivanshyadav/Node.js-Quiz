const baseURL = 'http://localhost:3000';
let currentQuestionIndex = 0;
let questions = [];
let userAnswers = {};
let score = 0;
let questionOrder = [];

const questionContainer = document.getElementById('question-container');
const feedbackContainer = document.getElementById('feedback-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');

const retakeTestButton = document.getElementById('retake-test-btn');
const retakeTestModal = document.getElementById('retake-test-modal');

// Function to fetch questions from the backend
const fetchQuestions = async () => {
  try {
    const response = await fetch(`${baseURL}/quiz`);
    const data = await response.json();
    if (data.message === 'No more questions available') {
      showRetakeTestModal();
    } else {
      questions.push(data);
      questionOrder.push(data._id); // Add question ID to the order array
      showQuestion();
    }
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};

// Function to initialize questions when the page loads
const initializeQuestions = async () => {
  try {
    const response = await fetch(`${baseURL}/initialize`);
    const data = await response.json();
    if (data.message === 'Questions initialized successfully') {
      fetchQuestions();
    }
  } catch (error) {
    console.error('Error initializing questions:', error);
  }
};

// Function to display the current question
const showQuestion = () => {
  const question = questions[currentQuestionIndex];
  questionElement.innerText = `Question ${currentQuestionIndex + 1}: ${question.question}`; // Include question number
  optionsElement.innerHTML = '';
  question.options.forEach((option, index) => {
    const div = document.createElement('div');
    div.classList.add('option-box');
    div.innerText = `${index + 1}. ${option}`;
    div.addEventListener('click', () => selectOption(index));
    optionsElement.appendChild(div);
  });
};

// Function to select an option
const selectOption = (index) => {
  const questionId = questions[currentQuestionIndex]._id;
  const option = questions[currentQuestionIndex].options[index];
  userAnswers[questionId] = option;
  currentQuestionIndex++;
  if (currentQuestionIndex < 10) {
    fetchQuestions();
  } else {
    submitQuiz();
  }
};

// Function to submit the quiz and display feedback
const submitQuiz = async () => {
  try {
    const response = await fetch(`${baseURL}/quiz/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userAnswers)
    });
    const data = await response.json();
    score = data.score;
    displayFeedback(data.feedback);
    showRetakeTestModal();
  } catch (error) {
    console.error('Error submitting quiz:', error);
  }
};

// Function to display feedback
const displayFeedback = (feedback) => {
  questionContainer.style.display = 'none';
  feedbackContainer.style.display = 'block';
  feedbackElement.innerHTML = '';
  scoreElement.innerText = `Your score: ${score}/10`;
  // Loop through question order array to display feedback in the same order
  questionOrder.forEach((questionId, index) => {
    const fb = feedback[questionId];
    const questionNumber = index + 1;
    const li = document.createElement('li');
    li.innerText = `Question ${questionNumber}: ${fb.correct ? 'Correct' : `Incorrect. Correct answer: ${fb.correctAnswer}`}`;
    feedbackElement.appendChild(li);
  });
};

// Event listener for retake test button
retakeTestButton.addEventListener('click', () => {
  window.location.reload();
});

// Initialize questions when the page loads
initializeQuestions();
