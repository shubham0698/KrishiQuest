import { CircleCheck, Clock3, RotateCcw, XCircle } from 'lucide-react';

const statusIcons = { 'Pending Review': Clock3, Approved: CircleCheck, Rejected: XCircle, 'Resubmission Required': RotateCcw };

export default function ActivityStatusBadge({ status }) {
  const Icon = statusIcons[status] || Clock3;
  const className = status === 'Pending Review' ? 'pending' : status === 'Approved' ? 'approved' : status === 'Rejected' ? 'rejected' : 'resubmission';
  return <span className={`activity-status activity-status--${className}`}><Icon size={13} />{status}</span>;
}
