export const APP_ROUTE_PATHS = {
  home: '/', login: '/login', register: '/register',
  farmerDashboard: '/farmer/dashboard', farmerProfile: '/farmer/profile', farmerFarm: '/farmer/farm',
  farmerQuests: '/farmer/quests', farmerQuest: '/farmer/quests/:questId',
  farmerAchievements: '/farmer/achievements', farmerLeaderboard: '/farmer/leaderboard',
  farmerActivities: '/farmer/activities', farmerActivitySubmit: '/farmer/activities/submit', farmerActivity: '/farmer/activities/:activityId',
  farmerCommunity: '/farmer/community', farmerNotifications: '/farmer/notifications', farmerSettings: '/farmer/settings',
  officerDashboard: '/officer/dashboard', officerActivities: '/officer/activities', officerActivity: '/officer/activities/:activityId',
  officerFarmers: '/officer/farmers', officerFarmer: '/officer/farmers/:farmerId', officerReports: '/officer/reports', officerNotifications: '/officer/notifications',
  adminDashboard: '/admin/dashboard', adminFarmers: '/admin/farmers', adminFarmer: '/admin/farmers/:farmerId',
  adminOfficers: '/admin/officers', adminQuests: '/admin/quests', adminLearning: '/admin/learning', adminReports: '/admin/reports', adminSettings: '/admin/settings',
  learningCenter: '/farmer/learning', learningQuizIndex: '/farmer/learning/quiz',
  learningQuiz: '/farmer/learning/quiz/:lessonId', learningFlashcards: '/farmer/learning/flashcards',
  learningLesson: '/farmer/learning/:lessonId',
};

export const LEARNING_ROUTE_PATHS = {
  center: APP_ROUTE_PATHS.learningCenter,
  quizIndex: APP_ROUTE_PATHS.learningQuizIndex,
  quiz: APP_ROUTE_PATHS.learningQuiz,
  flashcards: APP_ROUTE_PATHS.learningFlashcards,
  lesson: APP_ROUTE_PATHS.learningLesson,
};

export function filterLearningLessons(lessons, { search = '', category = 'All categories', difficulty = 'All levels' } = {}) {
  const term = search.trim().toLowerCase();
  return lessons.filter((lesson) => {
    const matchesText = `${lesson.title} ${lesson.description} ${lesson.category}`.toLowerCase().includes(term);
    return matchesText && (category === 'All categories' || lesson.category === category) && (difficulty === 'All levels' || lesson.difficulty === difficulty);
  });
}

export function calculateQuizScore(questions, answers) {
  return questions.reduce((total, item, index) => total + (answers[index] === item.answer ? 1 : 0), 0);
}

export function isQuizFullyAnswered(questions, answers) {
  return questions.every((_, index) => Number.isInteger(answers[index]));
}

export function getBoundedQuestionIndex(current, direction, total) {
  return Math.max(0, Math.min(total - 1, current + direction));
}

export function getWrappedFlashcardIndex(current, direction, total) {
  return (current + direction + total) % total;
}
