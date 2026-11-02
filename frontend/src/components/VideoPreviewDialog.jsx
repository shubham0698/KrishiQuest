import { CirclePlay, Play, X } from 'lucide-react';

export default function VideoPreviewDialog({ lesson, onClose }) {
  if (!lesson) return null;
  return <div className="video-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="video-dialog" role="dialog" aria-modal="true" aria-labelledby="video-dialog-title"><div className="video-dialog-header"><div><span className="learning-eyebrow">VIDEO LESSON · DEMO PREVIEW</span><h2 id="video-dialog-title">{lesson.title}</h2></div><button type="button" aria-label="Close video preview" onClick={onClose}><X size={18} /></button></div><div className="video-placeholder"><span className="video-placeholder-play"><Play size={23} fill="currentColor" /></span><CirclePlay size={43} /><strong>Demo video placeholder</strong><span>No video asset is attached to this lesson yet.</span></div><p>This preview shows where lesson video content will appear. No video is loaded or streamed.</p></section></div>;
}
