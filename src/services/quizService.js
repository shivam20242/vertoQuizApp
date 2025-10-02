import { Option } from '../models/index.js';

// Score calc
export async function getScore(submissions) {
  let score = 0;
  const total = submissions.length;

  for (const { questionId, selectedOptionId } of submissions) {
    const { isCorrect } = await Option.findOne({
      _id: selectedOptionId,
      question: questionId
    }).select('isCorrect').lean();

    if (isCorrect) score++;
  }

  return { score, total };
}

// Validation
export function validateQuestion(questionData) {
  const { text, type = 'single_choice', options = [] } = questionData;
  const errors = [];

  if (!text?.trim()) errors.push('Need question text');
  if (type === 'text' && text.length > 300) errors.push('Text too long (max 300 chars)');
  if (type === 'text' && options.length > 0) errors.push('Text questions no options');

  if (type !== 'text') {
    if (options.length < 2) errors.push('Need at least 2 options');
    const correctCount = options.filter(opt => opt.isCorrect).length;
    if (type === 'single_choice' && correctCount !== 1) errors.push('Single choice: exactly 1 correct');
    if (type === 'multiple_choice' && correctCount === 0) errors.push('Multiple choice: at least 1 correct');
  }

  return { ok: errors.length === 0, errors };
}