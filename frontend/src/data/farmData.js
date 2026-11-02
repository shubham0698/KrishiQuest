export const initialFarm = {
  name: 'Green Valley Farm',
  totalArea: '8.5',
  unit: 'acres',
  soilType: 'Red loam',
  irrigationMethod: 'Drip irrigation',
  waterSource: 'Borewell and rainwater harvesting',
  farmingType: 'Mixed',
  village: 'Hunsur',
  district: 'Mysuru',
  state: 'Karnataka',
};

export const initialCrops = [
  { id: 'crop-rice', name: 'Rice', category: 'Cereal', season: 'Kharif', sowingDate: '2026-06-12', harvestDate: '2026-11-20', area: '2.5', status: 'Growing' },
  { id: 'crop-wheat', name: 'Wheat', category: 'Cereal', season: 'Rabi', sowingDate: '2026-10-25', harvestDate: '2027-03-18', area: '1.5', status: 'Planned' },
  { id: 'crop-soybean', name: 'Soybean', category: 'Oilseed', season: 'Kharif', sowingDate: '2026-06-20', harvestDate: '2026-10-30', area: '2', status: 'Harvesting' },
  { id: 'crop-sugarcane', name: 'Sugarcane', category: 'Cash crop', season: 'Zaid', sowingDate: '2026-03-10', harvestDate: '2027-02-20', area: '2.2', status: 'Growing' },
];

export const cropCategories = ['Cereal', 'Pulse', 'Oilseed', 'Cash crop', 'Vegetable', 'Fruit', 'Other'];
export const cropSeasons = ['Kharif', 'Rabi', 'Zaid'];
export const cropStatuses = ['Planned', 'Growing', 'Flowering', 'Harvesting', 'Harvested'];
