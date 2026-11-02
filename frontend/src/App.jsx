import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { QuestProvider } from './context/QuestContext.jsx';
import { LearningProvider } from './context/LearningContext.jsx';
import { ActivityDemoProvider } from './context/ActivityDemoContext.jsx';
import { AdminDemoProvider } from './context/AdminDemoContext.jsx';
import { EngagementDemoProvider } from './context/EngagementDemoContext.jsx';
import { APP_ROUTE_PATHS, LEARNING_ROUTE_PATHS } from './utils/learningUtils.js';
import './styles/activity.css';
import './styles/officer.css';
import './styles/officerMonitoring.css';
import './styles/admin.css';
import './styles/engagement.css';

const LandingPage = lazy(() => import('./pages/LandingPage.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const RegisterPage = lazy(() => import('./pages/RegisterPage.jsx'));
const FarmerDashboard = lazy(() => import('./pages/FarmerDashboard.jsx'));
const FarmerProfilePage = lazy(() => import('./pages/FarmerProfilePage.jsx'));
const FarmerFarmPage = lazy(() => import('./pages/FarmerFarmPage.jsx'));
const FarmerQuestsPage = lazy(() => import('./pages/FarmerQuestsPage.jsx'));
const FarmerQuestDetailPage = lazy(() => import('./pages/FarmerQuestDetailPage.jsx'));
const LearningCenterPage = lazy(() => import('./pages/LearningCenterPage.jsx'));
const LessonDetailPage = lazy(() => import('./pages/LessonDetailPage.jsx'));
const LearningQuizPage = lazy(() => import('./pages/LearningQuizPage.jsx'));
const FlashcardsPage = lazy(() => import('./pages/FlashcardsPage.jsx'));
const FarmerAchievementsPage = lazy(() => import('./pages/FarmerAchievementsPage.jsx'));
const FarmerLeaderboardPage = lazy(() => import('./pages/FarmerLeaderboardPage.jsx'));
const FarmerActivitySubmitPage = lazy(() => import('./pages/FarmerActivitySubmitPage.jsx'));
const FarmerActivitiesPage = lazy(() => import('./pages/FarmerActivitiesPage.jsx'));
const ActivityDetailPage = lazy(() => import('./pages/ActivityDetailPage.jsx'));
const OfficerDashboardPage = lazy(() => import('./pages/OfficerDashboardPage.jsx'));
const OfficerActivitiesPage = lazy(() => import('./pages/OfficerActivitiesPage.jsx'));
const OfficerFarmersPage = lazy(() => import('./pages/OfficerFarmersPage.jsx'));
const OfficerFarmerDetailPage = lazy(() => import('./pages/OfficerFarmerDetailPage.jsx'));
const OfficerReportsPage = lazy(() => import('./pages/OfficerReportsPage.jsx'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage.jsx'));
const AdminFarmersPage = lazy(() => import('./pages/AdminFarmersPage.jsx'));
const AdminFarmerDetailPage = lazy(() => import('./pages/AdminFarmerDetailPage.jsx'));
const AdminOfficersPage = lazy(() => import('./pages/AdminOfficersPage.jsx'));
const AdminQuestsPage = lazy(() => import('./pages/AdminQuestsPage.jsx'));
const AdminLearningPage = lazy(() => import('./pages/AdminLearningPage.jsx'));
const AdminReportsPage = lazy(() => import('./pages/AdminReportsPage.jsx'));
const AdminSettingsPage = lazy(() => import('./pages/AdminSettingsPage.jsx'));
const FarmerCommunityPage = lazy(() => import('./pages/FarmerCommunityPage.jsx'));
const FarmerNotificationsPage = lazy(() => import('./pages/FarmerNotificationsPage.jsx'));
const FarmerSettingsPage = lazy(() => import('./pages/FarmerSettingsPage.jsx'));
const OfficerNotificationsPage = lazy(() => import('./pages/OfficerNotificationsPage.jsx'));

export default function App() {
  return (
    <QuestProvider>
      <LearningProvider>
      <EngagementDemoProvider>
      <ActivityDemoProvider>
      <AdminDemoProvider>
        <Suspense fallback={<div className="app-loading" role="status">Loading KrishiQuest…</div>}>
          <Routes>
            <Route path={APP_ROUTE_PATHS.home} element={<LandingPage />} />
            <Route path={APP_ROUTE_PATHS.login} element={<LoginPage />} />
            <Route path={APP_ROUTE_PATHS.register} element={<RegisterPage />} />
            <Route path={APP_ROUTE_PATHS.farmerDashboard} element={<FarmerDashboard />} />
            <Route path={APP_ROUTE_PATHS.farmerProfile} element={<FarmerProfilePage />} />
            <Route path={APP_ROUTE_PATHS.farmerFarm} element={<FarmerFarmPage />} />
            <Route path={APP_ROUTE_PATHS.farmerQuests} element={<FarmerQuestsPage />} />
            <Route path={APP_ROUTE_PATHS.farmerQuest} element={<FarmerQuestDetailPage />} />
            <Route path={APP_ROUTE_PATHS.farmerAchievements} element={<FarmerAchievementsPage />} />
            <Route path={APP_ROUTE_PATHS.farmerLeaderboard} element={<FarmerLeaderboardPage />} />
            <Route path={APP_ROUTE_PATHS.farmerActivitySubmit} element={<FarmerActivitySubmitPage />} />
            <Route path={APP_ROUTE_PATHS.farmerActivities} element={<FarmerActivitiesPage />} />
            <Route path={APP_ROUTE_PATHS.farmerActivity} element={<ActivityDetailPage />} />
            <Route path={APP_ROUTE_PATHS.farmerCommunity} element={<FarmerCommunityPage />} />
            <Route path={APP_ROUTE_PATHS.farmerNotifications} element={<FarmerNotificationsPage />} />
            <Route path={APP_ROUTE_PATHS.farmerSettings} element={<FarmerSettingsPage />} />
            <Route path={APP_ROUTE_PATHS.officerDashboard} element={<OfficerDashboardPage />} />
            <Route path={APP_ROUTE_PATHS.officerFarmers} element={<OfficerFarmersPage />} />
            <Route path={APP_ROUTE_PATHS.officerFarmer} element={<OfficerFarmerDetailPage />} />
            <Route path={APP_ROUTE_PATHS.officerReports} element={<OfficerReportsPage />} />
            <Route path={APP_ROUTE_PATHS.officerNotifications} element={<OfficerNotificationsPage />} />
            <Route path={APP_ROUTE_PATHS.officerActivities} element={<OfficerActivitiesPage />} />
            <Route path={APP_ROUTE_PATHS.adminDashboard} element={<AdminDashboardPage />} />
            <Route path={APP_ROUTE_PATHS.adminFarmers} element={<AdminFarmersPage />} />
            <Route path={APP_ROUTE_PATHS.adminFarmer} element={<AdminFarmerDetailPage />} />
            <Route path={APP_ROUTE_PATHS.adminOfficers} element={<AdminOfficersPage />} />
            <Route path={APP_ROUTE_PATHS.adminQuests} element={<AdminQuestsPage />} />
            <Route path={APP_ROUTE_PATHS.adminLearning} element={<AdminLearningPage />} />
            <Route path={APP_ROUTE_PATHS.adminReports} element={<AdminReportsPage />} />
            <Route path={APP_ROUTE_PATHS.adminSettings} element={<AdminSettingsPage />} />
            <Route path={APP_ROUTE_PATHS.officerActivity} element={<ActivityDetailPage />} />
            <Route path={LEARNING_ROUTE_PATHS.center} element={<LearningCenterPage />} />
            <Route path={LEARNING_ROUTE_PATHS.quizIndex} element={<LearningQuizPage />} />
            <Route path={LEARNING_ROUTE_PATHS.quiz} element={<LearningQuizPage />} />
            <Route path={LEARNING_ROUTE_PATHS.flashcards} element={<FlashcardsPage />} />
            <Route path={LEARNING_ROUTE_PATHS.lesson} element={<LessonDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AdminDemoProvider>
      </ActivityDemoProvider>
      </EngagementDemoProvider>
      </LearningProvider>
    </QuestProvider>
  );
}
