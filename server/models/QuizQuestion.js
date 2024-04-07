// Import Mongoose module
import mongoose from 'mongoose';

// Define quiz question schema
const quizQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  }
});

// Create and export quiz question model
export default mongoose.model('QuizQuestion', quizQuestionSchema);
