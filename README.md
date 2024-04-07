# Node.js Quiz Backend

This repository contains the backend code for a Node.js Quiz application. It provides endpoints for initializing quiz questions, fetching questions, and submitting answers.

## Setup Instructions

### Prerequisites

- Node.js installed on your machine
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. Clone the repository:

```bash
git clone [https://github.com/iamshivanshyadav/Node.js-Quiz](https://github.com/iamshivanshyadav/Node.js-Quiz)
```

2. Navigate to the project directory:

```bash
cd nodejs-quiz-backend
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables:

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
PORT=3000
MONGODB_URI=<your-mongodb-uri>
BASE_URL=http://localhost:3000
```

Replace `<your-mongodb-uri>` with your actual MongoDB URI.

## Usage

1. Start the server:

```bash
npm start
```

The server will start running on port 3000 by default.

2. Initialize Quiz Questions:

To initialize the quiz questions, make a GET request to `/initialize` endpoint. This fetches 10 random questions from the database and initializes the quiz.

3. Fetch Quiz Question:

To fetch a single quiz question, make a GET request to the `/quiz` endpoint.

4. Submit Quiz Answers:

To submit user answers and calculate the quiz score, make a POST request to the `/quiz/submit` endpoint. Provide a JSON object containing user answers with question IDs as keys and selected options as values in the request body.

## Endpoints

### Initialize Quiz Questions

- **URL:** `/initialize`
- **Method:** GET
- **Description:** Initializes quiz questions by fetching 10 random questions from the database.
- **Response:** Returns an array of initialized quiz questions.

### Fetch Quiz Question

- **URL:** `/quiz`
- **Method:** GET
- **Description:** Fetches a single quiz question from the database.
- **Response:** Returns a JSON object representing the quiz question.

### Submit Quiz Answers

- **URL:** `/quiz/submit`
- **Method:** POST
- **Description:** Submits user answers and calculates the quiz score.
- **Request Body:** JSON object containing user answers with question IDs as keys and selected options as values.
- **Response:** Returns a JSON object with the user's score and feedback for each question.

## Error Handling

- The server returns appropriate error responses for invalid requests or server errors.

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for any improvements or features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
