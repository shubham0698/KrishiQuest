import { createContext, useContext, useMemo, useState } from 'react';
import { initialQuestProgress, questCatalog } from '../data/farmingQuestData.js';

const QuestContext = createContext(null);

export function QuestProvider({ children }) {
  const [progress, setProgress] = useState(initialQuestProgress);
  const quests = useMemo(() => questCatalog.map((quest) => {
    const saved = progress[quest.id];
    const completeCount = saved.checks.filter(Boolean).length;
    return { ...quest, status: saved.status, checks: saved.checks, progress: saved.status === 'completed' ? 100 : Math.round((completeCount / quest.checklist.length) * 100) };
  }), [progress]);

  function startQuest(id) {
    setProgress((current) => current[id]?.status === 'available' ? { ...current, [id]: { ...current[id], status: 'in-progress' } } : current);
  }

  function toggleCheck(id, index) {
    setProgress((current) => {
      const quest = questCatalog.find((item) => item.id === id);
      if (!quest || current[id]?.status !== 'in-progress') return current;
      return { ...current, [id]: { ...current[id], checks: current[id].checks.map((checked, checkIndex) => checkIndex === index ? !checked : checked) } };
    });
  }

  function completeQuest(id) {
    setProgress((current) => {
      const quest = questCatalog.find((item) => item.id === id);
      if (!quest || current[id]?.status !== 'in-progress' || !current[id].checks.every(Boolean)) return current;
      return { ...current, [id]: { ...current[id], status: 'completed', checks: quest.checklist.map(() => true) } };
    });
  }

  const value = useMemo(() => ({ quests, startQuest, toggleCheck, completeQuest }), [quests]);
  return <QuestContext.Provider value={value}>{children}</QuestContext.Provider>;
}

export function useQuests() {
  const context = useContext(QuestContext);
  if (!context) throw new Error('useQuests must be used within QuestProvider.');
  return context;
}
