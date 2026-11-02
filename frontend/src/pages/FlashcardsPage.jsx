import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, ChevronLeft, ChevronRight, RotateCw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import FarmerWorkspace from '../components/FarmerWorkspace.jsx';
import Flashcard from '../components/Flashcard.jsx';
import { learningFlashcards } from '../data/learningFlashcards.js';
import { getWrappedFlashcardIndex } from '../utils/learningUtils.js';
import '../styles/learning.css';

export default function FlashcardsPage() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = learningFlashcards[index];
  const progress = Math.round(((index + 1) / learningFlashcards.length) * 100);

  function move(amount) {
    setIndex((current) => getWrappedFlashcardIndex(current, amount, learningFlashcards.length));
    setFlipped(false);
  }

  return (
    <FarmerWorkspace activePath="/farmer/learning" title="Farm knowledge flashcards" subtitle="Quick practice · educational demo">
      <div className="flashcards-page"><div className="flashcards-back-row"><Link to="/farmer/learning"><ArrowLeft size={14} /> Learning center</Link><span><Sparkles size={13} /> {learningFlashcards.length} farming flashcards</span></div><section className="flashcards-heading"><span className="learning-eyebrow"><BookOpen size={14} /> QUICK FIELD REVISION</span><h1>Small cards. <em>Useful ideas.</em></h1><p>Recall a farming concept, then flip the card to reveal a short explanation.</p></section><div className="flashcard-progress-heading"><span>Card {index + 1} of {learningFlashcards.length}</span><strong>{progress}% through this set</strong></div><div className="flashcard-set-progress" role="progressbar" aria-label="Flashcard set progress" aria-valuenow={index + 1} aria-valuemin="1" aria-valuemax={learningFlashcards.length}><span style={{ width: `${progress}%` }} /></div><div className="flashcard-stage"><button type="button" className="flashcard-nav" aria-label="Previous flashcard" onClick={() => move(-1)}><ChevronLeft size={21} /></button><Flashcard card={card} index={index} total={learningFlashcards.length} flipped={flipped} onFlip={() => setFlipped((current) => !current)} /><button type="button" className="flashcard-nav" aria-label="Next flashcard" onClick={() => move(1)}><ChevronRight size={21} /></button></div><div className="flashcard-controls"><button type="button" className="learning-outline-button" onClick={() => setFlipped((current) => !current)}><RotateCw size={14} /> Flip card</button><span>Tap the card or use Flip card to reveal the answer</span><button type="button" className="learning-primary-button" onClick={() => move(1)}>Next card <ArrowRight size={14} /></button></div><div className="flashcard-dots" aria-label="Choose a flashcard">{learningFlashcards.map((item, dotIndex) => <button type="button" key={item.question} aria-label={`Go to flashcard ${dotIndex + 1}`} aria-current={index === dotIndex ? 'step' : undefined} className={index === dotIndex ? 'flashcard-dot--active' : ''} onClick={() => { setIndex(dotIndex); setFlipped(false); }} />)}</div><p className="flashcard-demo-note">Flashcards are educational demo content. Your place in the set is not saved.</p></div>
    </FarmerWorkspace>
  );
}
