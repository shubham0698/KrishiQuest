import { useMemo, useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import NotificationCard from './NotificationCard.jsx';
import NotificationFilters from './NotificationFilters.jsx';
import { filterNotifications } from '../utils/engagementUtils.js';

export default function NotificationCenter({ notifications, categories, onRead, onReadAll, onDelete, workspace='farmer' }) {
  const [category,setCategory]=useState('All categories');const [status,setStatus]=useState('All notifications');
  const unread=notifications.filter((item)=>!item.read).length;
  const visible=useMemo(()=>filterNotifications(notifications,{category,status}),[notifications,category,status]);
  return <div className="engagement-page">
    <section className="engagement-page-heading"><div><span className="engagement-eyebrow"><Bell size={14}/> {workspace==='officer'?'OFFICER WORKSPACE':'FARMER WORKSPACE'} · DEMO</span><h1>Notifications</h1><p>Updates from this local KrishiQuest preview. No push messages are sent.</p></div><div className="engagement-count"><strong>{unread}</strong><span>unread</span></div></section>
    <div className="engagement-demo-note">Notifications are illustrative and shared in React memory across this session. Read and delete actions are local only.</div>
    <div className="notification-toolbar"><NotificationFilters categories={categories} category={category} status={status} onCategory={setCategory} onStatus={setStatus}/><button className="engagement-secondary-button" type="button" onClick={onReadAll} disabled={!unread}><CheckCheck size={15}/> Mark all as read</button></div>
    {visible.length?<div className="notification-list">{visible.map((notification)=><NotificationCard key={notification.id} notification={notification} onRead={()=>onRead(notification.id)} onDelete={()=>onDelete(notification.id)}/>)}</div>:<div className="engagement-empty"><span><Bell size={22}/></span><h2>{notifications.length?'No notifications match those filters':'You’re all caught up'}</h2><p>{notifications.length?'Try a different category or read-status filter.':'New illustrative updates will appear here in the demo inbox.'}</p><button type="button" onClick={()=>{setCategory('All categories');setStatus('All notifications')}}>Clear filters</button></div>}
  </div>;
}
