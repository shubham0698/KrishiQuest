import { useMemo, useState } from 'react';
import { Award, Crown, Medal, Search, Sparkles, Trophy, Users } from 'lucide-react';
import FarmerWorkspace from '../components/FarmerWorkspace.jsx';
import { leaderboardDistricts, leaderboardPeriods } from '../data/gamificationData.js';
import '../styles/gamification.css';

const periods = Object.keys(leaderboardPeriods);

export default function FarmerLeaderboardPage() {
  const [period, setPeriod] = useState('Weekly');
  const [search, setSearch] = useState('');
  const [district, setDistrict] = useState('All districts');
  const sorted = useMemo(() => [...leaderboardPeriods[period]].sort((a, b) => b.xp - a.xp), [period]);
  const podium = sorted.slice(0, 3);
  const visible = sorted.filter((farmer) => farmer.name.toLowerCase().includes(search.trim().toLowerCase()) && (district === 'All districts' || farmer.district === district));

  return <FarmerWorkspace activePath="/farmer/leaderboard" title="Farmer leaderboard" subtitle="A friendly look at illustrative community progress">
    <div className="game-page leaderboard-page">
      <section className="leaderboard-hero"><div><span className="game-eyebrow"><Users size={14} /> COMMUNITY MILESTONES</span><h1>Growing better,<br /><em>together.</em></h1><p>Celebrate learning and sustainable farming milestones across our sample farmer community.</p></div><div className="leaderboard-hero-stamp"><Trophy size={26} /><strong>DEMO</strong><span>RANKINGS</span></div><span className="leaderboard-leaf leaderboard-leaf--one" /><span className="leaderboard-leaf leaderboard-leaf--two" /></section>
      <div className="game-demo-note"><Sparkles size={14} /> All names, districts, scores, levels and rankings below are illustrative. This is not a real leaderboard.</div>
      <div className="leaderboard-toolbar"><div className="game-filter-tabs" role="tablist" aria-label="Leaderboard period">{periods.map((item) => <button role="tab" aria-selected={period === item} type="button" className={period === item ? 'active' : ''} key={item} onClick={() => setPeriod(item)}>{item}</button>)}</div><span className="leaderboard-period-note">{period} demo snapshot</span></div>
      <section className="leaderboard-podium" aria-label={`Top three farmers in the ${period} demo leaderboard`}>{[podium[1], podium[0], podium[2]].map((farmer, order) => { const rank = sorted.indexOf(farmer) + 1; if (!farmer) return null; return <article className={`podium-card podium-card--${rank}`} key={farmer.name}><span className="podium-crown">{rank === 1 ? <Crown size={20} /> : <Medal size={18} />}</span><div className="leaderboard-avatar">{farmer.initials}</div><strong>{farmer.name}</strong><span>{farmer.district} district</span><b>{farmer.xp.toLocaleString()} <small>XP</small></b><i>{rank === 1 ? '1ST PLACE' : rank === 2 ? '2ND PLACE' : '3RD PLACE'}</i></article>; })}</section>
      <section className="leaderboard-table-section"><div className="game-section-heading"><div><span className="game-eyebrow">SAMPLE FARMER COMMUNITY</span><h2>Farmer rankings</h2><p>Compare demo XP, levels and badge collections.</p></div><span className="game-section-count">{visible.length} farmers</span></div><div className="leaderboard-filters"><label className="leaderboard-search"><Search size={15} /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search farmers" aria-label="Search farmers" /></label><label className="leaderboard-district"><span className="game-sr-only">Filter by district</span><select value={district} onChange={(event) => setDistrict(event.target.value)}>{leaderboardDistricts.map((item) => <option key={item}>{item}</option>)}</select></label></div><div className="leaderboard-table-wrap"><table className="leaderboard-table"><thead><tr><th scope="col">Rank</th><th scope="col">Farmer</th><th scope="col">District</th><th scope="col">XP</th><th scope="col">Level</th><th scope="col">Badges</th></tr></thead><tbody>{visible.map((farmer) => <tr className={farmer.isCurrent ? 'is-current-farmer' : ''} key={farmer.name}><td><span className="leaderboard-rank">#{sorted.indexOf(farmer) + 1}</span></td><td><div className="leaderboard-name"><span className="leaderboard-row-avatar">{farmer.initials}</span><strong>{farmer.name}{farmer.isCurrent && <small>YOU · DEMO PROFILE</small>}</strong></div></td><td>{farmer.district}</td><td className="leaderboard-xp"><Sparkles size={13} /> {farmer.xp.toLocaleString()}</td><td>Level {farmer.level}</td><td><span className="leaderboard-badges"><Award size={13} /> {farmer.badges}</span></td></tr>)}</tbody></table>{visible.length === 0 && <div className="leaderboard-empty">No sample farmers match those filters. Try a different search or district.</div>}</div></section>
      <p className="leaderboard-footnote">Demo preview only · Rankings are fictional sample data and do not represent real farmer activity.</p>
    </div>
  </FarmerWorkspace>;
}
