import { BookOpen, Check, ClipboardList, Sprout } from 'lucide-react';

export default function LessonContent({ lesson }) {
  return (
    <div className="lesson-content-layout"><article className="lesson-article"><div className="lesson-learning-note"><BookOpen size={15} /><span>Educational demo content · Use local agricultural guidance for farm-specific decisions.</span></div>{lesson.sections.map((section, index) => <section className="lesson-section" key={section.heading}><span className="lesson-section-number">0{index + 1}</span><div><h2>{section.heading}</h2><p>{section.body}</p></div></section>)}<div className="lesson-takeaways"><div className="lesson-takeaway-heading"><span><Sprout size={17} /></span><div><small>KEEP IN MIND</small><h2>Key takeaways</h2></div></div>{lesson.takeaways.map((item) => <div className="lesson-takeaway" key={item}><Check size={14} />{item}</div>)}</div></article><aside className="lesson-objectives"><div className="lesson-objective-icon"><ClipboardList size={19} /></div><span className="learning-eyebrow">BY THE END OF THIS LESSON</span><h2>You’ll be able to…</h2>{lesson.objectives.map((item) => <div className="lesson-objective" key={item}><span><Check size={12} /></span>{item}</div>)}<div className="lesson-objective-foot"><BookOpen size={14} /> Learning objectives for this demo lesson</div></aside></div>
  );
}
