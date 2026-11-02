import { createContext, useContext, useMemo, useState } from 'react';
import { initialCommunityPosts, CURRENT_DEMO_FARMER_ID } from '../data/communityData.js';
import { defaultFarmerSettings, initialFarmerNotifications, initialOfficerNotifications } from '../data/notificationData.js';
import { addCommunityComment, countUnreadNotifications, createCommunityPost, deleteDemoNotification, deleteOwnCommunityPost, editOwnCommunityPost, markAllNotificationsRead, markNotificationRead, toggleCommunityPostLike, updateSettingsPreference } from '../utils/engagementUtils.js';

const EngagementDemoContext = createContext(null);

export function EngagementDemoProvider({ children }) {
  const [posts, setPosts] = useState(initialCommunityPosts);
  const [farmerNotifications, setFarmerNotifications] = useState(initialFarmerNotifications);
  const [officerNotifications, setOfficerNotifications] = useState(initialOfficerNotifications);
  const [settings, setSettings] = useState(defaultFarmerSettings);

  function addPost(values) {
    const name=settings.displayName.trim()||'Demo Farmer';
    const initials=name.split(/\s+/).slice(0,2).map((part)=>part[0]?.toUpperCase()||'').join('')||'DF';
    setPosts((current) => createCommunityPost(current, values, { author:name, initials }));
  }
  function editPost(id, values) {
    setPosts((current) => editOwnCommunityPost(current, id, CURRENT_DEMO_FARMER_ID, values));
  }
  function deletePost(id) {
    setPosts((current) => deleteOwnCommunityPost(current, id, CURRENT_DEMO_FARMER_ID));
  }
  function toggleLike(id) {
    setPosts((current) => toggleCommunityPostLike(current, id));
  }
  function addComment(postId, text) {
    setPosts((current) => addCommunityComment(current, postId, text));
  }
  function notifyFarmer(notification) {
    setFarmerNotifications((current) => [{ id: `farmer-local-${Date.now()}`, createdAt: new Date().toISOString(), read: false, ...notification }, ...current]);
  }
  function notifyOfficer(notification) {
    setOfficerNotifications((current) => [{ id: `officer-local-${Date.now()}`, createdAt: new Date().toISOString(), read: false, ...notification }, ...current]);
  }
  function readFarmerNotification(id) { setFarmerNotifications((current) => markNotificationRead(current, id)); }
  function readAllFarmerNotifications() { setFarmerNotifications((current) => markAllNotificationsRead(current)); }
  function removeFarmerNotification(id) { setFarmerNotifications((current) => deleteDemoNotification(current, id)); }
  function readOfficerNotification(id) { setOfficerNotifications((current) => markNotificationRead(current, id)); }
  function readAllOfficerNotifications() { setOfficerNotifications((current) => markAllNotificationsRead(current)); }
  function removeOfficerNotification(id) { setOfficerNotifications((current) => deleteDemoNotification(current, id)); }
  function updatePreference(key, value) { setSettings((current) => updateSettingsPreference(current, key, value)); }
  function resetPreferences() { setSettings(defaultFarmerSettings); }

  const value = useMemo(() => ({
    posts, addPost, editPost, deletePost, toggleLike, addComment,
    farmerNotifications, officerNotifications,
    farmerUnreadCount: countUnreadNotifications(farmerNotifications), officerUnreadCount: countUnreadNotifications(officerNotifications),
    notifyFarmer, notifyOfficer, readFarmerNotification, readAllFarmerNotifications, removeFarmerNotification,
    readOfficerNotification, readAllOfficerNotifications, removeOfficerNotification,
    settings, updatePreference, resetPreferences,
  }), [posts, farmerNotifications, officerNotifications, settings]);
  return <EngagementDemoContext.Provider value={value}>{children}</EngagementDemoContext.Provider>;
}

export function useEngagementDemo() {
  const value = useContext(EngagementDemoContext);
  if (!value) throw new Error('useEngagementDemo must be used inside EngagementDemoProvider.');
  return value;
}
