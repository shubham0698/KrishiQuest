import { createContext, useContext, useMemo, useState } from 'react';
import { initialDemoOfficers } from '../data/adminDemoData.js';

const AdminDemoContext = createContext(null);

export function AdminDemoProvider({ children }) {
  const [officers, setOfficers] = useState(initialDemoOfficers);
  const [farmerStatuses, setFarmerStatuses] = useState({});
  const [questOverrides, setQuestOverrides] = useState({});

  function toggleOfficerStatus(id) {
    setOfficers((current) => current.map((officer) => officer.id === id ? { ...officer, status: officer.status === 'Active' ? 'Inactive' : 'Active' } : officer));
  }
  function addOfficer(officer) {
    setOfficers((current) => [{ ...officer, id: `KQ-O-DEMO-${String(current.length + 1).padStart(3, '0')}`, reviewed: 0, pending: 0, approved: 0, rejected: 0, status: 'Active' }, ...current]);
  }
  function toggleFarmerStatus(farmer) {
    const current = farmerStatuses[farmer.farmerId] || (farmer.status === 'Inactive' ? 'Inactive' : 'Active');
    setFarmerStatuses((statuses) => ({ ...statuses, [farmer.farmerId]: current === 'Active' ? 'Inactive' : 'Active' }));
  }
  function getFarmerStatus(farmer) { return farmerStatuses[farmer.farmerId] || (farmer.status === 'Inactive' ? 'Inactive' : 'Active'); }
  function updateQuest(id, values) { setQuestOverrides((current) => ({ ...current, [id]: { ...current[id], ...values } })); }
  function addQuest(quest) { setQuestOverrides((current) => ({ ...current, [quest.id]: quest })); }

  const value = useMemo(() => ({ officers, addOfficer, toggleOfficerStatus, getFarmerStatus, toggleFarmerStatus, questOverrides, updateQuest, addQuest }), [officers, farmerStatuses, questOverrides]);
  return <AdminDemoContext.Provider value={value}>{children}</AdminDemoContext.Provider>;
}

export function useAdminDemo() {
  const value = useContext(AdminDemoContext);
  if (!value) throw new Error('useAdminDemo must be used inside AdminDemoProvider.');
  return value;
}
