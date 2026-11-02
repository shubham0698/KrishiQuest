import { useMemo, useState } from 'react';
import { ClipboardList, Search, Sparkles } from 'lucide-react';
import FarmerWorkspace from '../components/FarmerWorkspace.jsx';
import ActivityHistoryCard from '../components/ActivityHistoryCard.jsx';
import { activityStatuses } from '../data/activityData.js';
import { useActivityDemo } from '../context/ActivityDemoContext.jsx';

export default function FarmerActivitiesPage() {
  const { activities } = useActivityDemo();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All statuses');
  const filtered = useMemo(() => activities.filter((activity) => `${activity.title} ${activity.questName} ${activity.reference}`.toLowerCase().includes(search.trim().toLowerCase()) && (status === 'All statuses' || activity.status === status)), [activities, search, status]);
  const pending = activities.filter((activity) => activity.status === 'Pending Review').length;
  return <FarmerWorkspace activePath="/farmer/activities" title="My activities" subtitle="A local demo record of your practice submissions"><div className="activity-page">
    <section className="activity-list-hero"><div><span className="activity-form-eyebrow"><ClipboardList size={14} /> FARM JOURNAL · DEMO</span><h1>Your farming activities</h1><p>Review submissions and illustrative officer feedback in this session.</p></div><div className="activity-list-hero-aside"><strong>{activities.length}</strong><span>demo activities</span></div></section>
    <div className="activity-list-banner"><Sparkles size={14} /> New submissions and officer decisions are shared in React memory only. No real officer has received or verified this activity.</div>
    <div className="activity-list-toolbar"><label className="activity-search"><Search size={16} /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search activity or quest" aria-label="Search activities" /></label><label className="activity-status-filter"><span className="activity-sr-only">Filter activities by status</span><select value={status} onChange={(event) => setStatus(event.target.value)}>{activityStatuses.map((item) => <option key={item}>{item}</option>)}</select></label><span className="activity-pending-count">{pending} pending review</span></div>
    {filtered.length ? <div className="activity-history-list">{filtered.map((activity) => <ActivityHistoryCard activity={activity} key={activity.id} />)}</div> : <div className="activity-empty"><ClipboardList size={25} /><strong>No activities match these filters</strong><span>Try a different status or search term.</span><button type="button" onClick={() => { setSearch(''); setStatus('All statuses'); }}>Clear filters</button></div>}
  </div></FarmerWorkspace>;
}
