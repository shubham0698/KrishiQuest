// Illustrative platform analytics and fictional officer directory for the admin preview.
export const initialDemoOfficers = [
  { id: 'KQ-O-1001', name: 'Arjun Kulkarni', initials: 'AK', district: 'Satara', email: 'officer.1001@example.invalid', mobile: '+91 XXXXX 1001', reviewed: 38, pending: 4, approved: 29, rejected: 5, status: 'Active' },
  { id: 'KQ-O-1002', name: 'Kavita More', initials: 'KM', district: 'Kolhapur', email: 'officer.1002@example.invalid', mobile: '+91 XXXXX 1002', reviewed: 46, pending: 2, approved: 39, rejected: 5, status: 'Active' },
  { id: 'KQ-O-1003', name: 'Sanjay Pawar', initials: 'SP', district: 'Pune', email: 'officer.1003@example.invalid', mobile: '+91 XXXXX 1003', reviewed: 21, pending: 7, approved: 15, rejected: 6, status: 'Active' },
  { id: 'KQ-O-1004', name: 'Neha Shinde', initials: 'NS', district: 'Nashik', email: 'officer.1004@example.invalid', mobile: '+91 XXXXX 1004', reviewed: 31, pending: 3, approved: 25, rejected: 6, status: 'Active' },
];

export const adminMonthlyRegistrations = [
  { month: 'May', farmers: 18, officers: 2 }, { month: 'Jun', farmers: 24, officers: 3 },
  { month: 'Jul', farmers: 31, officers: 2 }, { month: 'Aug', farmers: 28, officers: 4 },
  { month: 'Sep', farmers: 43, officers: 3 }, { month: 'Oct', farmers: 51, officers: 4 },
];
export const adminDistrictDistribution = [
  { district: 'Satara', farmers: 24 }, { district: 'Kolhapur', farmers: 19 },
  { district: 'Pune', farmers: 31 }, { district: 'Nashik', farmers: 26 },
];
export const adminActivityTrend = [
  { month: 'May', submitted: 38, reviewed: 31 }, { month: 'Jun', submitted: 49, reviewed: 42 },
  { month: 'Jul', submitted: 56, reviewed: 49 }, { month: 'Aug', submitted: 52, reviewed: 48 },
  { month: 'Sep', submitted: 68, reviewed: 59 }, { month: 'Oct', submitted: 74, reviewed: 66 },
];
export const adminQuestTrend = [
  { month: 'May', started: 48, completed: 26 }, { month: 'Jun', started: 62, completed: 39 },
  { month: 'Jul', started: 77, completed: 51 }, { month: 'Aug', started: 71, completed: 47 },
  { month: 'Sep', started: 94, completed: 68 }, { month: 'Oct', started: 108, completed: 82 },
];
export const adminSustainabilityDistribution = [
  { range: '0–49', farmers: 8 }, { range: '50–69', farmers: 19 },
  { range: '70–84', farmers: 37 }, { range: '85–100', farmers: 36 },
];

export const recentOfficerActivityDemo = [
  { officerId: 'KQ-O-1002', action: 'Reviewed 6 compost and soil-care submissions', date: '2026-11-01' },
  { officerId: 'KQ-O-1001', action: 'Approved 4 water-conservation activity previews', date: '2026-10-31' },
  { officerId: 'KQ-O-1004', action: 'Returned 2 sample activities with guidance', date: '2026-10-30' },
  { officerId: 'KQ-O-1003', action: 'Completed a district farmer monitoring review', date: '2026-10-29' },
];
