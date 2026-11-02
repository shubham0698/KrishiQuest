import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function LearningFilters({ search, setSearch, category, setCategory, difficulty, setDifficulty, categories, difficulties, onReset }) {
  const active = search || category !== 'All categories' || difficulty !== 'All levels';
  return (
    <div className="learning-filter-wrap"><div className="learning-filter-heading"><div><SlidersHorizontal size={15} /><strong>Find a lesson</strong></div>{active && <button type="button" onClick={onReset}>Clear filters <X size={12} /></button>}</div><div className="learning-filter-bar"><label className="learning-search"><Search size={16} /><input type="search" placeholder="Search lessons, topics…" value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search lessons" />{search && <button type="button" aria-label="Clear search" onClick={() => setSearch('')}><X size={14} /></button>}</label><label className="learning-filter-select"><span className="learning-sr-only">Filter lessons by category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label><label className="learning-filter-select"><span className="learning-sr-only">Filter lessons by difficulty</span><select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}><option>All levels</option>{difficulties.map((item) => <option key={item}>{item}</option>)}</select></label></div></div>
  );
}
