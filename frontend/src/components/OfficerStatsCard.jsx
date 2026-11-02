import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OfficerStatsCard({ icon: Icon, label, value, detail, tone = 'green', to }) {
  const content = <><span className={`officer-stat-icon officer-stat-icon--${tone}`}><Icon size={18} /></span><span className="officer-stat-label">{label}</span><strong>{value}</strong><small>{detail}</small>{to && <ArrowUpRight size={14} className="officer-stat-arrow" />}</>;
  return to ? <Link className="officer-stat-card" to={to}>{content}</Link> : <article className="officer-stat-card">{content}</article>;
}
