import { Link } from 'react-router-dom';
import { ArrowLeft, ClipboardPlus, Sparkles } from 'lucide-react';
import FarmerWorkspace from '../components/FarmerWorkspace.jsx';
import ActivitySubmissionForm from '../components/ActivitySubmissionForm.jsx';
import { useActivityDemo } from '../context/ActivityDemoContext.jsx';

export default function FarmerActivitySubmitPage() {
  const { submitActivity } = useActivityDemo();
  return <FarmerWorkspace activePath="/farmer/activities/submit" title="Submit an activity" subtitle="Share a sustainable practice from your farm">
    <div className="activity-page"><div className="activity-back-link"><Link to="/farmer/activities"><ArrowLeft size={14} /> My activities</Link></div><section className="activity-page-hero"><div><span className="activity-form-eyebrow"><Sparkles size={13} /> YOUR FIELD JOURNAL</span><h1>Small practices can<br /><em>make a lasting difference.</em></h1><p>Record a farming activity and add photos for an illustrative review experience.</p></div><span className="activity-page-hero-icon"><ClipboardPlus size={33} /></span></section><ActivitySubmissionForm onSubmit={submitActivity} /></div>
  </FarmerWorkspace>;
}
