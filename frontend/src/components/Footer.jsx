import { ArrowRight, Leaf, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-block">
          <a className="brand brand--footer" href="#home"><span className="brand-mark"><Leaf size={20} /></span><span>krishi<span>quest</span></span></a>
          <p>A little progress in every field can grow into a greener future for us all.</p>
          <span className="footer-tagline">Learn. Practice. Earn. Grow Sustainably.</span>
        </div>
        <div className="footer-column"><h3>Explore</h3><a href="#about">About us</a><a href="#features">Platform features</a><a href="#quests">Farming quests</a><a href="#how-it-works">How it works</a></div>
        <div className="footer-column"><h3>Your journey</h3><a href="#learn">Learning</a><a href="#rewards">Rewards & badges</a><a href="#community">Community</a><a href="#impact">Sustainability</a></div>
        <div className="footer-column footer-contact"><h3>Say hello</h3><a href="mailto:hello@krishiquest.example"><Mail size={16} /> hello@krishiquest.example</a><span><MapPin size={16} /> Made for India's farming community</span><a className="footer-cta" href="#get-started">Start your journey <ArrowRight size={16} /></a></div>
      </div>
      <div className="footer-bottom"><div className="container footer-bottom-inner"><span>© 2025 KrishiQuest · A Smart India Hackathon project</span><span className="sih-pill">SIH 2025 <i /> SIH25075</span><span>Growing a better tomorrow, together.</span></div></div>
    </footer>
  );
}
