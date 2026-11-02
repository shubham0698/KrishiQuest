import test from 'node:test';
import assert from 'node:assert/strict';
import { matchRoutes } from 'react-router-dom';
import { learningFlashcards } from '../data/learningFlashcards.js';
import { learningLessons } from '../data/learningLessons.js';
import { learningQuizzes } from '../data/learningQuizzes.js';
import { APP_ROUTE_PATHS, LEARNING_ROUTE_PATHS, calculateQuizScore, filterLearningLessons, getBoundedQuestionIndex, getWrappedFlashcardIndex, isQuizFullyAnswered } from '../utils/learningUtils.js';

const appRoutes = Object.values(APP_ROUTE_PATHS).map((path) => ({ path }));
const learningRoutes = Object.values(LEARNING_ROUTE_PATHS).map((path) => ({ path }));

test('existing landing, auth, farmer dashboard, profile, farm and quest routes remain configured', () => {
  for (const path of ['/', '/login', '/register', '/farmer/dashboard', '/farmer/profile', '/farmer/farm', '/farmer/quests', '/farmer/quests/water-saver']) {
    assert.ok(matchRoutes(appRoutes, path), path);
  }
});

test('farmer activity and officer review routes are configured', () => {
  for (const path of ['/farmer/activities/submit', '/farmer/activities', '/farmer/activities/demo-activity-101', '/officer/dashboard', '/officer/activities', '/officer/activities/demo-activity-101', '/officer/farmers', '/officer/farmers/KQ-F-2048', '/officer/reports']) {
    assert.ok(matchRoutes(appRoutes, path), path);
  }
});

test('admin dashboard, management, content, report and settings routes are configured', () => {
  for (const path of ['/admin/dashboard', '/admin/farmers', '/admin/farmers/KQ-F-2048', '/admin/officers', '/admin/quests', '/admin/learning', '/admin/reports', '/admin/settings']) {
    assert.ok(matchRoutes(appRoutes, path), path);
  }
});

test('community, farmer notification/settings and officer notification routes are configured', () => {
  for (const path of ['/farmer/community', '/farmer/notifications', '/farmer/settings', '/officer/notifications']) {
    assert.ok(matchRoutes(appRoutes, path), path);
  }
});

test('learning center route matches both slash variants', () => {
  assert.ok(matchRoutes(learningRoutes, '/farmer/learning'));
  assert.ok(matchRoutes(learningRoutes, '/farmer/learning/'));
});

test('lesson, quiz and flashcard routes match the configured learning routes', () => {
  assert.ok(matchRoutes(learningRoutes, '/farmer/learning/sustainable-agriculture'));
  assert.ok(matchRoutes(learningRoutes, '/farmer/learning/quiz/water-conservation'));
  assert.ok(matchRoutes(learningRoutes, '/farmer/learning/quiz/'));
  assert.ok(matchRoutes(learningRoutes, '/farmer/learning/flashcards'));
});

test('lesson library contains ten unique, structured educational lessons', () => {
  assert.equal(learningLessons.length, 10);
  assert.equal(new Set(learningLessons.map((lesson) => lesson.id)).size, 10);
  for (const lesson of learningLessons) {
    assert.ok(lesson.title && lesson.description);
    assert.ok(lesson.objectives.length >= 3);
    assert.ok(lesson.sections.length >= 3);
    assert.ok(lesson.takeaways.length >= 3);
  }
});

test('learning filters combine search, category and difficulty', () => {
  const water = filterLearningLessons(learningLessons, { search: 'WATER', category: 'Water Management', difficulty: 'Beginner' });
  assert.deepEqual(water.map((lesson) => lesson.id), ['water-conservation']);
  assert.equal(filterLearningLessons(learningLessons, { category: 'Soil Health' }).length, 2);
  assert.equal(filterLearningLessons(learningLessons, { difficulty: 'Advanced' }).length, 1);
  assert.equal(filterLearningLessons(learningLessons, { search: 'no such lesson' }).length, 0);
});

test('every lesson quiz has five four-option questions with a valid correct answer', () => {
  assert.equal(Object.keys(learningQuizzes).length, learningLessons.length);
  for (const lesson of learningLessons) {
    const questions = learningQuizzes[lesson.id];
    assert.equal(questions.length, 5, lesson.id);
    for (const item of questions) {
      assert.equal(item.options.length, 4);
      assert.ok(Number.isInteger(item.answer) && item.answer >= 0 && item.answer < 4);
      assert.ok(item.explanation.length > 20);
    }
  }
});

test('quiz navigation stays within bounds and scoring accepts one answer per question', () => {
  assert.equal(getBoundedQuestionIndex(0, -1, 5), 0);
  assert.equal(getBoundedQuestionIndex(4, 1, 5), 4);
  assert.equal(getBoundedQuestionIndex(1, 1, 5), 2);
  const questions = learningQuizzes['soil-health'];
  const answers = Object.fromEntries(questions.map((item, index) => [index, item.answer]));
  assert.equal(isQuizFullyAnswered(questions, answers), true);
  assert.equal(calculateQuizScore(questions, answers), 5);
  assert.equal(isQuizFullyAnswered(questions, { 0: questions[0].answer }), false);
  assert.equal(calculateQuizScore(questions, { 0: questions[0].answer, 1: 99 }), 1);
});

test('flashcard navigation wraps both directions and includes at least ten farming cards', () => {
  assert.ok(learningFlashcards.length >= 10);
  assert.equal(getWrappedFlashcardIndex(0, -1, learningFlashcards.length), learningFlashcards.length - 1);
  assert.equal(getWrappedFlashcardIndex(learningFlashcards.length - 1, 1, learningFlashcards.length), 0);
  assert.ok(learningFlashcards.every((card) => card.question && card.answer));
});
