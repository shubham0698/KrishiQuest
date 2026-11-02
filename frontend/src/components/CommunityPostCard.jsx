import { useState } from 'react';
import { Heart, MapPin, MessageCircle, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { CURRENT_DEMO_FARMER_ID } from '../data/communityData.js';
import CommentSection from './CommentSection.jsx';
export default function CommunityPostCard({ post, onLike, onComment, onEdit, onDelete, profileVisible=true, shareLocation=false, displayName }) {
  const [showComments,setShowComments]=useState(false);const [confirmDelete,setConfirmDelete]=useState(false);const own=post.authorId===CURRENT_DEMO_FARMER_ID;
  const date=new Date(post.createdAt);
  const authorLabel=own?(profileVisible?(displayName||post.author):'Community member'):post.author;
  const locationLabel=own&&!shareLocation?'Location hidden':`${post.village} · ${post.district}`;
  return <article className="community-post-card"><header className="community-post-header"><span className="community-avatar">{own&&!profileVisible?'CM':post.initials}</span><div className="community-post-author"><strong>{authorLabel}{own&&profileVisible&&<em>Your demo profile</em>}</strong><span><MapPin size={12}/>{locationLabel}</span></div><time dateTime={post.createdAt}>{date.toLocaleDateString(undefined,{month:'short',day:'numeric'})}</time>{own&&<div className="community-own-actions"><button type="button" aria-label="Edit your demo post" onClick={onEdit}><Pencil size={15}/></button><button type="button" aria-label="Delete your demo post" onClick={()=>setConfirmDelete(true)}><MoreHorizontal size={16}/></button></div>}</header>
    {post.category&&<span className="community-category-chip">{post.category}</span>}<h2>{post.title}</h2><p className="community-post-content">{post.content}</p>{post.image&&<img className="community-post-image" src={post.image} alt={`Illustrative image shared by ${post.author}`}/>}
    <footer className="community-post-footer"><button type="button" className={post.liked?'is-liked':''} onClick={onLike} aria-pressed={post.liked}><Heart size={16} fill={post.liked?'currentColor':'none'}/><span>{post.likes} <span className="community-action-word">likes</span></span></button><button type="button" onClick={()=>setShowComments((visible)=>!visible)} aria-expanded={showComments}><MessageCircle size={16}/><span>{post.comments.length} <span className="community-action-word">comments</span></span></button></footer>
    {confirmDelete&&<div className="community-confirm" role="alertdialog" aria-label="Confirm demo post deletion"><p>Delete this demo post from the current session?</p><button type="button" onClick={()=>setConfirmDelete(false)}>Cancel</button><button type="button" onClick={onDelete}>Delete locally</button></div>}
    {showComments&&<CommentSection comments={post.comments} onAdd={onComment}/>}
  </article>;
}
