import { useState } from 'react';
import { Send } from 'lucide-react';
export default function CommentSection({ comments=[], onAdd }) {
  const [text,setText]=useState('');
  function submit(event){event.preventDefault();if(!text.trim())return;onAdd(text);setText('');}
  return <div className="community-comments"><h3>Comments <span>{comments.length}</span></h3>{comments.map((comment)=><article className="community-comment" key={comment.id}><span className="community-avatar community-avatar--small">{comment.initials}</span><div><strong>{comment.author}</strong><p>{comment.text}</p><time dateTime={comment.createdAt}>{new Date(comment.createdAt).toLocaleString(undefined,{dateStyle:'medium',timeStyle:'short'})}</time></div></article>)}<form className="community-comment-form" onSubmit={submit}><label className="sr-only" htmlFor="community-comment-input">Add a comment</label><input id="community-comment-input" value={text} onChange={(e)=>setText(e.target.value)} maxLength="400" placeholder="Add a thoughtful comment…"/><button type="submit" aria-label="Post demo comment" disabled={!text.trim()}><Send size={15}/></button></form><small>Comments are illustrative and remain in this browser session.</small></div>;
}
