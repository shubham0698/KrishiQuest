import { useEffect, useMemo, useState } from 'react';
import { ClipboardCheck, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ActivityHistoryCard from '../components/ActivityHistoryCard.jsx';
import OfficerWorkspace from '../components/OfficerWorkspace.jsx';
import { activityStatuses } from '../data/activityData.js';
import { useActivityDemo } from '../context/ActivityDemoContext.jsx';

export default function OfficerActivitiesPage() {
  const { activities } = useActivityDemo();
  const [params] = useSearchParams();
  const isHistory = params.get('status') === 'reviewed';
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(isHistory ? 'All statuses' : 'Pending Review');
  useEffect(() => setStatus(isHistory ? 'All statuses' : 'Pending Review'), [isHistory]);
  const filtered = useMemo(() => activities.filter((activity) => {
    const matchesText = `${activity.title} ${activity.questName} ${activity.farmerName} ${activity.district}`.toLowerCase().includes(search.trim().toLowerCase());
    const reviewed = Boolean(activity.reviewedAt) || ['Approved', 'Rejected', 'Resubmission Required'].includes(activity.status);
    return matchesText && (isHistory ? reviewed : true) && (status === 'All statuses' || activity.status === status);
  }), [activities, search, status, isHistory]);
  return <OfficerWorkspace activePath="/officer/activities" title={isHistory ? 'Review history' : 'Activity verification'} subtitle="Search and review illustrative farmer activities"><div className="officer-page">
    <section className="officer-list-heading"><div><span className="officer-eyebrow"><ClipboardCheck size={14} /> FARMER ACTIVITY REVIEWS</span><h1>{isHistory ? 'Review history' : 'Verification queue'}</h1><p>{isHistory ? 'Browse previous illustrative decisions and officer feedback.' : 'Explore farmer submissions and update their sample review status.'}</p></div><div className="officer-list-total"><strong>{filtered.length}</strong><span>{isHistory ? 'reviewed samples' : 'matching activities'}</span></div></section>
    <div className="officer-home-note"><Sparkles size={14} /> Demo review actions update shared in-memory state only. No farmer is notified and no real activity is verified.</div>
    <div className="officer-activity-toolbar"><div className="officer-toolbar-title"><SlidersHorizontal size={16} /><span>Filter activities</span></div><label className="officer-search"><Search size={15} /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search farmer, quest or activity" aria-label="Search officer activities" /></label><label className="officer-select"><span className="activity-sr-only">Filter by activity status</span><select value={status} onChange={(event) => setStatus(event.target.value)}>{activityStatuses.map((item) => <option key={item}>{item}</option>)}</select></label></div>
    {filtered.length ? <div className="activity-history-list">{filtered.map((activity) => <ActivityHistoryCard activity={activity} basePath="/officer/activities" key={activity.id} />)}</div> : <div className="officer-empty-queue"><ClipboardCheck size={23} /><strong>No activities found</strong><span>Try changing the search or status filter.</span><button type="button" onClick={() => { setSearch(''); setStatus('All statuses'); }}>Clear filters</button></div>}
  </div></OfficerWorkspace>;
}
