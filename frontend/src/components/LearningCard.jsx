import { ArrowUpRight, BookOpen, Brain, Clock3, Play, Sparkles, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const typeIcons = { Article: BookOpen, Video, Quiz: Brain, Flashcards: Sparkles };

export default function LearningCard({ lesson, onPlayPreview }) {
  const TypeIcon = typeIcons[lesson.type] || BookOpen;
  return (
    <article className={`learning-card learning-card--${lesson.accent}`}>
      <div className="learning-card-art"><span className="learning-card-art-icon"><TypeIcon size={22} /></span><span className="learning-card-type"><TypeIcon size={12} /> {lesson.type}</span><span className="learning-card-art-decoration" /><span className="learning-card-art-label">FIELD NOTES · {lesson.category.toUpperCase()}</span>{lesson.type === 'Video' && <button className="learning-play-preview" type="button" aria-label={`Play preview for ${lesson.title}`} onClick={() => onPlayPreview(lesson)}><Play size={14} fill="currentColor" /></button>}</div>
      <div className="learning-card-body"><div className="learning-card-meta"><span>{lesson.category}</span><span className={`learning-level learning-level--${lesson.difficulty.toLowerCase()}`}>{lesson.difficulty}</span></div><h3>{lesson.title}</h3><p>{lesson.description}</p><div className="learning-card-details"><span><Clock3 size={13} /> {lesson.duration}</span><span><Sparkles size={12} /> {lesson.xp} demo XP</span></div><div className="learning-card-progress"><div><span>{lesson.completed ? 'Completed in preview' : 'Learning progress'}</span><strong>{lesson.completed ? '100%' : lesson.progress > 0 ? `${lesson.progress}%` : 'Not started'}</strong></div><div className="learning-progress-track" role="progressbar" aria-label={`${lesson.title} learning progress`} aria-valuenow={lesson.completed ? 100 : lesson.progress || 0} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${lesson.completed ? 100 : lesson.progress || 0}%` }} /></div></div><Link to={`/farmer/learning/${lesson.id}`} className="learning-card-cta">{lesson.completed ? 'Review lesson' : 'Start learning'} <ArrowUpRight size={15} /></Link></div>
    </article>
  );
}
