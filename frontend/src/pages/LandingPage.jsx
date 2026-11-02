import {
  ArrowDown, ArrowRight, ArrowUpRight, Award, BookOpen, Bug, Check, ChevronRight,
  Droplet, Flame, Leaf, Medal, ShieldCheck, Sparkles, Sprout, Target, Trophy,
  Users, Wheat, Camera, ChartNoAxesColumnIncreasing, Play,
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { impactStats, leaderboard, platformFeatures, quests, steps } from '../data/landingData.js';

const iconMap = { droplet: Droplet, sprout: Sprout, bug: Bug, wheat: Wheat, leaf: Leaf };
const featureIcons = { sparkles: Sparkles, book: BookOpen, trophy: Trophy, camera: Camera, chart: ChartNoAxesColumnIncreasing, users: Users };

function QuestCard({ quest }) {
  const Icon = iconMap[quest.icon];
  return (
    <article className="quest-card">
      <div className="quest-image" style={{ backgroundImage: `url(https://images.unsplash.com/${quest.image}?auto=format&fit=crop&w=720&q=82)` }} role="img" aria-label={`${quest.name} farming landscape`}>
        <span className={`quest-symbol quest-symbol--${quest.tone}`}><Icon size={18} /></span>
        <span className="quest-category">{quest.category}</span>
      </div>
      <div className="quest-card-body">
        <div className="quest-title-row"><h3>{quest.name}</h3><span className="xp-tag"><Sparkles size={13} /> {quest.xp} XP</span></div>
        <p>{quest.description}</p>
        <div className="quest-card-meta"><span><span className={`difficulty-dot difficulty-dot--${quest.difficulty.toLowerCase()}`} />{quest.difficulty}</span><a href="#get-started" aria-label={`Explore the ${quest.name} quest`}>Explore <ArrowUpRight size={14} /></a></div>
      </div>
    </article>
  );
}

function HeroDashboard() {
  return (
    <div className="hero-visual" aria-label="Illustration of a farmer's quest progress">
      <div className="hero-photo" />
      <div className="photo-shade" />
      <div className="hero-image-caption"><span className="caption-dot" /> A better harvest starts here</div>
      <div className="float-card xp-float"><span className="float-icon float-icon--xp"><Sparkles size={17} /></span><div><strong>+180 XP</strong><small>Quest completed!</small></div><span className="float-check"><Check size={13} /></span></div>
      <div className="float-card badge-float"><div className="badge-medal"><Award size={23} /></div><div><small>NEW ACHIEVEMENT</small><strong>Soil Guardian</strong><span className="badge-stars">✦ ✦ ✦</span></div></div>
      <div className="hero-stamp"><span>GROW</span><Leaf size={21} /><span>GOOD</span></div>
    </div>
  );
}

function GamificationPreview() {
  return (
    <div className="game-panel" id="rewards">
      <div className="game-profile">
        <div className="avatar avatar--large">RK</div>
        <div className="game-profile-copy"><span>YOUR FARMER PROFILE</span><strong>Ravi Kumar</strong><small><MapPinIcon /> Mysuru, Karnataka</small></div>
        <span className="level-chip"><Sprout size={14} /> LEVEL 08</span>
      </div>
      <div className="xp-progress-block"><div className="xp-progress-label"><span>Growing to Level 9</span><strong>2,480 <small>/ 3,000 XP</small></strong></div><div className="progress-track" role="progressbar" aria-label="Progress to level 9" aria-valuenow="83" aria-valuemin="0" aria-valuemax="100"><span /></div><div className="xp-progress-foot"><span>Keep up the great work!</span><span>520 XP to go</span></div></div>
      <div className="earned-row"><div><span className="earned-label">RECENT BADGES</span><div className="earned-badges"><span className="earned-badge earned-badge--water"><Droplet size={17} /></span><span className="earned-badge earned-badge--soil"><Sprout size={17} /></span><span className="earned-badge earned-badge--sun"><Flame size={17} /></span><span className="badge-count">+4</span></div></div><div className="weekly-goal"><span className="earned-label">WEEKLY GOAL</span><strong>3 <small>/ 4 quests</small></strong><div className="mini-bars"><i /><i /><i /><i /></div></div></div>
    </div>
  );
}

function MapPinIcon() {
  return <span className="pin-dot" aria-hidden="true">⌖</span>;
}

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-kicker"><span className="kicker-leaf"><Leaf size={13} /></span> A NEW WAY TO GROW</div>
              <h1>Grow better.<br />Farm smarter.<br /><em>Earn rewards.</em></h1>
              <p className="hero-description">Small steps in your field can make a world of difference. Learn sustainable practices, take on farm-friendly quests, and earn rewards along the way.</p>
              <div className="hero-actions"><a className="button" href="#quests">Explore quests <ArrowRight size={17} /></a><a className="button button--outline" href="#how-it-works"><span className="play-circle"><Play size={12} fill="currentColor" /></span> How it works</a></div>
              <div className="hero-note"><div className="avatar-stack"><span className="avatar avatar--one">AS</span><span className="avatar avatar--two">RK</span><span className="avatar avatar--three">MD</span><span className="avatar avatar--plus">+</span></div><div><strong>Growing together</strong><span>One sustainable step at a time</span></div></div>
            </div>
            <HeroDashboard />
          </div>
          <a className="scroll-cue" href="#impact"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
        </section>

        <section className="impact-strip" id="impact" aria-label="Illustrative platform impact">
          <div className="container impact-inner"><div className="impact-intro"><span className="impact-sun">✳</span><div><strong>Good things grow together.</strong><span>Illustrative demo data for platform impact</span></div></div>{impactStats.map((stat) => { const Icon = stat.icon === 'users' ? Users : stat.icon === 'target' ? Target : Sprout; return <div className="impact-stat" key={stat.label}><Icon size={17} /><strong>{stat.value}</strong><span>{stat.label}</span></div>; })}</div>
        </section>

        <section className="learn-section section-pad" id="about">
          <div className="container"><SectionHeading eyebrow="A LITTLE GOES A LONG WAY" title={<>Good for your farm.<br /><span>Great for the future.</span></>} text="KrishiQuest turns sustainable farming into a journey you can see, feel and celebrate—right from your own field." />
            <div className="learn-grid" id="learn">
              <article className="learn-card learn-card--learn"><div className="learn-card-top"><span className="step-index">01 / LEARN</span><span className="learn-icon"><BookOpen size={21} /></span></div><div className="learn-card-art art-book"><div className="book-shape"><span /><span /><span /></div><span className="art-spark art-spark--one">✳</span><span className="art-spark art-spark--two">✦</span></div><h3>Knowledge that takes root.</h3><p>Pick up useful ideas through short, engaging lessons made for life on the farm.</p><a href="#features">Explore learning <ArrowUpRight size={15} /></a></article>
              <article className="learn-card learn-card--practice"><div className="learn-card-top"><span className="step-index">02 / PRACTICE</span><span className="learn-icon"><Sprout size={21} /></span></div><div className="learn-card-art art-field"><span className="field-sun" /><span className="field-row field-row--one" /><span className="field-row field-row--two" /><span className="field-row field-row--three" /><Sprout className="field-sprout field-sprout--one" /><Sprout className="field-sprout field-sprout--two" /></div><h3>Better habits, in your field.</h3><p>Turn what you learn into practical actions that work for your farm and season.</p><a href="#quests">Find your next step <ArrowUpRight size={15} /></a></article>
              <article className="learn-card learn-card--earn"><div className="learn-card-top"><span className="step-index">03 / EARN</span><span className="learn-icon"><Trophy size={21} /></span></div><div className="learn-card-art art-reward"><div className="reward-ring"><Trophy size={38} /><Sparkles className="reward-spark" size={18} /></div><span className="reward-pill">+180 XP</span><span className="reward-leaf"><Leaf size={22} /></span></div><h3>Every effort deserves a nod.</h3><p>Celebrate your progress with XP, new levels and badges earned along the way.</p><a href="#rewards">See how rewards grow <ArrowUpRight size={15} /></a></article>
            </div>
          </div>
        </section>

        <section className="quests-section section-pad" id="quests">
          <div className="container"><div className="section-heading-row"><SectionHeading align="left" eyebrow="YOUR NEXT FIELD ADVENTURE" title={<>Big change starts<br /><span>with one quest.</span></>} text="Thoughtful, bite-sized challenges help you try sustainable practices at your own pace." /><a className="text-link desktop-link" href="#get-started">See all quests <ArrowRight size={16} /></a></div>
            <div className="quest-grid">{quests.map((quest) => <QuestCard key={quest.name} quest={quest} />)}</div>
            <div className="mobile-center"><a className="button button--outline" href="#get-started">Discover all quests <ArrowRight size={16} /></a></div>
          </div>
        </section>

        <section className="features-section section-pad" id="features">
          <div className="container features-layout"><div className="features-aside"><span className="eyebrow">MADE FOR THE WAY YOU FARM</span><h2>Everything you need<br />to <span>grow with purpose.</span></h2><p>More than a list of tips. A companion for every step of your sustainable farming journey.</p><a className="button button--light" href="#how-it-works">See how it works <ArrowRight size={16} /></a><div className="features-aside-art"><div className="orbit orbit--outer" /><div className="orbit orbit--inner" /><span className="orbit-leaf"><Leaf size={39} /></span><span className="orbit-star">✳</span></div></div>
            <div className="features-grid">{platformFeatures.map((feature, i) => { const Icon = featureIcons[feature.icon]; return <article className="feature-item" key={feature.title}><span className="feature-icon"><Icon size={20} /></span><span className="feature-number">0{i + 1}</span><h3>{feature.title}</h3><p>{feature.text}</p></article>; })}</div>
          </div>
        </section>

        <section className="steps-section section-pad" id="how-it-works">
          <div className="container"><SectionHeading eyebrow="YOUR JOURNEY, AT YOUR PACE" title={<>From first idea to <span>field-grown change.</span></>} text="Getting started is easy. Growing at your own pace is the whole point." />
            <div className="steps-grid">{steps.map((step, index) => <article className="step-card" key={step.number}><div className="step-top"><span>{step.number}</span>{index < steps.length - 1 && <div className="step-connector"><i /></div>}<span className="step-check"><Check size={14} /></span></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
          </div>
        </section>

        <section className="gamification-section section-pad" id="community">
          <div className="container game-layout"><div className="game-copy"><span className="eyebrow">YOUR PROGRESS, MADE VISIBLE</span><h2>Every good choice<br />is <span>worth celebrating.</span></h2><p>Watch your experience grow, unlock new milestones and see the difference you’re making—one quest at a time.</p><div className="game-benefits"><div><span className="benefit-check"><Check size={13} /></span>Earn XP for real-world actions</div><div><span className="benefit-check"><Check size={13} /></span>Unlock badges as you progress</div><div><span className="benefit-check"><Check size={13} /></span>Find inspiration in your community</div></div><a className="text-link" href="#get-started">Make your first move <ArrowRight size={16} /></a></div>
            <div className="game-showcase"><div className="game-deco game-deco--one">✳</div><div className="game-deco game-deco--two">✦</div><GamificationPreview /><div className="leaderboard-card"><div className="leaderboard-head"><div><span className="leaderboard-live"><i /> COMMUNITY SPOTLIGHT</span><h3>Growing together</h3></div><span className="leaderboard-icon"><Users size={18} /></span></div><div className="leaderboard-list">{leaderboard.map((person) => <div className="leaderboard-person" key={person.rank}><span className="person-rank">{person.rank}</span><span className={`avatar avatar--${person.color}`}>{person.initials}</span><span className="person-details"><strong>{person.name}</strong><small>{person.place}</small></span><span className="person-xp"><Sparkles size={13} /> {person.xp}</span></div>)}</div><div className="leaderboard-foot"><span>Illustrative leaderboard preview</span><a href="#get-started" aria-label="Explore the community"><ChevronRight size={17} /></a></div></div></div>
          </div>
        </section>

        <section className="sustain-section section-pad" id="sustainability">
          <div className="container sustain-layout"><div className="sustain-image"><div className="sustain-photo" role="img" aria-label="Sunlight falling across a lush, healthy farm field" /><div className="sustain-quote"><span>“</span><p>Healthy land.<br />A hopeful tomorrow.</p><small>THE HEART OF KRISHIQUEST</small></div><div className="sustain-caption"><span><Leaf size={15} /> GROW WITH THE LAND</span><span>01 — 04</span></div></div><div className="sustain-copy"><span className="eyebrow">ROOTED IN WHAT MATTERS</span><h2>A better harvest<br />begins <span>beneath the surface.</span></h2><p>When farming works with nature, everyone benefits. KrishiQuest helps make sustainable choices feel practical, rewarding and part of everyday farming.</p><div className="sustain-list"><div><span className="sustain-icon sustain-icon--soil"><Sprout size={18} /></span><div><strong>Healthier soil</strong><span>Nurture the living foundation of every harvest.</span></div><Check size={16} /></div><div><span className="sustain-icon sustain-icon--water"><Droplet size={18} /></span><div><strong>Smarter water use</strong><span>Protect precious water through mindful practices.</span></div><Check size={16} /></div><div><span className="sustain-icon sustain-icon--bio"><Bug size={18} /></span><div><strong>Richer biodiversity</strong><span>Make space for nature to thrive alongside crops.</span></div><Check size={16} /></div></div><a className="text-link" href="#quests">Explore sustainable quests <ArrowRight size={16} /></a></div></div>
        </section>

        <section className="final-cta" id="get-started"><div className="cta-orb cta-orb--one" /><div className="cta-orb cta-orb--two" /><div className="container cta-content"><span className="cta-sprout"><Sprout size={22} /></span><span className="eyebrow">A GREENER FUTURE STARTS IN YOUR FIELD</span><h2>Your farm. Your journey.<br /><em>A greener future.</em></h2><p>Take the first step towards farming that feels good today—and grows even better tomorrow.</p><a className="button button--cream" href="mailto:hello@krishiquest.example?subject=Join%20KrishiQuest">Get started <ArrowUpRight size={17} /></a><small>Learn. Practice. Earn. Grow Sustainably.</small></div></section>
      </main>
      <Footer />
    </>
  );
}
