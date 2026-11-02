import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import FormField, { PasswordField } from '../components/FormField.jsx';
import RoleSelector from '../components/RoleSelector.jsx';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobilePattern = /^(?:\+91[\s-]?)?[6-9]\d{9}$/;

export default function RegisterPage() {
  const [values, setValues] = useState({ name: '', email: '', mobile: '', password: '', confirmPassword: '', role: '' });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');

  const update = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
    setNotice('');
  };

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = 'Enter your full name.';
    if (!values.email.trim()) nextErrors.email = 'Enter your email address.';
    else if (!emailPattern.test(values.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (!values.mobile.trim()) nextErrors.mobile = 'Enter your mobile number.';
    else if (!mobilePattern.test(values.mobile.replace(/[\s-]/g, '').trim())) nextErrors.mobile = 'Enter a valid 10-digit Indian mobile number.';
    if (!values.password) nextErrors.password = 'Create a password.';
    else if (values.password.length < 8) nextErrors.password = 'Use at least 8 characters.';
    if (!values.confirmPassword) nextErrors.confirmPassword = 'Confirm your password.';
    else if (values.password !== values.confirmPassword) nextErrors.confirmPassword = 'Your passwords don’t match.';
    if (!values.role) nextErrors.role = 'Choose the role that best describes you.';
    if (!acceptedTerms) nextErrors.terms = 'Please accept the terms to continue.';
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) {
      setNotice('Your details look complete. Account creation will be available once KrishiQuest authentication is connected.');
    }
  }

  return (
    <AuthLayout mode="register">
      <div className="auth-title-block auth-title-block--register"><span className="eyebrow">PLANT THE FIRST SEED</span><h1>Create your account<span>.</span></h1><p>A few details to get your KrishiQuest journey growing.</p></div>
      <form className="auth-form auth-form--register" onSubmit={handleSubmit} noValidate>
        <FormField id="register-name" label="Full name" type="text" autoComplete="name" placeholder="Your full name" value={values.name} onChange={(event) => update('name', event.target.value)} error={errors.name} required />
        <div className="auth-form-row"><FormField id="register-email" label="Email address" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={(event) => update('email', event.target.value)} error={errors.email} required /><FormField id="register-mobile" label="Mobile number" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="98765 43210" value={values.mobile} onChange={(event) => update('mobile', event.target.value)} error={errors.mobile} required /></div>
        <div className="auth-form-row"><PasswordField id="register-password" label="Password" autoComplete="new-password" placeholder="At least 8 characters" value={values.password} onChange={(event) => update('password', event.target.value)} error={errors.password} required /><PasswordField id="register-confirm" label="Confirm password" autoComplete="new-password" placeholder="Re-enter password" value={values.confirmPassword} onChange={(event) => update('confirmPassword', event.target.value)} error={errors.confirmPassword} required /></div>
        <RoleSelector id="register-role" value={values.role} onChange={(value) => update('role', value)} error={errors.role} />
        <div className="terms-wrap"><label className="check-label"><input type="checkbox" checked={acceptedTerms} onChange={(event) => { setAcceptedTerms(event.target.checked); setErrors((current) => ({ ...current, terms: '' })); }} /><span className="custom-check" /><span>I agree to the <a href="#terms" onClick={(event) => event.preventDefault()}>Terms of Use</a> and <a href="#privacy" onClick={(event) => event.preventDefault()}>Privacy Policy</a>.</span></label>{errors.terms && <span className="field-error" role="alert">{errors.terms}</span>}</div>
        {notice && <p className="auth-notice" role="status">{notice}</p>}
        <button className="button auth-submit" type="submit">Create account <ArrowRight size={17} /></button>
      </form>
      <p className="auth-switch">Already growing with us? <Link to="/login">Sign in <ArrowRight size={14} /></Link></p>
    </AuthLayout>
  );
}
