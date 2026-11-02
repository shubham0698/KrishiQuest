import { useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import OfficerSidebar from './OfficerSidebar.jsx';
import { useEngagementDemo } from '../context/EngagementDemoContext.jsx';

export default function OfficerWorkspace({ activePath, title, subtitle, children }) {
  const [open, setOpen] = useState(false);
  const { officerUnreadCount } = useEngagementDemo();
  return <div className="officer-workspace">
    <OfficerSidebar activePath={activePath} open={open} onClose={() => setOpen(false)} />
    <main className="officer-main">
      <header className="officer-topbar">
        <button type="button" className="officer-mobile-menu" aria-label="Open officer navigation" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={20} /></button>
        <div><strong>{title}</strong><span>{subtitle}</span></div>
        <Link className="officer-notification-link" to="/officer/notifications" aria-label={`Officer notifications${officerUnreadCount ? `, ${officerUnreadCount} unread` : ''}`}><Bell size={17} />{officerUnreadCount > 0 && <span>{officerUnreadCount}</span>}</Link>
        <div className="officer-top-profile"><span className="officer-avatar officer-avatar--small">AO</span><span><strong>Demo Officer</strong><small>Officer workspace</small></span></div>
      </header>
      <div className="officer-content"><div className="officer-demo-banner"><span>ILLUSTRATIVE DEMO</span> Sample farmer activities and officer actions stay in browser memory. No real submissions or verification occur.</div>{children}<footer className="officer-page-foot">KrishiQuest · Agriculture Officer Preview <span>Demo data only · No backend connected</span></footer></div>
    </main>
  </div>;
}
