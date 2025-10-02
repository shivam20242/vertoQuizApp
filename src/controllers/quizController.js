import { Option, Question, Quiz } from '../models/index.js';
import { getScore, validateQuestion } from '../services/quizService.js';

// Create quiz
export async function createQuiz(req, res) {
  try {
    const { title } = req.body;
    if (!title?.trim()) return res.status(400).json({ error: 'Title needed' });

    const quiz = await new Quiz({ title }).save();
    res.status(201).json({ id: quiz._id, title });
  } catch (err) {
    console.error('Quiz create error:', err);
    res.status(500).json({ error: err.message });
  }
}

// List quizzes (bonus)
export async function listQuizzes(req, res) {
  try {
    const quizzes = await Quiz.find({}, 'title').lean();
    res.json(quizzes.map(q => ({ id: q._id, ...q })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Add question
export async function addQuestion(req, res) {
  try {
    const { quizId } = req.params;
    const questionData = req.body;

    const { ok, errors } = validateQuestion(questionData);
    if (!ok) return res.status(400).json({ errors });

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    const question = await new Question({
      quiz: quizId,
      text: questionData.text,
      type: questionData.type || 'single_choice'
    }).save();
    const qId = question._id;

    if (questionData.options?.length) {
      await Promise.all(
        questionData.options.map(opt =>
          new Option({
            question: qId,
            text: opt.text,
            isCorrect: !!opt.isCorrect
          }).save()
        )
      );
    }

    res.status(201).json({ id: qId });
  } catch (err) {
    console.error('Question add error:', err);
    res.status(500).json({ error: err.message });
  }
}

// Get questions
export async function getQuizQuestions(req, res) {
  try {
    const { quizId } = req.params;
    let questions = await Question.find({ quiz: quizId }).lean();

    questions = await Promise.all(
      questions.map(async (q) => ({
        ...q,
        id: q._id,
        options: await Option.find({ question: q._id }, '_id text').lean()  // Include _id as 'id'
      }))
    );

    res.json(questions);
  } catch (err) {
    console.error('Get questions error:', err);
    res.status(500).json({ error: err.message });
  }
}

// Submit answers
export async function submitAnswers(req, res) {
  try {
    const { quizId } = req.params;
    const submissions = req.body;

    const questionIds = submissions.map(s => s.questionId);
    const validQuestions = await Question.find({
      quiz: quizId,
      _id: { $in: questionIds }
    }).select('_id').lean();
    const validIds = validQuestions.map(q => q._id.toString());
    const invalidSub = submissions.find(s => !validIds.includes(s.questionId));
    if (invalidSub) return res.status(400).json({ error: 'Bad question ID' });

    const { score, total } = await getScore(submissions);
    res.json({ score, total });
  } catch (err) {
    console.error('Submit error:', err);
    res.status(500).json({ error: err.message });
  }
}