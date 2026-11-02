// Fictional demo profiles keyed to farmer IDs already present in activityData.js.
// Contact details are intentionally masked placeholders and cannot be used to call farmers.
export const demoFarmers = [
  { farmerId: 'KQ-F-2048', name: 'Demo Farmer', initials: 'DF', mobile: '+91 XXXXX 2048', village: 'Demo village', district: 'Satara', farmArea: 2.5, areaUnit: 'acres', primaryCrop: 'Tomato', completedQuests: 8, sustainabilityScore: 85, status: 'Active', joinedAt: '2026-05-12', crops: [{ name: 'Tomato', season: 'Kharif', area: 1.1, status: 'Growing' }, { name: 'Soybean', season: 'Kharif', area: 1.4, status: 'Growing' }], practices: ['Morning irrigation checks', 'Crop residue mulching', 'Seasonal crop rotation'], lessonsCompleted: 6, lessonsTotal: 10, quizAverage: 82, achievements: ['Water Warrior', 'Learning Star', 'Seven Day Streak'], questCompletions: { 'Water Saver': 3, 'Soil Guardian': 2, 'Crop Diversity': 2, 'Green Protector': 1 } },
  { farmerId: 'KQ-F-1182', name: 'Meera Jadhav', initials: 'MJ', mobile: '+91 XXXXX 1182', village: 'Samplewadi', district: 'Kolhapur', farmArea: 3.2, areaUnit: 'acres', primaryCrop: 'Soybean', completedQuests: 10, sustainabilityScore: 92, status: 'Active', joinedAt: '2026-03-08', crops: [{ name: 'Soybean', season: 'Kharif', area: 2, status: 'Growing' }, { name: 'Wheat', season: 'Rabi', area: 1.2, status: 'Planned' }], practices: ['Mature compost application', 'Crop rotation planning', 'Water source monitoring'], lessonsCompleted: 8, lessonsTotal: 10, quizAverage: 90, achievements: ['Soil Protector', 'Quest Explorer', 'Learning Star'], questCompletions: { 'Water Saver': 2, 'Soil Guardian': 4, 'Crop Diversity': 3, 'Green Protector': 1 } },
  { farmerId: 'KQ-F-1305', name: 'Ramesh Deshmukh', initials: 'RD', mobile: '+91 XXXXX 1305', village: 'Demo Nagar', district: 'Pune', farmArea: 4.5, areaUnit: 'acres', primaryCrop: 'Sugarcane', completedQuests: 6, sustainabilityScore: 72, status: 'Needs Follow-up', joinedAt: '2026-02-18', crops: [{ name: 'Sugarcane', season: 'Annual', area: 3.5, status: 'Growing' }, { name: 'Pigeon pea', season: 'Kharif', area: 1, status: 'Growing' }], practices: ['Field edge observations', 'Irrigation scheduling'], lessonsCompleted: 4, lessonsTotal: 10, quizAverage: 68, achievements: ['Quest Explorer', 'Water Warrior'], questCompletions: { 'Water Saver': 2, 'Soil Guardian': 1, 'Crop Diversity': 1, 'Green Protector': 2 } },
  { farmerId: 'KQ-F-0971', name: 'Ananya Patil', initials: 'AP', mobile: '+91 XXXXX 0971', village: 'Demo Khurd', district: 'Nashik', farmArea: 1.8, areaUnit: 'acres', primaryCrop: 'Rice', completedQuests: 12, sustainabilityScore: 89, status: 'Active', joinedAt: '2026-04-01', crops: [{ name: 'Rice', season: 'Kharif', area: 1.1, status: 'Growing' }, { name: 'Vegetables', season: 'Rabi', area: 0.7, status: 'Planned' }], practices: ['Crop residue mulching', 'Beneficial insect observations', 'Compost use'], lessonsCompleted: 9, lessonsTotal: 10, quizAverage: 94, achievements: ['Green Champion', 'Crop Diversity Hero', 'Learning Star'], questCompletions: { 'Water Saver': 3, 'Soil Guardian': 3, 'Crop Diversity': 4, 'Green Protector': 2 } },
];

export const farmerStatusFilters = ['All statuses', 'Active', 'Needs Follow-up', 'Inactive'];
export const farmerSortOptions = [
  { value: 'name-asc', label: 'Name · A to Z' },
  { value: 'area-desc', label: 'Farm area · largest first' },
  { value: 'area-asc', label: 'Farm area · smallest first' },
  { value: 'score-desc', label: 'Sustainability · highest first' },
  { value: 'score-asc', label: 'Sustainability · lowest first' },
];

// Aggregated illustrative submissions; charts identify these as demo series.
export const weeklySubmissionsDemo = [
  { label: 'Mon', submissions: 8 }, { label: 'Tue', submissions: 12 }, { label: 'Wed', submissions: 9 },
  { label: 'Thu', submissions: 15 }, { label: 'Fri', submissions: 13 }, { label: 'Sat', submissions: 18 }, { label: 'Sun', submissions: 11 },
];

export const monthlyEngagementDemo = [
  { label: 'Jun', activeFarmers: 12 }, { label: 'Jul', activeFarmers: 17 }, { label: 'Aug', activeFarmers: 16 },
  { label: 'Sep', activeFarmers: 23 }, { label: 'Oct', activeFarmers: 29 }, { label: 'Nov', activeFarmers: 25 },
];
