import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, CircleHelp, Play, Sparkles, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import FarmerWorkspace from '../components/FarmerWorkspace.jsx';
import LearningCard from '../components/LearningCard.jsx';
import LearningFilters from '../components/LearningFilters.jsx';
import LearningProgress from '../components/LearningProgress.jsx';
import VideoPreviewDialog from '../components/VideoPreviewDialog.jsx';
import { learningCategories, learningDifficulties } from '../data/learningLessons.js';
import { learningFlashcards } from '../data/learningFlashcards.js';
import { useLearning } from '../context/LearningContext.jsx';
import { filterLearningLessons } from '../utils/learningUtils.js';
import '../styles/learning.css';

export default function LearningCenterPage() {
  const { lessons, completedLessons, completedQuizzes, learningXpPreview, categoryProgress, streakPreview } = useLearning();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All categories');
  const [difficulty, setDifficulty] = useState('All levels');
  const [videoLesson, setVideoLesson] = useState(null);
  const visibleLessons = useMemo(() => filterLearningLessons(lessons, { search, category, difficulty }), [lessons, search, category, difficulty]);
  const featured = lessons.find((lesson) => lesson.featured);
  const featuredVideo = lessons.find((lesson) => lesson.type === 'Video');

  function resetFilters() { setSearch(''); setCategory('All categories'); setDifficulty('All levels'); }

  return (
    <FarmerWorkspace activePath="/farmer/learning" title="Learning center" subtitle="Grow your knowledge · demo preview">
      <section className="learning-welcome"><div className="learning-welcome-copy"><span className="learning-eyebrow"><Sparkles size={14} /> YOUR LEARNING GARDEN</span><h1>Good things grow<br />when <em>you keep learning.</em></h1><p>Explore practical ideas for healthier soil, careful water use and a more resilient farm—at your own pace.</p><div className="learning-welcome-links"><a href="#all-lessons">Explore lessons <ArrowRight size={15} /></a><Link to="/farmer/learning/flashcards">Practice with flashcards <ArrowRight size={15} /></Link></div></div><div className="learning-welcome-art" aria-hidden="true"><span className="learning-welcome-sun" /><span className="learning-field learning-field--back" /><span className="learning-field learning-field--front" /><span className="learning-welcome-stem"><i /><b /><i /></span><span className="learning-welcome-leaf"><BookOpen size={25} /></span></div><span className="learning-preview-label">LEARNING CONTENT · DEMO</span></section>

      <div className="learning-demo-note"><CircleHelp size={14} /><span>Lessons, quiz scores and learning XP are educational demo content. Progress is kept in memory for this session only.</span></div>
      <LearningProgress total={lessons.length} completed={completedLessons} quizzes={completedQuizzes} xp={learningXpPreview} streak={streakPreview} categories={categoryProgress} />

      <section className="learning-featured"><div className="learning-section-head"><div><span className="learning-eyebrow">HANDPICKED FOR YOUR FARM</span><h2>Featured learning</h2><p>Thoughtful starting points for your next field observation.</p></div><Link to={`/farmer/learning/${featured.id}`} className="learning-text-link">Open featured lesson <ArrowRight size={14} /></Link></div><div className="learning-featured-grid"><article className="learning-featured-article"><div className="learning-featured-art learning-featured-art--green"><span><BookOpen size={28} /></span><i className="learning-art-sprout"><Sparkles size={16} /></i><span className="learning-featured-art-caption">A FIELD GUIDE TO GROWING WELL</span></div><div className="learning-featured-copy"><span className="learning-featured-tag">FEATURED ARTICLE · {featured.category}</span><h3>{featured.title}</h3><p>{featured.description}</p><Link to={`/farmer/learning/${featured.id}`}>Read this lesson <ArrowRight size={14} /></Link></div></article><article className="learning-video-feature"><div className="learning-video-thumb"><span className="learning-video-label"><Video size={12} /> DEMO VIDEO PLACEHOLDER</span><span className="learning-video-play"><Play size={17} fill="currentColor" /></span><span className="learning-video-caption"><strong>{featuredVideo.title}</strong><small>{featuredVideo.duration} · No video asset attached</small></span></div><div className="learning-video-foot"><span>Preview a video lesson layout</span><button type="button" onClick={() => setVideoLesson(featuredVideo)}>Play preview <Play size={12} /></button></div></article></div></section>

      <section className="learning-lesson-library" id="all-lessons"><div className="learning-section-head"><div><span className="learning-eyebrow">LEARN SOMETHING USEFUL</span><h2>Lessons for your field</h2><p>Short, practical modules to explore at your own pace.</p></div><Link to="/farmer/learning/flashcards" className="learning-text-link">Open flashcards <ArrowRight size={14} /></Link></div><LearningFilters search={search} setSearch={setSearch} category={category} setCategory={setCategory} difficulty={difficulty} setDifficulty={setDifficulty} categories={learningCategories} difficulties={learningDifficulties} onReset={resetFilters} /><div className="learning-library-result"><span>Showing <strong>{visibleLessons.length}</strong> of {lessons.length} lessons</span><span>{learningFlashcards.length} demo flashcards available</span></div>{visibleLessons.length ? <div className="learning-card-grid">{visibleLessons.map((lesson) => <LearningCard key={lesson.id} lesson={lesson} onPlayPreview={setVideoLesson} />)}</div> : <div className="learning-empty"><BookOpen size={23} /><strong>No matching lessons</strong><span>Try another search or clear the filters.</span><button type="button" onClick={resetFilters}>Show all lessons</button></div>}</section>
      {videoLesson && <VideoPreviewDialog lesson={videoLesson} onClose={() => setVideoLesson(null)} />}
    </FarmerWorkspace>
  );
}
