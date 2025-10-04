import express from 'express';
import { createQuiz, listQuizzes, addQuestion, getQuizQuestions, submitAnswers } from '../controllers/quizController.js';

const router = express.Router();

router.post('/createQuiz', createQuiz);  // Create quiz
router.get('/listQuiz', listQuizzes);  // List quizzes (bonus)

router.post('/:quizId/addQuestions', addQuestion);  // Add question
router.get('/:quizId/getQuestions', getQuizQuestions);  // Get questions

router.post('/:quizId/submitAnswer', submitAnswers);  // Submit

export default router;