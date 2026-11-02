import test from 'node:test';
import assert from 'node:assert/strict';
import { initialCommunityPosts } from '../data/communityData.js';
import { initialFarmerNotifications } from '../data/notificationData.js';
import { addCommunityComment, countUnreadNotifications, createCommunityPost, deleteDemoNotification, deleteOwnCommunityPost, editOwnCommunityPost, filterCommunityPosts, filterNotifications, markAllNotificationsRead, markNotificationRead, toggleCommunityPostLike, updateSettingsPreference } from '../utils/engagementUtils.js';

test('community posts can be created and deleted only by their demo owner', () => {
  const created=createCommunityPost(initialCommunityPosts,{title:'  Soil observation  ',content:'  I checked a small field patch.  ',category:'Soil Health'},{id:'created-1',authorId:'KQ-F-2048',createdAt:'2026-11-02T08:00:00.000Z'});
  assert.equal(created[0].title,'Soil observation');assert.equal(created[0].comments.length,0);assert.equal(created[0].likes,0);
  assert.equal(deleteOwnCommunityPost(created,'created-1','KQ-F-0000').length,created.length);
  assert.equal(deleteOwnCommunityPost(created,'created-1','KQ-F-2048').some((post)=>post.id==='created-1'),false);
  assert.equal(createCommunityPost(created,{title:' ',content:'No title'}),created);
});

test('community like and unlike toggles the count without dropping below zero', () => {
  const liked=toggleCommunityPostLike(initialCommunityPosts,'post-demo-1');assert.equal(liked[0].likes,13);assert.equal(liked[0].liked,true);
  const unliked=toggleCommunityPostLike(liked,'post-demo-1');assert.equal(unliked[0].likes,12);assert.equal(unliked[0].liked,false);
});

test('community comments append trimmed content and ignore blank comments', () => {
  const commented=addCommunityComment(initialCommunityPosts,'post-demo-2','  Useful compost tip.  ',{id:'comment-local-test'});
  assert.equal(commented.find((post)=>post.id==='post-demo-2').comments.at(-1).text,'Useful compost tip.');
  assert.equal(addCommunityComment(commented,'post-demo-2',' ').find((post)=>post.id==='post-demo-2').comments.length,1);
});

test('community search, category filter and popular ordering work', () => {
  assert.equal(filterCommunityPosts(initialCommunityPosts,{search:'irrigation'})[0].id,'post-demo-1');
  assert.ok(filterCommunityPosts(initialCommunityPosts,{category:'Mulching'}).every((post)=>post.category==='Mulching'));
  assert.equal(filterCommunityPosts(initialCommunityPosts,{sort:'popular'})[0].id,'post-demo-6');
});

test('notifications can be read individually, all at once, filtered and deleted', () => {
  const one=markNotificationRead(initialFarmerNotifications,'farmer-notif-1');assert.equal(one[0].read,true);assert.equal(countUnreadNotifications(one),2);
  const all=markAllNotificationsRead(one);assert.equal(countUnreadNotifications(all),0);
  assert.equal(filterNotifications(initialFarmerNotifications,{category:'Community'}).length,1);
  assert.equal(filterNotifications(initialFarmerNotifications,{status:'Unread'}).length,3);
  assert.equal(deleteDemoNotification(all,'farmer-notif-1').length,all.length-1);
});

test('settings preference changes update nested notification state immutably', () => {
  const start={language:'English',notifications:{community:true,quests:true}};
  const changed=updateSettingsPreference(start,'notifications',{community:false});
  assert.equal(changed.notifications.community,false);assert.equal(changed.notifications.quests,true);assert.equal(start.notifications.community,true);
  assert.equal(updateSettingsPreference(changed,'language','Marathi').language,'Marathi');
});
