import { useState } from 'react';
import { BadgeCheck, CircleHelp, RotateCcw, XCircle } from 'lucide-react';

export default function ActivityReviewPanel({ activity, onReview }) {
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  function act(status) {
    setError(''); setNotice('');
    if (status !== 'Approved' && !remarks.trim()) { setError('Add clear feedback before rejecting or requesting a resubmission.'); return; }
    setBusy(true);
    const result = onReview(status, remarks);
    setBusy(false);
    if (!result?.ok) { setError(result?.error || 'This review could not be applied.'); return; }
    setNotice(`Demo review updated to “${status}”. No real verification occurred and no XP was awarded.`);
  }
  const awaitingReview = ['Pending Review', 'Resubmission Required'].includes(activity.status);
  return <section className="activity-review-panel"><div className="activity-review-heading"><div><span className="officer-eyebrow">REVIEW DECISION</span><h2>Officer review</h2><p>Actions update this illustrative activity in local demo state only.</p></div><CircleHelp size={20} /></div>{activity.officerRemarks && <div className="activity-prior-feedback"><strong>Existing feedback</strong><span>{activity.officerRemarks}</span></div>}{awaitingReview ? <><label className="officer-field-label" htmlFor="officer-remarks">Feedback or remarks <span>Required for reject or resubmission</span></label><textarea id="officer-remarks" rows="4" value={remarks} onChange={(event) => setRemarks(event.target.value)} placeholder="Share specific, constructive feedback with the farmer." aria-invalid={Boolean(error)} aria-describedby={error ? 'officer-review-error' : undefined} />{error && <p className="officer-form-error" id="officer-review-error" role="alert">{error}</p>}<div className="activity-review-actions"><button type="button" className="review-action review-action--approve" onClick={() => act('Approved')} disabled={busy}><BadgeCheck size={16} /> Approve Activity</button><button type="button" className="review-action review-action--resubmit" onClick={() => act('Resubmission Required')} disabled={busy}><RotateCcw size={15} /> Request Resubmission</button><button type="button" className="review-action review-action--reject" onClick={() => act('Rejected')} disabled={busy}><XCircle size={15} /> Reject Activity</button></div></> : <div className="officer-closed-review"><BadgeCheck size={17} /> This sample activity has already received a review. No further demo action is available.</div>}{notice && <div className="officer-action-notice" role="status">{notice}</div>}</section>;
}
