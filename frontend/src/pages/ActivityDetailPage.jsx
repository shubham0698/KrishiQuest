import { useState } from 'react';
import { ArrowLeft, CalendarDays, CircleHelp, MapPin, Sprout } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import ActivityReviewPanel from '../components/ActivityReviewPanel.jsx';
import ActivityStatusBadge from '../components/ActivityStatusBadge.jsx';
import FarmerWorkspace from '../components/FarmerWorkspace.jsx';
import OfficerWorkspace from '../components/OfficerWorkspace.jsx';
import PhotoPreviewGallery from '../components/PhotoPreviewGallery.jsx';
import { useActivityDemo } from '../context/ActivityDemoContext.jsx';

function ActivityInformation({ activity }) {
  return <><div className="activity-detail-top"><span className="activity-reference">{activity.reference}</span><ActivityStatusBadge status={activity.status} /></div><h1 className="activity-detail-title">{activity.title}</h1><div className="activity-detail-meta"><span><Sprout size={14} /> {activity.questName}</span><span><CalendarDays size={14} /> Completed {new Date(`${activity.completionDate}T00:00:00`).toLocaleDateString('en-IN')}</span><span><CalendarDays size={14} /> Submitted {new Date(activity.submittedAt).toLocaleDateString('en-IN')}</span></div><section className="activity-detail-section"><h2>Activity description</h2><p>{activity.description}</p>{activity.notes && <p className="activity-detail-note">Additional notes: {activity.notes}</p>}</section><section className="activity-detail-section"><h2>Photo evidence</h2><p className="activity-detail-subtitle">Photos are local demo previews and are not stored or uploaded.</p><PhotoPreviewGallery photos={activity.photos || []} /></section>{activity.location && <section className="activity-detail-location"><MapPin size={15} /><div><strong>Shared location</strong><span>{activity.location}</span></div></section>}{activity.officerRemarks && <section className="activity-detail-feedback"><span>ILLUSTRATIVE OFFICER FEEDBACK</span><p>{activity.officerRemarks}</p>{activity.reviewedAt && <small>Sample review date · {new Date(activity.reviewedAt).toLocaleDateString('en-IN')}</small>}</section>}</>;
}

export default function ActivityDetailPage() {
  const { activityId } = useParams();
  const location = useLocation();
  const isOfficer = location.pathname.startsWith('/officer/');
  const { activities, reviewActivity, resubmit } = useActivityDemo();
  const activity = activities.find((item) => item.id === activityId);
  const [notice, setNotice] = useState('');
  const Workspace = isOfficer ? OfficerWorkspace : FarmerWorkspace;
  const activePath = isOfficer ? '/officer/activities' : '/farmer/activities';
  function handleResubmit() { const result = resubmit(activity.id); if (result.ok) setNotice('Status changed to Pending Review in this local demo session. No officer has been notified.'); }
  if (!activity) return <Workspace activePath={activePath} title="Activity not found" subtitle="This demo reference is unavailable"><div className="activity-not-found"><CircleHelp size={23} /><strong>Activity not found in this session</strong><Link to={isOfficer ? '/officer/activities' : '/farmer/activities'}>Return to activity list</Link></div></Workspace>;
  return <Workspace activePath={activePath} title={isOfficer ? 'Review activity' : 'Activity details'} subtitle={isOfficer ? 'Illustrative submission · no real verification' : `Demo reference ${activity.reference}`}><div className={`activity-detail-page${isOfficer ? ' activity-detail-page--officer' : ''}`}><Link className="activity-detail-back" to={isOfficer ? '/officer/activities' : '/farmer/activities'}><ArrowLeft size={14} /> Back to {isOfficer ? 'verification queue' : 'my activities'}</Link>
    {isOfficer && <section className="officer-farmer-card"><span className="officer-avatar">{activity.farmerName.split(' ').map((word) => word[0]).join('').slice(0, 2)}</span><div><strong>{activity.farmerName}</strong><span>Farmer ID {activity.farmerId} · {activity.district} district</span></div><span className="officer-demo-chip">Illustrative farmer</span></section>}
    <div className="activity-detail-columns"><article className="activity-detail-card"><ActivityInformation activity={activity} /></article><aside className="activity-detail-aside">{isOfficer ? <ActivityReviewPanel activity={activity} onReview={(status, remarks) => reviewActivity(activity.id, status, remarks)} /> : <><div className="activity-detail-status-card"><span>ACTIVITY STATUS</span><ActivityStatusBadge status={activity.status} /><p>{activity.status === 'Pending Review' ? 'This is a sample status. No officer has received this activity.' : 'Status and feedback shown here are illustrative demo data.'}</p></div>{['Rejected', 'Resubmission Required'].includes(activity.status) && <div className="activity-resubmit-card"><strong>Ready to try again?</strong><p>Resubmitting updates this sample status in local browser memory only.</p><button type="button" onClick={handleResubmit}>Resubmit for review</button></div>}{notice && <div className="activity-list-banner" role="status">{notice}</div>}</>}</aside></div>
  </div></Workspace>;
}
