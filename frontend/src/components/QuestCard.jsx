import { ArrowUpRight, Bug, CircleDot, Droplet, Flower2, Leaf, Recycle, RotateCcw, ShieldCheck, Sprout, Wheat, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const icons = { droplet: Droplet, sprout: Sprout, bug: Bug, wheat: Wheat, leaf: Leaf, compost: Recycle, seed: CircleDot, shield: ShieldCheck, rotation: RotateCcw, flower: Flower2 };

export default function QuestCard({ quest }) {
  const Icon = icons[quest.icon] || Leaf;
  const status = quest.status === 'completed' ? 'Completed in preview' : quest.status === 'in-progress' ? 'In progress' : 'Available';
  const statusClass = quest.status === 'completed' ? 'completed' : quest.status === 'in-progress' ? 'active' : 'available';

  return (
    <article className="fq-card">
      <div className={`fq-card-art fq-card-art--${quest.accent}`}><span className="fq-card-icon"><Icon size={22} /></span><span className="fq-card-category">{quest.category}</span><span className="fq-card-xp"><Zap size={13} /> {quest.xp} demo XP</span><span className="fq-art-decoration"><Leaf size={86} /></span></div>
      <div className="fq-card-body"><div className="fq-card-title"><h2>{quest.title}</h2><span className={`fq-status fq-status--${statusClass}`}><i />{status}</span></div><p>{quest.description}</p>
        <div className="fq-card-meta"><span><span className={`fq-difficulty-dot fq-difficulty-dot--${quest.difficulty.toLowerCase()}`} />{quest.difficulty}</span><span>{quest.duration}</span></div>
        <div className="fq-card-progress"><div><span>Progress</span><strong>{quest.progress}%</strong></div><div className="fq-progress-track" role="progressbar" aria-label={`${quest.title} progress`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={quest.progress}><span style={{ width: `${quest.progress}%` }} /></div></div>
        <Link className="fq-card-link" to={`/farmer/quests/${quest.id}`}>View details <ArrowUpRight size={15} /></Link>
      </div>
    </article>
  );
}
