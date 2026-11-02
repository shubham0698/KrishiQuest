export const learningCategories = [
  'Sustainable Agriculture', 'Water Management', 'Soil Health', 'Organic Farming', 'Pest Management', 'Crop Management',
];
export const learningDifficulties = ['Beginner', 'Intermediate', 'Advanced'];

export const learningLessons = [
  {
    id: 'sustainable-agriculture', title: 'Introduction to Sustainable Agriculture', category: 'Sustainable Agriculture', difficulty: 'Beginner', duration: '8 min', type: 'Article', icon: 'sprout', accent: 'green', xp: 40, featured: true,
    description: 'Discover how productive farming can work with nature to care for soil, water and farm livelihoods.',
    objectives: ['Describe sustainable agriculture in your own words', 'Identify how soil, water and biodiversity support farming', 'Choose one practical improvement for your farm'],
    sections: [
      { heading: 'Farming for the long term', body: 'Sustainable agriculture aims to meet today’s food and livelihood needs while caring for the resources future farming depends on. It considers farm productivity alongside healthy soil, clean water, biodiversity and the wellbeing of farming communities.' },
      { heading: 'A whole-farm perspective', body: 'A farm is a connected system. Soil condition affects water retention; crop choices influence pests and nutrients; and nearby habitats can support pollinators and beneficial insects. A change in one area can affect the others, so small, observed steps are often a sensible place to begin.' },
      { heading: 'Start with what you know', body: 'Walk a field, notice how water moves, look at crop health and ask what has changed over time. Local knowledge and agricultural extension guidance can help you decide which practices are suitable for your crops, soil and climate.' },
    ], takeaways: ['Healthy soil and careful water use underpin resilient farming.', 'Sustainable practices should fit local crops and conditions.', 'Small, measured changes can help you learn what works on your farm.'], hasQuiz: true,
  },
  {
    id: 'water-conservation', title: 'Water Conservation Techniques', category: 'Water Management', difficulty: 'Beginner', duration: '7 min', type: 'Video', icon: 'droplet', accent: 'blue', xp: 35,
    description: 'Learn practical ways to observe, schedule and use irrigation water carefully.',
    objectives: ['Recognize common sources of avoidable water loss', 'Choose a suitable time to irrigate', 'Explain how soil cover can help conserve moisture'],
    sections: [
      { heading: 'Know when the field needs water', body: 'Crop water needs vary by crop, growth stage, soil and weather. Check soil moisture in the root zone and observe plants before irrigating rather than relying only on a fixed calendar.' },
      { heading: 'Reduce avoidable loss', body: 'Watering during cooler parts of the day can reduce evaporation. Repairing leaks, keeping channels clear and applying water close to plant roots can also help water reach the crop instead of running off or evaporating.' },
      { heading: 'Keep moisture in the soil', body: 'Organic mulch can protect the soil surface from direct sun and wind. Combine moisture observations with locally suitable irrigation advice to adjust timing for your crop and field.' },
    ], takeaways: ['Check soil and crop conditions before watering.', 'Cooler irrigation periods can reduce evaporation.', 'Use methods suited to your field, crop and available water.'], hasQuiz: true,
  },
  {
    id: 'soil-health', title: 'Understanding Soil Health', category: 'Soil Health', difficulty: 'Beginner', duration: '9 min', type: 'Article', icon: 'soil', accent: 'earth', xp: 45,
    description: 'Explore the living, physical and nutrient foundations that help soil support crops.',
    objectives: ['Name key parts of healthy soil', 'Recognize signs of soil structure and organic matter', 'List simple ways to protect soil'],
    sections: [
      { heading: 'Soil is more than dirt', body: 'Soil contains mineral particles, organic matter, water, air and living organisms. Their balance influences root growth, drainage, nutrient cycling and the soil’s ability to hold moisture.' },
      { heading: 'Observe soil condition', body: 'Notice whether soil forms stable crumbs, drains well after rain and contains roots or organic residues. A simple spade inspection can reveal compaction or erosion concerns, but local soil testing is useful when nutrient decisions are needed.' },
      { heading: 'Protect the soil surface', body: 'Keeping soil covered, returning suitable organic matter and limiting unnecessary disturbance can help protect soil structure. Match any practice to your crop system and seek local guidance for specific soil constraints.' },
    ], takeaways: ['Soil health includes structure, organic matter, water, nutrients and life.', 'Field observation helps spot changes, while soil tests guide nutrient decisions.', 'Cover and organic matter can support soil protection.'], hasQuiz: true,
  },
  {
    id: 'organic-compost', title: 'Organic Compost Preparation', category: 'Organic Farming', difficulty: 'Intermediate', duration: '10 min', type: 'Video', icon: 'compost', accent: 'olive', xp: 50,
    description: 'Understand the ingredients and conditions that help organic materials break down into compost.',
    objectives: ['Distinguish dry and green compost materials', 'Describe the role of moisture and airflow', 'Recognize when compost is mature enough to use'],
    sections: [
      { heading: 'Build a balanced pile', body: 'Composting works best with a mix of carbon-rich dry materials such as dry leaves or crop residues and nitrogen-rich green materials such as fresh plant matter. Avoid plastics, diseased plants and materials treated with unsuitable chemicals.' },
      { heading: 'Moisture and air matter', body: 'A compost pile should be moist like a wrung-out sponge, not waterlogged. Turning or layering materials can help air move through the pile and support decomposition.' },
      { heading: 'Know when it is ready', body: 'Mature compost is generally dark, crumbly and earthy smelling, with few recognizable original materials. The time required varies with materials, weather and pile management. Use local recommendations for application rates.' },
    ], takeaways: ['Mix dry and green organic materials.', 'Maintain moisture without waterlogging and allow airflow.', 'Use well-matured compost and locally suitable application guidance.'], hasQuiz: true,
  },
  {
    id: 'natural-pest-management', title: 'Natural Pest Management', category: 'Pest Management', difficulty: 'Intermediate', duration: '9 min', type: 'Quiz', icon: 'bug', accent: 'green', xp: 45,
    description: 'Practice observing crop health and considering integrated, nature-friendly pest responses.',
    objectives: ['Explain why regular field scouting matters', 'Recognize the value of beneficial organisms', 'Identify when to seek crop protection advice'],
    sections: [
      { heading: 'Observe before acting', body: 'Walk the field regularly and look for pest numbers, crop damage and beneficial insects. A few insects do not always mean a damaging outbreak; observation helps distinguish presence from a problem that needs action.' },
      { heading: 'Use integrated approaches', body: 'Integrated pest management combines prevention, monitoring, cultural practices and appropriate control options. Crop rotation, sanitation and habitat for beneficial organisms may contribute, depending on the crop and local pest.' },
      { heading: 'Use products responsibly', body: 'If a crop protection product is considered, follow its label and qualified local guidance. Avoid applying products without identifying the problem, and take care to protect people, pollinators, water and other non-target organisms.' },
    ], takeaways: ['Scout and identify the problem before deciding on a response.', 'Prevention and beneficial organisms can be part of integrated pest management.', 'Follow product labels and qualified local guidance.'], hasQuiz: true,
  },
  {
    id: 'crop-rotation', title: 'Crop Rotation Benefits', category: 'Crop Management', difficulty: 'Intermediate', duration: '8 min', type: 'Quiz', icon: 'wheat', accent: 'gold', xp: 40,
    description: 'Plan how changing crop families between seasons can support a more balanced field.',
    objectives: ['Define crop rotation', 'Explain how rotation can interrupt some pest cycles', 'Sketch a simple multi-season crop sequence'],
    sections: [
      { heading: 'Change the crop family', body: 'Crop rotation means growing different crops in sequence on the same land over seasons. Rotating crops from different botanical families can help avoid repeatedly favoring the same pests and diseases.' },
      { heading: 'Plan for local conditions', body: 'A useful rotation considers crop family, rooting depth, nutrient demand, water availability, market needs and season length. Legumes can contribute nitrogen to a system, though the benefit depends on the crop, soil and management.' },
      { heading: 'Keep a field record', body: 'Write down which crop grew in each plot and when. Records make it easier to plan the next sequence and learn what worked. Local crop calendars and extension advice can help refine the plan.' },
    ], takeaways: ['Rotation changes the crop sequence on the same land.', 'Different crop families can help disrupt some pest and disease cycles.', 'Plan around local seasons, soil, water and farm goals.'], hasQuiz: true,
  },
  {
    id: 'mulching-techniques', title: 'Mulching Techniques', category: 'Soil Health', difficulty: 'Beginner', duration: '6 min', type: 'Article', icon: 'leaf', accent: 'green', xp: 30,
    description: 'Learn to use suitable organic materials as a protective cover over soil.',
    objectives: ['Describe two benefits of soil cover', 'Choose suitable mulch material', 'Apply mulch while leaving space around stems'],
    sections: [
      { heading: 'Cover the soil', body: 'Mulch is material placed on the soil surface. Suitable crop residues, dry leaves or other locally recommended organic materials can reduce direct exposure to sun and rain.' },
      { heading: 'Apply with care', body: 'Remove weeds first and spread a loose, even layer. Keep mulch from touching stems to reduce excess moisture around plant bases. Material and thickness should suit the crop, climate and local pest conditions.' },
      { heading: 'Observe the result', body: 'Check the soil moisture and weed growth over time. Some materials may need replenishing as they break down. Avoid using residues that are contaminated or likely to carry crop disease.' },
    ], takeaways: ['Mulch can reduce evaporation and protect bare soil.', 'Use clean, suitable materials and leave space around stems.', 'Observe results and adjust to crop and local conditions.'], hasQuiz: true,
  },
  {
    id: 'drip-irrigation', title: 'Drip Irrigation Basics', category: 'Water Management', difficulty: 'Advanced', duration: '11 min', type: 'Video', icon: 'droplet', accent: 'blue', xp: 55,
    description: 'Get familiar with drip system parts, routine checks and careful water delivery.',
    objectives: ['Identify key drip irrigation components', 'Describe a basic maintenance check', 'Explain why scheduling should match crop needs'],
    sections: [
      { heading: 'Know the system', body: 'A drip system commonly includes a water source, pump or pressure control, filter, main and lateral pipes, and emitters. The exact layout depends on the field and system design.' },
      { heading: 'Check before irrigating', body: 'Inspect filters and lines for leaks or blockages and confirm emitters are delivering water consistently. Cleaning and maintenance should follow the equipment maker’s instructions.' },
      { heading: 'Schedule thoughtfully', body: 'The duration and frequency of irrigation depend on crop, soil, weather and growth stage. Avoid assuming a single schedule suits every plot; use soil moisture observations and local technical advice.' },
    ], takeaways: ['Filters, pipes and emitters all affect delivery.', 'Regular checks can reveal leaks and blockages.', 'Adapt irrigation timing to soil, weather and crop needs.'], hasQuiz: true,
  },
  {
    id: 'crop-biodiversity', title: 'Crop Diversity and Biodiversity', category: 'Crop Management', difficulty: 'Beginner', duration: '7 min', type: 'Flashcards', icon: 'flower', accent: 'purple', xp: 35,
    description: 'See how crop variety and field habitats contribute to a more diverse farm landscape.',
    objectives: ['Distinguish crop diversity from habitat diversity', 'Name ways diverse farms can support beneficial organisms', 'Identify a locally suitable diversity idea'],
    sections: [
      { heading: 'More than one crop', body: 'Crop diversity can include different crop species or varieties across a farm or within a growing season. Mixed cropping and rotations are two approaches, each requiring suitable crop combinations and management.' },
      { heading: 'Make space for helpful life', body: 'Field borders, trees and flowering plants may offer habitat or food to pollinators and beneficial insects. Choose locally appropriate plants that do not become invasive or compete with crops.' },
      { heading: 'Connect diversity to farm goals', body: 'A diverse system can spread some production risks, but it also requires planning for labor, water and markets. Start with local knowledge and evaluate how a change fits the farm.' },
    ], takeaways: ['Crop and habitat diversity describe related but different practices.', 'Local, suitable vegetation can support pollinators and beneficial insects.', 'Choose combinations that fit farm resources and goals.'], hasQuiz: true,
  },
  {
    id: 'seed-management', title: 'Sustainable Seed Management', category: 'Crop Management', difficulty: 'Intermediate', duration: '8 min', type: 'Flashcards', icon: 'seed', accent: 'earth', xp: 40,
    description: 'Explore seed quality, storage and the value of locally suitable varieties.',
    objectives: ['List signs of quality seed handling', 'Describe basic dry storage practices', 'Explain why variety choice should fit local conditions'],
    sections: [
      { heading: 'Choose suitable seed', body: 'Seed should be appropriate for the crop, season and local growing conditions. Use reputable sources and follow local seed certification or extension guidance where relevant.' },
      { heading: 'Store seeds carefully', body: 'Seeds generally keep better when clean, dry and protected from heat, moisture, pests and direct sunlight. Use suitable containers and label the variety and date to avoid mix-ups.' },
      { heading: 'Preserve diversity responsibly', body: 'Some farmers save seed from suitable open-pollinated crops, but seed-saving suitability differs by crop and variety. Hybrid seed may not produce plants with the same characteristics. Seek crop-specific local guidance.' },
    ], takeaways: ['Use healthy seed suited to local conditions.', 'Keep stored seed clean, dry, cool and clearly labeled.', 'Check crop and variety guidance before saving seed.'], hasQuiz: true,
  },
];
