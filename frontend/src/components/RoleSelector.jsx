import { Check, ShieldCheck, Sprout, Users } from 'lucide-react';

const roles = [
  { value: 'farmer', label: 'Farmer', description: 'Sustainable farming & crop care', icon: Sprout, tone: 'farmer' },
  { value: 'officer', label: 'Agriculture Officer', description: 'Verify & monitor field activity', icon: ShieldCheck, tone: 'officer' },
  { value: 'admin', label: 'Admin', description: 'Manage platform & content', icon: Users, tone: 'admin' },
];

export default function RoleSelector({ value, onChange, error, id = 'role' }) {
  return (
    <fieldset className="role-fieldset" aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="auth-label">I’m joining as <span className="required-mark">*</span></legend>
      <div className="role-options">
        {roles.map(({ value: role, label, description, icon: Icon, tone }) => (
          <label className={`role-option${value === role ? ' role-option--selected' : ''}`} key={role}>
            <input type="radio" name={id} value={role} checked={value === role} onChange={() => onChange(role)} />
            <span className={`role-icon role-icon--${tone}`}><Icon size={17} /></span>
            <span className="role-copy"><strong>{label}</strong><small>{description}</small></span>
            <span className="role-selected-mark"><Check size={11} /></span>
          </label>
        ))}
      </div>
      {error && <span className="field-error" id={`${id}-error`} role="alert">{error}</span>}
    </fieldset>
  );
}
