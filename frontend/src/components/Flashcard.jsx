import { RotateCw } from 'lucide-react';

export default function Flashcard({ card, flipped, onFlip, index, total }) {
  return <button type="button" className={`flashcard${flipped ? ' flashcard--flipped' : ''}`} onClick={onFlip} aria-pressed={flipped} aria-label={flipped ? `Flashcard ${index + 1} answer: ${card.answer}. Activate to see the question.` : `Flashcard ${index + 1} question: ${card.question}. Activate to reveal the answer.`}><span className="flashcard-corner">{String(index + 1).padStart(2, '0')} <i>/</i> {String(total).padStart(2, '0')}</span><span className="flashcard-chip">{flipped ? 'THE ANSWER' : card.category.toUpperCase()}</span><span className="flashcard-content">{flipped ? card.answer : card.question}</span><span className="flashcard-turn"><RotateCw size={14} /> Click to {flipped ? 'see question' : 'reveal answer'}</span></button>;
}
