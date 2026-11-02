export default function NotificationFilters({ categories, category, status, onCategory, onStatus }) {
  return <div className="engagement-filters"><label>Category<select value={category} onChange={(e)=>onCategory(e.target.value)}><option>All categories</option>{categories.map((item)=><option key={item}>{item}</option>)}</select></label><label>Read status<select value={status} onChange={(e)=>onStatus(e.target.value)}>{['All notifications','Unread','Read'].map((item)=><option key={item}>{item}</option>)}</select></label></div>;
}
