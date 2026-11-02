export function filterAdminFarmers(farmers, { search = '', district = 'All districts', status = 'All statuses', sort = 'name-asc', getStatus = (farmer) => farmer.status } = {}) {
  const term = search.trim().toLowerCase();
  return farmers.filter((farmer) => (!term || `${farmer.name} ${farmer.farmerId}`.toLowerCase().includes(term)) && (district === 'All districts' || farmer.district === district) && (status === 'All statuses' || getStatus(farmer) === status))
    .sort((a, b) => sort === 'area-desc' ? b.farmArea - a.farmArea : sort === 'area-asc' ? a.farmArea - b.farmArea : sort === 'score-desc' ? b.sustainabilityScore - a.sustainabilityScore : sort === 'score-asc' ? a.sustainabilityScore - b.sustainabilityScore : a.name.localeCompare(b.name));
}

export function filterAdminOfficers(officers, { search = '', district = 'All districts', status = 'All statuses', sort = 'name-asc' } = {}) {
  const term = search.trim().toLowerCase();
  return officers.filter((officer) => (!term || `${officer.name} ${officer.id}`.toLowerCase().includes(term)) && (district === 'All districts' || officer.district === district) && (status === 'All statuses' || officer.status === status))
    .sort((a, b) => sort === 'reviews-desc' ? b.reviewed - a.reviewed : sort === 'reviews-asc' ? a.reviewed - b.reviewed : sort === 'district-asc' ? a.district.localeCompare(b.district) : a.name.localeCompare(b.name));
}

export function validateOfficerForm(values) {
  const errors = {};
  if (!values.name?.trim()) errors.name = 'Enter the officer name.';
  if (!values.district) errors.district = 'Choose an assigned district.';
  if (!/^\S+@\S+\.\S+$/.test(values.email || '')) errors.email = 'Enter a valid email address.';
  if (!/^\+?[0-9Xx ]{8,16}$/.test(values.mobile || '')) errors.mobile = 'Enter a valid masked demo contact number.';
  return errors;
}

export function filterAdminReportRecords(records, { from = '', to = '', district = 'All districts', dateKey = 'submittedAt' } = {}) {
  return records.filter((record) => {
    const date = String(record[dateKey] || '').slice(0, 10);
    return (district === 'All districts' || record.district === district) && (!from || date >= from) && (!to || date <= to);
  });
}

export function summarizeAdminReports(farmers, activities) {
  const approved = activities.filter((activity) => activity.status === 'Approved').length;
  const rejected = activities.filter((activity) => activity.status === 'Rejected').length;
  const pending = activities.filter((activity) => ['Pending Review', 'Resubmission Required'].includes(activity.status)).length;
  const totalScore = farmers.reduce((total, farmer) => total + farmer.sustainabilityScore, 0);
  return {
    farmerCount: farmers.length,
    activityCount: activities.length,
    approved,
    rejected,
    pending,
    approvalRate: activities.length ? Math.round((approved / activities.length) * 100) : 0,
    averageSustainability: farmers.length ? Math.round(totalScore / farmers.length) : 0,
  };
}

export function aggregateAdminDistrictScores(farmers) {
  const groups = new Map();
  farmers.forEach((farmer) => {
    const group = groups.get(farmer.district) || { district: farmer.district, farmers: 0, totalScore: 0 };
    group.farmers += 1;
    group.totalScore += farmer.sustainabilityScore;
    groups.set(farmer.district, group);
  });
  return [...groups.values()].map(({ district, farmers: count, totalScore }) => ({ district, farmers: count, score: Math.round(totalScore / count) }));
}
