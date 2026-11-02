import { useMemo } from 'react';
import { ArrowRight, BadgeCheck, ClipboardCheck, Clock3, Sparkles, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ActivityHistoryCard from '../components/ActivityHistoryCard.jsx';
import OfficerStatsCard from '../components/OfficerStatsCard.jsx';
import OfficerWorkspace from '../components/OfficerWorkspace.jsx';
import OfficerAnalytics from '../components/OfficerAnalytics.jsx';
import { useActivityDemo } from '../context/ActivityDemoContext.jsx';
import { demoFarmers, monthlyEngagementDemo, weeklySubmissionsDemo } from '../data/officerMonitoringData.js';
import { buildOfficerAnalytics } from '../utils/officerMonitoringUtils.js';

export default function OfficerDashboardPage() {
  const { activities } = useActivityDemo();
  const counts = useMemo(() => ({ pending: activities.filter((item) => item.status === 'Pending Review').length, approved: activities.filter((item) => item.status === 'Approved').length, rejected: activities.filter((item) => item.status === 'Rejected').length }), [activities]);
  const pending = activities.filter((item) => ['Pending Review', 'Resubmission Required'].includes(item.status));
  const recent = activities.filter((item) => item.reviewedAt).slice(0, 3);
  const analytics = useMemo(() => buildOfficerAnalytics(demoFarmers, activities, weeklySubmissionsDemo, monthlyEngagementDemo), [activities]);
  return <OfficerWorkspace activePath="/officer/dashboard" title="Officer overview" subtitle="A clear view of the demo activity review workspace"><div className="officer-page">
    <section className="officer-welcome"><div><span className="officer-eyebrow"><Sparkles size={14} /> AGRICULTURE OFFICER WORKSPACE</span><h1>Good morning,<br /><em>Demo Officer.</em></h1><p>Review sustainable farming activities and share helpful, illustrative feedback with the sample farmer community.</p><Link to="/officer/activities" className="officer-primary-link">Open verification queue <ArrowRight size={15} /></Link></div><div className="officer-welcome-mark"><ClipboardCheck size={36} /><span>REVIEW<br />WITH CARE</span></div></section>
    <div className="officer-home-note"><Sparkles size={14} /> This is a frontend demo workspace. All farmers, submissions and review actions are illustrative and remain in React memory.</div>
    <section className="officer-stats-grid" aria-label="Illustrative activity review statistics"><OfficerStatsCard icon={Clock3} tone="amber" label="Pending activities" value={counts.pending} detail="Awaiting demo review" to="/officer/activities" /><OfficerStatsCard icon={BadgeCheck} tone="green" label="Approved activities" value={counts.approved} detail="Illustrative decisions" to="/officer/activities?status=reviewed" /><OfficerStatsCard icon={XCircle} tone="rose" label="Rejected activities" value={counts.rejected} detail="With sample feedback" to="/officer/activities?status=reviewed" /></section>
    <section className="officer-queue-section"><div className="officer-section-title"><div><span className="officer-eyebrow">NEEDS ATTENTION</span><h2>Pending verification queue</h2><p>Start with the most recent sample farmer submissions.</p></div><Link to="/officer/activities">View all activities <ArrowRight size={14} /></Link></div>{pending.length ? <div className="activity-history-list">{pending.slice(0, 3).map((activity) => <ActivityHistoryCard activity={activity} key={activity.id} basePath="/officer/activities" />)}</div> : <div className="officer-empty-queue"><BadgeCheck size={22} /><strong>Queue is clear</strong><span>There are no sample activities awaiting review.</span></div>}</section>
    <section className="officer-recent-section"><div className="officer-section-title"><div><span className="officer-eyebrow">RECENT SAMPLE DECISIONS</span><h2>Recent reviews</h2><p>Illustrative outcomes from the demo review history.</p></div><Link to="/officer/activities?status=reviewed">Open review history <ArrowRight size={14} /></Link></div>{recent.length ? <div className="officer-review-shortcuts">{recent.map((activity) => <Link to={`/officer/activities/${activity.id}`} key={activity.id} className="officer-review-shortcut"><span className="officer-shortcut-icon"><BadgeCheck size={16} /></span><span><strong>{activity.title}</strong><small>{activity.farmerName} · {activity.questName}</small></span><span className="officer-shortcut-status">{activity.status}</span><ArrowRight size={14} /></Link>)}</div> : <p className="officer-no-reviews">No sample reviews yet.</p>}</section>
    <OfficerAnalytics analytics={analytics} />
  </div></OfficerWorkspace>;
}
