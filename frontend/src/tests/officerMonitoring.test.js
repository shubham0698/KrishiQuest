import test from 'node:test';
import assert from 'node:assert/strict';
import { demoFarmers } from '../data/officerMonitoringData.js';
import { initialDemoActivities } from '../data/activityData.js';
import { buildOfficerAnalytics, buildOfficerReport, filterDemoFarmers, serializeOfficerReportCsv } from '../utils/officerMonitoringUtils.js';

test('farmer directory filters by search, district and status', () => {
  assert.deepEqual(filterDemoFarmers(demoFarmers, { search: 'KQ-F-2048' }).map((farmer) => farmer.name), ['Demo Farmer']);
  assert.deepEqual(filterDemoFarmers(demoFarmers, { search: 'tomato', district: 'Satara' }).map((farmer) => farmer.farmerId), ['KQ-F-2048']);
  assert.deepEqual(filterDemoFarmers(demoFarmers, { status: 'Needs Follow-up' }).map((farmer) => farmer.name), ['Ramesh Deshmukh']);
  assert.equal(filterDemoFarmers(demoFarmers, { district: 'Pune', status: 'Active' }).length, 0);
});

test('farmer directory sorts by name, farm area and sustainability score', () => {
  assert.deepEqual(filterDemoFarmers(demoFarmers, { sort: 'name-asc' }).map((farmer) => farmer.name), ['Ananya Patil', 'Demo Farmer', 'Meera Jadhav', 'Ramesh Deshmukh']);
  assert.equal(filterDemoFarmers(demoFarmers, { sort: 'area-desc' })[0].farmerId, 'KQ-F-1305');
  assert.equal(filterDemoFarmers(demoFarmers, { sort: 'score-asc' })[0].sustainabilityScore, 72);
});

test('analytics aggregate districts, quests, statuses and sustainability bands', () => {
  const analytics = buildOfficerAnalytics(demoFarmers, initialDemoActivities, [{ label: 'Mon', submissions: 8 }], [{ label: 'Jun', activeFarmers: 12 }]);
  assert.equal(analytics.districtDistribution.length, 4);
  assert.equal(analytics.districtDistribution.reduce((sum, row) => sum + row.farmers, 0), demoFarmers.length);
  assert.equal(analytics.activityDistribution.find((row) => row.status === 'Pending Review').count, 1);
  assert.equal(analytics.activityDistribution.find((row) => row.status === 'Approved').count, 1);
  assert.deepEqual(analytics.sustainabilityDistribution.map((row) => row.farmers), [0, 1, 2, 1]);
  assert.ok(analytics.questTrends.every((row) => row.completions > 0));
  assert.deepEqual(analytics.weeklySubmissions, [{ label: 'Mon', submissions: 8 }]);
  assert.deepEqual(analytics.monthlyEngagement, [{ label: 'Jun', activeFarmers: 12 }]);
});

test('report district filters farmers while date filters constrain activity summaries', () => {
  const report = buildOfficerReport(demoFarmers, initialDemoActivities, { district: 'Kolhapur', startDate: '2026-10-01', endDate: '2026-10-31' });
  assert.deepEqual(report.farmers.map((farmer) => farmer.name), ['Meera Jadhav']);
  assert.equal(report.activities.length, 1);
  assert.equal(report.reviewedCount, 1);
  assert.equal(report.approvalRate, 100);
  assert.equal(report.pendingActivities, 0);
  assert.equal(report.averageScore, 92);
  assert.deepEqual(report.questParticipation, [{ quest: 'Soil Guardian', participants: 1, completions: 1 }]);
  assert.equal(buildOfficerReport(demoFarmers, initialDemoActivities, { startDate: '2026-11-01', endDate: '2026-11-30' }).totalFarmers, demoFarmers.length);
  assert.equal(buildOfficerReport(demoFarmers, initialDemoActivities, { startDate: '2026-11-01', endDate: '2026-11-30' }).activities.length, 0);
});

test('CSV export serializes filtered report data with escaped text', () => {
  const report = buildOfficerReport(demoFarmers, initialDemoActivities, { district: 'Satara' });
  const csv = serializeOfficerReportCsv(report);
  assert.ok(csv.startsWith('"Record Type","Farmer ID"'));
  assert.ok(csv.includes('"Demo Farmer"'));
  assert.ok(csv.includes('"Adjusted morning irrigation"'));
});
