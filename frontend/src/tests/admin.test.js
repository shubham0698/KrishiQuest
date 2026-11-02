import test from 'node:test';
import assert from 'node:assert/strict';
import { aggregateAdminDistrictScores, filterAdminFarmers, filterAdminOfficers, filterAdminReportRecords, summarizeAdminReports, validateOfficerForm } from '../utils/adminUtils.js';
import { demoFarmers } from '../data/officerMonitoringData.js';
import { initialDemoOfficers } from '../data/adminDemoData.js';
import { initialDemoActivities } from '../data/activityData.js';

test('admin farmer search, district, status and sorts operate on shared demo records', () => {
  assert.equal(filterAdminFarmers(demoFarmers, { search: 'KQ-F-1182' })[0].name, 'Meera Jadhav');
  assert.equal(filterAdminFarmers(demoFarmers, { district: 'Pune' }).length, 1);
  assert.equal(filterAdminFarmers(demoFarmers, { status: 'Inactive', getStatus: (farmer) => farmer.farmerId === 'KQ-F-2048' ? 'Inactive' : 'Active' })[0].name, 'Demo Farmer');
  assert.equal(filterAdminFarmers(demoFarmers, { sort: 'area-desc' })[0].name, 'Ramesh Deshmukh');
  assert.equal(filterAdminFarmers(demoFarmers, { sort: 'score-desc' })[0].name, 'Meera Jadhav');
});

test('admin officer filters and sorting work', () => {
  assert.equal(filterAdminOfficers(initialDemoOfficers, { search: 'KQ-O-1003' })[0].name, 'Sanjay Pawar');
  assert.equal(filterAdminOfficers(initialDemoOfficers, { district: 'Nashik' })[0].name, 'Neha Shinde');
  assert.equal(filterAdminOfficers(initialDemoOfficers, { sort: 'reviews-desc' })[0].name, 'Kavita More');
});

test('officer form validation accepts valid demo values and reports missing/invalid fields', () => {
  assert.deepEqual(validateOfficerForm({ name: 'Demo Person', district: 'Pune', email: 'person@example.invalid', mobile: '+91 98765 43210' }), {});
  assert.deepEqual(Object.keys(validateOfficerForm({ name: '', district: '', email: 'bad', mobile: 'x' })).sort(), ['district', 'email', 'mobile', 'name']);
});

test('admin report date and district filters and summary calculations are consistent', () => {
  const farmers = filterAdminReportRecords(demoFarmers, { district: 'Satara', from: '2026-05-01', to: '2026-06-01', dateKey: 'joinedAt' });
  const activities = filterAdminReportRecords(initialDemoActivities, { from: '2026-10-23', to: '2026-10-26', dateKey: 'submittedAt' });
  assert.deepEqual(farmers.map((farmer) => farmer.farmerId), ['KQ-F-2048']);
  const summary = summarizeAdminReports(farmers, activities);
  assert.equal(summary.farmerCount, 1);
  assert.equal(summary.activityCount, 2);
  assert.equal(summary.approved, 1);
  assert.equal(summary.pending, 1);
  assert.equal(summary.approvalRate, 50);
  assert.equal(summary.averageSustainability, 85);
  assert.deepEqual(aggregateAdminDistrictScores(demoFarmers).map((row) => row.district).sort(), ['Kolhapur', 'Nashik', 'Pune', 'Satara']);
});
