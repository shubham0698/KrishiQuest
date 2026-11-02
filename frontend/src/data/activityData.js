export const activityCategories = [
  'Water Conservation', 'Soil Health', 'Crop Diversity', 'Organic Farming', 'Pest Management', 'Crop Management',
];

export const activityStatuses = ['All statuses', 'Pending Review', 'Approved', 'Rejected', 'Resubmission Required'];

export const initialDemoActivities = [
  { id: 'demo-activity-101', reference: 'KQ-DEMO-101', farmerName: 'Demo Farmer', farmerId: 'KQ-F-2048', district: 'Satara', questId: 'water-saver', questName: 'Water Saver', title: 'Adjusted morning irrigation', description: 'I checked soil moisture before watering and tried an early morning routine on a small vegetable bed to reduce evaporation.', category: 'Water Conservation', completionDate: '2026-10-27', submittedAt: '2026-10-28T09:20:00.000Z', status: 'Pending Review', officerRemarks: '', location: '', photos: [], notes: 'Illustrative sample activity for review UI.' },
  { id: 'demo-activity-102', reference: 'KQ-DEMO-102', farmerName: 'Meera Jadhav', farmerId: 'KQ-F-1182', district: 'Kolhapur', questId: 'soil-guardian', questName: 'Soil Guardian', title: 'Added mature compost to a crop bed', description: 'Applied a thin layer of mature compost around the crop bed, leaving space near plant stems.', category: 'Soil Health', completionDate: '2026-10-24', submittedAt: '2026-10-25T11:15:00.000Z', status: 'Approved', officerRemarks: 'Illustrative feedback: clear description of the compost practice.', location: 'Kolhapur district · demo location', photos: [], notes: '', reviewedAt: '2026-10-26' },
  { id: 'demo-activity-103', reference: 'KQ-DEMO-103', farmerName: 'Ramesh Deshmukh', farmerId: 'KQ-F-1305', district: 'Pune', questId: 'green-protector', questName: 'Green Protector', title: 'Observed beneficial insects near field edge', description: 'Recorded insects around the field edge and noted flowering plants before making a crop protection decision.', category: 'Pest Management', completionDate: '2026-10-22', submittedAt: '2026-10-23T08:45:00.000Z', status: 'Resubmission Required', officerRemarks: 'Illustrative feedback: please add the observation date and describe the insects you noticed.', location: '', photos: [], notes: '', reviewedAt: '2026-10-24' },
  { id: 'demo-activity-104', reference: 'KQ-DEMO-104', farmerName: 'Ananya Patil', farmerId: 'KQ-F-0971', district: 'Nashik', questId: 'mulching-master', questName: 'Mulching Master', title: 'Mulched a small tomato plot', description: 'Placed a loose layer of clean crop residue around the tomato plot and kept the stems clear.', category: 'Soil Health', completionDate: '2026-10-18', submittedAt: '2026-10-19T14:05:00.000Z', status: 'Rejected', officerRemarks: 'Illustrative feedback: the sample evidence does not show the selected crop area. Add a new photo with the resubmission.', location: 'Nashik district · demo location', photos: [], notes: '', reviewedAt: '2026-10-20' },
];

export const MAX_ACTIVITY_PHOTOS = 5;
export const MAX_ACTIVITY_PHOTO_BYTES = 5 * 1024 * 1024;
export const ACCEPTED_ACTIVITY_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const activityQuestOptions = [
  { id: 'water-saver', name: 'Water Saver' },
  { id: 'soil-guardian', name: 'Soil Guardian' },
  { id: 'green-protector', name: 'Green Protector' },
  { id: 'crop-diversity', name: 'Crop Diversity' },
  { id: 'mulching-master', name: 'Mulching Master' },
  { id: 'compost-champion', name: 'Compost Champion' },
  { id: 'drip-irrigation-expert', name: 'Drip Irrigation Expert' },
  { id: 'seed-saver', name: 'Seed Saver' },
  { id: 'crop-rotation-hero', name: 'Crop Rotation Hero' },
  { id: 'chemical-reduction', name: 'Chemical Reduction' },
];
