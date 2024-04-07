// Import required modules
import express from 'express';
import QuizQuestion from '../models/QuizQuestion.js';

// Create Express router
const router = express.Router();

// Array to store remaining questions
let remainingQuestions = [];

// Function to get a random question from the remainingQuestions array
const getRandomQuestion = () => {
  const index = Math.floor(Math.random() * remainingQuestions.length);
  const question = remainingQuestions[index];
  remainingQuestions.splice(index, 1); // Remove the selected question from the array
  return question;
};

// Middleware to fetch remaining questions if the array is empty
const fetchRemainingQuestionsIfNeeded = async (req, res, next) => {
  try {
    if (remainingQuestions.length === 0) {
      await refreshQuestions(); // Refresh questions if the array is empty
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to refresh questions
const refreshQuestions = async () => {
  remainingQuestions = await QuizQuestion.aggregate([{ $sample: { size: 10 } }]);
};

// Route to initialize questions for the session
router.get('/initialize', async (req, res) => {
  try {
    await refreshQuestions();
    res.json({ message: 'Questions initialized successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get a random quiz question
router.get('/quiz', fetchRemainingQuestionsIfNeeded, (req, res) => {
  try {
    if (remainingQuestions.length === 0) {
      return res.json({ message: 'No more questions available' });
    }
    const question = getRandomQuestion();
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to submit user answers and calculate score
router.post('/quiz/submit', async (req, res) => {
  try {
    const userAnswers = req.body;
    const questions = await QuizQuestion.find({ _id: { $in: Object.keys(userAnswers) } });
    let score = 0;
    const feedback = {};
    questions.forEach(question => {
      if (question.correctAnswer === userAnswers[question._id]) {
        score++;
        feedback[question._id] = { correct: true };
      } else {
        feedback[question._id] = { correct: false, correctAnswer: question.correctAnswer };
      }
    });
    res.json({ score, feedback });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export the router
export default router;
