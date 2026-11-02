import { CURRENT_DEMO_FARMER_ID } from '../data/communityData.js';

export function createCommunityPost(posts, values, { id = `post-local-${Date.now()}`, createdAt = new Date().toISOString(), author = 'Demo Farmer', initials = 'DF', authorId = CURRENT_DEMO_FARMER_ID, village = 'Demo village', district = 'Satara' } = {}) {
  const title = values.title.trim();
  const content = values.content.trim();
  if (!title || !content) return posts;
  return [{ id, authorId, author, initials, village, district, title, content, category: values.category || '', image: values.image || '', createdAt, likes: 0, liked: false, comments: [] }, ...posts];
}

export function editOwnCommunityPost(posts, id, ownerId, values) {
  const post = posts.find((item) => item.id === id);
  if (!post || post.authorId !== ownerId || !values.title?.trim() || !values.content?.trim()) return posts;
  return posts.map((item) => item.id === id ? { ...item, title: values.title.trim(), content: values.content.trim(), category: values.category || '', image: values.image ?? item.image } : item);
}

export function deleteOwnCommunityPost(posts, id, ownerId) {
  const post = posts.find((item) => item.id === id);
  return post?.authorId === ownerId ? posts.filter((item) => item.id !== id) : posts;
}

export function toggleCommunityPostLike(posts, id) {
  return posts.map((post) => post.id === id ? { ...post, liked: !post.liked, likes: Math.max(0, post.likes + (post.liked ? -1 : 1)) } : post);
}

export function addCommunityComment(posts, postId, comment, { id = `comment-local-${Date.now()}`, createdAt = new Date().toISOString(), author = 'Demo Farmer', initials = 'DF' } = {}) {
  const text = comment.trim();
  if (!text) return posts;
  return posts.map((post) => post.id === postId ? { ...post, comments: [...post.comments, { id, author, initials, text, createdAt }] } : post);
}

export function filterCommunityPosts(posts, { search = '', category = 'All categories', sort = 'latest' } = {}) {
  const term = search.trim().toLowerCase();
  return posts.filter((post) => `${post.title} ${post.content} ${post.author} ${post.village} ${post.district} ${post.category}`.toLowerCase().includes(term) && (category === 'All categories' || post.category === category))
    .sort((a, b) => sort === 'popular' ? b.likes - a.likes || b.comments.length - a.comments.length : b.createdAt.localeCompare(a.createdAt));
}

export function markNotificationRead(notifications, id) {
  return notifications.map((notification) => notification.id === id ? { ...notification, read: true } : notification);
}

export function markAllNotificationsRead(notifications) {
  return notifications.map((notification) => ({ ...notification, read: true }));
}

export function deleteDemoNotification(notifications, id) {
  return notifications.filter((notification) => notification.id !== id);
}

export function filterNotifications(notifications, { category = 'All categories', status = 'All notifications' } = {}) {
  return notifications.filter((notification) => (category === 'All categories' || notification.category === category) && (status === 'All notifications' || (status === 'Unread' ? !notification.read : notification.read)));
}

export function countUnreadNotifications(notifications) {
  return notifications.reduce((total, notification) => total + (notification.read ? 0 : 1), 0);
}

export function updateSettingsPreference(settings, key, value) {
  if (key === 'notifications') return { ...settings, notifications: { ...settings.notifications, ...value } };
  return { ...settings, [key]: value };
}
