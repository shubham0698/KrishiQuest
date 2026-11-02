import { ACCEPTED_ACTIVITY_IMAGE_TYPES, MAX_ACTIVITY_PHOTOS, MAX_ACTIVITY_PHOTO_BYTES } from '../data/activityData.js';

export function validateActivityPhotos(files, existingCount = 0) {
  const errors = [];
  const selected = Array.from(files || []);
  if (selected.length + existingCount > MAX_ACTIVITY_PHOTOS) errors.push(`You can add up to ${MAX_ACTIVITY_PHOTOS} photos.`);
  selected.forEach((file) => {
    const extension = file.name?.split('.').pop()?.toLowerCase();
    const acceptedExtension = ['jpg', 'jpeg', 'png', 'webp'].includes(extension);
    if (!ACCEPTED_ACTIVITY_IMAGE_TYPES.includes(file.type) && !acceptedExtension) errors.push(`${file.name}: choose a JPG, JPEG, PNG or WEBP image.`);
    if (file.size > MAX_ACTIVITY_PHOTO_BYTES) errors.push(`${file.name}: image must be 5 MB or smaller.`);
  });
  return errors;
}

export function validateActivitySubmission(values, files, now = new Date()) {
  const errors = {};
  if (!values.questId) errors.questId = 'Select the farming quest for this activity.';
  if (!values.title?.trim()) errors.title = 'Enter an activity title.';
  if (!values.description?.trim()) errors.description = 'Describe the farming practice you completed.';
  if (!values.category) errors.category = 'Select a practice category.';
  const date = values.completionDate ? new Date(`${values.completionDate}T00:00:00`) : null;
  const validDate = date && !Number.isNaN(date.getTime()) && `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` === values.completionDate;
  if (!values.completionDate || !validDate) errors.completionDate = 'Enter a valid activity completion date.';
  else if (date > new Date(now.getFullYear(), now.getMonth(), now.getDate())) errors.completionDate = 'Completion date cannot be in the future.';
  if (!files?.length) errors.photos = 'Add at least one activity photo.';
  const photoErrors = validateActivityPhotos(files);
  if (photoErrors.length) errors.photos = photoErrors.join(' ');
  if (values.locationEnabled && !values.location?.trim()) errors.location = 'Enter a location or turn off the location option.';
  return errors;
}

export function transitionActivityStatus(activity, nextStatus, remarks = '', reviewedAt = new Date().toISOString()) {
  if (!activity) return { ok: false, error: 'Activity could not be found.' };
  if (!['Pending Review', 'Resubmission Required'].includes(activity.status)) return { ok: false, error: 'This activity is not awaiting review.' };
  if (!['Approved', 'Rejected', 'Resubmission Required'].includes(nextStatus)) return { ok: false, error: 'Choose a valid review action.' };
  if (nextStatus !== 'Approved' && !remarks.trim()) return { ok: false, error: 'Add officer feedback before this review action.' };
  return { ok: true, activity: { ...activity, status: nextStatus, officerRemarks: remarks.trim(), reviewedAt } };
}

export function resubmitActivity(activity, updatedFields = {}) {
  if (!activity || !['Rejected', 'Resubmission Required'].includes(activity.status)) return { ok: false, error: 'This activity cannot be resubmitted.' };
  return { ok: true, activity: { ...activity, ...updatedFields, status: 'Pending Review', submittedAt: new Date().toISOString(), reviewedAt: undefined, reference: `${activity.reference}-R` } };
}

export function countActivityStatuses(activities) {
  return activities.reduce((counts, activity) => ({ ...counts, [activity.status]: (counts[activity.status] || 0) + 1 }), {});
}
