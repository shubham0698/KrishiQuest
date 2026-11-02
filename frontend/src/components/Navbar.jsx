import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Leaf, Menu, X } from 'lucide-react';

const links = [
  ['About', '#about'], ['Features', '#features'], ['How it works', '#how-it-works'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <Link className="brand" to="/" aria-label="KrishiQuest home" onClick={() => setOpen(false)}>
          <span className="brand-mark"><Leaf size={20} strokeWidth={2.4} /></span>
          <span>krishi<span>quest</span></span>
        </Link>
        <button className="menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className={`nav-content${open ? ' nav-content--open' : ''}`}>
          <div className="nav-links">
            <a href="#home" onClick={() => setOpen(false)}>Home</a>
            {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          </div>
          <div className="nav-actions">
            <Link className="login-link" to="/login" onClick={() => setOpen(false)}>Log in</Link>
            <Link className="button button--small" to="/register" onClick={() => setOpen(false)}>Get started <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
