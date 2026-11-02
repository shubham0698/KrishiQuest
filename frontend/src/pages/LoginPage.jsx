import { useState } from 'react';
import { ArrowRight, CircleHelp, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import FormField, { PasswordField } from '../components/FormField.jsx';
import RoleSelector from '../components/RoleSelector.jsx';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const [values, setValues] = useState({ email: '', password: '', role: '' });
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [help, setHelp] = useState(false);

  const update = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
    setNotice('');
  };

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!values.email.trim()) nextErrors.email = 'Enter your email address.';
    else if (!emailPattern.test(values.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (!values.password) nextErrors.password = 'Enter your password.';
    if (!values.role) nextErrors.role = 'Choose the role you’re signing in as.';
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) {
      setNotice('Your details look complete. Sign-in will be available once KrishiQuest authentication is connected.');
    }
  }

  return (
    <AuthLayout mode="login">
      <div className="auth-mobile-brand"><span className="auth-kicker-icon"><Mail size={14} /></span> WELCOME BACK</div>
      <div className="auth-title-block"><span className="eyebrow">GOOD TO HAVE YOU BACK</span><h1>Welcome back<span>.</span></h1><p>Sign in to pick up your sustainable farming journey.</p></div>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <FormField id="login-email" label="Email address" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={(event) => update('email', event.target.value)} error={errors.email} required />
        <PasswordField id="login-password" label="Password" autoComplete="current-password" placeholder="Enter your password" value={values.password} onChange={(event) => update('password', event.target.value)} error={errors.password} required />
        <div className="auth-options"><label className="check-label"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span className="custom-check" /> Remember me</label><button className="text-button" type="button" onClick={() => setHelp((current) => !current)}>Forgot password?</button></div>
        {help && <p className="auth-inline-note" role="status"><CircleHelp size={15} /> Password reset will be available when account services are connected.</p>}
        <RoleSelector id="login-role" value={values.role} onChange={(value) => update('role', value)} error={errors.role} />
        {notice && <p className="auth-notice" role="status">{notice}</p>}
        <button className="button auth-submit" type="submit">Sign in <ArrowRight size={17} /></button>
      </form>
      <p className="auth-switch">New to KrishiQuest? <Link to="/register">Create an account <ArrowRight size={14} /></Link></p>
    </AuthLayout>
  );
}
