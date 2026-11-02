export const farmerNotificationCategories = ['Quest updates', 'Activity verification', 'Learning', 'Achievements & XP', 'Community', 'Platform announcements'];
export const officerNotificationCategories = ['New activity submissions', 'Pending verification', 'Farmer resubmissions', 'Review status updates'];

export const initialFarmerNotifications = [
  { id: 'farmer-notif-1', category: 'Quest updates', title: 'Your Soil Guardian quest is ready', message: 'Continue the demo quest checklist and review the soil health lesson.', createdAt: '2026-11-02T07:00:00.000Z', read: false },
  { id: 'farmer-notif-2', category: 'Activity verification', title: 'Activity status updated', message: 'The illustrative water-saving activity has a sample review update.', createdAt: '2026-11-02T05:45:00.000Z', read: false },
  { id: 'farmer-notif-3', category: 'Learning', title: 'A new learning tip is available', message: 'Review the demo lesson on protecting soil moisture with mulch.', createdAt: '2026-11-01T12:00:00.000Z', read: true },
  { id: 'farmer-notif-4', category: 'Achievements & XP', title: 'Water Warrior badge preview', message: 'A sample achievement was added to the gamification preview.', createdAt: '2026-10-31T09:20:00.000Z', read: false },
  { id: 'farmer-notif-5', category: 'Community', title: 'Meera commented on your post', message: '“Checking a small area first has helped me learn too.”', createdAt: '2026-10-30T08:30:00.000Z', read: true },
  { id: 'farmer-notif-6', category: 'Platform announcements', title: 'Welcome to the community preview', message: 'Explore sustainable farming ideas shared by fictional demo farmers.', createdAt: '2026-10-28T08:00:00.000Z', read: true },
];

export const initialOfficerNotifications = [
  { id: 'officer-notif-1', category: 'New activity submissions', title: 'New demo activity submission', message: 'A water conservation activity preview was added to the local review queue.', createdAt: '2026-11-02T07:15:00.000Z', read: false },
  { id: 'officer-notif-2', category: 'Pending verification', title: 'Verification queue reminder', message: 'There are illustrative submissions awaiting review in the officer workspace.', createdAt: '2026-11-02T06:00:00.000Z', read: false },
  { id: 'officer-notif-3', category: 'Farmer resubmissions', title: 'A demo farmer resubmitted an activity', message: 'A sample activity was returned to the review queue.', createdAt: '2026-11-01T09:00:00.000Z', read: true },
  { id: 'officer-notif-4', category: 'Review status updates', title: 'Review action recorded locally', message: 'Your illustrative review action appears in browser memory only.', createdAt: '2026-10-30T10:45:00.000Z', read: true },
];

export const defaultFarmerSettings = {
  displayName: 'Demo Farmer', email: 'farmer@example.invalid',
  notifications: { community: true, quests: true, activities: true, learning: true, achievements: true },
  language: 'English', fontSize: 'Default', reducedMotion: false, appearance: 'Light',
  shareLocation: false, communityVisible: true,
};
