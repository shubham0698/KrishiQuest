import { createContext, useContext, useMemo, useState } from 'react';
import { learningLessons } from '../data/learningLessons.js';

const LearningContext = createContext(null);
const initialProgress = {
  'sustainable-agriculture': { completed: true, bestQuizScore: 4, quizTotal: 5, attempts: 1 },
  'water-conservation': { completed: false, bestQuizScore: null, quizTotal: 0, attempts: 0 },
  'soil-health': { completed: true, bestQuizScore: null, quizTotal: 0, attempts: 0 },
};

export function LearningProvider({ children }) {
  const [progress, setProgress] = useState(initialProgress);
  const lessons = useMemo(() => learningLessons.map((lesson) => ({ ...lesson, ...(progress[lesson.id] || { completed: false, bestQuizScore: null, quizTotal: 0, attempts: 0 }) })), [progress]);
  const completedLessons = lessons.filter((lesson) => lesson.completed).length;
  const completedQuizzes = lessons.filter((lesson) => lesson.attempts > 0).length;
  const learningXpPreview = lessons.reduce((total, lesson) => total + (lesson.completed ? lesson.xp : 0) + (lesson.bestQuizScore === null ? 0 : lesson.bestQuizScore * 8), 0);
  const categoryProgress = useMemo(() => {
    const categories = [...new Set(lessons.map((lesson) => lesson.category))];
    return categories.map((category) => {
      const group = lessons.filter((lesson) => lesson.category === category);
      const done = group.filter((lesson) => lesson.completed).length;
      return { category, completed: done, total: group.length, percent: Math.round((done / group.length) * 100) };
    });
  }, [lessons]);

  function markLessonCompleted(id) {
    setProgress((current) => ({ ...current, [id]: { completed: true, bestQuizScore: current[id]?.bestQuizScore ?? null, quizTotal: current[id]?.quizTotal ?? 0, attempts: current[id]?.attempts ?? 0 } }));
  }

  function recordQuiz(id, score, total) {
    setProgress((current) => {
      const previous = current[id] || { completed: false, bestQuizScore: null, quizTotal: total, attempts: 0 };
      const bestQuizScore = previous.bestQuizScore === null ? score : Math.max(previous.bestQuizScore, score);
      return { ...current, [id]: { ...previous, bestQuizScore, quizTotal: total, attempts: previous.attempts + 1 } };
    });
  }

  const value = useMemo(() => ({ lessons, completedLessons, completedQuizzes, learningXpPreview, categoryProgress, markLessonCompleted, recordQuiz, streakPreview: 4 }), [lessons, completedLessons, completedQuizzes, learningXpPreview, categoryProgress]);
  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) throw new Error('useLearning must be used within LearningProvider.');
  return context;
}
