export const farmerStats = [
  { label: 'Total experience', value: '1,250', suffix: 'XP', detail: 'You’re growing steadily', icon: 'sparkles', tint: 'green', change: '+180 this week' },
  { label: 'Quests completed', value: '12', suffix: '', detail: 'A dozen steps forward', icon: 'target', tint: 'blue', change: '3 this week' },
  { label: 'Current streak', value: '7', suffix: 'days', detail: 'Keep the good habit going', icon: 'flame', tint: 'orange', change: 'Personal best!' },
  { label: 'Sustainability score', value: '85', suffix: '%', detail: 'Growing greener every day', icon: 'leaf', tint: 'purple', change: '+6% this month' },
];

export const farmingQuests = [
  { id: 'water', title: 'Water Saver', description: 'Try a smarter watering routine and give every drop a purpose.', category: 'WATER WISE', icon: 'droplet', difficulty: 'Easy', xp: 120, progress: 75, status: 'In progress', statusType: 'active', image: 'photo-1463123081488-789f998ac9c4', tint: 'blue' },
  { id: 'soil', title: 'Soil Guardian', description: 'Build healthier soil with compost and natural nourishment.', category: 'HEALTHY SOIL', icon: 'sprout', difficulty: 'Medium', xp: 180, progress: 40, status: 'In progress', statusType: 'active', image: 'photo-1500382017468-9049fed747ef', tint: 'green' },
  { id: 'protector', title: 'Green Protector', description: 'Explore nature-friendly ways to keep your crops thriving.', category: 'NATURAL DEFENSE', icon: 'bug', difficulty: 'Medium', xp: 160, progress: 20, status: 'Just started', statusType: 'new', image: 'photo-1497250681960-ef046c08a56e', tint: 'gold' },
  { id: 'diversity', title: 'Crop Diversity', description: 'Discover how crop rotation can bring resilience to your farm.', category: 'DIVERSE FIELDS', icon: 'wheat', difficulty: 'Easy', xp: 140, progress: 100, status: 'Completed', statusType: 'done', image: 'photo-1500937386664-56d1dfef3854', tint: 'earth' },
  { id: 'mulching', title: 'Mulching Master', description: 'Cover your soil to help it hold moisture and stay healthy.', category: 'MOISTURE CARE', icon: 'leaf', difficulty: 'Easy', xp: 100, progress: 0, status: 'Ready to start', statusType: 'ready', image: 'photo-1500382017468-9049fed747ef', tint: 'green' },
];

export const weeklyXp = [
  { day: 'Mon', xp: 90 }, { day: 'Tue', xp: 145 }, { day: 'Wed', xp: 80 },
  { day: 'Thu', xp: 190 }, { day: 'Fri', xp: 125 }, { day: 'Sat', xp: 220 }, { day: 'Sun', xp: 160 },
];

export const recentActivities = [
  { id: 1, icon: 'book', title: 'Water conservation quiz completed', detail: 'Water Saver · Today, 10:42 AM', reward: '+40 XP', tint: 'blue' },
  { id: 2, icon: 'sprout', title: 'Soil Guardian quest started', detail: 'Healthy Soil · Today, 9:15 AM', reward: 'Quest started', tint: 'green' },
  { id: 3, icon: 'award', title: 'Sustainability badge earned', detail: 'Green beginnings · Yesterday', reward: '+80 XP', tint: 'gold' },
  { id: 4, icon: 'camera', title: 'Mulching activity submitted', detail: 'Mulching Master · 2 days ago', reward: 'Awaiting review', tint: 'purple' },
];

export const farmerBadges = [
  { title: 'Water Warrior', detail: 'Complete 3 water-wise quests', icon: 'droplet', earned: true, tint: 'blue' },
  { title: 'Soil Protector', detail: 'Nurture healthy soil', icon: 'sprout', earned: true, tint: 'green' },
  { title: 'Green Champion', detail: 'Complete 10 sustainable quests', icon: 'trophy', earned: false, tint: 'gold' },
  { title: 'Learning Star', detail: 'Finish 5 learning activities', icon: 'star', earned: false, tint: 'purple' },
];

export const sustainabilityTips = [
  { title: 'Save irrigation water', text: 'Water crops early in the morning or later in the evening to reduce evaporation.', icon: 'droplet', label: 'WATER WISE' },
  { title: 'Feed your soil naturally', text: 'Well-prepared organic compost can improve soil structure and support healthy growth.', icon: 'sprout', label: 'HEALTHY SOIL' },
  { title: 'Give crops a new place', text: 'Rotating crops between seasons can help maintain soil balance and reduce pest pressure.', icon: 'wheat', label: 'CROP DIVERSITY' },
  { title: 'Invite nature to help', text: 'Natural pest management can protect crops while supporting helpful insects.', icon: 'bug', label: 'NATURAL CARE' },
];
