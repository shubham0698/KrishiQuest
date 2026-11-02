import { useMemo, useState } from 'react';
import {
  Award, Bell, BookOpen, Bug, Camera, Check, ChevronDown, ChevronRight,
  CircleHelp, CloudSun, Droplet, Flame, Leaf,
  MapPin, Menu, Search, ShieldCheck, Sprout, Star, Target, Trophy, Users,
  Wheat, X, Zap,
} from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Link } from 'react-router-dom';
import { farmerBadges, farmerStats, farmingQuests, recentActivities, sustainabilityTips, weeklyXp } from '../data/farmerDashboardData.js';
import { FarmerSidebar } from '../components/FarmerWorkspace.jsx';
import { useEngagementDemo } from '../context/EngagementDemoContext.jsx';
import '../styles/farmerDashboard.css';

const questIcons = { droplet: Droplet, sprout: Sprout, bug: Bug, wheat: Wheat, leaf: Leaf };
const statIcons = { sparkles: Zap, target: Target, flame: Flame, leaf: Leaf };
const activityIcons = { book: BookOpen, sprout: Sprout, award: Award, camera: Camera };
const badgeIcons = { droplet: Droplet, sprout: Sprout, trophy: Trophy, star: Star };
const tipIcons = { droplet: Droplet, sprout: Sprout, wheat: Wheat, bug: Bug };

function DemoNotice({ children, onClose }) {
  return <div className="fd-notice" role="status"><CircleHelp size={16} /><span>{children}</span><button type="button" aria-label="Dismiss message" onClick={onClose}><X size={15} /></button></div>;
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return <div className="fd-chart-tooltip"><span>{label}</span><strong>{payload[0].value} XP</strong></div>;
}

function StatCard({ stat }) {
  const Icon = statIcons[stat.icon];
  return <article className="fd-stat-card"><div className={`fd-stat-icon fd-stat-icon--${stat.tint}`}><Icon size={19} /></div><span className="fd-stat-detail">{stat.detail}</span><div className="fd-stat-value">{stat.value}<small>{stat.suffix}</small></div><div className="fd-stat-foot"><span>{stat.label}</span><span className="fd-stat-change"><i />{stat.change}</span></div></article>;
}

function QuestCard({ quest, onDetails }) {
  const Icon = questIcons[quest.icon];
  return (
    <article className="fd-quest-card">
      <div className="fd-quest-image" style={{ backgroundImage: `url(https://images.unsplash.com/${quest.image}?auto=format&fit=crop&w=620&q=78)` }} role="img" aria-label={`${quest.title} farming scene`}>
        <span className={`fd-quest-symbol fd-quest-symbol--${quest.tint}`}><Icon size={17} /></span><span className="fd-quest-category">{quest.category}</span>
      </div>
      <div className="fd-quest-body"><div className="fd-quest-title-row"><h3>{quest.title}</h3><span className="fd-quest-xp"><Zap size={12} />{quest.xp} XP</span></div><p>{quest.description}</p>
        <div className="fd-quest-meta"><span className={`fd-status fd-status--${quest.statusType}`}><i />{quest.status}</span><span className="fd-difficulty">{quest.difficulty}</span></div>
        <div className="fd-quest-progress-label"><span>Quest progress</span><strong>{quest.progress}%</strong></div><div className="fd-progress-track" role="progressbar" aria-label={`${quest.title} progress`} aria-valuenow={quest.progress} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${quest.progress}%` }} /></div>
        <button className="fd-quest-button" type="button" onClick={() => onDetails(quest.title)}>{quest.statusType === 'ready' ? 'View quest' : 'View details'} <ChevronRight size={15} /></button>
      </div>
    </article>
  );
}

export default function FarmerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tipIndex, setTipIndex] = useState(0);
  const [notice, setNotice] = useState('');
  const { farmerUnreadCount } = useEngagementDemo();
  const visibleQuests = useMemo(() => farmingQuests.filter((quest) => quest.title.toLowerCase().includes(searchTerm.trim().toLowerCase())), [searchTerm]);
  const currentTip = sustainabilityTips[tipIndex];
  const TipIcon = tipIcons[currentTip.icon];

  function showNotice(message) {
    setNotice(message);
    setSidebarOpen(false);
  }

  return (
    <div className="farmer-dashboard">
      <FarmerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activePath="/farmer/dashboard" onAction={(name) => showNotice(`${name} is not part of this dashboard preview yet.`)} onLogout={() => showNotice('This is a demo preview. No account is signed in or out.')} />
      <main className="fd-main">
        <header className="fd-topbar">
          <button className="fd-mobile-menu" type="button" aria-label="Open dashboard navigation" aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(true)}><Menu size={21} /></button>
          <div className="fd-topbar-greeting"><span>Good morning, Farmer! <span aria-hidden="true">☀</span></span><small>Here’s how your field journey is growing.</small></div>
          <div className="fd-topbar-actions">
            {searchOpen && <input className="fd-search-input" autoFocus type="search" aria-label="Search farming quests" placeholder="Search quests…" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />}
            <button className={`fd-icon-button${searchOpen ? ' fd-icon-button--active' : ''}`} type="button" aria-label={searchOpen ? 'Close search' : 'Search quests'} onClick={() => { setSearchOpen((current) => !current); setSearchTerm(''); }}><Search size={18} /></button>
            <Link className="fd-icon-button fd-bell-button" to="/farmer/notifications" aria-label={`Open notifications${farmerUnreadCount ? `, ${farmerUnreadCount} unread` : ''}`}><Bell size={18} />{farmerUnreadCount > 0 && <span className="fd-unread-badge">{farmerUnreadCount}</span>}</Link>
            <div className="fd-top-profile"><div className="fd-avatar">DF</div><div><strong>Demo Farmer</strong><span>Farmer account</span></div><ChevronDown size={15} /></div>
          </div>
        </header>
        <div className="fd-content">
          <div className="fd-demo-banner"><span><CircleHelp size={14} /> Illustrative demo data</span><span>Activity, XP, scores and rewards are sample content and are not saved.</span></div>
          {notice && <DemoNotice onClose={() => setNotice('')}>{notice}</DemoNotice>}
          <section className="fd-welcome-card"><div className="fd-welcome-copy"><span className="fd-eyebrow"><CloudSun size={15} /> YOUR FARMER DASHBOARD</span><h1>Good morning, <em>Demo Farmer!</em></h1><p>Every small step you take helps your farm—and the future—grow stronger. Keep going, you’re doing wonderful work.</p><div className="fd-welcome-badges"><span><MapPin size={13} /> Mysuru, Karnataka</span><span><Sprout size={13} /> Level 08 · Field Grower</span></div></div><div className="fd-level-card"><div className="fd-level-top"><span className="fd-level-icon"><Sprout size={20} /></span><span className="fd-level-label">YOUR FARMER LEVEL</span><strong>Level 08</strong><small>Field Grower</small></div><div className="fd-level-progress"><div><span>Progress to Level 09</span><strong>1,250 <small>/ 1,500 XP</small></strong></div><div className="fd-level-track" role="progressbar" aria-label="Progress to level 9" aria-valuenow="83" aria-valuemin="0" aria-valuemax="100"><span /></div><small className="fd-level-remaining">250 XP to your next level</small></div></div><div className="fd-welcome-decoration fd-welcome-decoration--one"><Leaf size={112} /></div><div className="fd-welcome-decoration fd-welcome-decoration--two"><Sprout size={76} /></div></section>

          <section className="fd-stats-grid" aria-label="Farmer statistics">{farmerStats.map((stat) => <StatCard key={stat.label} stat={stat} />)}</section>

          <section className="fd-section" id="quests"><div className="fd-section-heading"><div><span className="fd-eyebrow">MAKE YOUR NEXT MOVE</span><h2>Active farming quests</h2><p>Practical challenges for a healthier, more resilient farm.</p></div><button className="fd-outline-button" type="button" onClick={() => showNotice('The full quest directory is not part of this dashboard preview.')}>Explore quests <ChevronRight size={15} /></button></div>
            <div className="fd-quest-grid">{visibleQuests.length ? visibleQuests.map((quest) => <QuestCard key={quest.id} quest={quest} onDetails={(name) => showNotice(`${name} quest details are illustrative. Quest actions are not connected.`)} />) : <div className="fd-empty-search"><Search size={20} /><strong>No quests match “{searchTerm}”</strong><span>Try a different quest name.</span></div>}</div>
          </section>

          <div className="fd-insights-grid">
            <section className="fd-panel fd-chart-panel"><div className="fd-panel-heading"><div><span className="fd-eyebrow">YOUR WEEK AT A GLANCE</span><h2>Weekly progress</h2><p>Experience earned across the last 7 days</p></div><span className="fd-chart-total"><Zap size={14} /> 1,010 XP <small>demo week</small></span></div><div className="fd-chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={weeklyXp} margin={{ top: 12, right: 5, left: -23, bottom: 0 }}><defs><linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#76ae62" stopOpacity={0.24} /><stop offset="95%" stopColor="#76ae62" stopOpacity={0.01} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#eef1e9" strokeDasharray="4 4" /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#929c91', fontSize: 10 }} dy={10} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#a0a99f', fontSize: 9 }} tickCount={5} /><Tooltip content={<ChartTooltip />} /><Area type="monotone" dataKey="xp" stroke="#4f9250" strokeWidth={2.5} fill="url(#xpGradient)" activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff', fill: '#4f9250' }} /></AreaChart></ResponsiveContainer></div><div className="fd-chart-foot"><span><i /> XP earned per day</span><span>Illustrative weekly activity</span></div></section>

            <section className="fd-panel fd-activity-panel"><div className="fd-panel-heading"><div><span className="fd-eyebrow">LITTLE WINS ADD UP</span><h2>Recent activity</h2><p>Your sample activity timeline</p></div><span className="fd-demo-pill">DEMO</span></div><div className="fd-activity-list">{recentActivities.map((activity) => { const Icon = activityIcons[activity.icon]; return <article className="fd-activity-item" key={activity.id}><span className={`fd-activity-icon fd-activity-icon--${activity.tint}`}><Icon size={15} /></span><div className="fd-activity-copy"><strong>{activity.title}</strong><span>{activity.detail}</span></div><span className="fd-activity-reward">{activity.reward}</span></article>; })}</div><button type="button" className="fd-panel-link" onClick={() => showNotice('The complete activity history is illustrative and not stored.')}>View activity history <ChevronRight size={14} /></button></section>
          </div>

          <div className="fd-bottom-grid">
            <section className="fd-panel fd-badges-panel" id="achievements"><div className="fd-panel-heading"><div><span className="fd-eyebrow">CELEBRATE YOUR PROGRESS</span><h2>Achievements & badges</h2><p>Every milestone is a reason to feel proud.</p></div><button className="fd-small-link" type="button" onClick={() => showNotice('Your full badge collection is not part of this preview.')}>View all <ChevronRight size={14} /></button></div><div className="fd-badge-grid">{farmerBadges.map((badge) => { const Icon = badgeIcons[badge.icon]; return <article className={`fd-badge-card${badge.earned ? '' : ' fd-badge-card--locked'}`} key={badge.title}><span className={`fd-badge-art fd-badge-art--${badge.tint}`}>{badge.earned ? <Icon size={22} /> : <><Icon size={20} /><span className="fd-lock-mark">⌑</span></>}</span><strong>{badge.title}</strong><span>{badge.earned ? 'Badge earned' : badge.detail}</span>{badge.earned && <span className="fd-badge-check"><Check size={11} /></span>}</article>; })}</div></section>
            <section className="fd-tip-card"><div className="fd-tip-top"><span className="fd-tip-label"><Leaf size={14} /> A FIELD NOTE FOR YOU</span><span className="fd-tip-count">0{tipIndex + 1} / 04</span></div><div className="fd-tip-content"><span className="fd-tip-icon"><TipIcon size={21} /></span><span className="fd-tip-category">{currentTip.label}</span><h2>{currentTip.title}</h2><p>{currentTip.text}</p></div><div className="fd-tip-bottom"><span>Small steps. Lasting change.</span><button type="button" onClick={() => setTipIndex((current) => (current + 1) % sustainabilityTips.length)}>Next tip <ChevronRight size={14} /></button></div><span className="fd-tip-decoration"><Sprout size={105} /></span></section>
          </div>
          <footer className="fd-page-foot"><span>KrishiQuest · Learn. Practice. Earn. Grow Sustainably.</span><span><ShieldCheck size={13} /> Demo dashboard preview · No data is saved</span></footer>
        </div>
      </main>
    </div>
  );
}
