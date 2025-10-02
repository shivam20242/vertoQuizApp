import express from 'express';
import { createQuiz, listQuizzes, addQuestion, getQuizQuestions, submitAnswers } from '../controllers/quizController.js';

const router = express.Router();

router.post('/', createQuiz);  // Create quiz
router.get('/', listQuizzes);  // List quizzes (bonus)

router.post('/:quizId/questions', addQuestion);  // Add question
router.get('/:quizId/questions', getQuizQuestions);  // Get questions

router.post('/:quizId/submit', submitAnswers);  // Submit

export default router;