import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Award, Bug, Check, CheckCircle2, CircleHelp, Clock3,
  Droplet, Flower2, Leaf, LockKeyhole, Recycle, RotateCcw, ShieldCheck, Sprout,
  Target, Wheat, Zap,
} from 'lucide-react';
import FarmerWorkspace from '../components/FarmerWorkspace.jsx';
import { questCatalog } from '../data/farmingQuestData.js';
import { useQuests } from '../context/QuestContext.jsx';
import '../styles/farmerQuests.css';

const icons = { droplet: Droplet, sprout: Sprout, bug: Bug, wheat: Wheat, leaf: Leaf, compost: Recycle, seed: Sprout, shield: ShieldCheck, rotation: RotateCcw, flower: Flower2 };

export default function FarmerQuestDetailPage() {
  const { questId } = useParams();
  const { quests, startQuest, toggleCheck, completeQuest } = useQuests();
  const [message, setMessage] = useState('');
  const [evidenceNote, setEvidenceNote] = useState('');
  const [evidenceImage, setEvidenceImage] = useState('');
  const evidenceUrlRef = useRef(null);
  const quest = useMemo(() => quests.find((item) => item.id === questId), [quests, questId]);

  useEffect(() => () => { if (evidenceUrlRef.current) URL.revokeObjectURL(evidenceUrlRef.current); }, []);

  if (!quest) {
    return <FarmerWorkspace activePath="/farmer/quests" title="Quest not found" subtitle="Quest details · demo preview"><div className="fqd-not-found"><CircleHelp size={24} /><h1>We couldn’t find that quest.</h1><p>Choose a quest from the current demo collection.</p><Link to="/farmer/quests"><ArrowLeft size={15} /> Back to all quests</Link></div></FarmerWorkspace>;
  }

  const Icon = icons[quest.icon] || Leaf;
  const isComplete = quest.status === 'completed';
  const isStarted = quest.status === 'in-progress';
  const allChecked = quest.checks.every(Boolean);

  function handleStart() {
    startQuest(quest.id);
    setMessage('Quest started in this page preview. No activity has been submitted or verified.');
  }

  function handleComplete() {
    completeQuest(quest.id);
    setMessage('Quest marked complete in this preview only. No real XP was awarded and no activity was verified.');
  }

  function handleEvidenceImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setMessage('Choose an image file to preview evidence.'); return; }
    if (file.size > 5 * 1024 * 1024) { setMessage('Choose an image smaller than 5 MB.'); return; }
    if (evidenceUrlRef.current) URL.revokeObjectURL(evidenceUrlRef.current);
    evidenceUrlRef.current = URL.createObjectURL(file);
    setEvidenceImage(evidenceUrlRef.current);
    setMessage('');
  }

  function saveEvidencePreview(event) {
    event.preventDefault();
    if (!evidenceNote.trim() && !evidenceImage) { setMessage('Add a short note or choose a photo to preview evidence.'); return; }
    setMessage('Evidence preview added locally on this page only. It was not submitted, reviewed or verified.');
  }

  return (
    <FarmerWorkspace activePath="/farmer/quests" title="Quest details" subtitle={`${quest.title} · demo preview`}>
      <div className="fqd-back-row"><Link to="/farmer/quests"><ArrowLeft size={15} /> All sustainable quests</Link><span><CircleHelp size={13} /> Illustrative quest details</span></div>
      <section className={`fqd-hero fqd-hero--${quest.accent}`}><div className="fqd-hero-content"><span className="fqd-category-pill"><Icon size={14} /> {quest.category}</span><h1>{quest.title}</h1><p>{quest.description}</p><div className="fqd-hero-meta"><span><span className={`fq-difficulty-dot fq-difficulty-dot--${quest.difficulty.toLowerCase()}`} />{quest.difficulty} difficulty</span><span><Clock3 size={14} /> {quest.duration}</span><span><Zap size={14} /> {quest.xp} demo XP</span></div></div><div className="fqd-hero-art"><span className="fqd-hero-icon"><Icon size={54} /></span><span className="fqd-hero-orbit fqd-hero-orbit--one" /><span className="fqd-hero-orbit fqd-hero-orbit--two" /><Leaf className="fqd-hero-leaf" size={93} /></div><span className={`fqd-hero-status fqd-hero-status--${quest.status}`}>{isComplete ? 'Completed in preview' : isStarted ? 'In progress' : 'Ready when you are'}</span></section>

      {message && <div className="fqd-message" role="status"><CircleHelp size={15} /><span>{message}</span><button type="button" aria-label="Dismiss message" onClick={() => setMessage('')}>×</button></div>}
      {isComplete && <div className="fqd-complete-note"><CheckCircle2 size={17} /><span><strong>Quest completed in this demo preview.</strong> No real XP was awarded and no farming activity was verified.</span></div>}

      <div className="fqd-layout"><div className="fqd-main-column">
        <section className="fqd-panel"><div className="fqd-panel-title"><span className="fqd-section-icon"><CircleHelp size={17} /></span><div><span className="fq-eyebrow">THE PURPOSE</span><h2>Why this practice matters</h2></div></div><p className="fqd-body-copy">{quest.why}</p><p className="fqd-body-copy">{quest.details}</p><div className="fqd-benefit-columns"><div><span className="fqd-benefit-heading"><Sprout size={14} /> For your farm</span>{quest.farmerBenefits.map((benefit) => <span className="fqd-benefit" key={benefit}><Check size={13} />{benefit}</span>)}</div><div><span className="fqd-benefit-heading"><Leaf size={14} /> For the environment</span>{quest.environmentBenefits.map((benefit) => <span className="fqd-benefit" key={benefit}><Check size={13} />{benefit}</span>)}</div></div></section>

        <section className="fqd-panel"><div className="fqd-panel-title"><span className="fqd-section-icon fqd-section-icon--gold"><Target size={17} /></span><div><span className="fq-eyebrow">A SIMPLE PLAN</span><h2>How to complete this quest</h2></div></div><div className="fqd-step-list">{quest.steps.map((step, index) => <div className="fqd-step" key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></div>)}</div><div className="fqd-materials"><span className="fqd-material-title"><Wheat size={15} /> What you may need</span><div>{quest.materials.map((material) => <span key={material}><i />{material}</span>)}</div></div></section>

        {isStarted && <section className="fqd-panel fqd-evidence-panel"><div className="fqd-panel-title"><span className="fqd-section-icon fqd-section-icon--blue"><Award size={17} /></span><div><span className="fq-eyebrow">OPTIONAL PREVIEW</span><h2>Keep a note of your activity</h2></div></div><p className="fqd-body-copy">Add a private note or local photo preview to explore how evidence collection might look. Nothing is uploaded or sent for verification.</p><form onSubmit={saveEvidencePreview}><label htmlFor="evidence-note">Activity note</label><textarea id="evidence-note" rows="3" value={evidenceNote} onChange={(event) => setEvidenceNote(event.target.value)} placeholder="What did you try or notice?" /><label className="fqd-upload-label" htmlFor="evidence-photo">{evidenceImage ? 'Choose a different photo' : 'Choose a photo to preview'}<input id="evidence-photo" type="file" accept="image/*" onChange={handleEvidenceImage} /></label>{evidenceImage && <img className="fqd-evidence-preview" src={evidenceImage} alt="Local evidence preview" />}<button className="fqd-secondary-button" type="submit">Save evidence preview <ArrowRight size={14} /></button></form></section>}
      </div>

      <aside className="fqd-side-column"><section className="fqd-checklist-panel"><div className="fqd-checklist-header"><span className="fqd-eyebrow">YOUR FIELD CHECKLIST</span><span>{quest.progress}%</span></div><h2>{isComplete ? 'Nicely done!' : isStarted ? 'One step at a time.' : 'Ready to begin?'}</h2><p>{isComplete ? 'This sample quest is marked complete in the preview.' : isStarted ? 'Check off each step as you explore the practice.' : 'Start the quest to activate its checklist in this preview.'}</p><div className="fqd-check-progress"><div><span>Steps completed</span><strong>{quest.checks.filter(Boolean).length}/{quest.checks.length}</strong></div><div className="fq-progress-track"><span style={{ width: `${quest.progress}%` }} /></div></div><div className="fqd-checklist">{quest.checklist.map((item, index) => <label key={item} className={`fqd-check-item${quest.checks[index] ? ' fqd-check-item--done' : ''}${!isStarted && !isComplete ? ' fqd-check-item--disabled' : ''}`}><input type="checkbox" checked={quest.checks[index]} disabled={!isStarted} onChange={() => toggleCheck(quest.id, index)} /><span className="fqd-custom-check">{quest.checks[index] && <Check size={11} />}</span><span>{item}</span></label>)}</div>
          {!isStarted && !isComplete && <button className="fqd-start-button" type="button" onClick={handleStart}>Start quest <ArrowRight size={16} /></button>}
          {isStarted && <button className="fqd-start-button" type="button" disabled={!allChecked} onClick={handleComplete}>{allChecked ? 'Mark complete in preview' : 'Complete the checklist to continue'} <ArrowRight size={16} /></button>}
          {isComplete && <div className="fqd-completed-button"><CheckCircle2 size={16} /> Completed in preview</div>}
          <span className="fqd-no-verify"><LockKeyhole size={12} /> Preview only · no verification or real rewards</span>
        </section>
        <section className="fqd-quick-facts"><span className="fqd-eyebrow">QUEST AT A GLANCE</span><div><Clock3 size={15} /><span>Estimated time</span><strong>{quest.duration}</strong></div><div><Target size={15} /><span>Difficulty</span><strong>{quest.difficulty}</strong></div><div><Zap size={15} /><span>Illustrative reward</span><strong>{quest.xp} demo XP</strong></div><div><Leaf size={15} /><span>Practice area</span><strong>{quest.category}</strong></div></section>
        <div className="fqd-safety-note"><ShieldCheck size={15} /><span>Choose practices suited to your crops and local conditions. Seek trusted local advice where needed.</span></div>
      </aside></div>
      <div className="fqd-footnote"><CircleHelp size={13} /> Quest content and progress are illustrative. Completing a checklist does not verify real-world activity or award actual XP.</div>
    </FarmerWorkspace>
  );
}
