import { useMemo, useState } from 'react';
import { Award, CheckCircle2, CircleHelp, Search, SlidersHorizontal, Sparkles, Target, X } from 'lucide-react';
import FarmerWorkspace from '../components/FarmerWorkspace.jsx';
import QuestCard from '../components/QuestCard.jsx';
import { questCategories, questDifficulties } from '../data/farmingQuestData.js';
import { useQuests } from '../context/QuestContext.jsx';
import '../styles/farmerQuests.css';

const difficultyRank = { Easy: 1, Medium: 2, Hard: 3 };

export default function FarmerQuestsPage() {
  const { quests } = useQuests();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All categories');
  const [difficulty, setDifficulty] = useState('All difficulties');
  const [status, setStatus] = useState('All statuses');
  const [sort, setSort] = useState('recommended');
  const completed = quests.filter((quest) => quest.status === 'completed');
  const demoXp = completed.reduce((total, quest) => total + quest.xp, 0);

  const visibleQuests = useMemo(() => {
    const filtered = quests.filter((quest) => {
      const matchesSearch = `${quest.title} ${quest.description} ${quest.category}`.toLowerCase().includes(search.trim().toLowerCase());
      const matchesCategory = category === 'All categories' || quest.category === category;
      const matchesDifficulty = difficulty === 'All difficulties' || quest.difficulty === difficulty;
      const matchesStatus = status === 'All statuses' || (status === 'Available' ? quest.status === 'available' : status === 'In progress' ? quest.status === 'in-progress' : quest.status === 'completed');
      return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
    });
    if (sort === 'xp-high') return filtered.sort((a, b) => b.xp - a.xp);
    if (sort === 'xp-low') return filtered.sort((a, b) => a.xp - b.xp);
    if (sort === 'difficulty-easy') return filtered.sort((a, b) => difficultyRank[a.difficulty] - difficultyRank[b.difficulty]);
    if (sort === 'difficulty-hard') return filtered.sort((a, b) => difficultyRank[b.difficulty] - difficultyRank[a.difficulty]);
    return filtered;
  }, [quests, search, category, difficulty, status, sort]);

  function resetFilters() { setSearch(''); setCategory('All categories'); setDifficulty('All difficulties'); setStatus('All statuses'); setSort('recommended'); }
  const hasFilters = search || category !== 'All categories' || difficulty !== 'All difficulties' || status !== 'All statuses';

  return (
    <FarmerWorkspace activePath="/farmer/quests" title="Farming quests" subtitle="Sustainable challenges · demo preview">
      <section className="fq-page-heading"><div><span className="fq-eyebrow"><Sparkles size={14} /> YOUR NEXT FIELD ADVENTURE</span><h1>Sustainable Farming Quests</h1><p>Small, practical steps can grow into a healthier farm. Choose a quest that fits your season and get started at your own pace.</p></div><div className="fq-page-illustration"><Target size={33} /><span><i /><i /><i /></span></div></section>

      <div className="fq-demo-note"><CircleHelp size={14} /><span>Quest progress and XP are illustrative demo data. Completing a quest in this preview does not award real XP or verify farm activities.</span></div>
      <section className="fq-summary-grid" aria-label="Quest overview"><article><span className="fq-summary-icon fq-summary-icon--green"><Target size={17} /></span><div><small>Available quests</small><strong>{quests.length}<span> quests</span></strong><em>Explore all sustainable practices</em></div></article><article><span className="fq-summary-icon fq-summary-icon--blue"><CheckCircle2 size={17} /></span><div><small>Completed quests</small><strong>{completed.length}<span> completed</span></strong><em>Illustrative preview progress</em></div></article><article><span className="fq-summary-icon fq-summary-icon--gold"><Award size={17} /></span><div><small>Demo XP earned</small><strong>{demoXp.toLocaleString()}<span> XP</span></strong><em>Sample total · no real rewards</em></div></article></section>

      <section className="fq-discovery"><div className="fq-discovery-heading"><div><span className="fq-eyebrow"><SlidersHorizontal size={13} /> FIND YOUR NEXT QUEST</span><h2>Explore the quest garden</h2></div><span className="fq-result-count">Showing <strong>{visibleQuests.length}</strong> of {quests.length}</span></div>
        <div className="fq-filter-bar"><label className="fq-search"><Search size={16} /><input type="search" placeholder="Search quests, practices…" value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search quests by name or description" />{search && <button type="button" aria-label="Clear search" onClick={() => setSearch('')}><X size={14} /></button>}</label><label className="fq-select"><span className="sr-only">Filter by category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>All categories</option>{questCategories.map((option) => <option key={option}>{option}</option>)}</select></label><label className="fq-select"><span className="sr-only">Filter by difficulty</span><select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}><option>All difficulties</option>{questDifficulties.map((option) => <option key={option}>{option}</option>)}</select></label><label className="fq-select"><span className="sr-only">Filter by status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option>All statuses</option><option>Available</option><option>In progress</option><option>Completed</option></select></label><label className="fq-select fq-sort"><span className="sr-only">Sort quests</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Recommended</option><option value="xp-high">XP: high to low</option><option value="xp-low">XP: low to high</option><option value="difficulty-easy">Difficulty: easy first</option><option value="difficulty-hard">Difficulty: hard first</option></select></label></div>
        {hasFilters && <button className="fq-clear-filters" type="button" onClick={resetFilters}>Clear filters <X size={12} /></button>}
        {visibleQuests.length ? <div className="fq-grid">{visibleQuests.map((quest) => <QuestCard key={quest.id} quest={quest} />)}</div> : <div className="fq-empty"><Search size={23} /><h3>No quests found</h3><p>Try changing your search or filters to discover other field practices.</p><button type="button" onClick={resetFilters}>Reset filters</button></div>}
      </section>
    </FarmerWorkspace>
  );
}
