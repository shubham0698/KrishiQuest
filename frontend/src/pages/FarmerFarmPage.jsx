import { useMemo, useState } from 'react';
import {
  ArrowRight, CalendarDays, Check, ChevronRight, CircleHelp, CloudRain, Droplet,
  Edit3, MapPin, Plus, Ruler, Sprout, Trash2, Wheat, X,
} from 'lucide-react';
import FarmerWorkspace from '../components/FarmerWorkspace.jsx';
import { cropCategories, cropSeasons, cropStatuses, initialCrops, initialFarm } from '../data/farmData.js';
import { indianStates } from '../data/farmerProfileData.js';
import '../styles/farmerProfile.css';
import '../styles/farmerFarm.css';

const emptyCrop = { name: '', category: '', season: '', sowingDate: '', harvestDate: '', area: '', status: 'Planned' };

function FarmField({ id, label, value, onChange, disabled, type = 'text', options, step, min, unit, error }) {
  return <div className="ff-field"><label htmlFor={id}>{label}</label><div className={unit ? 'ff-input-unit' : ''}>{options ? <select id={id} value={value} onChange={onChange} disabled={disabled} aria-invalid={Boolean(error)}><option value="">Select {label.toLowerCase()}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select> : <input id={id} type={type} value={value} onChange={onChange} disabled={disabled} step={step} min={min} aria-invalid={Boolean(error)} />}{unit && <span>{unit}</span>}</div>{error && <span className="fp-error" role="alert">{error}</span>}</div>;
}

function CropModal({ crop, errors, unit, onChange, onClose, onSave, title }) {
  return (
    <div className="ff-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="ff-modal" role="dialog" aria-modal="true" aria-labelledby="crop-modal-title">
        <div className="ff-modal-head"><div><span className="fp-eyebrow">CROP DETAILS · DEMO</span><h2 id="crop-modal-title">{title}</h2></div><button type="button" className="ff-modal-close" aria-label="Close crop form" onClick={onClose}><X size={18} /></button></div>
        <form className="ff-crop-form" noValidate onSubmit={onSave}>
          <div className="ff-crop-form-grid">
            <div className="ff-field"><label htmlFor="crop-name">Crop name *</label><input id="crop-name" value={crop.name} onChange={(event) => onChange('name', event.target.value)} placeholder="e.g. Rice" aria-invalid={Boolean(errors.name)} />{errors.name && <span className="fp-error" role="alert">{errors.name}</span>}</div>
            <div className="ff-field"><label htmlFor="crop-category">Crop category *</label><select id="crop-category" value={crop.category} onChange={(event) => onChange('category', event.target.value)} aria-invalid={Boolean(errors.category)}><option value="">Choose category</option>{cropCategories.map((value) => <option key={value}>{value}</option>)}</select>{errors.category && <span className="fp-error" role="alert">{errors.category}</span>}</div>
            <div className="ff-field"><label htmlFor="crop-season">Season *</label><select id="crop-season" value={crop.season} onChange={(event) => onChange('season', event.target.value)} aria-invalid={Boolean(errors.season)}><option value="">Choose season</option>{cropSeasons.map((value) => <option key={value}>{value}</option>)}</select>{errors.season && <span className="fp-error" role="alert">{errors.season}</span>}</div>
            <div className="ff-field"><label htmlFor="crop-status">Crop status</label><select id="crop-status" value={crop.status} onChange={(event) => onChange('status', event.target.value)}>{cropStatuses.map((value) => <option key={value}>{value}</option>)}</select></div>
            <div className="ff-field"><label htmlFor="crop-sowing">Sowing date *</label><input id="crop-sowing" type="date" value={crop.sowingDate} onChange={(event) => onChange('sowingDate', event.target.value)} aria-invalid={Boolean(errors.sowingDate)} />{errors.sowingDate && <span className="fp-error" role="alert">{errors.sowingDate}</span>}</div>
            <div className="ff-field"><label htmlFor="crop-harvest">Expected harvest *</label><input id="crop-harvest" type="date" value={crop.harvestDate} onChange={(event) => onChange('harvestDate', event.target.value)} aria-invalid={Boolean(errors.harvestDate)} />{errors.harvestDate && <span className="fp-error" role="alert">{errors.harvestDate}</span>}</div>
            <div className="ff-field ff-field--area"><label htmlFor="crop-area">Cultivated area *</label><div className="ff-input-unit"><input id="crop-area" type="number" min="0.1" step="0.1" value={crop.area} onChange={(event) => onChange('area', event.target.value)} placeholder="e.g. 1.5" aria-invalid={Boolean(errors.area)} /><span>{unit}</span></div>{errors.area && <span className="fp-error" role="alert">{errors.area}</span>}</div>
          </div>
          <p className="ff-form-footnote">Crop updates stay in this local demo preview. They are not sent to a server.</p>
          <div className="ff-modal-actions"><button type="button" className="fp-button fp-button--cancel" onClick={onClose}>Cancel</button><button type="submit" className="fp-button fp-button--primary">Save crop <ArrowRight size={15} /></button></div>
        </form>
      </section>
    </div>
  );
}

function DeleteCropDialog({ crop, onCancel, onDelete }) {
  return <div className="ff-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}><section className="ff-delete-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-crop-title"><span className="ff-delete-icon"><Trash2 size={20} /></span><h2 id="delete-crop-title">Remove {crop.name}?</h2><p>This removes the crop from this page’s demo preview only.</p><div className="ff-modal-actions"><button type="button" className="fp-button fp-button--cancel" onClick={onCancel}>Keep crop</button><button type="button" className="ff-delete-button" onClick={onDelete}><Trash2 size={14} /> Remove crop</button></div></section></div>;
}

export default function FarmerFarmPage() {
  const [farm, setFarm] = useState(initialFarm);
  const [draftFarm, setDraftFarm] = useState(initialFarm);
  const [editingFarm, setEditingFarm] = useState(false);
  const [farmErrors, setFarmErrors] = useState({});
  const [crops, setCrops] = useState(initialCrops);
  const [cropDraft, setCropDraft] = useState(emptyCrop);
  const [editingCropId, setEditingCropId] = useState(null);
  const [cropErrors, setCropErrors] = useState({});
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropToDelete, setCropToDelete] = useState(null);
  const [message, setMessage] = useState('');

  const activeCrops = useMemo(() => crops.filter((crop) => crop.status !== 'Planned' && crop.status !== 'Harvested').length, [crops]);
  const totalCultivated = useMemo(() => crops.reduce((sum, crop) => sum + (Number(crop.area) || 0), 0), [crops]);

  function editFarm() { setDraftFarm({ ...farm }); setEditingFarm(true); setFarmErrors({}); setMessage(''); }
  function cancelFarm() { setDraftFarm({ ...farm }); setEditingFarm(false); setFarmErrors({}); }
  function updateFarm(key, value) { setDraftFarm((current) => ({ ...current, [key]: value })); setFarmErrors((current) => ({ ...current, [key]: '' })); setMessage(''); }

  function saveFarm(event) {
    event.preventDefault();
    const errors = {};
    const unitFactor = farm.unit === draftFarm.unit ? 1 : farm.unit === 'acres' ? 0.404686 : 2.47105;
    const assignedArea = crops.reduce((sum, crop) => sum + (Number(crop.area) || 0) * unitFactor, 0);
    if (!draftFarm.name.trim()) errors.name = 'Enter a farm name.';
    if (!draftFarm.totalArea || Number(draftFarm.totalArea) <= 0) errors.totalArea = 'Enter a land area greater than zero.';
    else if (Number(draftFarm.totalArea) < assignedArea) errors.totalArea = `Farm area must cover the ${assignedArea.toFixed(1)} ${draftFarm.unit} currently assigned to crops.`;
    for (const key of ['soilType', 'irrigationMethod', 'waterSource', 'farmingType', 'village', 'district', 'state']) if (!draftFarm[key]?.trim()) errors[key] = 'This field is required.';
    setFarmErrors(errors);
    if (Object.keys(errors).length) return;
    if (unitFactor !== 1) setCrops((current) => current.map((crop) => ({ ...crop, area: (Number(crop.area) * unitFactor).toFixed(2) })));
    setFarm({ ...draftFarm, name: draftFarm.name.trim(), totalArea: String(Number(draftFarm.totalArea)) });
    setEditingFarm(false);
    setMessage('Farm details updated in this demo preview only. Nothing was saved to a server.');
  }

  function openAddCrop() { setCropDraft({ ...emptyCrop, status: 'Planned' }); setEditingCropId(null); setCropErrors({}); setCropModalOpen(true); setMessage(''); }
  function openEditCrop(crop) { setCropDraft({ ...crop }); setEditingCropId(crop.id); setCropErrors({}); setCropModalOpen(true); setMessage(''); }
  function closeCropModal() { setCropModalOpen(false); setCropErrors({}); setEditingCropId(null); }
  function updateCrop(key, value) { setCropDraft((current) => ({ ...current, [key]: value })); setCropErrors((current) => ({ ...current, [key]: '' })); }

  function saveCrop(event) {
    event.preventDefault();
    const errors = {};
    if (!cropDraft.name.trim()) errors.name = 'Enter a crop name.';
    if (!cropDraft.category) errors.category = 'Choose a crop category.';
    if (!cropDraft.season) errors.season = 'Choose a growing season.';
    if (!cropDraft.sowingDate) errors.sowingDate = 'Choose the sowing date.';
    if (!cropDraft.harvestDate) errors.harvestDate = 'Choose an expected harvest date.';
    else if (cropDraft.sowingDate && cropDraft.harvestDate <= cropDraft.sowingDate) errors.harvestDate = 'Harvest date must follow the sowing date.';
    if (!cropDraft.area || Number(cropDraft.area) <= 0) errors.area = 'Enter cultivated area greater than zero.';
    else {
      const assigned = crops.reduce((sum, crop) => sum + (crop.id === editingCropId ? 0 : Number(crop.area) || 0), 0);
      if (assigned + Number(cropDraft.area) > Number(farm.totalArea)) errors.area = `Available area is ${(Number(farm.totalArea) - assigned).toFixed(1)} ${farm.unit}.`;
    }
    setCropErrors(errors);
    if (Object.keys(errors).length) return;
    if (editingCropId) {
      setCrops((current) => current.map((crop) => crop.id === editingCropId ? { ...cropDraft, id: editingCropId, name: cropDraft.name.trim(), area: String(Number(cropDraft.area)) } : crop));
      setMessage('Crop updated in this demo preview. This change is local and is not saved to a server.');
    } else {
      setCrops((current) => [...current, { ...cropDraft, id: `crop-${Date.now()}`, name: cropDraft.name.trim(), area: String(Number(cropDraft.area)) }]);
      setMessage('Crop added to this demo preview. This change is local and is not saved to a server.');
    }
    closeCropModal();
  }

  function deleteCrop() {
    setCrops((current) => current.filter((crop) => crop.id !== cropToDelete.id));
    setMessage(`${cropToDelete.name} was removed from this demo preview only.`);
    setCropToDelete(null);
  }

  const overviewItems = [
    { label: 'Total farm area', value: `${farm.totalArea} ${farm.unit}`, detail: 'Registered land area', icon: Ruler, tint: 'green' },
    { label: 'Active crops', value: String(activeCrops), detail: `${crops.length} crops in your plan`, icon: Wheat, tint: 'gold' },
    { label: 'Farming type', value: farm.farmingType, detail: 'Current farm approach', icon: Sprout, tint: 'purple' },
    { label: 'Irrigation', value: farm.irrigationMethod, detail: farm.waterSource, icon: Droplet, tint: 'blue' },
  ];

  return (
    <FarmerWorkspace activePath="/farmer/farm" title="My farm" subtitle="Farm and crop details · demo preview">
      <section className="fp-page-heading ff-page-heading"><div><span className="fp-eyebrow">YOUR LAND, YOUR JOURNEY</span><h1>My farm</h1><p>Keep your farm details and crop plan in one place.</p></div><span className="ff-location-pill"><MapPin size={13} /> {farm.village}, {farm.district}</span></section>
      {message && <div className="fp-success" role="status"><Check size={16} /><span>{message}</span></div>}

      <section className="ff-overview-grid" aria-label="Farm overview">{overviewItems.map(({ label, value, detail, icon: Icon, tint }) => <article className="ff-overview-card" key={label}><span className={`ff-overview-icon ff-overview-icon--${tint}`}><Icon size={18} /></span><span className="ff-overview-label">{label}</span><strong>{value}</strong><small>{detail}</small></article>)}<article className="ff-overview-card ff-soil-card"><span className="ff-overview-icon ff-overview-icon--earth"><Sprout size={18} /></span><span className="ff-overview-label">Soil information</span><strong>{farm.soilType}</strong><small>Soil type · {farm.state}</small></article></section>

      <form className="ff-details-card" onSubmit={saveFarm} noValidate>
        <div className="ff-card-heading"><div><span className="fp-eyebrow">FARM INFORMATION</span><h2>{farm.name}</h2><p>Land, water and location details for your farm.</p></div>{!editingFarm && <button className="fp-button fp-button--outline" type="button" onClick={editFarm}><Edit3 size={14} /> Edit farm</button>}</div>
        <div className="ff-farm-form-grid">
          <div className="ff-field"><label htmlFor="farm-name">Farm name</label><input id="farm-name" value={editingFarm ? draftFarm.name : farm.name} onChange={(event) => updateFarm('name', event.target.value)} disabled={!editingFarm} aria-invalid={Boolean(farmErrors.name)} />{farmErrors.name && <span className="fp-error" role="alert">{farmErrors.name}</span>}</div>
          <div className="ff-field"><label htmlFor="farm-area">Total land area</label><div className="ff-input-unit"><input id="farm-area" type="number" min="0.1" step="0.1" value={editingFarm ? draftFarm.totalArea : farm.totalArea} onChange={(event) => updateFarm('totalArea', event.target.value)} disabled={!editingFarm} aria-invalid={Boolean(farmErrors.totalArea)} /><select aria-label="Land area unit" value={editingFarm ? draftFarm.unit : farm.unit} onChange={(event) => updateFarm('unit', event.target.value)} disabled={!editingFarm}><option value="acres">Acres</option><option value="hectares">Hectares</option></select></div>{farmErrors.totalArea && <span className="fp-error" role="alert">{farmErrors.totalArea}</span>}</div>
          <FarmField id="farm-soil" label="Soil type" value={editingFarm ? draftFarm.soilType : farm.soilType} onChange={(event) => updateFarm('soilType', event.target.value)} disabled={!editingFarm} options={['Red loam', 'Black soil', 'Alluvial soil', 'Laterite soil', 'Sandy soil', 'Clay soil', 'Other']} error={farmErrors.soilType} />
          <FarmField id="farm-irrigation" label="Irrigation method" value={editingFarm ? draftFarm.irrigationMethod : farm.irrigationMethod} onChange={(event) => updateFarm('irrigationMethod', event.target.value)} disabled={!editingFarm} options={['Drip irrigation', 'Sprinkler irrigation', 'Flood irrigation', 'Rain-fed', 'Canal irrigation', 'Other']} error={farmErrors.irrigationMethod} />
          <FarmField id="farm-water" label="Water source" value={editingFarm ? draftFarm.waterSource : farm.waterSource} onChange={(event) => updateFarm('waterSource', event.target.value)} disabled={!editingFarm} options={['Borewell and rainwater harvesting', 'Borewell', 'Open well', 'Canal', 'Rainwater harvesting', 'River or lake', 'Other']} error={farmErrors.waterSource} />
          <FarmField id="farm-type" label="Farming type" value={editingFarm ? draftFarm.farmingType : farm.farmingType} onChange={(event) => updateFarm('farmingType', event.target.value)} disabled={!editingFarm} options={['Organic', 'Conventional', 'Mixed']} error={farmErrors.farmingType} />
          <FarmField id="farm-state" label="State" value={editingFarm ? draftFarm.state : farm.state} onChange={(event) => updateFarm('state', event.target.value)} disabled={!editingFarm} options={indianStates} error={farmErrors.state} />
          <FarmField id="farm-district" label="District" value={editingFarm ? draftFarm.district : farm.district} onChange={(event) => updateFarm('district', event.target.value)} disabled={!editingFarm} error={farmErrors.district} />
          <FarmField id="farm-village" label="Village / town" value={editingFarm ? draftFarm.village : farm.village} onChange={(event) => updateFarm('village', event.target.value)} disabled={!editingFarm} error={farmErrors.village} />
        </div>
        {editingFarm && <div className="fp-form-actions ff-farm-actions"><button type="button" className="fp-button fp-button--cancel" onClick={cancelFarm}>Cancel</button><button type="submit" className="fp-button fp-button--primary">Save farm details <ArrowRight size={15} /></button></div>}
      </form>

      <section className="ff-crops-section"><div className="ff-card-heading"><div><span className="fp-eyebrow">WHAT’S GROWING</span><h2>Crop management</h2><p>Keep track of your crop seasons and field plans.</p></div><button className="fp-button fp-button--primary ff-add-crop" type="button" onClick={openAddCrop}><Plus size={16} /> Add crop</button></div>
        <div className="ff-crop-grid">{crops.map((crop) => <article className="ff-crop-card" key={crop.id}><div className="ff-crop-card-top"><span className="ff-crop-art"><Wheat size={20} /></span><span className={`ff-crop-status ff-crop-status--${crop.status.toLowerCase()}`}>{crop.status}</span></div><div className="ff-crop-title"><div><h3>{crop.name}</h3><span>{crop.category} · {crop.season}</span></div><span className="ff-season-icon"><Sprout size={15} /></span></div><div className="ff-crop-details"><div><CalendarDays size={13} /><span>Sown</span><strong>{new Date(`${crop.sowingDate}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong></div><div><CloudRain size={13} /><span>Expected harvest</span><strong>{new Date(`${crop.harvestDate}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong></div><div><Ruler size={13} /><span>Cultivated area</span><strong>{crop.area} {farm.unit}</strong></div></div><div className="ff-crop-actions"><button type="button" onClick={() => openEditCrop(crop)}><Edit3 size={13} /> Edit crop</button><button type="button" className="ff-remove-crop" aria-label={`Remove ${crop.name}`} onClick={() => setCropToDelete(crop)}><Trash2 size={13} /><span>Remove</span></button></div></article>)}{crops.length === 0 && <div className="ff-empty-crops"><Sprout size={22} /><strong>No crops added yet</strong><span>Add a crop to start building your farm plan.</span></div>}</div>
        <div className="ff-crops-foot"><span><CircleHelp size={13} /> Crop information is illustrative and stored only in this page preview.</span><span>{totalCultivated.toFixed(1)} / {farm.totalArea} {farm.unit} allocated</span></div>
      </section>
      <div className="fp-privacy-note"><MapPin size={16} /><p><strong>Farm data, kept local.</strong> Farm and crop edits update this page preview only. They are not sent to a server or database.</p></div>

      {cropModalOpen && <CropModal crop={cropDraft} errors={cropErrors} unit={farm.unit} onChange={updateCrop} onClose={closeCropModal} onSave={saveCrop} title={editingCropId ? 'Edit crop' : 'Add a crop'} />}
      {cropToDelete && <DeleteCropDialog crop={cropToDelete} onCancel={() => setCropToDelete(null)} onDelete={deleteCrop} />}
    </FarmerWorkspace>
  );
}
