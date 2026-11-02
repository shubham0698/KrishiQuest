import { Image, Trash2 } from 'lucide-react';

function formatFileSize(bytes = 0) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function PhotoPreviewGallery({ photos = [], onRemove, compact = false, emptyLabel = 'No photo attached to this illustrative sample.' }) {
  if (!photos.length) return <div className={`activity-photo-empty${compact ? ' activity-photo-empty--compact' : ''}`}><Image size={20} /><span>{emptyLabel}</span></div>;
  return <div className={`activity-photo-grid${compact ? ' activity-photo-grid--compact' : ''}`} aria-label="Activity photo previews">{photos.map((photo, index) => <figure className="activity-photo-card" key={photo.id || photo.url || photo.name || index}><div className="activity-photo-image">{photo.url ? <img src={photo.url} alt={`Activity evidence ${index + 1}: ${photo.name || 'photo'}`} /> : <div className="activity-photo-placeholder"><Image size={22} /><span>Illustrative photo</span></div>}{onRemove && <button type="button" aria-label={`Remove ${photo.name}`} onClick={() => onRemove(photo.id)}><Trash2 size={14} /></button>}</div><figcaption><strong title={photo.name}>{photo.name || `Demo photo ${index + 1}`}</strong><span>{photo.size ? formatFileSize(photo.size) : 'Illustrative sample'}</span></figcaption></figure>)}</div>;
}
