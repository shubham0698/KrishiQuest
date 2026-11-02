import test from 'node:test';
import assert from 'node:assert/strict';
import { activityCategories, initialDemoActivities, MAX_ACTIVITY_PHOTO_BYTES } from '../data/activityData.js';
import { countActivityStatuses, resubmitActivity, transitionActivityStatus, validateActivityPhotos, validateActivitySubmission } from '../utils/activityUtils.js';

const validValues = { questId: 'water-saver', title: 'Adjusted irrigation time', description: 'Watered a small bed in the morning and checked moisture before and after.', category: activityCategories[0], completionDate: '2026-10-30', locationEnabled: false, location: '' };
const validPhoto = { name: 'field.jpg', size: 1024, type: 'image/jpeg' };

test('activity form validation accepts valid details and one supported photo', () => {
  assert.deepEqual(validateActivitySubmission(validValues, [validPhoto], new Date('2026-11-02T12:00:00')), {});
});

test('activity form validation catches required fields, future dates and missing images', () => {
  const errors = validateActivitySubmission({ ...validValues, title: '', questId: '', completionDate: '2026-11-03', locationEnabled: true, location: '' }, [], new Date('2026-11-02T12:00:00'));
  assert.ok(errors.questId);
  assert.ok(errors.title);
  assert.ok(errors.completionDate);
  assert.ok(errors.photos);
  assert.ok(errors.location);
  assert.ok(validateActivitySubmission({ ...validValues, completionDate: '2026-02-30' }, [validPhoto], new Date('2026-11-02T12:00:00')).completionDate);
});

test('photo validation allows supported formats and enforces type, size and count limits', () => {
  assert.deepEqual(validateActivityPhotos([validPhoto, { name: 'crop.webp', size: 50, type: 'image/webp' }]), []);
  assert.ok(validateActivityPhotos([{ name: 'large.png', size: MAX_ACTIVITY_PHOTO_BYTES + 1, type: 'image/png' }])[0].includes('5 MB'));
  assert.ok(validateActivityPhotos([{ name: 'notes.pdf', size: 20, type: 'application/pdf' }])[0].includes('JPG'));
  assert.ok(validateActivityPhotos(Array.from({ length: 2 }, (_, index) => ({ ...validPhoto, name: `${index}.jpg` })), 4)[0].includes('up to 5'));
});

test('officer decisions require feedback for reject and resubmission, and update demo state', () => {
  const pending = initialDemoActivities[0];
  assert.equal(transitionActivityStatus(pending, 'Rejected', '  ').ok, false);
  assert.equal(transitionActivityStatus(pending, 'Resubmission Required', '  ').ok, false);
  const approved = transitionActivityStatus(pending, 'Approved', '', '2026-11-02T10:00:00.000Z');
  assert.equal(approved.ok, true);
  assert.equal(approved.activity.status, 'Approved');
  assert.equal(approved.activity.reviewedAt, '2026-11-02T10:00:00.000Z');
  const rejected = transitionActivityStatus(pending, 'Rejected', 'Please add a clear photo.');
  assert.equal(rejected.activity.officerRemarks, 'Please add a clear photo.');
  assert.equal(transitionActivityStatus(rejected.activity, 'Approved', '').ok, false);
});

test('farmer can return rejected or returned demo activities to pending review', () => {
  const rejected = initialDemoActivities.find((item) => item.status === 'Rejected');
  const result = resubmitActivity(rejected);
  assert.equal(result.ok, true);
  assert.equal(result.activity.status, 'Pending Review');
  assert.match(result.activity.reference, /-R$/);
  assert.equal(resubmitActivity(initialDemoActivities[0]).ok, false);
});

test('sample activity status counts reflect each illustrative status', () => {
  const counts = countActivityStatuses(initialDemoActivities);
  assert.deepEqual(counts, { 'Pending Review': 1, Approved: 1, 'Resubmission Required': 1, Rejected: 1 });
});
