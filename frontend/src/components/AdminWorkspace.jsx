import { useState } from 'react';
import { BarChart3, BookOpen, ClipboardList, Home, Leaf, Menu, Settings, ShieldCheck, Users, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const items = [
  { label: 'Overview', to: '/admin/dashboard', Icon: Home },
  { label: 'Farmers', to: '/admin/farmers', Icon: Users },
  { label: 'Officers', to: '/admin/officers', Icon: ShieldCheck },
  { label: 'Quest Management', to: '/admin/quests', Icon: ClipboardList },
  { label: 'Learning Content', to: '/admin/learning', Icon: BookOpen },
  { label: 'Reports', to: '/admin/reports', Icon: BarChart3 },
  { label: 'Settings', to: '/admin/settings', Icon: Settings },
];

export default function AdminWorkspace({ activePath, title, subtitle, children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  return <div className="admin-workspace">
    {open && <button className="admin-backdrop" aria-label="Close admin menu" onClick={() => setOpen(false)} />}
    <aside className={`admin-sidebar${open ? ' is-open' : ''}`}>
      <div className="admin-brand-row"><Link className="admin-brand" to="/"><span><Leaf size={19} /></span><b>krishi<span>quest</span></b></Link><button className="admin-close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={18} /></button></div>
      <div className="admin-profile"><span className="admin-avatar">AD</span><span><strong>Platform Admin</strong><small>Administrator preview</small></span></div>
      <p className="admin-nav-label">PLATFORM</p>
      <nav aria-label="Admin navigation">{items.map(({ label, to, Icon }) => <Link key={to} to={to} onClick={() => setOpen(false)} className={`admin-nav-link${activePath === to ? ' is-active' : ''}`} aria-current={activePath === to ? 'page' : undefined}><Icon size={17} /><span>{label}</span></Link>)}</nav>
      <div className="admin-sidebar-foot"><BarChart3 size={15} /> Admin preview · demo data</div>
    </aside>
    <main className="admin-main">
      <header className="admin-topbar"><button className="admin-menu" onClick={() => setOpen(true)} aria-label="Open admin menu"><Menu size={19} /></button><div><strong>{title}</strong><small>{subtitle}</small></div><span className="admin-top-chip"><ShieldCheck size={14} /> Admin workspace</span></header>
      <div className="admin-content"><div className="admin-demo-banner"><strong>ILLUSTRATIVE ADMIN PREVIEW</strong><span>Management actions use local React state only. No accounts or platform data are changed on a server.</span></div>{children}<footer className="admin-footer">KrishiQuest Platform Management <span>Fictional demo records · no backend connected</span></footer></div>
    </main>
  </div>;
}
