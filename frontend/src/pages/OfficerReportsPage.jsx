import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Activity, BadgeCheck, Download, Map, Sprout, Users } from 'lucide-react';
import OfficerWorkspace from '../components/OfficerWorkspace.jsx';
import { useActivityDemo } from '../context/ActivityDemoContext.jsx';
import { demoFarmers } from '../data/officerMonitoringData.js';
import { buildOfficerAnalytics, buildOfficerReport, serializeOfficerReportCsv } from '../utils/officerMonitoringUtils.js';

const districts = ['All districts', ...new Set(demoFarmers.map((farmer) => farmer.district))];

function ReportMetric({ icon: Icon, label, value, note }) { return <article className="officer-report-metric"><span><Icon size={16} /></span><small>{label}</small><strong>{value}</strong><em>{note}</em></article>; }

export default function OfficerReportsPage() {
  const { activities } = useActivityDemo();
  const [district, setDistrict] = useState('All districts');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const report = useMemo(() => buildOfficerReport(demoFarmers, activities, { district, startDate, endDate }), [activities, district, startDate, endDate]);
  const analytics = useMemo(() => buildOfficerAnalytics(report.farmers, report.activities), [report]);
  const dateError = startDate && endDate && startDate > endDate;
  function exportCsv() {
    const file = new Blob([serializeOfficerReportCsv(report)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'krishiquest-officer-demo-report.csv'; anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <OfficerWorkspace activePath="/officer/reports" title="Officer reports" subtitle="Explore filtered illustrative monitoring summaries"><div className="officer-page officer-report-page">
    <section className="officer-list-heading"><div><span className="officer-eyebrow"><Activity size={14} /> MONITORING REPORTS · DEMO</span><h1>Farmer & activity reports</h1><p>Explore district, participation and sustainability summaries using illustrative records.</p></div><button type="button" className="officer-export-button" onClick={exportCsv}><Download size={15} /> Export demo CSV</button></section>
    <div className="officer-home-note"><Activity size={14} /> All report values are generated from fictional farmer profiles and the shared activity demo records. CSV export contains illustrative data only.</div>
    <section className="officer-report-filters" aria-label="Filter reports"><div><span className="officer-eyebrow">REPORT FILTERS</span><p>Choose a submission date range and district.</p></div><label className="officer-report-filter"><span>From date</span><input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} /></label><label className="officer-report-filter"><span>To date</span><input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} /></label><label className="officer-report-filter"><span>District</span><select value={district} onChange={(event) => setDistrict(event.target.value)}>{districts.map((item) => <option key={item}>{item}</option>)}</select></label><button type="button" className="officer-reset-filters" onClick={() => { setStartDate(''); setEndDate(''); setDistrict('All districts'); }}>Reset</button></section>
    {dateError && <p className="officer-report-error" role="alert">Start date must be on or before the end date.</p>}
    <section className="officer-report-metrics"><ReportMetric icon={Users} label="Farmers monitored" value={report.totalFarmers} note="Fictional demo profiles" /><ReportMetric icon={BadgeCheck} label="Activities reviewed" value={report.reviewedCount} note="In selected range" /><ReportMetric icon={Activity} label="Approval rate" value={`${report.approvalRate}%`} note="Illustrative review outcomes" /><ReportMetric icon={Sprout} label="Pending activities" value={report.pendingActivities} note="Pending or resubmission" /></section>
    <div className="officer-report-grid"><section className="officer-report-card"><div className="officer-report-card-heading"><div><span className="officer-eyebrow">BY LOCATION · DEMO</span><h2>District summary</h2></div><Map size={16} /></div>{report.districtSummary.length ? <div className="officer-report-table-wrap"><table className="officer-report-table"><thead><tr><th>District</th><th>Farmers</th><th>Activities</th><th>Avg. score</th></tr></thead><tbody>{report.districtSummary.map((row) => <tr key={row.district}><td>{row.district}</td><td>{row.farmers}</td><td>{row.activities}</td><td>{row.averageScore}/100</td></tr>)}</tbody></table></div> : <p className="officer-report-empty">No district records match these filters.</p>}</section>
      <section className="officer-report-card"><div className="officer-report-card-heading"><div><span className="officer-eyebrow">QUEST PARTICIPATION · DEMO</span><h2>Quest participation</h2></div><Sprout size={16} /></div>{report.questParticipation.length ? <div className="officer-report-chart" role="img" aria-label="Illustrative quest completion counts by quest"><ResponsiveContainer width="100%" height="100%"><BarChart data={report.questParticipation} margin={{ top: 8, right: 8, left: -23, bottom: 0 }}><CartesianGrid vertical={false} stroke="#edf0e9" strokeDasharray="3 3" /><XAxis dataKey="quest" tickLine={false} axisLine={false} interval={0} angle={-13} textAnchor="end" height={43} tick={{ fill: '#8d998e', fontSize: 8 }} /><YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: '#9aa49a', fontSize: 9 }} /><Tooltip contentStyle={{ border: '1px solid #e6ece3', borderRadius: 7, fontSize: 11 }} /><Bar dataKey="completions" name="Illustrative completions" fill="#80a96b" radius={[4, 4, 0, 0]}>{report.questParticipation.map((item, index) => <Cell key={item.quest} fill={['#5e945c', '#79a663', '#93b677', '#b3cd91'][index % 4]} />)}</Bar></BarChart></ResponsiveContainer></div> : <p className="officer-report-empty">No quest participation in this selection.</p>}</section>
      <section className="officer-report-card officer-report-card--wide"><div className="officer-report-card-heading"><div><span className="officer-eyebrow">SUSTAINABILITY OVERVIEW · DEMO</span><h2>Farmer score distribution</h2></div><span className="officer-report-average">Average {report.averageScore}/100</span></div><div className="officer-sustainability-grid">{analytics.sustainabilityDistribution.map((item, index) => <article className="officer-sustainability-range" key={item.range}><div><span>{item.range}</span><strong>{item.farmers}</strong></div><div className="officer-sustainability-track"><span style={{ width: `${report.totalFarmers ? (item.farmers / report.totalFarmers) * 100 : 0}%`, background: ['#c3c9a4', '#b1c88d', '#84ab6a', '#57935d'][index] }} /></div><small>demo farmers</small></article>)}</div><p className="officer-report-footnote">Sustainability scores are illustrative interface values, not measured assessments.</p></section>
    </div>
  </div></OfficerWorkspace>;
}
