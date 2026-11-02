import { Award, BookOpen, Flame, Sparkles } from 'lucide-react';

const metrics = [
  { key: 'total', label: 'Lessons in library', icon: BookOpen, tone: 'green' },
  { key: 'completed', label: 'Lessons completed', icon: Award, tone: 'gold' },
  { key: 'quizzes', label: 'Quizzes completed', icon: Sparkles, tone: 'blue' },
  { key: 'xp', label: 'Learning XP preview', icon: Flame, tone: 'orange' },
];

export default function LearningProgress({ total, completed, quizzes, xp, streak, categories }) {
  const values = { total, completed, quizzes, xp };
  return (
    <section className="learning-progress" aria-label="Illustrative learning progress">
      <div className="learning-metric-grid">{metrics.map(({ key, label, icon: Icon, tone }) => <article className="learning-metric" key={key}><span className={`learning-metric-icon learning-metric-icon--${tone}`}><Icon size={17} /></span><span>{label}</span><strong>{values[key].toLocaleString()}</strong><small>{key === 'total' ? 'Demo lesson collection' : 'Illustrative session data'}</small></article>)}<article className="learning-metric learning-metric--streak"><span className="learning-metric-icon learning-metric-icon--orange"><Flame size={17} /></span><span>Learning streak preview</span><strong>{streak} <small>days</small></strong><small>Sample streak · not recorded</small></article></div>
      <div className="learning-category-progress"><div className="learning-category-heading"><div><span className="learning-eyebrow">YOUR LEARNING GARDEN</span><h2>Progress by topic</h2></div><span>Illustrative demo progress</span></div><div className="learning-category-grid">{categories.map((item) => <div className="learning-category-item" key={item.category}><div><span>{item.category}</span><strong>{item.completed}/{item.total}</strong></div><div className="learning-progress-track" role="progressbar" aria-label={`${item.category} progress`} aria-valuenow={item.percent} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${item.percent}%` }} /></div></div>)}</div></div>
    </section>
  );
}
