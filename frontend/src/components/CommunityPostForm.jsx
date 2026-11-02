import { useEffect, useState } from 'react';
import { ImagePlus, Send } from 'lucide-react';
import { communityCategories } from '../data/communityData.js';

const empty={title:'',content:'',category:'Sustainable Farming',image:''};
export default function CommunityPostForm({ initialPost, onSubmit, onCancel }) {
  const [values,setValues]=useState(initialPost?{title:initialPost.title,content:initialPost.content,category:initialPost.category||'Sustainable Farming',image:initialPost.image||''}:empty);
  const [imageError,setImageError]=useState('');
  useEffect(()=>setValues(initialPost?{title:initialPost.title,content:initialPost.content,category:initialPost.category||'Sustainable Farming',image:initialPost.image||''}:empty),[initialPost]);
  function selectImage(file){setImageError('');if(!file)return;if(!file.type.startsWith('image/')){setImageError('Choose an image file.');return;}if(file.size>3*1024*1024){setImageError('Choose an image smaller than 3 MB.');return;}const reader=new FileReader();reader.onload=()=>setValues((current)=>({...current,image:String(reader.result)}));reader.readAsDataURL(file);}
  function submit(event){event.preventDefault();if(!values.title.trim()||!values.content.trim())return;onSubmit(values);if(!initialPost)setValues(empty);}
  return <form className="community-compose" onSubmit={submit}>
    <div className="community-compose-head"><span className="community-avatar community-avatar--self">DF</span><div><strong>{initialPost?'Edit your demo post':'Share with the community'}</strong><small>Your post is visible in this local demo feed only.</small></div></div>
    <label>Post title<input required maxLength="100" value={values.title} onChange={(e)=>setValues({...values,title:e.target.value})} placeholder="What sustainable practice are you trying?"/></label>
    <label>Post content<textarea required minLength="8" maxLength="1200" rows="4" value={values.content} onChange={(e)=>setValues({...values,content:e.target.value})} placeholder="Share what you observed, learned or would like to discuss…"/></label>
    <div className="community-compose-options"><label>Farming category<select value={values.category} onChange={(e)=>setValues({...values,category:e.target.value})}>{communityCategories.map((item)=><option key={item}>{item}</option>)}</select></label><label className="community-image-picker"><ImagePlus size={16}/><span>Add optional image</span><input type="file" accept="image/*" onChange={(e)=>selectImage(e.target.files?.[0])}/></label></div>
    {imageError&&<p className="community-form-error" role="alert">{imageError}</p>}{values.image&&<div className="community-image-preview"><img src={values.image} alt="Local preview of selected farm image"/><button type="button" onClick={()=>setValues({...values,image:''})}>Remove image</button></div>}
    <div className="community-compose-actions">{initialPost&&<button type="button" className="community-button community-button--soft" onClick={onCancel}>Cancel</button>}<button type="submit" className="community-button community-button--primary"><Send size={14}/>{initialPost?'Save local edit':'Publish demo post'}</button></div>
  </form>;
}
