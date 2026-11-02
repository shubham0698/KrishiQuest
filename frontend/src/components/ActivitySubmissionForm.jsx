import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, CalendarDays, CheckCircle2, CircleHelp, FileImage, MapPin, Send, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import ActivityStatusBadge from './ActivityStatusBadge.jsx';
import PhotoPreviewGallery from './PhotoPreviewGallery.jsx';
import { activityCategories, activityQuestOptions, MAX_ACTIVITY_PHOTOS } from '../data/activityData.js';
import { validateActivityPhotos, validateActivitySubmission } from '../utils/activityUtils.js';

function localToday() { const date = new Date(); return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; }

export default function ActivitySubmissionForm({ onSubmit }) {
  const [values, setValues] = useState({ questId: '', title: '', description: '', category: '', completionDate: localToday(), locationEnabled: false, location: '', notes: '' });
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [fileError, setFileError] = useState('');
  const [submitted, setSubmitted] = useState(null);
  const photosRef = useRef(photos);
  photosRef.current = photos;
  const submittedRef = useRef(false);
  useEffect(() => () => { if (!submittedRef.current) photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.url)); }, []);
  function change(key, value) { setValues((current) => ({ ...current, [key]: value })); setErrors((current) => ({ ...current, [key]: '' })); }
  function addFiles(event) {
    const files = Array.from(event.target.files || []);
    const problems = validateActivityPhotos(files, photos.length);
    if (problems.length) setFileError(problems.join(' '));
    else {
      setFileError('');
      const next = files.map((file) => ({ id: `${file.name}-${file.size}-${Math.random().toString(16).slice(2)}`, name: file.name, size: file.size, type: file.type, url: URL.createObjectURL(file) }));
      setPhotos((current) => [...current, ...next]);
      setErrors((current) => ({ ...current, photos: '' }));
    }
    event.target.value = '';
  }
  function removePhoto(id) {
    setPhotos((current) => { const removed = current.find((photo) => photo.id === id); if (removed?.url) URL.revokeObjectURL(removed.url); return current.filter((photo) => photo.id !== id); });
  }
  function submit(event) {
    event.preventDefault();
    const nextErrors = validateActivitySubmission(values, photos);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const quest = activityQuestOptions.find((item) => item.id === values.questId);
    const confirmation = onSubmit({ ...values, questName: quest?.name || '' }, photos);
    submittedRef.current = true;
    setSubmitted(confirmation);
  }
  if (submitted) return <section className="activity-confirmation"><span className="activity-confirmation-icon"><CheckCircle2 size={34} /></span><span className="activity-form-eyebrow">LOCAL DEMO CONFIRMATION</span><h1>Activity ready for review</h1><p>Your activity is now shown as <strong>Pending Review</strong> in this browser session.</p><div className="activity-confirmation-card"><div><span>DEMO REFERENCE</span><strong>{submitted.reference}</strong></div><div><span>ACTIVITY</span><strong>{submitted.title}</strong></div><div><span>FARMING QUEST</span><strong>{submitted.questName}</strong></div><div><span>STATUS</span><ActivityStatusBadge status={submitted.status} /></div></div><div className="activity-confirmation-note"><CircleHelp size={16} /><span>This is a frontend demo only. No real officer has received this activity, and the selected photos remain local in browser memory.</span></div><div className="activity-confirmation-actions"><Link to="/farmer/activities" className="activity-submit-button"><FileImage size={16} /> View activity history</Link><Link to="/farmer/dashboard" className="activity-secondary-button">Back to dashboard</Link></div></section>;

  return <form className="activity-submission-form" onSubmit={submit} noValidate>
    <div className="activity-form-section"><div className="activity-form-section-heading"><span>01</span><div><h2>Activity details</h2><p>Tell us which practice you completed and how it went.</p></div></div><div className="activity-form-grid">
      <label className="activity-field"><span>Farming quest <i>*</i></span><select value={values.questId} onChange={(event) => change('questId', event.target.value)} aria-invalid={Boolean(errors.questId)}>{<option value="">Choose a quest</option>}{activityQuestOptions.map((quest) => <option value={quest.id} key={quest.id}>{quest.name}</option>)}</select>{errors.questId && <small role="alert">{errors.questId}</small>}</label>
      <label className="activity-field"><span>Practice category <i>*</i></span><select value={values.category} onChange={(event) => change('category', event.target.value)} aria-invalid={Boolean(errors.category)}><option value="">Choose a category</option>{activityCategories.map((category) => <option key={category}>{category}</option>)}</select>{errors.category && <small role="alert">{errors.category}</small>}</label>
      <label className="activity-field activity-field--full"><span>Activity title <i>*</i></span><input value={values.title} onChange={(event) => change('title', event.target.value)} maxLength={90} placeholder="For example: Added mulch to the vegetable bed" aria-invalid={Boolean(errors.title)} />{errors.title && <small role="alert">{errors.title}</small>}</label>
      <label className="activity-field activity-field--full"><span>What did you do? <i>*</i></span><textarea rows="4" value={values.description} onChange={(event) => change('description', event.target.value)} maxLength={1200} placeholder="Describe the steps you took and what you observed." aria-invalid={Boolean(errors.description)} />{errors.description && <small role="alert">{errors.description}</small>}<em>{values.description.length}/1200 characters</em></label>
      <label className="activity-field"><span>Activity completion date <i>*</i></span><div className="activity-input-icon"><CalendarDays size={15} /><input type="date" value={values.completionDate} max={localToday()} onChange={(event) => change('completionDate', event.target.value)} aria-invalid={Boolean(errors.completionDate)} /></div>{errors.completionDate && <small role="alert">{errors.completionDate}</small>}</label>
      <label className="activity-field"><span>Additional notes <em>Optional</em></span><input value={values.notes} onChange={(event) => change('notes', event.target.value)} maxLength={300} placeholder="Anything else to add?" /></label>
    </div></div>

    <div className="activity-form-section"><div className="activity-form-section-heading"><span>02</span><div><h2>Photo evidence</h2><p>Add up to {MAX_ACTIVITY_PHOTOS} photos. Files stay on this device and are not uploaded.</p></div></div><label className="activity-upload-zone"><input type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" multiple onChange={addFiles} aria-label="Choose activity photos" /><UploadCloud size={25} /><strong>Choose photos from this device</strong><span>JPG, JPEG, PNG or WEBP · up to 5 MB each · maximum {MAX_ACTIVITY_PHOTOS}</span><b>Browse files</b></label>{fileError && <p className="activity-form-error" role="alert">{fileError}</p>}{errors.photos && <p className="activity-form-error" role="alert">{errors.photos}</p>}<PhotoPreviewGallery photos={photos} onRemove={removePhoto} emptyLabel="Selected photo previews will appear here." /></div>

    <div className="activity-form-section activity-location-section"><div className="activity-form-section-heading"><span>03</span><div><h2>Location details</h2><p>Optional. You can share a text location with this demo activity.</p></div></div><label className="activity-location-toggle"><input type="checkbox" checked={values.locationEnabled} onChange={(event) => change('locationEnabled', event.target.checked)} /><span><MapPin size={16} /><b>Include a location with my activity</b><small>This only adds the text you enter below. It does not request device location.</small></span></label>{values.locationEnabled && <label className="activity-field activity-field--location"><span>Location <i>*</i></span><input value={values.location} onChange={(event) => change('location', event.target.value)} placeholder="Village, district or field name" aria-invalid={Boolean(errors.location)} />{errors.location && <small role="alert">{errors.location}</small>}</label>}</div>
    <div className="activity-submit-footer"><p><CircleHelp size={14} /> Demo activity only. Submitting does not notify an officer or award XP.</p><button className="activity-submit-button" type="submit"><Send size={15} /> Submit for Review</button><Link className="activity-secondary-button" to="/farmer/activities"><ArrowLeft size={14} /> Activity history</Link></div>
  </form>;
}
