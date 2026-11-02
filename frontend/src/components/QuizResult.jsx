import { Award, RotateCcw, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuizResult({ score, total, onRetry, lessonId }) {
  const percent = Math.round((score / total) * 100);
  const message = percent >= 80 ? 'Wonderful work! Your knowledge is taking root.' : percent >= 60 ? 'Good progress. A quick review can help it grow.' : 'Every try is a chance to learn something new.';
  return <section className="quiz-result"><span className="quiz-result-art"><Award size={31} /><i><Sprout size={14} /></i></span><span className="learning-eyebrow">QUIZ COMPLETE · DEMO RESULT</span><h1>{percent >= 80 ? 'Excellent work!' : 'Nice work, learner!'}</h1><p>{message}</p><div className="quiz-result-score"><strong>{score}<span>/{total}</span></strong><span>correct answers</span><i><b style={{ width: `${percent}%` }} /></i><small>{percent}% score · illustrative only</small></div><div className="quiz-result-actions"><button type="button" className="learning-primary-button" onClick={onRetry}><RotateCcw size={15} /> Retry quiz</button><Link className="learning-outline-button" to={`/farmer/learning/${lessonId}`}>Back to lesson</Link></div><small className="quiz-result-note">Your score is shown for this preview session only. No progress is sent or saved.</small></section>;
}
