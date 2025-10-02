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
   PORT=8080
   MONGODB_URI=mongodb+srv://user:pass@cluster.abcde.mongodb.net/quizdb?retryWrites=true&w=majority
   ```
   - Get URI from [Atlas dashboard](https://cloud.mongodb.com).
   - Add `.env` to `.gitignore`.

## Running
1. Start server:
   ```
   npm start
   ```
   - See: "Mongo connected!" + "Quiz API running at http://localhost:8080".
2. Test with curl/Postman (endpoints below).

## API Endpoints
Base: `http://localhost:8080/api`

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

**Quick Flow** (curl):
```
# Create quiz
curl -X POST http://localhost:8080/api/quizzes -H "Content-Type: application/json" -d '{"title":"Test"}'

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

## Deployment
- Push to GitHub.
- Use Vercel/Heroku: Set `MONGODB_URI` in dashboard.
- Vercel: Connect repo, add env var → live in minutes.

