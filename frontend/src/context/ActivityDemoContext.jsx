import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { initialDemoActivities } from '../data/activityData.js';
import { resubmitActivity as resubmitActivityRecord, transitionActivityStatus } from '../utils/activityUtils.js';
import { useEngagementDemo } from './EngagementDemoContext.jsx';

const ActivityDemoContext = createContext(null);

export function ActivityDemoProvider({ children }) {
  const { notifyFarmer, notifyOfficer } = useEngagementDemo();
  const [activities, setActivities] = useState(initialDemoActivities);
  const counter = useRef(1);
  const activitiesRef = useRef(activities);
  activitiesRef.current = activities;

  useEffect(() => () => {
    activitiesRef.current.flatMap((activity) => activity.photos || []).forEach((photo) => {
      if (photo.url?.startsWith('blob:')) URL.revokeObjectURL(photo.url);
    });
  }, []);

  function submitActivity(values, photos) {
    const serial = counter.current++;
    const reference = `KQ-DEMO-${Date.now().toString(36).toUpperCase()}-${String(serial).padStart(2, '0')}`;
    const activity = {
      ...values,
      id: `local-activity-${serial}`,
      reference,
      farmerName: 'Demo Farmer',
      farmerId: 'KQ-F-2048',
      district: 'Satara',
      submittedAt: new Date().toISOString(),
      status: 'Pending Review',
      officerRemarks: '',
      location: values.locationEnabled ? values.location : '',
      photos,
    };
    activitiesRef.current = [activity, ...activitiesRef.current];
    setActivities(activitiesRef.current);
    notifyOfficer({ category: 'New activity submissions', title: 'New demo activity submitted', message: `${activity.farmerName} added “${activity.title}” to the local review queue.` });
    return activity;
  }

  function reviewActivity(id, status, remarks) {
    const activity = activitiesRef.current.find((item) => item.id === id);
    const result = transitionActivityStatus(activity, status, remarks);
    if (result.ok) {
      activitiesRef.current = activitiesRef.current.map((item) => item.id === id ? result.activity : item);
      setActivities(activitiesRef.current);
      notifyFarmer({ category: 'Activity verification', title: 'Demo activity review updated', message: `The sample status for “${activity.title}” is now ${status.toLowerCase()}.` });
    }
    return result;
  }

  function resubmit(id, updatedFields = {}) {
    const activity = activitiesRef.current.find((item) => item.id === id);
    const result = resubmitActivityRecord(activity, updatedFields);
    if (result.ok) {
      activitiesRef.current = activitiesRef.current.map((item) => item.id === id ? result.activity : item);
      setActivities(activitiesRef.current);
      notifyOfficer({ category: 'Farmer resubmissions', title: 'Demo activity resubmitted', message: `A sample resubmission is ready for officer review.` });
    }
    return result;
  }

  const value = useMemo(() => ({ activities, submitActivity, reviewActivity, resubmit }), [activities]);
  return <ActivityDemoContext.Provider value={value}>{children}</ActivityDemoContext.Provider>;
}

export function useActivityDemo() {
  const value = useContext(ActivityDemoContext);
  if (!value) throw new Error('useActivityDemo must be used within ActivityDemoProvider.');
  return value;
}
