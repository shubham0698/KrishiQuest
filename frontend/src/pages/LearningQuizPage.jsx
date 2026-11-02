import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Brain, Check, ChevronLeft, ChevronRight, CircleHelp, LockKeyhole } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import FarmerWorkspace from '../components/FarmerWorkspace.jsx';
import QuizQuestion from '../components/QuizQuestion.jsx';
import QuizResult from '../components/QuizResult.jsx';
import { learningQuizzes } from '../data/learningQuizzes.js';
import { useLearning } from '../context/LearningContext.jsx';
import { calculateQuizScore, getBoundedQuestionIndex, isQuizFullyAnswered } from '../utils/learningUtils.js';
import '../styles/learning.css';

export default function LearningQuizPage() {
  const { lessonId } = useParams();
  const { lessons, recordQuiz } = useLearning();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const lesson = useMemo(() => lessons.find((item) => item.id === lessonId), [lessons, lessonId]);
  const questions = lessonId ? learningQuizzes[lessonId] : null;

  if (!lessonId) {
    return <FarmerWorkspace activePath="/farmer/learning" title="Knowledge checks" subtitle="Choose a lesson quiz · demo preview"><div className="quiz-picker"><div className="quiz-picker-heading"><span className="learning-eyebrow"><Brain size={14} /> PRACTICE WHAT YOU’VE LEARNED</span><h1>Choose a knowledge check</h1><p>Each demo quiz has five multiple-choice questions. Scores are for this session preview only.</p></div><div className="quiz-picker-grid">{lessons.map((item) => <Link className="quiz-picker-card" to={`/farmer/learning/quiz/${item.id}`} key={item.id}><span><Brain size={17} /></span><div><strong>{item.title}</strong><small>{item.category} · 5 questions</small></div><ArrowRight size={15} /></Link>)}</div><Link className="learning-outline-button" to="/farmer/learning"><ArrowLeft size={14} /> Back to Learning Center</Link></div></FarmerWorkspace>;
  }

  if (!lesson || !questions) return <FarmerWorkspace activePath="/farmer/learning" title="Quiz unavailable" subtitle="Knowledge check · demo preview"><div className="lesson-not-found"><CircleHelp size={26} /><h1>We couldn’t find that quiz.</h1><p>Choose a lesson quiz from the learning center.</p><Link to="/farmer/learning"><ArrowLeft size={14} /> Back to learning center</Link></div></FarmerWorkspace>;

  const selected = answers[index] ?? null;
  const score = calculateQuizScore(questions, answers);
  const answeredCount = Object.keys(answers).length;
  const allAnswered = isQuizFullyAnswered(questions, answers);

  function chooseAnswer(optionIndex) { if (!submitted) setAnswers((current) => ({ ...current, [index]: optionIndex })); }
  function submitQuiz() { if (!allAnswered) return; recordQuiz(lesson.id, score, questions.length); setSubmitted(true); }
  function retry() { setAnswers({}); setIndex(0); setSubmitted(false); }

  return (
    <FarmerWorkspace activePath="/farmer/learning" title="Interactive quiz" subtitle={`${lesson.title} · knowledge check`}>
      <div className="quiz-back-row"><Link to={`/farmer/learning/${lesson.id}`}><ArrowLeft size={14} /> Back to lesson</Link><span><LockKeyhole size={12} /> Demo quiz · no score is saved</span></div>
      {!submitted ? <section className="quiz-shell"><div className="quiz-shell-heading"><div><span className="learning-eyebrow"><Brain size={14} /> KNOWLEDGE CHECK</span><h1>{lesson.title}</h1><p>Take your time. Select one answer for each question.</p></div><span className="quiz-question-count">{index + 1}<i> / {questions.length}</i></span></div><div className="quiz-top-progress"><div><span>Question {index + 1} of {questions.length}</span><strong>{Math.round(((index + 1) / questions.length) * 100)}%</strong></div><div className="learning-progress-track" role="progressbar" aria-label="Quiz question progress" aria-valuenow={index + 1} aria-valuemin="0" aria-valuemax={questions.length}><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div></div><div className="quiz-main-grid"><div><QuizQuestion question={questions[index]} index={index} total={questions.length} selected={selected} onSelect={chooseAnswer} /><div className="quiz-navigation"><button type="button" className="learning-outline-button" onClick={() => setIndex((current) => getBoundedQuestionIndex(current, -1, questions.length))} disabled={index === 0}><ChevronLeft size={15} /> Previous</button>{index < questions.length - 1 ? <button type="button" className="learning-primary-button" onClick={() => setIndex((current) => getBoundedQuestionIndex(current, 1, questions.length))}>Next question <ChevronRight size={15} /></button> : <button type="button" className="learning-primary-button" disabled={!allAnswered} onClick={submitQuiz}>Submit quiz <Check size={15} /></button>}</div>{index === questions.length - 1 && !allAnswered && <p className="quiz-unanswered-note"><CircleHelp size={13} /> Answer all {questions.length} questions before submitting ({answeredCount}/{questions.length} answered).</p>}</div><aside className="quiz-side-info"><span className="quiz-side-icon"><BookOpen size={18} /></span><span className="learning-eyebrow">A MOMENT TO REFLECT</span><h2>Think it through.</h2><p>Use what you learned in the lesson. Each question includes a short explanation to help reinforce the idea.</p><div className="quiz-dot-grid" aria-label={`${answeredCount} of ${questions.length} questions answered`}>{questions.map((item, itemIndex) => <button type="button" key={item.prompt} aria-label={`Go to question ${itemIndex + 1}${answers[itemIndex] !== undefined ? ', answered' : ', not answered'}`} aria-current={index === itemIndex ? 'step' : undefined} className={`${index === itemIndex ? 'quiz-dot--current' : ''}${answers[itemIndex] !== undefined ? ' quiz-dot--answered' : ''}`} onClick={() => setIndex(itemIndex)}>{itemIndex + 1}</button>)}</div><span className="quiz-demo-reminder">Answers and results stay in this browser session only.</span></aside></div></section> : <QuizResult score={score} total={questions.length} onRetry={retry} lessonId={lesson.id} />}
    </FarmerWorkspace>
  );
}
