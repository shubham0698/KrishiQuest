import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import ActivityStatusBadge from './ActivityStatusBadge.jsx';
import PhotoPreviewGallery from './PhotoPreviewGallery.jsx';

export default function ActivityHistoryCard({ activity, basePath = '/farmer/activities' }) {
  return <article className="activity-history-card"><div className="activity-history-thumb">{activity.photos?.[0]?.url ? <img src={activity.photos[0].url} alt="" /> : <div className="activity-thumb-placeholder"><span>FIELD NOTE</span><strong>{activity.questName?.slice(0, 1) || 'K'}</strong></div>}<span>{activity.reference}</span></div><div className="activity-history-body"><div className="activity-history-top"><div><span className="activity-quest-label">{activity.questName}</span><h2>{activity.title}</h2></div><ActivityStatusBadge status={activity.status} /></div><p>{activity.description}</p><div className="activity-history-meta"><span><CalendarDays size={13} /> Submitted {new Date(activity.submittedAt).toLocaleDateString('en-IN')}</span><span><MapPin size={13} /> {activity.district || 'Location not provided'}</span></div>{activity.officerRemarks && <div className="activity-feedback"><strong>Illustrative officer feedback</strong><span>{activity.officerRemarks}</span></div>}<div className="activity-history-actions"><PhotoPreviewGallery photos={activity.photos || []} compact /><Link to={`${basePath}/${activity.id}`} className="activity-link-button">Activity details <ArrowUpRight size={14} /></Link></div></div></article>;
}
