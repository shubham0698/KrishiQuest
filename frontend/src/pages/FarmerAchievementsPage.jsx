import { useMemo, useState } from 'react';
import { Award, BookOpen, BookOpenCheck, Check, ChevronRight, CircleHelp, Compass, Crown, Droplets, Earth, Flame, Leaf, LockKeyhole, Mountain, Recycle, ShieldCheck, Sparkles, Sprout, Target, TreePine, Trophy, Wheat } from 'lucide-react';
import { Link } from 'react-router-dom';
import FarmerWorkspace from '../components/FarmerWorkspace.jsx';
import { badgeCatalog, badgeCategories, demoFarmerXp, demoRewards, farmerLevels } from '../data/gamificationData.js';
import '../styles/gamification.css';

const icons = { Award, BookOpen, BookOpenCheck, Compass, Crown, Droplets, Earth, Flame, Leaf, Mountain, Recycle, ShieldCheck, Sprout, TreePine, Trophy, Wheat };

function GamificationMetric({ icon: Icon, label, value, detail, tone = '' }) {
  return <article className={`game-metric ${tone}`}><span className="game-metric-icon"><Icon size={18} /></span><span className="game-metric-label">{label}</span><strong>{value}</strong><small>{detail}</small></article>;
}

export default function FarmerAchievementsPage() {
  const [category, setCategory] = useState('All');
  const earned = badgeCatalog.filter((badge) => badge.earned).length;
  const currentLevelIndex = farmerLevels.reduce((found, level, index) => demoFarmerXp >= level.xp ? index : found, 0);
  const currentLevel = farmerLevels[currentLevelIndex];
  const nextLevel = farmerLevels[currentLevelIndex + 1];
  const levelProgress = nextLevel ? Math.max(0, Math.min(100, Math.round(((demoFarmerXp - currentLevel.xp) / (nextLevel.xp - currentLevel.xp)) * 100))) : 100;
  const filteredBadges = useMemo(() => badgeCatalog.filter((badge) => category === 'All' || badge.category === category), [category]);

  return <FarmerWorkspace activePath="/farmer/achievements" title="Your achievements" subtitle="Celebrate the progress in your demo journey">
    <div className="game-page">
      <section className="game-hero">
        <div className="game-hero-copy"><span className="game-eyebrow"><Sparkles size={14} /> YOUR GROWTH JOURNEY</span><h1>Every good practice<br /><em>moves you forward.</em></h1><p>Explore your illustrative XP, levels and badges as you learn and practice sustainable farming.</p><Link to="/farmer/leaderboard" className="game-hero-link">View demo leaderboard <ChevronRight size={15} /></Link></div>
        <div className="game-hero-level"><div className="game-level-emblem"><Award size={31} /></div><span>YOUR DEMO LEVEL</span><strong>Level {currentLevel.level}</strong><b>{currentLevel.name}</b><div className="game-xp-meter"><span style={{ width: `${levelProgress}%` }} /></div><small>{demoFarmerXp.toLocaleString()} / {nextLevel?.xp.toLocaleString() ?? demoFarmerXp.toLocaleString()} XP <i>{nextLevel ? `${nextLevel.xp - demoFarmerXp} XP to next level` : 'Maximum level'}</i></small></div>
        <span className="game-hero-orbit game-hero-orbit--one" /><span className="game-hero-orbit game-hero-orbit--two" />
      </section>

      <div className="game-demo-note"><CircleHelp size={14} /> All XP, levels, badge states and reward history on this page are illustrative demo data. Nothing is awarded or saved to a server.</div>

      <section className="game-metric-grid" aria-label="Demo gamification summary">
        <GamificationMetric icon={Sparkles} label="Total demo XP" value={demoFarmerXp.toLocaleString()} detail="Illustrative profile total" tone="game-metric--xp" />
        <GamificationMetric icon={Trophy} label="Current level" value={`Level ${currentLevel.level}`} detail={currentLevel.name} tone="game-metric--level" />
        <GamificationMetric icon={Award} label="Badges earned" value={`${earned} / ${badgeCatalog.length}`} detail="Demo badge collection" tone="game-metric--badges" />
        <GamificationMetric icon={Check} label="Achievements completed" value="12" detail="Illustrative milestones" tone="game-metric--achievements" />
        <GamificationMetric icon={Flame} label="Activity streak" value="7 days" detail="Illustrative streak preview" tone="game-metric--streak" />
      </section>

      <section className="game-section game-level-section"><div className="game-section-heading"><div><span className="game-eyebrow">GROW AT YOUR OWN PACE</span><h2>Level progression</h2><p>Each milestone marks a new chapter in this demo journey.</p></div><span className="game-section-count">{farmerLevels.length} levels</span></div><div className="game-level-track">{farmerLevels.map((level, index) => { const Icon = icons[level.icon] || Award; const unlocked = demoFarmerXp >= level.xp; const active = index === currentLevelIndex; const fill = active && nextLevel ? levelProgress : unlocked ? 100 : 0; return <article className={`game-level-card${unlocked ? ' is-unlocked' : ''}${active ? ' is-current' : ''}`} key={level.level}><div className="game-level-card-top"><span className="game-level-icon">{unlocked ? <Icon size={19} /> : <LockKeyhole size={16} />}</span><span className="game-level-index">LEVEL {String(level.level).padStart(2, '0')}</span></div><h3>{level.name}</h3><p>{level.xp.toLocaleString()} XP required</p><div className="game-level-progress"><span style={{ width: `${fill}%` }} /></div><small>{active ? `${levelProgress}% progress` : unlocked ? 'Unlocked in demo' : 'Locked'}</small></article>; })}</div></section>

      <section className="game-section"><div className="game-section-heading"><div><span className="game-eyebrow">A GARDEN OF MILESTONES</span><h2>Badges & achievements</h2><p>Explore the demo collection and what each badge represents.</p></div><span className="game-section-count">{earned} earned</span></div><div className="game-filter-tabs" role="group" aria-label="Filter badges by category">{badgeCategories.map((item) => <button type="button" className={category === item ? 'active' : ''} key={item} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}</div><div className="game-badge-grid">{filteredBadges.map((badge) => { const Icon = icons[badge.icon] || Award; return <article className={`game-badge-card${badge.earned ? ' is-earned' : ' is-locked'}`} key={badge.id}><div className="game-badge-medal">{badge.earned ? <Icon size={25} /> : <LockKeyhole size={21} />}</div><div className="game-badge-copy"><div className="game-badge-title"><h3>{badge.name}</h3><span className={badge.earned ? 'game-status-earned' : 'game-status-locked'}>{badge.earned ? <><Check size={11} /> Earned</> : 'Locked'}</span></div><p>{badge.description}</p><small><Target size={12} /> {badge.condition}</small>{badge.earned && <small className="game-earned-date">Demo unlock · {badge.date}</small>}</div></article>; })}</div></section>

      <section className="game-section game-rewards-section"><div className="game-section-heading"><div><span className="game-eyebrow">SMALL WINS ADD UP</span><h2>Recent demo rewards</h2><p>Illustrative activities from the sample farmer journey.</p></div><Link to="/farmer/quests" className="game-text-link">Explore quests <ChevronRight size={14} /></Link></div><div className="game-reward-list">{demoRewards.map((reward) => { const Icon = icons[reward.icon] || Award; return <article className="game-reward-row" key={reward.id}><span className="game-reward-icon"><Icon size={17} /></span><div className="game-reward-copy"><strong>{reward.title}</strong><span>{reward.activity}</span></div><span className="game-reward-xp">+{reward.xp} XP <small>{reward.status}</small></span><time>{reward.date}</time></article>; })}</div></section>
    </div>
  </FarmerWorkspace>;
}
