export const demoFarmerXp = 1250;

export const farmerLevels = [
  { level: 1, name: 'Seed Starter', xp: 0, icon: 'Sprout' },
  { level: 2, name: 'Growing Farmer', xp: 100, icon: 'Leaf' },
  { level: 3, name: 'Green Explorer', xp: 250, icon: 'Compass' },
  { level: 4, name: 'Soil Guardian', xp: 500, icon: 'Mountain' },
  { level: 5, name: 'Water Warrior', xp: 850, icon: 'Droplets' },
  { level: 6, name: 'Sustainable Champion', xp: 1100, icon: 'Award' },
  { level: 7, name: 'Eco Farming Expert', xp: 1700, icon: 'TreePine' },
  { level: 8, name: 'KrishiQuest Master', xp: 2500, icon: 'Trophy' },
];

export const badgeCatalog = [
  { id: 'water-warrior', name: 'Water Warrior', description: 'Explore water-wise irrigation practices.', category: 'Farming', icon: 'Droplets', condition: 'Complete the Water Saver quest', earned: true, date: '12 Oct 2026' },
  { id: 'soil-protector', name: 'Soil Protector', description: 'Build knowledge of healthy, living soil.', category: 'Farming', icon: 'Sprout', condition: 'Complete 2 soil health activities', earned: true, date: '15 Oct 2026' },
  { id: 'green-champion', name: 'Green Champion', description: 'Choose a nature-friendly crop protection practice.', category: 'Sustainability', icon: 'ShieldCheck', condition: 'Complete Green Protector quest', earned: false },
  { id: 'learning-star', name: 'Learning Star', description: 'Keep growing your farming knowledge.', category: 'Learning', icon: 'BookOpenCheck', condition: 'Complete 5 learning modules', earned: true, date: '18 Oct 2026' },
  { id: 'quest-explorer', name: 'Quest Explorer', description: 'Try a range of sustainable farming quests.', category: 'Farming', icon: 'Compass', condition: 'Start 5 different quests', earned: true, date: '20 Oct 2026' },
  { id: 'compost-master', name: 'Compost Master', description: 'Turn suitable organic matter into a soil resource.', category: 'Farming', icon: 'Recycle', condition: 'Complete Compost Champion quest', earned: false },
  { id: 'crop-diversity', name: 'Crop Diversity Hero', description: 'Make room for variety in your crop plan.', category: 'Sustainability', icon: 'Wheat', condition: 'Complete 3 crop diversity activities', earned: false },
  { id: 'seven-day-streak', name: 'Seven Day Streak', description: 'Show up for your learning journey all week.', category: 'Consistency', icon: 'Flame', condition: 'Be active 7 days in a row', earned: true, date: '21 Oct 2026' },
  { id: 'sustainable-farmer', name: 'Sustainable Farmer', description: 'Explore a balanced set of sustainable practices.', category: 'Sustainability', icon: 'Earth', condition: 'Complete 8 sustainable activities', earned: false },
  { id: 'quest-legend', name: 'KrishiQuest Legend', description: 'Reach the highest level in this demo journey.', category: 'Consistency', icon: 'Crown', condition: 'Reach Level 8', earned: false },
];

export const demoRewards = [
  { id: 1, title: 'Water Warrior badge', activity: 'Completed Water Saver quest', xp: 150, date: '22 Oct 2026', status: 'Demo earned', icon: 'Droplets' },
  { id: 2, title: 'Learning XP preview', activity: 'Passed Soil Health quiz', xp: 32, date: '21 Oct 2026', status: 'Demo earned', icon: 'BookOpenCheck' },
  { id: 3, title: 'Learning XP preview', activity: 'Completed a farming lesson', xp: 80, date: '20 Oct 2026', status: 'Demo earned', icon: 'BookOpen' },
  { id: 4, title: 'Soil Protector badge', activity: 'Explored soil care activities', xp: 100, date: '18 Oct 2026', status: 'Demo earned', icon: 'Sprout' },
];

const leaderboardBase = [
  { name: 'Ananya Patil', district: 'Nashik', initials: 'AP', xp: 2840, level: 8, badges: 9 },
  { name: 'Ramesh Deshmukh', district: 'Pune', initials: 'RD', xp: 2360, level: 7, badges: 8 },
  { name: 'Demo Farmer', district: 'Satara', initials: 'DF', xp: demoFarmerXp, level: 6, badges: 5, isCurrent: true },
  { name: 'Meera Jadhav', district: 'Kolhapur', initials: 'MJ', xp: 1180, level: 5, badges: 5 },
  { name: 'Sanjay Pawar', district: 'Nashik', initials: 'SP', xp: 940, level: 5, badges: 4 },
  { name: 'Kavita Shinde', district: 'Pune', initials: 'KS', xp: 720, level: 4, badges: 3 },
  { name: 'Arjun More', district: 'Satara', initials: 'AM', xp: 590, level: 4, badges: 3 },
  { name: 'Lata Bhosale', district: 'Kolhapur', initials: 'LB', xp: 410, level: 3, badges: 2 },
];

export const leaderboardPeriods = {
  Weekly: leaderboardBase.map((farmer, index) => ({ ...farmer, xp: [620, 570, 480, 390, 340, 280, 220, 160][index] })),
  Monthly: leaderboardBase.map((farmer, index) => ({ ...farmer, xp: [1770, 1520, 1280, 970, 820, 620, 510, 340][index] })),
  'All time': leaderboardBase,
};

export const badgeCategories = ['All', 'Farming', 'Learning', 'Consistency', 'Sustainability'];
export const leaderboardDistricts = ['All districts', ...new Set(leaderboardBase.map((farmer) => farmer.district))];
