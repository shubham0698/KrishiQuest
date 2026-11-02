import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award, Bell, BookOpen, ChevronDown, ChevronRight, CircleHelp, ClipboardList, ClipboardPlus, Home, LayoutDashboard,
  Leaf, LogOut, Menu, MessageCircle, Settings, Sprout, Target, Trophy, Users, X,
} from 'lucide-react';
import { useEngagementDemo } from '../context/EngagementDemoContext.jsx';
import '../styles/farmerDashboard.css';

const navigation = [
  { label: 'Overview', icon: LayoutDashboard, to: '/farmer/dashboard' },
  { label: 'My Farm', icon: Home, to: '/farmer/farm' },
  { label: 'Profile', icon: Users, to: '/farmer/profile' },
  { label: 'Farming Quests', icon: Target, to: '/farmer/quests' },
  { label: 'Submit Activity', icon: ClipboardPlus, to: '/farmer/activities/submit' },
  { label: 'My Activities', icon: ClipboardList, to: '/farmer/activities' },
  { label: 'Learning Center', icon: BookOpen, to: '/farmer/learning' },
  { label: 'My Achievements', icon: Award, to: '/farmer/achievements' },
  { label: 'Leaderboard', icon: Trophy, to: '/farmer/leaderboard' },
  { label: 'Community', icon: MessageCircle, to: '/farmer/community' },
  { label: 'Notifications', icon: Bell, to: '/farmer/notifications', badge: true },
];

export function FarmerSidebar({ open, onClose, onAction, onLogout, activePath }) {
  const { farmerUnreadCount } = useEngagementDemo();
  return (
    <>
      {open && <button className="fd-backdrop" type="button" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`fd-sidebar${open ? ' fd-sidebar--open' : ''}`}>
        <div className="fd-brand-row"><Link className="fd-brand" to="/" aria-label="KrishiQuest home" onClick={onClose}><span className="fd-brand-mark"><Leaf size={19} /></span><span>krishi<span>quest</span></span></Link><button className="fd-close-sidebar" type="button" aria-label="Close navigation" onClick={onClose}><X size={19} /></button></div>
        <div className="fd-profile-mini"><div className="fd-avatar fd-avatar--sidebar">DF</div><div><strong>Demo Farmer</strong><span>Level 08 · Field Grower</span></div><ChevronDown size={15} /></div>
        <div className="fd-nav-label">YOUR SPACE</div>
        <nav className="fd-side-nav" aria-label="Farmer dashboard navigation">
          {navigation.map(({ label, icon: Icon, to, badge }) => {
            const active = activePath === to;
            const contents = <><Icon size={18} /><span>{label}</span>{badge && farmerUnreadCount > 0 && <b className="fd-nav-count" aria-label={`${farmerUnreadCount} unread`}>{farmerUnreadCount}</b>}{active && <i />}</>;
            return to
              ? <Link key={label} to={to} className={`fd-nav-item${active ? ' fd-nav-item--active' : ''}`} aria-current={active ? 'page' : undefined} onClick={onClose}>{contents}</Link>
              : <button type="button" key={label} className="fd-nav-item" onClick={() => onAction(label)}>{contents}</button>;
          })}
        </nav>
        <div className="fd-side-divider" />
        <Link to="/farmer/settings" onClick={onClose} className={`fd-nav-item${activePath === '/farmer/settings' ? ' fd-nav-item--active' : ''}`} aria-current={activePath === '/farmer/settings' ? 'page' : undefined}><Settings size={18} /><span>Settings</span>{activePath === '/farmer/settings' && <i />}</Link>
        <div className="fd-sidebar-bottom"><div className="fd-sidebar-tip"><span className="fd-tip-bulb"><Sprout size={16} /></span><strong>Little steps add up</strong><p>Your sustainable choices are growing into a brighter future.</p><span className="fd-sidebar-tip-link">Keep growing <ChevronRight size={13} /></span></div><button type="button" className="fd-logout" onClick={onLogout}><LogOut size={17} /><span>Log out</span></button><span className="fd-sidebar-version">KRISHIQUEST · DEMO PREVIEW</span></div>
      </aside>
    </>
  );
}

export default function FarmerWorkspace({ activePath, title, subtitle, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const { farmerUnreadCount } = useEngagementDemo();
  const closeSidebar = () => setSidebarOpen(false);
  const showNotice = (message) => { setNotice(message); closeSidebar(); };

  return (
    <div className="farmer-dashboard">
      <FarmerSidebar open={sidebarOpen} onClose={closeSidebar} activePath={activePath} onAction={(name) => showNotice(`${name} is not part of this page preview yet.`)} onLogout={() => showNotice('This is a demo preview. No account is signed in or out.')} />
      <main className="fd-main">
        <header className="fd-topbar"><button className="fd-mobile-menu" type="button" aria-label="Open dashboard navigation" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(true)}><Menu size={21} /></button><div className="fd-topbar-greeting"><span>{title}</span><small>{subtitle}</small></div><div className="fd-topbar-actions"><Link className="fd-icon-button fd-bell-button" to="/farmer/notifications" aria-label={`Notifications${farmerUnreadCount ? `, ${farmerUnreadCount} unread` : ''}`}><Bell size={18}/>{farmerUnreadCount > 0 && <span className="fd-unread-badge">{farmerUnreadCount}</span>}</Link><div className="fd-top-profile"><div className="fd-avatar">DF</div><div><strong>Demo Farmer</strong><span>Farmer account</span></div><ChevronDown size={15} /></div></div></header>
        <div className="fd-content"><div className="fd-demo-banner"><span><CircleHelp size={14} /> Illustrative demo data</span><span>Changes on this page stay in this browser session only; nothing is saved to a server.</span></div>{notice && <div className="fd-notice" role="status"><CircleHelp size={16} /><span>{notice}</span><button type="button" aria-label="Dismiss message" onClick={() => setNotice('')}><X size={15} /></button></div>}{children}<footer className="fd-page-foot"><span>KrishiQuest · Learn. Practice. Earn. Grow Sustainably.</span><span>Demo preview · No data is saved</span></footer></div>
      </main>
    </div>
  );
}
