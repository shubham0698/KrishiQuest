const byDistrict = (farmer) => farmer.district;

export function filterDemoFarmers(farmers, { search = '', district = 'All districts', status = 'All statuses', sort = 'name-asc' } = {}) {
  const term = search.trim().toLowerCase();
  const result = farmers.filter((farmer) => {
    const fields = `${farmer.name} ${farmer.farmerId} ${farmer.mobile} ${farmer.village} ${farmer.district} ${farmer.primaryCrop}`.toLowerCase();
    return fields.includes(term) && (district === 'All districts' || farmer.district === district) && (status === 'All statuses' || farmer.status === status);
  });
  const sorters = {
    'name-asc': (a, b) => a.name.localeCompare(b.name),
    'area-desc': (a, b) => b.farmArea - a.farmArea,
    'area-asc': (a, b) => a.farmArea - b.farmArea,
    'score-desc': (a, b) => b.sustainabilityScore - a.sustainabilityScore,
    'score-asc': (a, b) => a.sustainabilityScore - b.sustainabilityScore,
  };
  return result.sort(sorters[sort] || sorters['name-asc']);
}

export function buildOfficerAnalytics(farmers, activities, weeklySeries = [], monthlySeries = []) {
  const districts = [...new Set(farmers.map(byDistrict))].sort();
  const districtDistribution = districts.map((district) => ({ district, farmers: farmers.filter((farmer) => farmer.district === district).length }));
  const questNames = [...new Set(farmers.flatMap((farmer) => Object.keys(farmer.questCompletions || {})))].sort();
  const questTrends = questNames.map((quest) => ({ quest, completions: farmers.reduce((sum, farmer) => sum + (farmer.questCompletions?.[quest] || 0), 0) }));
  const activityDistribution = ['Pending Review', 'Approved', 'Rejected', 'Resubmission Required'].map((status) => ({ status, count: activities.filter((activity) => activity.status === status).length }));
  const scoreRanges = [{ label: '0–59', min: 0, max: 59 }, { label: '60–74', min: 60, max: 74 }, { label: '75–89', min: 75, max: 89 }, { label: '90–100', min: 90, max: 100 }];
  const sustainabilityDistribution = scoreRanges.map(({ label, min, max }) => ({ range: label, farmers: farmers.filter((farmer) => farmer.sustainabilityScore >= min && farmer.sustainabilityScore <= max).length }));
  return { weeklySubmissions: weeklySeries, districtDistribution, questTrends, activityDistribution, sustainabilityDistribution, monthlyEngagement: monthlySeries };
}

function betweenDate(date, startDate, endDate) {
  if (!date) return !startDate && !endDate;
  const normalized = date.slice(0, 10);
  return (!startDate || normalized >= startDate) && (!endDate || normalized <= endDate);
}

export function buildOfficerReport(farmers, activities, { district = 'All districts', startDate = '', endDate = '' } = {}) {
  // District filters the monitored roster; the date range applies to activity records and participation.
  const filteredFarmers = farmers.filter((farmer) => district === 'All districts' || farmer.district === district);
  const farmerIds = new Set(filteredFarmers.map((farmer) => farmer.farmerId));
  const filteredActivities = activities.filter((activity) => {
    const matchesDistrict = district === 'All districts' || activity.district === district;
    const matchesDate = betweenDate(activity.submittedAt, startDate, endDate);
    return matchesDistrict && matchesDate && (!activity.farmerId || farmerIds.has(activity.farmerId));
  });
  const reviewed = filteredActivities.filter((activity) => activity.reviewedAt || ['Approved', 'Rejected', 'Resubmission Required'].includes(activity.status));
  const approved = filteredActivities.filter((activity) => activity.status === 'Approved').length;
  const pending = filteredActivities.filter((activity) => ['Pending Review', 'Resubmission Required'].includes(activity.status)).length;
  const districtSummary = [...new Set(filteredFarmers.map(byDistrict))].sort().map((name) => {
    const group = filteredFarmers.filter((farmer) => farmer.district === name);
    const scores = group.map((farmer) => farmer.sustainabilityScore);
    return { district: name, farmers: group.length, activities: filteredActivities.filter((activity) => activity.district === name).length, averageScore: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0 };
  });
  const hasDateFilter = Boolean(startDate || endDate);
  const questParticipation = hasDateFilter
    ? [...new Set(filteredActivities.map((activity) => activity.questName).filter(Boolean))].sort().map((quest) => {
      const questActivities = filteredActivities.filter((activity) => activity.questName === quest);
      return { quest, participants: new Set(questActivities.map((activity) => activity.farmerId)).size, completions: questActivities.length };
    })
    : [...new Set(filteredFarmers.flatMap((farmer) => Object.keys(farmer.questCompletions || {})))].sort().map((quest) => ({ quest, participants: filteredFarmers.filter((farmer) => (farmer.questCompletions?.[quest] || 0) > 0).length, completions: filteredFarmers.reduce((sum, farmer) => sum + (farmer.questCompletions?.[quest] || 0), 0) }));
  const averageScore = filteredFarmers.length ? Math.round(filteredFarmers.reduce((sum, farmer) => sum + farmer.sustainabilityScore, 0) / filteredFarmers.length) : 0;
  return { farmers: filteredFarmers, activities: filteredActivities, totalFarmers: filteredFarmers.length, reviewedCount: reviewed.length, approvalRate: reviewed.length ? Math.round((approved / reviewed.length) * 100) : 0, pendingActivities: pending, districtSummary, questParticipation, averageScore };
}

function csvCell(value) {
  const text = String(value ?? '');
  return `"${text.replaceAll('"', '""')}"`;
}

export function serializeOfficerReportCsv(report) {
  const header = ['Record Type', 'Farmer ID', 'Farmer', 'District', 'Village', 'Farm Area (acres)', 'Primary Crop', 'Sustainability Score', 'Farmer Status', 'Activity', 'Quest', 'Activity Status', 'Submitted At'];
  const rows = report.farmers.map((farmer) => ['Farmer', farmer.farmerId, farmer.name, farmer.district, farmer.village, farmer.farmArea, farmer.primaryCrop, farmer.sustainabilityScore, farmer.status, '', '', '', '']);
  const activityRows = report.activities.map((activity) => {
    const farmer = report.farmers.find((item) => item.farmerId === activity.farmerId);
    return ['Activity', activity.farmerId, farmer?.name || activity.farmerName, activity.district || farmer?.district, farmer?.village || '', farmer?.farmArea || '', farmer?.primaryCrop || '', farmer?.sustainabilityScore || '', farmer?.status || '', activity.title, activity.questName, activity.status, activity.submittedAt];
  });
  return [header, ...rows, ...activityRows].map((row) => row.map(csvCell).join(',')).join('\r\n');
}
