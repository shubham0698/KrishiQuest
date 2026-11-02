import { ArrowLeft, Leaf, ShieldCheck, Sprout, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ children, mode }) {
  const isLogin = mode === 'login';
  return (
    <main className="auth-page">
      <header className="auth-header">
        <Link className="brand" to="/" aria-label="KrishiQuest home"><span className="brand-mark"><Leaf size={20} /></span><span>krishi<span>quest</span></span></Link>
        <Link className="auth-back" to="/"><ArrowLeft size={15} /> Back to home</Link>
      </header>
      <div className={`auth-shell auth-shell--${mode}`}>
        <section className="auth-form-side">
          <div className="auth-form-wrap">
            {children}
            <p className="auth-secure-note"><ShieldCheck size={14} /> Your information stays private and secure.</p>
          </div>
        </section>
        <aside className="auth-visual" aria-label="A thriving green farm at golden hour">
          <div className="auth-visual-photo" />
          <div className="auth-visual-shade" />
          <div className="auth-visual-content">
            <span className="auth-visual-mark"><Leaf size={20} /></span>
            <span className="auth-visual-eyebrow">LEARN. PRACTICE. EARN.</span>
            <h2>{isLogin ? <>Every season<br />is a chance to <em>grow.</em></> : <>Good things grow<br />when we <em>grow together.</em></>}</h2>
            <p>{isLogin ? 'Pick up where you left off. Your next sustainable step is waiting.' : 'Join a community of farmers building a healthier, more sustainable future.'}</p>
            <div className="auth-visual-foot"><Sun size={16} /><span>Rooted in better farming for a brighter tomorrow.</span></div>
          </div>
          <div className="auth-visual-tag"><span className="auth-tag-leaf"><Leaf size={15} /></span><span><strong>Grow at your own pace</strong><small>One field. One step. One better future.</small></span></div>
        </aside>
      </div>
      <footer className="auth-footer"><span>© 2025 KrishiQuest · SIH 2025</span><span>Learn. Practice. Earn. Grow Sustainably.</span></footer>
    </main>
  );
}
