import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BadgeCheck, Bell, ChartNoAxesCombined, ChevronRight, ClipboardCheck, Home, Leaf, Settings, Users, X } from 'lucide-react';
import { useEngagementDemo } from '../context/EngagementDemoContext.jsx';

const navItems = [
  { label: 'Overview', to: '/officer/dashboard', icon: Home },
  { label: 'Farmer Management', to: '/officer/farmers', icon: Users },
  { label: 'Activity Verification', to: '/officer/activities', icon: ClipboardCheck },
  { label: 'Review History', to: '/officer/activities?status=reviewed', icon: BadgeCheck },
  { label: 'Reports', to: '/officer/reports', icon: ChartNoAxesCombined },
  { label: 'Notifications', to: '/officer/notifications', icon: Bell, badge: true },
  { label: 'Settings', action: true, icon: Settings },
];

export default function OfficerSidebar({ activePath, open, onClose }) {
  const { officerUnreadCount } = useEngagementDemo();
  const location = useLocation();
  const [settingsNotice, setSettingsNotice] = useState(false);
  return <>
    {open && <button className="officer-backdrop" type="button" aria-label="Close officer navigation" onClick={onClose} />}
    <aside className={`officer-sidebar${open ? ' officer-sidebar--open' : ''}`}>
      <div className="officer-brand-row"><Link to="/" className="officer-brand" onClick={onClose}><span><Leaf size={18} /></span><b>krishi<span>quest</span></b></Link><button type="button" className="officer-sidebar-close" aria-label="Close navigation" onClick={onClose}><X size={19} /></button></div>
      <div className="officer-identity"><div className="officer-avatar">AO</div><div><strong>Demo Officer</strong><span>Agriculture Officer</span></div></div>
      <div className="officer-nav-label">OFFICER WORKSPACE</div>
      <nav className="officer-nav" aria-label="Agriculture officer navigation">{navItems.map(({ label, to, icon: Icon, action, badge }) => { const historyActive = label === 'Review History' && location.search.includes('status=reviewed'); const active = label === 'Review History' ? historyActive : activePath === to && !location.search.includes('status=reviewed'); const className = `officer-nav-link${active ? ' is-active' : ''}`; const children = <><Icon size={18} /><span>{label}</span>{badge && officerUnreadCount > 0 && <b className="fd-nav-count" aria-label={`${officerUnreadCount} unread`}>{officerUnreadCount}</b>}{active && <i />}</>; return action ? <button key={label} type="button" className={className} onClick={() => setSettingsNotice((current) => !current)} aria-expanded={settingsNotice}>{children}</button> : <Link key={label} to={to} onClick={onClose} className={className} aria-current={active ? 'page' : undefined}>{children}</Link>; })}</nav>
      {settingsNotice && <div className="officer-settings-notice" role="status">Officer settings are a demo preview and are not connected to an account.</div>}
      <div className="officer-sidebar-note"><span><Users size={15} /></span><strong>Supporting local farmers</strong><p>Review sample activities with clear, constructive feedback.</p><Link to="/officer/activities">Open verification queue <ChevronRight size={13} /></Link></div>
      <div className="officer-sidebar-foot">KRISHIQUEST · OFFICER DEMO</div>
    </aside>
  </>;
}
