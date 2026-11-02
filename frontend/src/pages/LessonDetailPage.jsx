import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Brain, CheckCircle2, Clock3, Play, Sparkles, Video } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import FarmerWorkspace from '../components/FarmerWorkspace.jsx';
import LessonContent from '../components/LessonContent.jsx';
import VideoPreviewDialog from '../components/VideoPreviewDialog.jsx';
import { learningLessons } from '../data/learningLessons.js';
import { useLearning } from '../context/LearningContext.jsx';
import '../styles/learning.css';

const lessonIcons = { Article: BookOpen, Video, Quiz: Brain, Flashcards: Sparkles };

export default function LessonDetailPage() {
  const { lessonId } = useParams();
  const { lessons, markLessonCompleted } = useLearning();
  const [message, setMessage] = useState('');
  const [videoOpen, setVideoOpen] = useState(false);
  const lesson = useMemo(() => lessons.find((item) => item.id === lessonId), [lessons, lessonId]);

  if (!lesson) return <FarmerWorkspace activePath="/farmer/learning" title="Lesson not found" subtitle="Learning center · demo"><div className="lesson-not-found"><BookOpen size={26} /><h1>We couldn’t find that lesson.</h1><p>Choose a module from the learning library.</p><Link to="/farmer/learning"><ArrowLeft size={14} /> Back to learning center</Link></div></FarmerWorkspace>;
  const TypeIcon = lessonIcons[lesson.type] || BookOpen;

  function completeLesson() {
    markLessonCompleted(lesson.id);
    setMessage('Lesson marked complete in this demo session. Your progress is not saved to a server.');
  }

  return (
    <FarmerWorkspace activePath="/farmer/learning" title="Lesson details" subtitle={`${lesson.title} · educational demo`}>
      <div className="lesson-back-row"><Link to="/farmer/learning"><ArrowLeft size={14} /> Learning center</Link><span>EDUCATIONAL DEMO CONTENT</span></div>
      <section className={`lesson-hero lesson-hero--${lesson.accent}`}><div className="lesson-hero-copy"><span className="lesson-category-pill"><TypeIcon size={13} /> {lesson.category}</span><h1>{lesson.title}</h1><p>{lesson.description}</p><div className="lesson-hero-meta"><span><Clock3 size={14} /> {lesson.duration}</span><span>{lesson.difficulty}</span><span><TypeIcon size={14} /> {lesson.type}</span><span><Sparkles size={13} /> {lesson.xp} demo XP preview</span></div></div><div className="lesson-hero-visual"><span className="lesson-hero-icon"><TypeIcon size={42} /></span><span className="lesson-hero-ring" /><span className="lesson-hero-type">{lesson.type.toUpperCase()} · FIELD GUIDE</span>{lesson.type === 'Video' && <button type="button" className="lesson-hero-play" aria-label="Open demo video placeholder" onClick={() => setVideoOpen(true)}><Play size={14} fill="currentColor" /> Play preview</button>}</div></section>
      {message && <div className="learning-success" role="status"><CheckCircle2 size={16} />{message}</div>}
      {lesson.completed && <div className="learning-complete-note"><CheckCircle2 size={15} />Completed in demo session · No server save</div>}
      <LessonContent lesson={lesson} />
      <div className="lesson-bottom-actions"><Link to="/farmer/learning" className="learning-outline-button"><ArrowLeft size={14} /> Back to learning center</Link><div>{!lesson.completed ? <button type="button" className="learning-primary-button learning-complete-button" onClick={completeLesson}>Mark as completed <CheckCircle2 size={15} /></button> : <span className="learning-completed-button"><CheckCircle2 size={15} /> Completed in preview</span>}{lesson.hasQuiz && <Link to={`/farmer/learning/quiz/${lesson.id}`} className="learning-primary-button">Start quiz <ArrowRight size={15} /></Link>}</div></div>
      <div className="learning-data-note"><Sparkles size={13} /> Learning completion and XP are preview values stored only in this browser session.</div>
      {videoOpen && <VideoPreviewDialog lesson={lesson} onClose={() => setVideoOpen(false)} />}
    </FarmerWorkspace>
  );
}
