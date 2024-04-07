// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import quizRouter from './routes/quiz.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Function to connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

// Call the function to connect to MongoDB
connectToMongoDB();

// Middleware
app.use(express.json());

// CORS setup
app.use(cors({
  origin: [process.env.BASE_URL], // Allow requests from the specified origin
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allow specified HTTP methods
  credentials: true // Enable credentials
}));

// Routes
app.use('/', quizRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
