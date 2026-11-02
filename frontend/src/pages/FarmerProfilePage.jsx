import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Camera, Check, Edit3, Mail, MapPin, Phone, ShieldCheck, UserRound } from 'lucide-react';
import FarmerWorkspace from '../components/FarmerWorkspace.jsx';
import { initialFarmerProfile, indianStates, languages } from '../data/farmerProfileData.js';
import '../styles/farmerProfile.css';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobilePattern = /^(?:\+91)?[6-9]\d{9}$/;
const profileFields = [
  { key: 'fullName', label: 'Full name', type: 'text', placeholder: 'Enter your full name', required: true, autoComplete: 'name' },
  { key: 'email', label: 'Email address', type: 'email', placeholder: 'name@example.com', required: true, autoComplete: 'email' },
  { key: 'mobile', label: 'Mobile number', type: 'tel', placeholder: '+91 98765 43210', required: true, autoComplete: 'tel' },
  { key: 'gender', label: 'Gender', type: 'select', options: ['Female', 'Male', 'Non-binary', 'Prefer not to say'] },
  { key: 'dateOfBirth', label: 'Date of birth', type: 'date' },
  { key: 'state', label: 'State', type: 'select', options: indianStates, required: true },
  { key: 'district', label: 'District', type: 'text', placeholder: 'Your district', required: true },
  { key: 'village', label: 'Village / town', type: 'text', placeholder: 'Your village or town', required: true },
  { key: 'preferredLanguage', label: 'Preferred language', type: 'select', options: languages, required: true },
];

function ProfileField({ field, value, onChange, error, disabled }) {
  const { key, label, type, options, placeholder, required, autoComplete } = field;
  return <div className="fp-field"><label htmlFor={`profile-${key}`}>{label}{required && <span> *</span>}</label>{type === 'select' ? <select id={`profile-${key}`} value={value} onChange={onChange} disabled={disabled} aria-invalid={Boolean(error)}><option value="">Select {label.toLowerCase()}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select> : <input id={`profile-${key}`} type={type} value={value} placeholder={placeholder} autoComplete={autoComplete} onChange={onChange} disabled={disabled} aria-invalid={Boolean(error)} max={type === 'date' ? new Date().toISOString().slice(0, 10) : undefined} />}{error && <span className="fp-error" role="alert">{error}</span>}</div>;
}

export default function FarmerProfilePage() {
  const [profile, setProfile] = useState(initialFarmerProfile);
  const [draft, setDraft] = useState(initialFarmerProfile);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarError, setAvatarError] = useState('');
  const inputRef = useRef(null);
  const objectUrlRef = useRef(null);

  useEffect(() => () => { if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current); }, []);

  const updateField = (key, value) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
    setMessage('');
  };

  function beginEdit() {
    setDraft({ ...profile });
    setEditing(true);
    setErrors({});
    setMessage('');
  }

  function cancelEdit() {
    setDraft({ ...profile });
    setEditing(false);
    setErrors({});
    setMessage('');
    setAvatarError('');
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = null;
    setAvatarUrl('');
  }

  function onAvatarChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setAvatarError('Choose an image file to preview.'); return; }
    if (file.size > 5 * 1024 * 1024) { setAvatarError('Choose an image smaller than 5 MB.'); return; }
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = URL.createObjectURL(file);
    setAvatarUrl(objectUrlRef.current);
    setAvatarError('');
  }

  function saveProfile(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!draft.fullName.trim()) nextErrors.fullName = 'Enter your full name.';
    if (!draft.email.trim()) nextErrors.email = 'Enter your email address.';
    else if (!emailPattern.test(draft.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (!draft.mobile.trim()) nextErrors.mobile = 'Enter your mobile number.';
    else if (!mobilePattern.test(draft.mobile.replace(/[\s-]/g, '').trim())) nextErrors.mobile = 'Enter a valid 10-digit Indian mobile number.';
    if (!draft.state) nextErrors.state = 'Select your state.';
    if (!draft.district.trim()) nextErrors.district = 'Enter your district.';
    if (!draft.village.trim()) nextErrors.village = 'Enter your village or town.';
    if (!draft.preferredLanguage) nextErrors.preferredLanguage = 'Choose your preferred language.';
    if (draft.dateOfBirth && draft.dateOfBirth > new Date().toISOString().slice(0, 10)) nextErrors.dateOfBirth = 'Date of birth cannot be in the future.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setProfile({ ...draft, fullName: draft.fullName.trim(), email: draft.email.trim() });
    setEditing(false);
    setMessage('Profile updated in this demo preview only. No information was sent to or saved on a server.');
  }

  return (
    <FarmerWorkspace activePath="/farmer/profile" title="Farmer profile" subtitle="Your details and preferences · demo preview">
      <section className="fp-page-heading"><div><span className="fp-eyebrow">YOUR KRISHIQUEST IDENTITY</span><h1>Farmer profile</h1><p>Keep your personal details and preferences up to date.</p></div><span className="fp-demo-tag"><ShieldCheck size={13} /> DEMO PROFILE</span></section>
      {message && <div className="fp-success" role="status"><Check size={16} /><span>{message}</span></div>}
      <form className="fp-profile-card" onSubmit={saveProfile} noValidate>
        <div className="fp-profile-banner"><div className="fp-avatar-wrap"><div className="fp-large-avatar">{avatarUrl ? <img src={avatarUrl} alt="Local profile preview" /> : <span>{(profile.fullName.split(' ').map((part) => part[0]).slice(0, 2).join('') || 'DF').toUpperCase()}</span>}{editing && <button type="button" aria-label="Choose profile photo" onClick={() => inputRef.current?.click()}><Camera size={15} /></button>}</div><input ref={inputRef} className="fp-file-input" type="file" accept="image/*" onChange={onAvatarChange} aria-label="Choose a local profile photo" /></div><div className="fp-profile-identity"><span className="fp-eyebrow">FARMER ID · ILLUSTRATIVE</span><h2>{profile.fullName}</h2><span className="fp-id-pill">{profile.farmerId}</span></div><div className="fp-profile-action">{!editing && <button className="fp-button fp-button--outline" type="button" onClick={beginEdit}><Edit3 size={15} /> Edit profile</button>}</div></div>
        {editing && <div className="fp-avatar-hint">Choose a photo to preview it here. It stays on this device and is not uploaded.{avatarError && <span className="fp-error" role="alert">{avatarError}</span>}</div>}
        <div className="fp-form-body"><div className="fp-section-title"><div><span className="fp-eyebrow">PERSONAL INFORMATION</span><h3>Your details</h3></div><span className="fp-required-note">* Required fields</span></div><div className="fp-form-grid">{profileFields.map((field) => <ProfileField key={field.key} field={field} value={editing ? draft[field.key] : profile[field.key]} disabled={!editing} error={editing ? errors[field.key] : ''} onChange={(event) => updateField(field.key, event.target.value)} />)}</div><div className="fp-contact-note"><div><Mail size={15} /><span>Email</span><strong>{profile.email}</strong></div><div><Phone size={15} /><span>Mobile</span><strong>{profile.mobile}</strong></div><div><MapPin size={15} /><span>Location</span><strong>{profile.village}, {profile.district}</strong></div></div>
          {editing && <div className="fp-form-actions"><button className="fp-button fp-button--cancel" type="button" onClick={cancelEdit}>Cancel</button><button className="fp-button fp-button--primary" type="submit">Save changes <ArrowRight size={15} /></button></div>}
        </div>
      </form>
      <div className="fp-privacy-note"><ShieldCheck size={16} /><p><strong>Your profile, your information.</strong> This page is a frontend preview. Profile edits and photo previews remain local and are not persisted.</p></div>
    </FarmerWorkspace>
  );
}
