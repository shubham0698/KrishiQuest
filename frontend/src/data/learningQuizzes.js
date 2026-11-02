// Educational practice questions for the demo learning experience.
const question = (prompt, options, answer, explanation) => ({ prompt, options, answer, explanation });

export const learningQuizzes = {
  'sustainable-agriculture': [
    question('What is a central aim of sustainable agriculture?', ['Maximize one season’s output at any cost', 'Meet current needs while caring for future farm resources', 'Replace all local crops with one variety', 'Use the same input schedule on every farm'], 1, 'Sustainable agriculture considers current production alongside the soil, water and biodiversity future farming depends on.'),
    question('Which group of resources is especially important to care for on a farm?', ['Soil, water and biodiversity', 'Only machinery and buildings', 'Only the harvested crop', 'Only irrigation pipes'], 0, 'Soil, water and biodiversity are connected parts of the farm system.'),
    question('Why can a small, observed practice change be a useful start?', ['It guarantees the same result everywhere', 'It lets a farmer learn how a change works in local conditions', 'It removes the need for field observation', 'It always increases yield immediately'], 1, 'Trying and observing a small change helps farmers learn whether it fits their local conditions.'),
    question('What is a whole-farm perspective?', ['Considering how farm elements affect one another', 'Looking only at fertilizer use', 'Planning one crop without considering water', 'Ignoring nearby habitats'], 0, 'Crops, water, soil and habitats interact, so changes in one area can affect others.'),
    question('What can help refine a sustainable practice for a local farm?', ['Local knowledge and agricultural guidance', 'A random online schedule', 'Using a neighbor’s inputs without checking', 'Avoiding all records'], 0, 'Local knowledge and extension guidance help match practices to crops, soil and climate.'),
  ],
  'water-conservation': [
    question('When is a useful time to check soil moisture?', ['Only after harvest', 'Before deciding whether to irrigate', 'Only during heavy rain', 'Never; follow a fixed calendar'], 1, 'Checking root-zone moisture and crop condition helps make irrigation decisions.'),
    question('Why can watering during cooler parts of the day help?', ['It reduces evaporation', 'It increases wind', 'It prevents all plant disease', 'It eliminates the need for irrigation'], 0, 'Cooler periods can reduce water lost to evaporation.'),
    question('What is one way to reduce avoidable irrigation loss?', ['Ignore leaks', 'Repair leaks and direct water toward crop roots', 'Water bare paths first', 'Keep channels blocked'], 1, 'Maintained equipment and targeted delivery help water reach crops.'),
    question('How can suitable mulch support water conservation?', ['By shading and covering the soil surface', 'By increasing runoff', 'By removing all organic matter', 'By replacing crop roots'], 0, 'A soil cover can slow evaporation from the surface.'),
    question('Should one irrigation schedule be used for every crop and field?', ['Yes, all soils are identical', 'No, needs vary with crop, soil, weather and growth stage', 'Yes, seasons do not matter', 'No, irrigation should never be scheduled'], 1, 'Water needs differ across crops, soil types, weather and growth stages.'),
  ],
  'soil-health': [
    question('Which is a component of soil?', ['Mineral particles, organic matter, air, water and organisms', 'Only sand', 'Only plant roots', 'Only fertilizer'], 0, 'Soil is a mix of mineral particles, organic matter, air, water and living organisms.'),
    question('What can a spade inspection help reveal?', ['Possible compaction or erosion concerns', 'Exact market prices', 'The crop’s genetic variety', 'The next rainfall date'], 0, 'A simple field inspection can help notice soil structure or compaction issues.'),
    question('What does a soil test help guide?', ['Nutrient decisions', 'The color of irrigation pipes', 'The price of seeds', 'The number of farm workers'], 0, 'Soil testing provides information that can help guide nutrient decisions.'),
    question('Which practice can help protect the soil surface?', ['Leaving soil bare at all times', 'Keeping soil covered with suitable material', 'Removing all organic residues', 'Driving repeatedly over wet soil'], 1, 'Suitable cover can protect soil from direct sun and rain.'),
    question('Why does soil structure matter?', ['It influences root growth, drainage and moisture holding', 'It determines the market price', 'It replaces the need for seeds', 'It sets the day length'], 0, 'Structure affects how roots grow and how water moves and stays in soil.'),
  ],
  'organic-compost': [
    question('Which combination is commonly useful in a compost pile?', ['Dry leaves and fresh plant matter', 'Plastic and glass', 'Metal and stones', 'Only treated packaging'], 0, 'A mix of dry carbon-rich materials and green nitrogen-rich materials supports decomposition.'),
    question('How moist should a compost pile generally be?', ['Waterlogged', 'Like a wrung-out sponge', 'Completely dry always', 'Submerged in water'], 1, 'A lightly moist pile supports decomposition without becoming waterlogged.'),
    question('Why is airflow helpful in a compost pile?', ['It supports decomposition', 'It sterilizes the soil', 'It removes all nutrients', 'It prevents all insects'], 0, 'Airflow helps decomposing organisms work through the material.'),
    question('Which is a common sign of mature compost?', ['Dark, crumbly and earthy smelling', 'Bright plastic pieces', 'Strong chemical smell', 'Completely unchanged fresh leaves'], 0, 'Mature compost is often dark, crumbly and earthy smelling.'),
    question('What should be avoided in a compost pile?', ['Suitable dry leaves', 'Suitable green plant matter', 'Plastic and diseased plants', 'Clean crop residues'], 2, 'Plastic and diseased plants can contaminate compost or spread problems.'),
  ],
  'natural-pest-management': [
    question('What should a farmer do before choosing a pest response?', ['Identify the concern through field observation', 'Spray immediately without inspection', 'Ignore crop damage', 'Remove beneficial insects'], 0, 'Scouting helps distinguish pest presence from damage requiring action.'),
    question('Why look for beneficial insects during scouting?', ['They may help naturally manage some pests', 'They always damage crops', 'They show that irrigation is broken', 'They replace all field records'], 0, 'Some beneficial insects prey on pests or support pollination.'),
    question('What does integrated pest management combine?', ['Prevention, monitoring and appropriate control options', 'Only calendar spraying', 'Only one crop variety', 'No observation or planning'], 0, 'Integrated pest management uses multiple methods selected with monitoring and prevention.'),
    question('When considering a crop protection product, what should be followed?', ['The product label and qualified local guidance', 'A guessed amount', 'Advice for an unrelated crop only', 'No safety instructions'], 0, 'Labels and qualified local advice support safer and appropriate use.'),
    question('Why is identifying the pest problem important?', ['It helps choose an appropriate response', 'It guarantees rain', 'It removes the need to protect people', 'It prevents all future pests'], 0, 'The right response depends on the pest and the level of crop damage.'),
  ],
  'crop-rotation': [
    question('What is crop rotation?', ['Growing different crops in sequence on the same land', 'Growing one crop forever', 'Changing irrigation pipes', 'Moving harvested grain to storage'], 0, 'Rotation changes which crops are grown in a plot over seasons.'),
    question('How can rotating crop families help?', ['It may interrupt some pest and disease cycles', 'It guarantees no pests ever return', 'It removes the need to plan seasons', 'It makes all crops need identical water'], 0, 'Changing crop families can avoid repeatedly favoring some pests and diseases.'),
    question('What should a rotation plan consider?', ['Season, soil, water and crop needs', 'Only the color of a crop', 'Only one year’s market price', 'Nothing about local conditions'], 0, 'Rotation plans need to fit the farm’s conditions and goals.'),
    question('What can legumes contribute to some farming systems?', ['Nitrogen, depending on crop, soil and management', 'Plastic mulch', 'Irrigation pressure', 'Pesticide residue'], 0, 'Legumes can contribute nitrogen, but the effect depends on local conditions and management.'),
    question('Why keep records of crops grown in each plot?', ['They help plan future rotations', 'They replace soil checks', 'They prevent rainfall', 'They make every crop disease-free'], 0, 'Field records make it easier to plan and learn from crop sequences.'),
  ],
  'mulching-techniques': [
    question('Where is mulch generally placed?', ['On the soil surface', 'Inside irrigation emitters', 'On harvested grain', 'Under the farm building'], 0, 'Mulch is a material placed over the soil surface.'),
    question('Which is a possible benefit of suitable mulch?', ['Reduced evaporation from soil', 'More bare soil', 'Blocked roots', 'Guaranteed pest elimination'], 0, 'Soil cover can slow evaporation and protect bare soil.'),
    question('Where should mulch generally be kept away from?', ['Directly touching plant stems', 'The soil surface', 'The crop bed', 'The farm field'], 0, 'Keeping mulch away from stems can reduce excess moisture near plant bases.'),
    question('What kind of material is suitable for mulching?', ['Clean, locally appropriate organic material', 'Plastic waste with unknown chemicals', 'Diseased plant material', 'Painted debris'], 0, 'Use clean and appropriate material that will not introduce contaminants or disease.'),
    question('What should a farmer do after applying mulch?', ['Observe soil moisture and crop response', 'Assume every crop responds identically', 'Stop checking the field', 'Remove irrigation access'], 0, 'Observation helps determine whether the mulch choice and amount suit the crop.'),
  ],
  'drip-irrigation': [
    question('What is the role of an emitter in a drip system?', ['Deliver water from the line near plants', 'Store harvested grain', 'Test seed germination', 'Measure soil color'], 0, 'Emitters release water from the lateral line near crop roots.'),
    question('Why is a filter used in many drip systems?', ['To help prevent particles from blocking emitters', 'To increase soil compaction', 'To remove crop roots', 'To measure harvest weight'], 0, 'Filtering can reduce blockage from particles in irrigation water.'),
    question('What should be checked during routine system inspection?', ['Leaks, blockages and consistent delivery', 'Only the crop market price', 'The color of the farm gate', 'Nothing once installed'], 0, 'Inspection can reveal maintenance issues that affect water delivery.'),
    question('What should guide irrigation duration and frequency?', ['Crop, soil, weather and growth stage', 'A fixed schedule for every farm', 'The color of the pipe', 'The day of the week only'], 0, 'Watering schedules should reflect the field’s conditions and crop needs.'),
    question('Where should equipment maintenance guidance come from?', ['The system maker’s instructions and qualified local advice', 'Guesswork alone', 'Unrelated product instructions', 'No guidance'], 0, 'Follow equipment instructions and relevant technical guidance for safe maintenance.'),
  ],
  'crop-biodiversity': [
    question('What is crop diversity?', ['Growing different crop species or varieties', 'Using one crop everywhere', 'Removing every field border', 'Changing the farm name'], 0, 'Crop diversity means having more than one crop species or variety in the system.'),
    question('What can suitable flowering field borders support?', ['Pollinators and beneficial insects', 'Only crop diseases', 'Soil compaction', 'Irrigation blockages'], 0, 'Appropriate flowering plants can provide habitat and food for beneficial organisms.'),
    question('What should be checked before introducing a border plant?', ['Whether it is suitable locally and not invasive', 'Whether it has the brightest color', 'Whether it needs no observation', 'Whether it can replace every crop'], 0, 'Local suitability matters; plants should not become invasive or compete with crops.'),
    question('Which are examples of crop diversity practices?', ['Mixed cropping and crop rotation', 'Repeated monocropping only', 'Removing all crop varieties', 'Leaving seed unlabeled'], 0, 'Mixed cropping and crop rotation are two approaches to crop diversity.'),
    question('What should guide the choice of crop combinations?', ['Farm resources, seasons and goals', 'Only the tallest plant', 'No local information', 'A random choice'], 0, 'Crop combinations need to fit water, labor, market and seasonal considerations.'),
  ],
  'seed-management': [
    question('What conditions generally help stored seed keep well?', ['Clean, dry and protected from heat and pests', 'Wet and exposed to sunlight', 'Mixed with soil', 'Stored in an unlabeled open pile'], 0, 'Clean, dry and protected storage helps maintain seed quality.'),
    question('Why label stored seed?', ['To remember the variety and date', 'To increase irrigation flow', 'To prevent all pests automatically', 'To replace drying'], 0, 'Labels help identify the variety and when it was stored.'),
    question('What should guide the choice of seed for planting?', ['Crop, season and local growing conditions', 'The package color only', 'A random selection', 'The previous crop’s market price only'], 0, 'Seed should be suitable for the crop and local growing conditions.'),
    question('Can saved seed from every hybrid crop be expected to grow the same as its parent?', ['Yes, always', 'No, offspring may not retain the same characteristics', 'Yes, if stored wet', 'No, seeds never germinate'], 1, 'Saved seed from hybrids may not produce plants with the same characteristics as the parent.'),
    question('What is a useful seed storage practice?', ['Keep seed dry in a suitable labeled container', 'Store it near standing water', 'Mix varieties without labels', 'Expose it to direct sun'], 0, 'Dry, labeled storage reduces confusion and helps protect seed quality.'),
  ],
};
