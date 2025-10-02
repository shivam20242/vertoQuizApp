# Quiz API: Simple Online Quiz Backend

A lightweight Node.js REST API for quizzes. Create/manage quizzes, add questions with options (one correct), fetch without answers, submit for scoring. Built with Express + Mongoose + MongoDB Atlas.

## Features
- Create quizzes with title.
- Add questions (text + options, one correct).
- Fetch quiz questions (hides corrects).
- Submit answers → get score (e.g., `{ "score": 3, "total": 5 }`).
- Bonus: List all quizzes; validation (e.g., text ≤300 chars).

## Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (free tier)
- npm

## Installation
1. Clone the repo:
   ```
   git clone <your-repo-url>
   cd quiz-app
   ```
2. Install deps:
   ```
   npm install
   ```
3. Create `.env` in root:
   ```
   PORT=3000
   MONGODB_URI=mongodb+srv://user:pass@cluster.abcde.mongodb.net/quizdb?retryWrites=true&w=majority
   ```
   - Get URI from [Atlas dashboard](https://cloud.mongodb.com).
   - Add `.env` to `.gitignore`.

## Running
1. Start server:
   ```
   npm start
   ```
   - See: "Mongo connected!" + "Quiz API running at http://localhost:3000".
2. Test with curl/Postman (endpoints below).

## 🌐 Live Demo
Deployed on Render: [https://vertoquizapp.onrender.com](https://vertoquizapp.onrender.com)  
*(Note: Use POST for submit—GET on `/submit` will error with "Cannot GET". Replace `68de3e1c3eebe231bcc884d3` with your quiz ID for specific quizzes.)*

| Endpoint | Method | Description | Live URL |
|----------|--------|-------------|----------|
| Create Quiz | POST | Create a new quiz with title. Body: `{ "title": "Math Quiz" }`. | [https://vertoquizapp.onrender.com/api/quizzes](https://vertoquizapp.onrender.com/api/quizzes) |
| List All Quizzes | GET | Retrieve all quizzes. | [https://vertoquizapp.onrender.com/api/quizzes](https://vertoquizapp.onrender.com/api/quizzes) |
| Create Question for Particular Quiz | POST | Add a question to a specific quiz. Body: `{ "text": "2+2?", "options": [{ "text": "4", "isCorrect": true }] }`. | [https://vertoquizapp.onrender.com/api/quizzes/68de3e1c3eebe231bcc884d3/questions](https://vertoquizapp.onrender.com/api/quizzes/68de3e1c3eebe231bcc884d3/questions) |
| View Questions for a Quiz | GET | Fetch questions/options (hides correct answers). | [https://vertoquizapp.onrender.com/api/quizzes/68de3e1c3eebe231bcc884d3/questions](https://vertoquizapp.onrender.com/api/quizzes/68de3e1c3eebe231bcc884d3/questions) |
| Submit Answers & Get Score | POST | Submit answers for scoring. Body: `[{ "questionId": "...", "selectedOptionId": "..." }]`. | [https://vertoquizapp.onrender.com/api/quizzes/68de3e1c3eebe231bcc884d3/submit](https://vertoquizapp.onrender.com/api/quizzes/68de3e1c3eebe231bcc884d3/submit) |

**Sample Data** (from your DB):
- Quizzes: `[{"id":"68de3e1c3eebe231bcc884d3","title":"Math Basics Quiz"},{"id":"68de9f576d3469bcd0a70c61","title":"Math Basics Quiz"}]`
- Questions (for ID `68de3e1c3eebe231bcc884d3`): 3 math questions with options (e.g., "What is 2 + 2?" → options "3"/"4").

## 📡 API Endpoints
Base: `http://localhost:3000/api` (or live URLs above).

- **POST /quizzes**  
  Create: `{ "title": "Math Quiz" }` → `{ "id": "...", "title": "..." }`

- **GET /quizzes**  
  List: → `[{ "id": "...", "title": "..." }]`

- **POST /quizzes/:quizId/questions**  
  Add: `{ "text": "2+2?", "options": [{ "text": "4", "isCorrect": true }] }` → `{ "id": "..." }`

- **GET /quizzes/:quizId/questions**  
  Fetch (no corrects): → `[{ "id": "...", "text": "...", "options": [{ "id": "...", "text": "..." }] }]`

- **POST /quizzes/:quizId/submit**  
  Score: `[{ "questionId": "...", "selectedOptionId": "..." }]` → `{ "score": 1, "total": 1 }`

**Quick Flow** (curl, adapt for live):
```
# Create quiz
curl -X POST http://localhost:3000/api/quizzes -H "Content-Type: application/json" -d '{"title":"Test"}'

# Add question (use quiz ID)
# Then fetch, submit with IDs from response
```

Errors: 400/404/500 with JSON messages.

## Project Structure
```
quiz-app/
├── index.js          # Start server
├── src/
│   ├── app.js        # Express + Mongo setup
│   ├── controllers/
│   │   └── quizController.js
│   ├── models/
│   │   └── index.js  # Schemas
│   ├── routes/
│   │   └── quizzes.js
│   └── services/
│       └── quizService.js  # Logic
├── .env              # Config
└── package.json
```
