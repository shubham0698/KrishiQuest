import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function FormField({ id, label, error, hint, className = '', ...inputProps }) {
  return (
    <div className={`form-field ${className}`}>
      <label className="auth-label" htmlFor={id}>{label}{inputProps.required && <span className="required-mark"> *</span>}</label>
      <input id={id} className={`auth-input${error ? ' auth-input--error' : ''}`} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined} {...inputProps} />
      {error && <span className="field-error" id={`${id}-error`} role="alert">{error}</span>}
      {!error && hint && <span className="field-hint" id={`${id}-hint`}>{hint}</span>}
    </div>
  );
}

export function PasswordField({ id, label, error, hint, ...inputProps }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="form-field">
      <label className="auth-label" htmlFor={id}>{label}{inputProps.required && <span className="required-mark"> *</span>}</label>
      <div className={`password-wrap${error ? ' password-wrap--error' : ''}`}>
        <input id={id} className="auth-input" type={visible ? 'text' : 'password'} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined} {...inputProps} />
        <button className="password-toggle" type="button" onClick={() => setVisible((current) => !current)} aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible}>{visible ? <EyeOff size={17} /> : <Eye size={17} />}</button>
      </div>
      {error && <span className="field-error" id={`${id}-error`} role="alert">{error}</span>}
      {!error && hint && <span className="field-hint" id={`${id}-hint`}>{hint}</span>}
    </div>
  );
}
