// game.js - My Flower Garden - A Botanical Journal Game

// ========== GAME DATA ==========
const FLOWER_TYPES = [
  // Common flowers (unlocked at start)
  { id: 'dandelion', name: 'Taraxacum officinale', common: 'Dandelion', cost: 2, growth: 1, water: 1, rarity: 0.5, baseValue: 3, color: 'yellow' },
  { id: 'fern', name: 'Nephrolepis exaltata', common: 'Boston Fern', cost: 5, growth: 2, water: 1, rarity: 1, baseValue: 5, color: 'green' },
  { id: 'tulip', name: 'Tulipa gesneriana', common: 'Garden Tulip', cost: 8, growth: 3, water: 2, rarity: 1, baseValue: 8, color: 'red' },
  { id: 'marigold', name: 'Tagetes erecta', common: 'African Marigold', cost: 6, growth: 2, water: 2, rarity: 1, baseValue: 6, color: 'orange' },
  { id: 'daisy', name: 'Bellis perennis', common: 'Common Daisy', cost: 6, growth: 2, water: 1, rarity: 1, baseValue: 6, color: 'white' },
  
  // Tier 1 - Low cost (locked initially)
  { id: 'pansy', name: 'Viola tricolor', common: 'Wild Pansy', cost: 9, growth: 3, water: 2, rarity: 1.2, baseValue: 9, color: 'purple', locked: true },
  { id: 'zinnia', name: 'Zinnia elegans', common: 'Youth-and-Age', cost: 11, growth: 3, water: 2, rarity: 1.3, baseValue: 10, color: 'pink', locked: true },
  { id: 'cosmos', name: 'Cosmos bipinnatus', common: 'Garden Cosmos', cost: 11, growth: 3, water: 2, rarity: 1.2, baseValue: 9, color: 'pink', locked: true },
  { id: 'snapdragon', name: 'Antirrhinum majus', common: 'Snapdragon', cost: 12, growth: 3, water: 2, rarity: 1.4, baseValue: 11, color: 'red', locked: true },
  { id: 'sunflower', name: 'Helianthus annuus', common: 'Common Sunflower', cost: 12, growth: 4, water: 2, rarity: 1.5, baseValue: 12, color: 'yellow', locked: true },
  
  // Tier 2 - Medium cost
  { id: 'rose', name: 'Rosa hybrida', common: 'Hybrid Tea Rose', cost: 23, growth: 5, water: 3, rarity: 2, baseValue: 20, color: 'red', locked: true },
  { id: 'lily', name: 'Lilium candidum', common: 'Madonna Lily', cost: 18, growth: 4, water: 2, rarity: 1.8, baseValue: 18, color: 'white', locked: true },
  { id: 'iris', name: 'Iris germanica', common: 'Bearded Iris', cost: 20, growth: 4, water: 2, rarity: 1.7, baseValue: 17, color: 'purple', locked: true },
  { id: 'carnation', name: 'Dianthus caryophyllus', common: 'Carnation', cost: 15, growth: 4, water: 2, rarity: 1.6, baseValue: 14, color: 'pink', locked: true },
  { id: 'chrysanthemum', name: 'Chrysanthemum morifolium', common: 'Florist Mum', cost: 17, growth: 4, water: 2, rarity: 1.6, baseValue: 15, color: 'yellow', locked: true },
  { id: 'dahlia', name: 'Dahlia pinnata', common: 'Garden Dahlia', cost: 21, growth: 5, water: 3, rarity: 1.9, baseValue: 19, color: 'red', locked: true },
  { id: 'peony', name: 'Paeonia lactiflora', common: 'Chinese Peony', cost: 24, growth: 5, water: 3, rarity: 2.1, baseValue: 22, color: 'pink', locked: true },
  { id: 'hydrangea', name: 'Hydrangea macrophylla', common: 'Bigleaf Hydrangea', cost: 23, growth: 5, water: 3, rarity: 2, baseValue: 21, color: 'blue', locked: true },
  
  // Tier 3 - High cost
  { id: 'orchid-phalaenopsis', name: 'Phalaenopsis amabilis', common: 'Moth Orchid', cost: 38, growth: 6, water: 3, rarity: 2.5, baseValue: 35, color: 'white', locked: true },
  { id: 'orchid-cattleya', name: 'Cattleya labiata', common: 'Corsage Orchid', cost: 42, growth: 6, water: 3, rarity: 2.6, baseValue: 38, color: 'purple', locked: true },
  { id: 'protea', name: 'Protea cynaroides', common: 'King Protea', cost: 45, growth: 7, water: 3, rarity: 2.8, baseValue: 42, color: 'pink', locked: true },
  { id: 'delphinium', name: 'Delphinium elatum', common: 'Candle Larkspur', cost: 30, growth: 5, water: 3, rarity: 2.2, baseValue: 28, color: 'blue', locked: true },
  { id: 'anemone', name: 'Anemone coronaria', common: 'Poppy Anemone', cost: 27, growth: 5, water: 2, rarity: 2, baseValue: 24, color: 'red', locked: true },
  { id: 'ranunculus', name: 'Ranunculus asiaticus', common: 'Persian Buttercup', cost: 33, growth: 5, water: 3, rarity: 2.3, baseValue: 30, color: 'pink', locked: true },
  { id: 'gardenia', name: 'Gardenia jasminoides', common: 'Cape Jasmine', cost: 36, growth: 6, water: 3, rarity: 2.4, baseValue: 32, color: 'white', locked: true },
  { id: 'camellia', name: 'Camellia japonica', common: 'Japanese Camellia', cost: 35, growth: 6, water: 3, rarity: 2.3, baseValue: 31, color: 'red', locked: true },
  
  // Tier 4 - Very high cost (exotic)
  { id: 'bird-of-paradise', name: 'Strelitzia reginae', common: 'Crane Flower', cost: 60, growth: 8, water: 4, rarity: 3, baseValue: 55, color: 'orange', locked: true },
  { id: 'calla-lily', name: 'Zantedeschia aethiopica', common: 'Calla Lily', cost: 53, growth: 7, water: 3, rarity: 2.8, baseValue: 48, color: 'white', locked: true },
  { id: 'amaryllis', name: 'Hippeastrum hybridum', common: 'Amaryllis', cost: 48, growth: 6, water: 3, rarity: 2.7, baseValue: 45, color: 'red', locked: true },
  { id: 'hellebore', name: 'Helleborus niger', common: 'Christmas Rose', cost: 57, growth: 7, water: 3, rarity: 2.9, baseValue: 52, color: 'white', locked: true },
  { id: 'passion-flower', name: 'Passiflora caerulea', common: 'Blue Passionflower', cost: 54, growth: 7, water: 4, rarity: 2.8, baseValue: 50, color: 'blue', locked: true },
  { id: 'lotus', name: 'Nelumbo nucifera', common: 'Sacred Lotus', cost: 68, growth: 8, water: 5, rarity: 3.2, baseValue: 62, color: 'pink', locked: true },
  { id: 'magnolia', name: 'Magnolia grandiflora', common: 'Southern Magnolia', cost: 63, growth: 8, water: 4, rarity: 3.1, baseValue: 58, color: 'white', locked: true },
  { id: 'wisteria', name: 'Wisteria sinensis', common: 'Chinese Wisteria', cost: 57, growth: 7, water: 3, rarity: 2.9, baseValue: 53, color: 'purple', locked: true },
  
  // Tier 5 - Premium/Rare
  { id: 'blue-poppy', name: 'Meconopsis betonicifolia', common: 'Himalayan Blue Poppy', cost: 90, growth: 9, water: 4, rarity: 3.5, baseValue: 80, color: 'blue', locked: true },
  { id: 'ghost-orchid', name: 'Dendrophylax lindenii', common: 'Ghost Orchid', cost: 113, growth: 10, water: 4, rarity: 4, baseValue: 100, color: 'white', locked: true },
  { id: 'juliet-rose', name: 'Rosa \'Sweet Juliet\'', common: 'Juliet Rose', cost: 98, growth: 9, water: 4, rarity: 3.7, baseValue: 88, color: 'peach', locked: true },
  { id: 'kadupul', name: 'Epiphyllum oxypetalum', common: 'Queen of the Night', cost: 120, growth: 10, water: 5, rarity: 4.2, baseValue: 110, color: 'white', locked: true },
  { id: 'chocolate-cosmos', name: 'Cosmos atrosanguineus', common: 'Chocolate Cosmos', cost: 83, growth: 8, water: 3, rarity: 3.3, baseValue: 75, color: 'brown', locked: true },
  { id: 'parrot-flower', name: 'Impatiens psittacina', common: 'Parrot Flower', cost: 105, growth: 9, water: 4, rarity: 3.8, baseValue: 95, color: 'red', locked: true },
  { id: 'jade-vine', name: 'Strongylodon macrobotrys', common: 'Jade Vine', cost: 102, growth: 9, water: 4, rarity: 3.7, baseValue: 92, color: 'jade', locked: true },
  { id: 'middlemist-red', name: 'Camellia \'Middlemist\'', common: 'Middlemist Red', cost: 135, growth: 11, water: 5, rarity: 4.5, baseValue: 125, color: 'pink', locked: true },
  { id: 'corpse-flower', name: 'Amorphophallus titanum', common: 'Titan Arum', cost: 128, growth: 12, water: 5, rarity: 4.3, baseValue: 115, color: 'purple', locked: true },
  { id: 'black-bat', name: 'Tacca chantrieri', common: 'Black Bat Flower', cost: 108, growth: 9, water: 4, rarity: 3.9, baseValue: 98, color: 'black', locked: true },
  { id: 'bleeding-heart', name: 'Lamprocapnos spectabilis', common: 'Bleeding Heart', cost: 42, growth: 6, water: 3, rarity: 2.5, baseValue: 38, color: 'pink', locked: true },
  { id: 'foxglove', name: 'Digitalis purpurea', common: 'Common Foxglove', cost: 29, growth: 5, water: 2, rarity: 2.1, baseValue: 26, color: 'purple', locked: true },
  { id: 'edelweiss', name: 'Leontopodium alpinum', common: 'Edelweiss', cost: 72, growth: 8, water: 3, rarity: 3.2, baseValue: 65, color: 'white', locked: true },
  { id: 'fire-lily', name: 'Gloriosa superba', common: 'Flame Lily', cost: 78, growth: 8, water: 4, rarity: 3.3, baseValue: 70, color: 'red', locked: true },
  
  // Tier 6 - Ultra Rare & Exotic (NEW)
  { id: 'rothschild-orchid', name: 'Paphiopedilum rothschildianum', common: "Rothschild's Slipper Orchid", cost: 200, growth: 14, water: 5, rarity: 5, baseValue: 180, color: 'gold', locked: true },
  { id: 'saffron-crocus', name: 'Crocus sativus', common: 'Saffron Crocus', cost: 165, growth: 12, water: 4, rarity: 4.5, baseValue: 150, color: 'purple', locked: true },
  { id: 'vanilla-orchid', name: 'Vanilla planifolia', common: 'Vanilla Orchid', cost: 180, growth: 13, water: 5, rarity: 4.7, baseValue: 165, color: 'cream', locked: true },
  { id: 'dragon-arum', name: 'Dracunculus vulgaris', common: 'Dragon Arum', cost: 145, growth: 11, water: 4, rarity: 4.2, baseValue: 135, color: 'purple', locked: true },
  { id: 'moonflower', name: 'Ipomoea alba', common: 'Moonflower', cost: 95, growth: 9, water: 4, rarity: 3.6, baseValue: 88, color: 'white', locked: true },
  { id: 'angel-trumpet', name: 'Brugmansia arborea', common: "Angel's Trumpet", cost: 155, growth: 11, water: 4, rarity: 4.3, baseValue: 140, color: 'white', locked: true },
  { id: 'night-blooming-cereus', name: 'Selenicereus grandiflorus', common: 'Night-Blooming Cereus', cost: 175, growth: 12, water: 4, rarity: 4.6, baseValue: 160, color: 'white', locked: true },
  { id: 'corpse-lily', name: 'Rafflesia arnoldii', common: 'Corpse Lily', cost: 250, growth: 15, water: 6, rarity: 5.5, baseValue: 230, color: 'red', locked: true },
  { id: 'youtan-poluo', name: 'Youtan Poluo', common: 'Udumbara Flower', cost: 300, growth: 18, water: 6, rarity: 6, baseValue: 280, color: 'white', locked: true },
  { id: 'black-orchid', name: 'Coelogyne pandurata', common: 'Black Orchid', cost: 220, growth: 14, water: 5, rarity: 5.2, baseValue: 200, color: 'black', locked: true },
];

const UPGRADES = [
  // Garden expansions
  { id: 'garden-6x6', name: 'Expand Garden to 6×6', cost: 150, type: 'garden', value: 6 },
  { id: 'garden-8x8', name: 'Expand Garden to 8×8', cost: 375, type: 'garden', value: 8 },
  { id: 'garden-10x10', name: 'Expand Garden to 10×10', cost: 750, type: 'garden', value: 10 },
  { id: 'garden-12x12', name: 'Expand Garden to 12×12', cost: 1500, type: 'garden', value: 12 },
  { id: 'garden-16x16', name: 'Expand Garden to 16×16', cost: 3750, type: 'garden', value: 16 },
  { id: 'garden-20x20', name: 'Grand Estate Garden 20×20', cost: 7500, type: 'garden', value: 20 },
  { id: 'garden-24x24', name: 'Royal Conservatory 24×24', cost: 15000, type: 'garden', value: 24 },
  
  // Self-watering plots (auto-water feature)
  { id: 'auto-water-basic', name: 'Automated Irrigation System', cost: 500, type: 'auto-water', value: 1, description: 'Automatically waters all plants each day' },
  { id: 'auto-water-advanced', name: 'Deluxe Self-Watering Greenhouse', cost: 2500, type: 'auto-water', value: 2, description: 'Auto-waters twice daily for faster growth' },
  { id: 'auto-water-premium', name: 'Victorian Crystal Conservatory', cost: 10000, type: 'auto-water', value: 3, description: 'The ultimate garden: auto-waters thrice daily with perfect conditions' },
  
  // Tier 1 unlocks
  { id: 'unlock-pansy', name: 'Unlock Pansy Seeds', cost: 45, type: 'seed', value: 'pansy' },
  { id: 'unlock-zinnia', name: 'Unlock Zinnia Seeds', cost: 53, type: 'seed', value: 'zinnia' },
  { id: 'unlock-cosmos', name: 'Unlock Cosmos Seeds', cost: 53, type: 'seed', value: 'cosmos' },
  { id: 'unlock-snapdragon', name: 'Unlock Snapdragon Seeds', cost: 60, type: 'seed', value: 'snapdragon' },
  { id: 'unlock-sunflower', name: 'Unlock Sunflower Seeds', cost: 68, type: 'seed', value: 'sunflower' },
  
  // Tier 2 unlocks
  { id: 'unlock-rose', name: 'Unlock Rose Seeds', cost: 120, type: 'seed', value: 'rose' },
  { id: 'unlock-lily', name: 'Unlock Lily Seeds', cost: 105, type: 'seed', value: 'lily' },
  { id: 'unlock-iris', name: 'Unlock Iris Seeds', cost: 113, type: 'seed', value: 'iris' },
  { id: 'unlock-carnation', name: 'Unlock Carnation Seeds', cost: 90, type: 'seed', value: 'carnation' },
  { id: 'unlock-chrysanthemum', name: 'Unlock Chrysanthemum Seeds', cost: 98, type: 'seed', value: 'chrysanthemum' },
  { id: 'unlock-dahlia', name: 'Unlock Dahlia Seeds', cost: 128, type: 'seed', value: 'dahlia' },
  { id: 'unlock-peony', name: 'Unlock Peony Seeds', cost: 135, type: 'seed', value: 'peony' },
  { id: 'unlock-hydrangea', name: 'Unlock Hydrangea Seeds', cost: 128, type: 'seed', value: 'hydrangea' },
  
  // Tier 3 unlocks
  { id: 'unlock-orchid-phalaenopsis', name: 'Unlock Moth Orchid Seeds', cost: 225, type: 'seed', value: 'orchid-phalaenopsis' },
  { id: 'unlock-orchid-cattleya', name: 'Unlock Corsage Orchid Seeds', cost: 240, type: 'seed', value: 'orchid-cattleya' },
  { id: 'unlock-protea', name: 'Unlock Protea Seeds', cost: 270, type: 'seed', value: 'protea' },
  { id: 'unlock-delphinium', name: 'Unlock Delphinium Seeds', cost: 180, type: 'seed', value: 'delphinium' },
  { id: 'unlock-anemone', name: 'Unlock Anemone Seeds', cost: 165, type: 'seed', value: 'anemone' },
  { id: 'unlock-ranunculus', name: 'Unlock Ranunculus Seeds', cost: 195, type: 'seed', value: 'ranunculus' },
  { id: 'unlock-gardenia', name: 'Unlock Gardenia Seeds', cost: 218, type: 'seed', value: 'gardenia' },
  { id: 'unlock-camellia', name: 'Unlock Camellia Seeds', cost: 210, type: 'seed', value: 'camellia' },
  { id: 'unlock-bleeding-heart', name: 'Unlock Bleeding Heart Seeds', cost: 248, type: 'seed', value: 'bleeding-heart' },
  { id: 'unlock-foxglove', name: 'Unlock Foxglove Seeds', cost: 173, type: 'seed', value: 'foxglove' },
  
  // Tier 4 unlocks
  { id: 'unlock-bird-of-paradise', name: 'Unlock Bird of Paradise Seeds', cost: 375, type: 'seed', value: 'bird-of-paradise' },
  { id: 'unlock-calla-lily', name: 'Unlock Calla Lily Seeds', cost: 330, type: 'seed', value: 'calla-lily' },
  { id: 'unlock-amaryllis', name: 'Unlock Amaryllis Seeds', cost: 300, type: 'seed', value: 'amaryllis' },
  { id: 'unlock-hellebore', name: 'Unlock Hellebore Seeds', cost: 360, type: 'seed', value: 'hellebore' },
  { id: 'unlock-passion-flower', name: 'Unlock Passion Flower Seeds', cost: 345, type: 'seed', value: 'passion-flower' },
  { id: 'unlock-lotus', name: 'Unlock Lotus Seeds', cost: 420, type: 'seed', value: 'lotus' },
  { id: 'unlock-magnolia', name: 'Unlock Magnolia Seeds', cost: 390, type: 'seed', value: 'magnolia' },
  { id: 'unlock-wisteria', name: 'Unlock Wisteria Seeds', cost: 360, type: 'seed', value: 'wisteria' },
  { id: 'unlock-edelweiss', name: 'Unlock Edelweiss Seeds', cost: 450, type: 'seed', value: 'edelweiss' },
  { id: 'unlock-fire-lily', name: 'Unlock Fire Lily Seeds', cost: 480, type: 'seed', value: 'fire-lily' },
  
  // Tier 5 unlocks (premium)
  { id: 'unlock-blue-poppy', name: 'Unlock Blue Poppy Seeds', cost: 600, type: 'seed', value: 'blue-poppy' },
  { id: 'unlock-ghost-orchid', name: 'Unlock Ghost Orchid Seeds', cost: 750, type: 'seed', value: 'ghost-orchid' },
  { id: 'unlock-juliet-rose', name: 'Unlock Juliet Rose Seeds', cost: 675, type: 'seed', value: 'juliet-rose' },
  { id: 'unlock-kadupul', name: 'Unlock Queen of the Night Seeds', cost: 825, type: 'seed', value: 'kadupul' },
  { id: 'unlock-chocolate-cosmos', name: 'Unlock Chocolate Cosmos Seeds', cost: 570, type: 'seed', value: 'chocolate-cosmos' },
  { id: 'unlock-parrot-flower', name: 'Unlock Parrot Flower Seeds', cost: 720, type: 'seed', value: 'parrot-flower' },
  { id: 'unlock-jade-vine', name: 'Unlock Jade Vine Seeds', cost: 705, type: 'seed', value: 'jade-vine' },
  { id: 'unlock-middlemist-red', name: 'Unlock Middlemist Red Seeds', cost: 900, type: 'seed', value: 'middlemist-red' },
  { id: 'unlock-corpse-flower', name: 'Unlock Corpse Flower Seeds', cost: 870, type: 'seed', value: 'corpse-flower' },
  { id: 'unlock-black-bat', name: 'Unlock Black Bat Flower Seeds', cost: 735, type: 'seed', value: 'black-bat' },
  
  // Tier 6 unlocks - Ultra Rare & Exotic (NEW)
  { id: 'unlock-rothschild-orchid', name: "Unlock Rothschild's Slipper Orchid Seeds", cost: 1200, type: 'seed', value: 'rothschild-orchid' },
  { id: 'unlock-saffron-crocus', name: 'Unlock Saffron Crocus Seeds', cost: 1000, type: 'seed', value: 'saffron-crocus' },
  { id: 'unlock-vanilla-orchid', name: 'Unlock Vanilla Orchid Seeds', cost: 1100, type: 'seed', value: 'vanilla-orchid' },
  { id: 'unlock-dragon-arum', name: 'Unlock Dragon Arum Seeds', cost: 850, type: 'seed', value: 'dragon-arum' },
  { id: 'unlock-moonflower', name: 'Unlock Moonflower Seeds', cost: 650, type: 'seed', value: 'moonflower' },
  { id: 'unlock-angel-trumpet', name: "Unlock Angel's Trumpet Seeds", cost: 950, type: 'seed', value: 'angel-trumpet' },
  { id: 'unlock-night-blooming-cereus', name: 'Unlock Night-Blooming Cereus Seeds', cost: 1050, type: 'seed', value: 'night-blooming-cereus' },
  { id: 'unlock-corpse-lily', name: 'Unlock Corpse Lily Seeds', cost: 1500, type: 'seed', value: 'corpse-lily' },
  { id: 'unlock-youtan-poluo', name: 'Unlock Udumbara Flower Seeds', cost: 2000, type: 'seed', value: 'youtan-poluo' },
  { id: 'unlock-black-orchid', name: 'Unlock Black Orchid Seeds', cost: 1350, type: 'seed', value: 'black-orchid' },
  
  // Tool upgrades
  { id: 'better-tools', name: 'Superior Watering Tools', cost: 75, type: 'tool', value: 1 },
  { id: 'advanced-tools', name: 'Advanced Watering System', cost: 225, type: 'tool', value: 2 },
  { id: 'master-tools', name: 'Master Gardener Tools', cost: 500, type: 'tool', value: 3 },
];

// Game State
const GameState = {
  money: 100,
  week: 1,
  day: 1,
  gardenSize: 4,
  garden: [],
  inventory: [],
  bouquets: [],
  marketDemand: {},
  selectedSeed: null,
  currentBouquet: [],
  upgrades: [],
  toolLevel: 0,
  autoWaterLevel: 0, // 0 = none, 1 = basic (1x), 2 = advanced (2x), 3 = premium (3x)
  arrangementFlowers: [],
  selectedWrapper: 'classic',
  selectedRibbon: '#8b4557',
  selectedArrangementFlower: null,
  collectedCards: [], // Botanical illustration cards unlocked by growing each species
  grownSpecies: [], // All species ever grown (for specimen notebook)
  rotationSensitivity: 3, // Rotation degrees per click (1, 3, 5, or 15)
  currentWeather: 'sunny', // sunny, cloudy, rainy, sunset, night
  weatherTimer: null
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  console.log('Game initializing...');
  try {
    initGame();
    console.log('Game initialized');
    attachEventListeners();
    console.log('Event listeners attached');
    startWeatherCycle();
    console.log('Weather system started');
    generateMarketDemand();
    console.log('Market demand generated');
    render();
    console.log('Render complete');
  } catch(e) {
    console.error('Initialization error:', e);
  }
});

function initGame() {
  const size = GameState.gardenSize;
  GameState.garden = Array(size * size).fill(null).map(() => null);
}

function attachEventListeners() {
  // Garden actions
  document.getElementById('water-all-btn').addEventListener('click', waterAll);
  document.getElementById('next-day-btn').addEventListener('click', advanceDay);
  
  // View toggle
  document.getElementById('grid-view-btn').addEventListener('click', () => switchView('grid'));
  document.getElementById('visual-view-btn').addEventListener('click', () => switchView('visual'));
  
  // Market
  document.getElementById('end-week-btn').addEventListener('click', endWeek);
  
  // Right Panel Navigation Buttons
  const panelFlowerShopBtn = document.getElementById('panel-flower-shop-btn');
  const panelUpgradesBtn = document.getElementById('panel-upgrades-btn');
  const panelSpecimenBtn = document.getElementById('panel-specimen-btn');
  const panelHelpBtn = document.getElementById('panel-help-btn');
  
  if (panelFlowerShopBtn) panelFlowerShopBtn.addEventListener('click', openFlowerShop);
  if (panelUpgradesBtn) panelUpgradesBtn.addEventListener('click', openUpgrades);
  if (panelSpecimenBtn) panelSpecimenBtn.addEventListener('click', openSpecimenNotebook);
  if (panelHelpBtn) panelHelpBtn.addEventListener('click', openHelp);
  
  // Footer Navigation Buttons
  const footerFlowerShopBtn = document.getElementById('footer-flower-shop-btn');
  const footerUpgradesBtn = document.getElementById('footer-upgrades-btn');
  const footerSpecimenBtn = document.getElementById('footer-specimen-btn');
  const footerHelpBtn = document.getElementById('footer-help-btn');
  
  if (footerFlowerShopBtn) footerFlowerShopBtn.addEventListener('click', openFlowerShop);
  if (footerUpgradesBtn) footerUpgradesBtn.addEventListener('click', openUpgrades);
  if (footerSpecimenBtn) footerSpecimenBtn.addEventListener('click', openSpecimenNotebook);
  if (footerHelpBtn) footerHelpBtn.addEventListener('click', openHelp);
  
  // Modal close buttons
  document.getElementById('close-flower-shop').addEventListener('click', closeFlowerShop);
  document.getElementById('close-upgrades').addEventListener('click', closeUpgrades);
  document.getElementById('close-specimen-notebook').addEventListener('click', closeSpecimenNotebook);
  document.getElementById('close-specimen-btn').addEventListener('click', closeSpecimenNotebook);
  document.getElementById('close-help').addEventListener('click', closeHelp);
  
  // Seed catalogue modal
  const seedCatalogueBtn = document.getElementById('open-seed-catalogue-btn');
  const closeSeedCatalogueBtn = document.getElementById('close-seed-catalogue-btn');
  if (seedCatalogueBtn) seedCatalogueBtn.addEventListener('click', openSeedCatalogue);
  if (closeSeedCatalogueBtn) closeSeedCatalogueBtn.addEventListener('click', closeSeedCatalogue);
  
  // Shop bouquet and arrangement tools - Victorian controls
  document.getElementById('create-shop-bouquet').addEventListener('click', createShopBouquet);
  document.getElementById('clear-arrangement').addEventListener('click', clearArrangement);
  document.getElementById('copy-flower-btn').addEventListener('click', copySelectedFlower);
  document.getElementById('set-straight-btn').addEventListener('click', setStraight);
  document.getElementById('rotate-counter-btn').addEventListener('click', () => rotateSelectedFlower(false));
  document.getElementById('rotate-clockwise-btn').addEventListener('click', () => rotateSelectedFlower(true));
  document.getElementById('size-up').addEventListener('click', () => resizeSelectedFlower(1.2));
  document.getElementById('size-down').addEventListener('click', () => resizeSelectedFlower(0.8));
  document.getElementById('sensitivity-dial').addEventListener('click', cycleSensitivity);
  
  // Wrapper and ribbon selection
  document.querySelectorAll('.wrapper-option').forEach(opt => {
    opt.addEventListener('click', () => selectWrapper(opt.dataset.wrapper));
  });
  document.querySelectorAll('.ribbon-option').forEach(opt => {
    opt.addEventListener('click', () => selectRibbon(opt.dataset.color));
  });
}

// ========== RENDERING ==========
function render() {
  console.log('Starting render...');
  renderStats();
  renderGarden();
  renderSeedShop();
  renderInventory();
  renderHerbarium();
  renderMarketDemand();
  renderBouquetsForSale();
  console.log('Render functions complete');
}

function renderStats() {
  document.getElementById('money').textContent = `$${GameState.money}`;
  const moneyDisplay = document.getElementById('money-display');
  if (moneyDisplay) moneyDisplay.textContent = `$${GameState.money}`;
  document.getElementById('week').textContent = GameState.week;
  document.getElementById('garden-size').textContent = `${GameState.gardenSize}×${GameState.gardenSize}`;
}

function renderGarden() {
  const grid = document.getElementById('garden-grid');
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = `repeat(${GameState.gardenSize}, 80px)`;
  
  GameState.garden.forEach((plant, idx) => {
    const plot = document.createElement('div');
    plot.className = 'plot';
    
    if (plant) {
      const growthPercent = plant.stage / plant.growth;
      const scale = 0.5 + (growthPercent * 0.5); // Scale from 0.5 to 1.0
      const flowerSymbol = plant.stage >= plant.growth ? '✿' : '❀';
      plot.innerHTML = `<div class="flower-visual" data-color="${plant.color}" style="transform: scale(${scale})">${flowerSymbol}</div>`;
      plot.title = `${plant.common}\n(${plant.name})\nStage: ${plant.stage}/${plant.growth}\nWater: ${plant.watered}/${plant.water}\nClick to ${plant.stage >= plant.growth ? 'harvest' : 'water'}`;
      
      if (plant.stage >= plant.growth) {
        plot.classList.add('ready');
        plot.style.background = '#d4f4dd';
      } else if (plant.stage > 0) {
        plot.style.background = '#e8f5e9';
      }
      
      plot.addEventListener('click', () => handlePlotClick(idx));
    } else {
      plot.textContent = '+';
      plot.title = 'Plant a seed';
      plot.addEventListener('click', () => plantSeed(idx));
    }
    
    grid.appendChild(plot);
  });
  
  renderVisualGarden();
}

function renderVisualGarden() {
  const visualPlants = document.getElementById('visual-plants');
  if (!visualPlants) return;
  
  visualPlants.innerHTML = '';
  
  const plantsContainer = visualPlants; // Use the existing visual-plants container
  
  GameState.garden.forEach((plant, idx) => {
    if (!plant) return;
    
    const growthPercent = plant.stage / plant.growth;
    const row = Math.floor(idx / GameState.gardenSize);
    const col = idx % GameState.gardenSize;
    const size = GameState.gardenSize;
    
    // Calculate position within the soil row with slight random offset for natural look
    const colWidth = 100 / size;
    const randomOffset = (idx % 3 - 1) * 2; // Small offset: -2, 0, or 2
    
    const visualPlant = document.createElement('div');
    visualPlant.className = 'visual-plant botanical-plant';
    visualPlant.style.left = `${col * colWidth + colWidth / 2 + randomOffset}%`;
    visualPlant.style.bottom = `${row * 60 + 10}px`;
    
    // Scale flowers based on growth - much larger at full size
    const minSize = 40;
    const maxSize = 90;
    const flowerSize = minSize + (growthPercent * (maxSize - minSize));
    visualPlant.style.width = `${flowerSize}px`;
    visualPlant.style.height = `${flowerSize * 1.2}px`;
    visualPlant.style.opacity = `${0.5 + (growthPercent * 0.5)}`;
    visualPlant.title = `${plant.common}\n(${plant.name})`;
    
    // Show full color botanical illustration for mature plants
    if (plant.stage >= plant.growth) {
      visualPlant.innerHTML = getBotanicalIllustration(plant.id);
      visualPlant.classList.add('mature-flower');
      // Add gentle sway animation
      visualPlant.style.animation = `sway ${3 + (idx % 3)}s ease-in-out infinite`;
      visualPlant.style.animationDelay = `${idx * 0.2}s`;
    } else if (GameState.collectedCards.includes(plant.id) && plant.stage >= plant.growth * 0.5) {
      // Show muted botanical illustration for growing plants (after card collected)
      visualPlant.innerHTML = getBotanicalIllustration(plant.id);
      visualPlant.style.filter = 'saturate(0.6) brightness(0.9) sepia(0.1)';
    } else {
      // Show growing seedling/sprout for early stages
      const stemHeight = 20 + (growthPercent * 40);
      const leafSize = growthPercent * 8;
      visualPlant.innerHTML = `
        <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 3px rgba(0,0,0,0.2));">
          <defs>
            <linearGradient id="stem-grad-${idx}" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#6b8e4e;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#4a6b35;stop-opacity:1" />
            </linearGradient>
          </defs>
          <path d="M 50 120 Q 48 ${120 - stemHeight/2} 50 ${120 - stemHeight}" 
                stroke="url(#stem-grad-${idx})" stroke-width="3" fill="none" stroke-linecap="round"/>
          ${plant.stage >= plant.growth * 0.3 ? `
            <ellipse cx="42" cy="${120 - stemHeight/2}" rx="${leafSize}" ry="${leafSize * 1.5}" 
                     fill="#6b8e4e" opacity="0.8" transform="rotate(-30 42 ${120 - stemHeight/2})"/>
            <ellipse cx="58" cy="${120 - stemHeight/2 + 5}" rx="${leafSize}" ry="${leafSize * 1.5}" 
                     fill="#6b8e4e" opacity="0.8" transform="rotate(30 58 ${120 - stemHeight/2 + 5})"/>
          ` : ''}
          ${plant.stage >= plant.growth * 0.7 ? `
            <circle cx="50" cy="${120 - stemHeight}" r="${4 + growthPercent * 6}" 
                    fill="#d4af37" opacity="0.6"/>
          ` : ''}
        </svg>
      `;
      visualPlant.style.animation = `grow ${2}s ease-out`;
    }
    
    visualPlant.style.transition = 'all 0.3s ease';
    visualPlant.addEventListener('click', () => handlePlotClick(idx));
    
    plantsContainer.appendChild(visualPlant);
  });
}

function renderSeedShop() {
  const shop = document.getElementById('seed-shop');
  shop.innerHTML = '';
  
  FLOWER_TYPES.forEach(flower => {
    if (flower.locked && !GameState.upgrades.includes(`unlock-${flower.id}`)) return;
    
    const seedCard = document.createElement('div');
    seedCard.className = 'seed-card';
    if (GameState.selectedSeed === flower.id) seedCard.classList.add('selected');
    
    seedCard.innerHTML = `
      <div class="flower-visual" data-color="${flower.color}">✿</div>
      <div class="seed-name"><em>${flower.name}</em></div>
      <div class="seed-common">${flower.common}</div>
      <div class="seed-cost">$${flower.cost}</div>
      <div class="seed-info">Growth: ${flower.growth} | Water: ${flower.water}</div>
    `;
    
    seedCard.addEventListener('click', () => selectSeed(flower.id));
    shop.appendChild(seedCard);
  });
}

function renderInventory() {
  const inv = document.getElementById('inventory');
  inv.innerHTML = '';
  
  if (GameState.inventory.length === 0) {
    inv.innerHTML = '<p class="hint">No harvested flowers yet</p>';
    return;
  }
  
  const counts = {};
  GameState.inventory.forEach(flower => {
    counts[flower.id] = (counts[flower.id] || 0) + 1;
  });
  
  Object.entries(counts).forEach(([id, count]) => {
    const flower = FLOWER_TYPES.find(f => f.id === id);
    const item = document.createElement('div');
    item.className = 'inventory-item';
    item.innerHTML = `
      <div class="flower-visual" data-color="${flower.color}">✿</div>
      <div class="inv-name-box">
        <div class="inv-scientific"><em>${flower.name}</em></div>
        <div class="inv-common">${flower.common}</div>
      </div>
      <span class="inv-count">×${count}</span>
    `;
    item.addEventListener('click', () => addToBouquet(flower));
    inv.appendChild(item);
  });
}

function renderHerbarium() {
  const herbarium = document.getElementById('herbarium');
  herbarium.innerHTML = '';
  
  if (GameState.collectedCards.length === 0) {
    herbarium.innerHTML = '<p class="hint">Collect botanical illustrations by growing each flower species</p>';
    return;
  }
  
  GameState.collectedCards.forEach(flowerId => {
    const flower = FLOWER_TYPES.find(f => f.id === flowerId);
    if (!flower) return;
    
    const card = document.createElement('div');
    card.className = 'botanical-card';
    card.innerHTML = `
      <div class="card-illustration">
        ${getBotanicalIllustration(flowerId)}
      </div>
      <div class="card-info">
        <div class="card-scientific"><em>${flower.name}</em></div>
        <div class="card-common">${flower.common}</div>
      </div>
    `;
    herbarium.appendChild(card);
  });
  
  // Show collection progress
  const progress = document.createElement('div');
  progress.className = 'herbarium-progress';
  progress.innerHTML = `<small>Collected: ${GameState.collectedCards.length} / ${FLOWER_TYPES.length} species</small>`;
  herbarium.appendChild(progress);
}

function renderMarketDemand() {
  const demand = document.getElementById('market-demand');
  demand.innerHTML = '';
  
  Object.entries(GameState.marketDemand).forEach(([id, multiplier]) => {
    const flower = FLOWER_TYPES.find(f => f.id === id);
    const item = document.createElement('div');
    item.className = 'demand-item';
    const percent = Math.round(multiplier * 100);
    item.innerHTML = `
      <div class="flower-visual" data-color="${flower.color}">✿</div>
      <span class="demand-flower-name">${flower.common}:</span>
      <span class="demand-value">${percent}%</span>
    `;
    if (multiplier > 1.2) item.classList.add('high-demand');
    if (multiplier < 0.9) item.classList.add('low-demand');
    demand.appendChild(item);
  });
}

function renderBouquetsForSale() {
  const container = document.getElementById('bouquets-for-sale');
  container.innerHTML = '';
  
  if (GameState.bouquets.length === 0) {
    container.innerHTML = '<p class="hint">No arrangements ready for market</p>';
    return;
  }
  
  GameState.bouquets.forEach((bouquet, idx) => {
    const card = document.createElement('div');
    card.className = 'bouquet-card';
    card.innerHTML = `
      <div class="bouquet-flowers">${bouquet.flowers.map(f => f.emoji).join(' ')}</div>
      <div class="bouquet-value">Value: $${bouquet.value}</div>
    `;
    container.appendChild(card);
  });
}

function renderCurrentBouquet() {
  const container = document.getElementById('current-bouquet');
  container.innerHTML = '';
  
  if (GameState.currentBouquet.length === 0) {
    container.innerHTML = '<p class="hint">Select flowers from inventory</p>';
    document.getElementById('bouquet-value').textContent = '$0';
    return;
  }
  
  GameState.currentBouquet.forEach((flower, idx) => {
    const item = document.createElement('div');
    item.className = 'bouquet-flower';
    item.innerHTML = `<div class="flower-visual" data-color="${flower.color}" title="${flower.common}">\u273f</div>`;
    item.addEventListener('click', () => removeFromBouquet(idx));
    container.appendChild(item);
  });
  
  const value = calculateBouquetValue(GameState.currentBouquet);
  document.getElementById('bouquet-value').textContent = `$${value}`;
}

// ========== GAME LOGIC ==========
function selectSeed(seedId) {
  GameState.selectedSeed = seedId;
  renderSeedShop();
  showNotification(`Selected ${FLOWER_TYPES.find(f => f.id === seedId).name} seed`);
}

function plantSeed(plotIdx) {
  if (!GameState.selectedSeed) {
    showNotification('Please select a seed first!', 'warning');
    return;
  }
  
  if (GameState.garden[plotIdx]) {
    showNotification('Plot already occupied!', 'warning');
    return;
  }
  
  const flower = FLOWER_TYPES.find(f => f.id === GameState.selectedSeed);
  
  if (GameState.money < flower.cost) {
    showNotification('Not enough money!', 'error');
    return;
  }
  
  GameState.money -= flower.cost;
  GameState.garden[plotIdx] = {
    ...flower,
    stage: 0,
    watered: 0
  };
  
  showNotification(`Planted ${flower.name}!`, 'success');
  render();
}

function handlePlotClick(plotIdx) {
  const plant = GameState.garden[plotIdx];
  if (!plant) return;
  
  if (plant.stage >= plant.growth) {
    harvestPlant(plotIdx);
  } else {
    waterPlant(plotIdx);
  }
}

function waterPlant(plotIdx) {
  const plant = GameState.garden[plotIdx];
  if (!plant) return;
  
  if (plant.watered >= plant.water) {
    showNotification('This plant is already well watered today!', 'info');
    return;
  }
  
  // Manual watering costs $1
  const waterCost = 1;
  if (GameState.money < waterCost) {
    showNotification('Not enough money to water! You need $1.', 'error');
    return;
  }
  
  GameState.money -= waterCost;
  plant.watered++;
  showNotification(`💧 Watered ${plant.common} for $${waterCost}. Water level: ${plant.watered}/${plant.water}`, 'success');
  render();
}

function waterAll() {
  const cost = 5 - GameState.toolLevel;
  
  if (GameState.money < cost) {
    showNotification('Not enough money to water all plants!', 'error');
    return;
  }
  
  GameState.money -= cost;
  let count = 0;
  
  GameState.garden.forEach(plant => {
    if (plant && plant.watered < plant.water) {
      plant.watered++;
      count++;
    }
  });
  
  if (count > 0) {
    showNotification(`💧 Watered ${count} plants for $${cost}. All thirsty plants refreshed!`, 'success');
  } else {
    showNotification('All plants are already well watered!', 'info');
    GameState.money += cost; // Refund if nothing to water
  }
  render();
}

function advanceDay() {
  let grownCount = 0;
  let needsWaterCount = 0;
  let autoWateredCount = 0;
  
  // Auto-watering feature
  if (GameState.autoWaterLevel > 0) {
    GameState.garden.forEach(plant => {
      if (plant && plant.watered < plant.water) {
        const waterAmount = Math.min(GameState.autoWaterLevel, plant.water - plant.watered);
        plant.watered += waterAmount;
        autoWateredCount++;
      }
    });
  }
  
  GameState.garden.forEach(plant => {
    if (plant && plant.stage < plant.growth) {
      if (plant.watered >= plant.water) {
        plant.stage++;
        plant.watered = 0;
        grownCount++;
      } else {
        needsWaterCount++;
      }
    }
  });
  
  GameState.day++;
  
  let message = `☀️ Day ${GameState.day} begins. `;
  if (autoWateredCount > 0) {
    message += `💧 Auto-watered ${autoWateredCount} plants. `;
  }
  if (grownCount > 0) {
    message += `🌱 ${grownCount} plant${grownCount > 1 ? 's' : ''} grew! `;
  }
  if (needsWaterCount > 0) {
    message += `${needsWaterCount} plant${needsWaterCount > 1 ? 's need' : ' needs'} more water.`;
  }
  if (grownCount === 0 && needsWaterCount === 0 && autoWateredCount === 0) {
    message += 'Your garden awaits new seeds.';
  }
  
  showNotification(message, 'info');
  render();
}

function harvestPlant(plotIdx) {
  const plant = GameState.garden[plotIdx];
  if (!plant || plant.stage < plant.growth) return;
  
  GameState.inventory.push({ ...plant });
  GameState.garden[plotIdx] = null;
  
  // Track species for specimen notebook
  if (!GameState.grownSpecies.includes(plant.id)) {
    GameState.grownSpecies.push(plant.id);
  }
  
  // Unlock botanical card if this is the first time harvesting this species
  if (!GameState.collectedCards.includes(plant.id)) {
    GameState.collectedCards.push(plant.id);
    showNotification(`🌸 Harvested ${plant.common}! ✨ NEW botanical illustration unlocked for your Herbarium!`, 'success');
    renderHerbarium();
  } else {
    showNotification(`🌸 Harvested a beautiful ${plant.common}! Added to your collection.`, 'success');
  }
  
  render();
}

function addToBouquet(flower) {
  const idx = GameState.inventory.findIndex(f => f.id === flower.id);
  if (idx === -1) return;
  
  GameState.currentBouquet.push(GameState.inventory.splice(idx, 1)[0]);
  renderCurrentBouquet();
  renderInventory();
}

function removeFromBouquet(idx) {
  const flower = GameState.currentBouquet.splice(idx, 1)[0];
  GameState.inventory.push(flower);
  renderCurrentBouquet();
  renderInventory();
}

function calculateBouquetValue(flowers) {
  if (flowers.length === 0) return 0;
  
  let value = 0;
  flowers.forEach(flower => {
    const demand = GameState.marketDemand[flower.id] || 1;
    value += Math.round(flower.baseValue * demand);
  });
  
  // Bonus for variety
  const uniqueTypes = new Set(flowers.map(f => f.id)).size;
  if (uniqueTypes >= 3) value = Math.round(value * 1.3);
  else if (uniqueTypes >= 2) value = Math.round(value * 1.15);
  
  return value;
}

function completeBouquet() {
  if (GameState.currentBouquet.length === 0) {
    showNotification('Add flowers to the arrangement first!', 'warning');
    return;
  }
  
  const value = calculateBouquetValue(GameState.currentBouquet);
  GameState.bouquets.push({
    flowers: [...GameState.currentBouquet],
    value: value
  });
  
  GameState.currentBouquet = [];
  showNotification(`Arrangement completed! Worth $${value}`, 'success');
  renderCurrentBouquet();
  renderBouquetsForSale();
}

function generateMarketDemand() {
  GameState.marketDemand = {};
  FLOWER_TYPES.forEach(flower => {
    GameState.marketDemand[flower.id] = 0.7 + Math.random() * 0.9; // 0.7 to 1.6
  });
}

function endWeek() {
  if (GameState.bouquets.length === 0) {
    showNotification('No arrangements to sell!', 'warning');
    return;
  }
  
  let total = 0;
  GameState.bouquets.forEach(bouquet => {
    total += bouquet.value;
  });
  
  GameState.money += total;
  GameState.bouquets = [];
  GameState.week++;
  GameState.day = 1;
  
  generateMarketDemand();
  showNotification(`Week concluded! Sold arrangements for $${total}`, 'success');
  render();
}

// ========== UPGRADES ==========
function openUpgrades() {
  document.getElementById('upgrade-modal').classList.remove('hidden');
  renderUpgrades();
}

function closeUpgrades() {
  document.getElementById('upgrade-modal').classList.add('hidden');
}

// ========== SEED CATALOGUE MODAL ==========
function openSeedCatalogue() {
  document.getElementById('seed-catalogue-modal').classList.remove('hidden');
}

function closeSeedCatalogue() {
  document.getElementById('seed-catalogue-modal').classList.add('hidden');
}

function renderUpgrades() {
  const list = document.getElementById('upgrades-list');
  list.innerHTML = '';
  
  UPGRADES.forEach(upgrade => {
    if (GameState.upgrades.includes(upgrade.id)) return;
    
    // Check if upgrade is available
    if (upgrade.type === 'garden' && upgrade.value <= GameState.gardenSize) return;
    if (upgrade.type === 'auto-water' && upgrade.value <= GameState.autoWaterLevel) return;
    
    const card = document.createElement('div');
    card.className = 'upgrade-card';
    const description = upgrade.description ? `<div class="upgrade-desc">${upgrade.description}</div>` : '';
    card.innerHTML = `
      <div class="upgrade-name">${upgrade.name}</div>
      ${description}
      <div class="upgrade-cost">Cost: $${upgrade.cost}</div>
      <button class="action-btn upgrade-btn" ${GameState.money < upgrade.cost ? 'disabled' : ''}>Purchase</button>
    `;
    
    card.querySelector('.upgrade-btn').addEventListener('click', () => purchaseUpgrade(upgrade));
    list.appendChild(card);
  });
}

function purchaseUpgrade(upgrade) {
  if (GameState.money < upgrade.cost) return;
  
  GameState.money -= upgrade.cost;
  GameState.upgrades.push(upgrade.id);
  
  if (upgrade.type === 'garden') {
    const oldSize = GameState.gardenSize;
    GameState.gardenSize = upgrade.value;
    const newGarden = [];
    for (let i = 0; i < upgrade.value * upgrade.value; i++) {
      if (i < oldSize * oldSize) {
        newGarden.push(GameState.garden[i]);
      } else {
        newGarden.push(null);
      }
    }
    GameState.garden = newGarden;
  } else if (upgrade.type === 'tool') {
    GameState.toolLevel += upgrade.value;
  } else if (upgrade.type === 'auto-water') {
    GameState.autoWaterLevel = upgrade.value;
    showNotification(`🌧️ ${upgrade.name} activated! Your plants will be automatically watered each day.`, 'success');
  }
  
  showNotification(`✨ Purchased: ${upgrade.name}!`, 'success');
  renderUpgrades();
  render();
}

// ========== MODALS ==========
function selectWrapper(wrapper) {
  GameState.selectedWrapper = wrapper;
  document.querySelectorAll('.wrapper-option').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.wrapper === wrapper);
  });
  updateArrangementScores();
}

function selectRibbon(color) {
  GameState.selectedRibbon = color;
  document.querySelectorAll('.ribbon-option').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.color === color);
  });
  updateArrangementScores();
}

function clearArrangement() {
  GameState.arrangementFlowers.forEach(flower => {
    GameState.inventory.push(flower.data);
  });
  GameState.arrangementFlowers = [];
  GameState.selectedArrangementFlower = null;
  renderShopFlowers();
  renderArrangementCanvas();
  updateArrangementScores();
}

function rotateSelectedFlower(clockwise = true) {
  if (GameState.selectedArrangementFlower !== null) {
    const flower = GameState.arrangementFlowers[GameState.selectedArrangementFlower];
    const sensitivity = GameState.rotationSensitivity || 3;
    const delta = clockwise ? sensitivity : -sensitivity;
    flower.rotation = (flower.rotation + delta + 360) % 360;
    renderArrangementCanvas();
  }
}

function copySelectedFlower() {
  if (GameState.selectedArrangementFlower !== null) {
    const original = GameState.arrangementFlowers[GameState.selectedArrangementFlower];
    
    // Check if we have another of this flower in inventory
    const availableIndex = GameState.inventory.findIndex(f => f.id === original.data.id);
    if (availableIndex === -1) {
      showNotification('No more ' + original.data.common + ' available in inventory!', 'error');
      return;
    }
    
    // Remove from inventory
    GameState.inventory.splice(availableIndex, 1);
    
    // Create copy
    const copy = {
      data: original.data,
      x: original.x + 40,
      y: original.y + 40,
      rotation: original.rotation,
      scale: original.scale
    };
    GameState.arrangementFlowers.push(copy);
    GameState.selectedArrangementFlower = GameState.arrangementFlowers.length - 1;
    renderArrangementCanvas();
    renderShopFlowers(); // Update available flowers
    updateArrangementScores();
  }
}

function setStraight() {
  if (GameState.selectedArrangementFlower !== null) {
    const flower = GameState.arrangementFlowers[GameState.selectedArrangementFlower];
    flower.rotation = 0;
    renderArrangementCanvas();
  }
}

function cycleSensitivity() {
  const sensitivities = [1, 3, 5, 15];
  const currentIndex = sensitivities.indexOf(GameState.rotationSensitivity || 3);
  const nextIndex = (currentIndex + 1) % sensitivities.length;
  GameState.rotationSensitivity = sensitivities[nextIndex];
  
  // Update dial visual
  const indicator = document.querySelector('.dial-indicator');
  const valueDisplay = document.getElementById('sensitivity-value');
  if (indicator) {
    const rotation = nextIndex * 45; // 0°, 45°, 90°, 135°
    indicator.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
  }
  if (valueDisplay) {
    valueDisplay.textContent = sensitivities[nextIndex] + '°';
  }
}

function resizeSelectedFlower(factor) {
  if (GameState.selectedArrangementFlower !== null) {
    const flower = GameState.arrangementFlowers[GameState.selectedArrangementFlower];
    flower.scale = Math.max(0.5, Math.min(2, flower.scale * factor));
    renderArrangementCanvas();
  }
}

function renderArrangementCanvas() {
  const canvas = document.getElementById('arrangement-flowers');
  if (!canvas) return;
  canvas.innerHTML = '';
  
  GameState.arrangementFlowers.forEach((flower, idx) => {
    const elem = document.createElement('div');
    elem.className = 'canvas-flower';
    if (GameState.selectedArrangementFlower === idx) elem.classList.add('selected');
    elem.style.left = flower.x + 'px';
    elem.style.top = flower.y + 'px';
    elem.style.transform = `rotate(${flower.rotation}deg) scale(${flower.scale})`;
    elem.innerHTML = getBotanicalIllustration(flower.data.id);
    
    // Fusion 360-style point-to-point movement
    elem.addEventListener('click', (e) => {
      e.stopPropagation();
      GameState.selectedArrangementFlower = idx;
      renderArrangementCanvas();
    });
    
    canvas.appendChild(elem);
  });
  
  // Click on canvas to move selected flower
  const canvasContainer = document.getElementById('arrangement-canvas');
  if (!canvasContainer) return;
  
  canvasContainer.onclick = (e) => {
    if (e.target === canvasContainer || e.target === canvas) {
      if (GameState.selectedArrangementFlower !== null) {
        const rect = canvasContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        // Smooth animation to new position
        const flower = GameState.arrangementFlowers[GameState.selectedArrangementFlower];
        const startX = flower.x;
        const startY = flower.y;
        const duration = 300;
        const startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
          
          flower.x = startX + (clickX - startX) * easeProgress;
          flower.y = startY + (clickY - startY) * easeProgress;
          
          const elem = canvas.children[GameState.selectedArrangementFlower];
          if (elem) {
            elem.style.left = flower.x + 'px';
            elem.style.top = flower.y + 'px';
          }
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            updateArrangementScores();
          }
        };
        
        requestAnimationFrame(animate);
      }
    }
  };
}

function updateArrangementScores() {
  const flowerCount = GameState.arrangementFlowers.length;
  const uniqueTypes = new Set(GameState.arrangementFlowers.map(f => f.data.id)).size;
  
  // Define vase area (center of canvas, roughly where vase is)
  const vaseArea = { x: 150, y: 150, width: 140, height: 180 };
  
  // Check arrangement quality
  let inVaseCount = 0;
  let upsideDownCount = 0;
  let offTableCount = 0;
  let overlappingPenalty = 0;
  
  GameState.arrangementFlowers.forEach((flower, idx) => {
    // Check if in vase area
    if (flower.x > vaseArea.x - 50 && flower.x < vaseArea.x + 50 &&
        flower.y > vaseArea.y - 50 && flower.y < vaseArea.y + 80) {
      inVaseCount++;
    }
    
    // Check if upside down (rotation 135-225 degrees is bad)
    const normalizedRotation = ((flower.rotation % 360) + 360) % 360;
    if (normalizedRotation > 135 && normalizedRotation < 225) {
      upsideDownCount++;
    }
    
    // Check if off table (bottom 140px is table)
    if (flower.y > 260) {
      offTableCount++;
    }
    
    // Check for overlaps (flowers too close together)
    GameState.arrangementFlowers.forEach((other, otherIdx) => {
      if (idx !== otherIdx) {
        const distance = Math.sqrt(Math.pow(flower.x - other.x, 2) + Math.pow(flower.y - other.y, 2));
        if (distance < 20) overlappingPenalty += 0.1;
      }
    });
  });
  
  // Aesthetic score (penalized for bad placement)
  let aesthetic = Math.min(100, (flowerCount / 8) * 100);
  aesthetic -= (upsideDownCount * 15); // -15% per upside down flower
  aesthetic -= (offTableCount * 20); // -20% per flower off table
  aesthetic -= (overlappingPenalty * 10); // -10% for severe overlaps
  aesthetic = Math.max(0, aesthetic);
  const aestheticElem = document.getElementById('aesthetic-score');
  if (aestheticElem) aestheticElem.style.width = aesthetic + '%';
  
  // Trend score (based on market demand)
  let trendScore = 0;
  GameState.arrangementFlowers.forEach(flower => {
    const demand = GameState.marketDemand[flower.data.id] || 1;
    trendScore += (demand - 0.7) / 0.9 * 100;
  });
  const avgTrend = flowerCount > 0 ? trendScore / flowerCount : 0;
  const trendElem = document.getElementById('trend-score');
  if (trendElem) trendElem.style.width = Math.min(100, avgTrend) + '%';
  
  // Harmony score (based on variety and vase placement)
  let harmony = uniqueTypes >= 3 ? 100 : uniqueTypes >= 2 ? 70 : 40;
  const vasePercentage = flowerCount > 0 ? (inVaseCount / flowerCount) : 0;
  harmony = harmony * (0.4 + (vasePercentage * 0.6)); // Penalty if not in vase
  const harmonyElem = document.getElementById('harmony-score');
  if (harmonyElem) harmonyElem.style.width = Math.max(0, harmony) + '%';
  
  // Calculate total value with quality multiplier
  let value = 0;
  GameState.arrangementFlowers.forEach(flower => {
    const demand = GameState.marketDemand[flower.data.id] || 1;
    value += Math.round(flower.data.baseValue * demand);
  });
  
  // Quality multiplier (good arrangement = higher value)
  let qualityMultiplier = 1.0;
  qualityMultiplier += (vasePercentage * 0.3); // Up to +30% for flowers in vase
  qualityMultiplier -= (upsideDownCount / flowerCount) * 0.4; // -40% per upside down flower
  qualityMultiplier -= (offTableCount / flowerCount) * 0.5; // -50% per flower off table
  qualityMultiplier = Math.max(0.3, Math.min(1.5, qualityMultiplier)); // Clamp between 30%-150%
  
  value = Math.round(value * qualityMultiplier);
  
  // Bonuses
  const wrapperBonus = { classic: 1, elegant: 1.1, rustic: 1.05, luxury: 1.2 };
  value = Math.round(value * wrapperBonus[GameState.selectedWrapper]);
  if (uniqueTypes >= 3) value = Math.round(value * 1.3);
  else if (uniqueTypes >= 2) value = Math.round(value * 1.15);
  
  const valueElem = document.getElementById('arrangement-value');
  if (valueElem) valueElem.textContent = '$' + value;
  
  // Update trend hint
  const highDemand = Object.entries(GameState.marketDemand)
    .filter(([_, v]) => v > 1.2)
    .map(([k, _]) => FLOWER_TYPES.find(f => f.id === k)?.name)
    .filter(Boolean);
  
  const trendHint = document.querySelector('.trend-clue');
  if (trendHint && highDemand.length > 0) {
    trendHint.textContent = `"The latest fashion dictates ${highDemand.join(', ')} are most desired this week."`;
  }
}

function openFlowerShop() {
  document.getElementById('flower-shop-page').classList.remove('hidden');
  document.querySelector('.game-container').style.display = 'none';
  GameState.arrangementFlowers = [];
  renderShopFlowers();
  renderArrangementCanvas();
  updateArrangementScores();
}

function closeFlowerShop() {
  document.getElementById('flower-shop-page').classList.add('hidden');
  document.querySelector('.game-container').style.display = 'block';
}

function renderShopFlowers() {
  const container = document.getElementById('shop-available-flowers');
  container.innerHTML = '';
  
  if (GameState.inventory.length === 0) {
    container.innerHTML = '<p class="hint">No flowers available</p>';
    return;
  }
  
  const counts = {};
  GameState.inventory.forEach(flower => {
    counts[flower.id] = (counts[flower.id] || 0) + 1;
  });
  
  Object.entries(counts).forEach(([id, count]) => {
    const flower = FLOWER_TYPES.find(f => f.id === id);
    const item = document.createElement('div');
    item.className = 'shop-flower-item';
    item.innerHTML = `
      <div class="flower-visual">${getBotanicalIllustration(id)}</div>
      <span class="flower-label">${flower.common}</span>
      <span class="count">${count}</span>
    `;
    item.addEventListener('click', () => addFlowerToCanvas(flower));
    container.appendChild(item);
  });
}

function addFlowerToCanvas(flowerType) {
  const idx = GameState.inventory.findIndex(f => f.id === flowerType.id);
  if (idx === -1) return;
  
  const flower = GameState.inventory.splice(idx, 1)[0];
  GameState.arrangementFlowers.push({
    data: flower,
    x: Math.random() * 200 + 50,
    y: Math.random() * 200 + 50,
    rotation: Math.random() * 360,
    scale: 1
  });
  
  renderShopFlowers();
  renderArrangementCanvas();
  updateArrangementScores();
}

function createShopBouquet() {
  if (GameState.arrangementFlowers.length === 0) {
    showNotification('Add flowers to the arrangement first!', 'warning');
    return;
  }
  
  const flowers = GameState.arrangementFlowers.map(f => f.data);
  let value = 0;
  flowers.forEach(flower => {
    const demand = GameState.marketDemand[flower.id] || 1;
    value += Math.round(flower.baseValue * demand);
  });
  
  // Apply bonuses
  const uniqueTypes = new Set(flowers.map(f => f.id)).size;
  const wrapperBonus = { classic: 1, elegant: 1.1, rustic: 1.05, luxury: 1.2 };
  value = Math.round(value * wrapperBonus[GameState.selectedWrapper]);
  if (uniqueTypes >= 3) value = Math.round(value * 1.3);
  else if (uniqueTypes >= 2) value = Math.round(value * 1.15);
  
  GameState.bouquets.push({
    flowers: flowers,
    value: value,
    wrapper: GameState.selectedWrapper,
    ribbon: GameState.selectedRibbon
  });
  
  GameState.arrangementFlowers = [];
  showNotification(`Exquisite arrangement created! Worth $${value}`, 'success');
  closeFlowerShop();
  render();
}

// ========== WEATHER SYSTEM ==========
function startWeatherCycle() {
  const weathers = ['sunny', 'cloudy', 'sunny', 'sunset', 'night', 'rainy'];
  let weatherIndex = 0;
  
  function cycleWeather() {
    weatherIndex = (weatherIndex + 1) % weathers.length;
    setWeather(weathers[weatherIndex]);
  }
  
  // Change weather every 45 seconds
  GameState.weatherTimer = setInterval(cycleWeather, 45000);
  setWeather('sunny'); // Start sunny
}

function setWeather(weather) {
  GameState.currentWeather = weather;
  const sky = document.getElementById('garden-sky');
  const sun = document.getElementById('garden-sun');
  const weatherEffects = document.getElementById('weather-effects');
  
  if (!sky || !sun || !weatherEffects) return;
  
  // Remove all weather classes
  sky.classList.remove('sunny', 'cloudy', 'rainy', 'sunset', 'night');
  weatherEffects.classList.remove('rain', 'stars');
  
  // Apply new weather
  sky.classList.add(weather);
  
  // Sun visibility and effects
  if (weather === 'night') {
    sun.style.opacity = '0';
    weatherEffects.classList.add('stars');
  } else if (weather === 'rainy') {
    sun.style.opacity = '0.3';
    weatherEffects.classList.add('rain');
  } else if (weather === 'cloudy') {
    sun.style.opacity = '0.5';
  } else {
    sun.style.opacity = '1';
  }
}

function openHelp() {
  document.getElementById('help-modal').classList.remove('hidden');
}

function closeHelp() {
  document.getElementById('help-modal').classList.add('hidden');
}

function switchView(view) {
  if (view === 'grid') {
    document.getElementById('grid-view').classList.remove('hidden');
    document.getElementById('visual-view').classList.add('hidden');
    document.getElementById('grid-view-btn').classList.add('active');
    document.getElementById('visual-view-btn').classList.remove('active');
  } else {
    document.getElementById('grid-view').classList.add('hidden');
    document.getElementById('visual-view').classList.remove('hidden');
    document.getElementById('grid-view-btn').classList.remove('active');
    document.getElementById('visual-view-btn').classList.add('active');
  }
}

// ========== NOTIFICATIONS ==========
function showNotification(message, type = 'info') {
  const container = document.getElementById('notifications');
  const notif = document.createElement('div');
  notif.className = `notification ${type}`;
  notif.textContent = message;
  container.appendChild(notif);
  
  setTimeout(() => {
    notif.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}


// ========== SPECIMEN NOTEBOOK ==========
const FLOWER_ENCYCLOPEDIA = {
  'rosa-gallica': {
    description: 'Rosa gallica, commonly known as the French Rose or Gallic Rose, is one of the oldest cultivated roses, dating back to ancient times. This species is native to southern and central Europe and western Asia. The flowers are typically deep pink to red, highly fragrant, and bloom in early summer.',
    facts: 'Rosa gallica has been cultivated since at least the 12th century and was widely grown in medieval monastery gardens for medicinal purposes. The petals retain their fragrance even when dried, making them popular for potpourri. This species is one of the parents of many modern rose varieties.',
    cultivation: 'Prefers full sun and well-drained soil. Hardy in zones 4-9. Forms compact bushes 3-4 feet tall. Requires minimal pruning compared to modern roses. Highly disease-resistant and drought-tolerant once established.'
  },
  'rosa-chinensis': {
    description: 'Rosa chinensis, the China Rose, revolutionized rose breeding when introduced to Europe in the 18th century. Native to southwest China, this rose brought the ability to bloom repeatedly throughout the season, a trait absent in European roses.',
    facts: 'China Roses were cultivated in Chinese gardens for over a thousand years before reaching Europe. They bloom continuously from spring to frost, unlike European roses which bloom once. The famous \'Old Blush\' China rose, introduced in 1752, is still grown today.',
    cultivation: 'Thrives in zones 7-9, needs protection in colder climates. Requires fertile, well-drained soil and regular watering. Responds well to light pruning. More tender than European roses but offers unmatched repeat blooming.'
  },
  'bellis-perennis': {
    description: 'Bellis perennis, the Common Daisy or English Daisy, is a perennial herbaceous plant native to western, central, and northern Europe. The cheerful white petals with yellow centers have made it a beloved garden flower for centuries.',
    facts: 'The name "daisy" comes from "day\'s eye" because the flowers close at night and open at dawn. In medieval times, daisies symbolized innocence and were associated with the Virgin Mary. The plant has been used in traditional medicine for bruises and wounds.',
    cultivation: 'Extremely hardy, grows in zones 4-8. Prefers full sun to partial shade and moist, well-drained soil. Self-seeds readily and can naturalize in lawns. Blooms from early spring through fall. Edible flowers can be used in salads.'
  },
  'leucanthemum-vulgare': {
    description: 'Leucanthemum vulgare, the Oxeye Daisy, is a perennial wildflower native to Europe and temperate Asia. Larger than the common daisy, it features distinctive white rays surrounding a golden disk, blooming prolifically in meadows and roadsides.',
    facts: 'This plant was introduced to North America in the 1700s and quickly naturalized. The flowers track the sun throughout the day, a behavior called heliotropism. Children traditionally use oxeye daisies for the game "he loves me, he loves me not."',
    cultivation: 'Hardy in zones 3-9. Extremely adaptable to various soil types. Prefers full sun. Can become invasive in some regions. Excellent for wildflower meadows and pollinator gardens. Drought-tolerant once established.'
  },
  'lilium-candidum': {
    description: 'Lilium candidum, the Madonna Lily, is one of the oldest cultivated plants, with depictions found in Minoan frescoes from 1580 BC. Native to the Balkans and West Asia, this pure white lily has deep religious and cultural significance.',
    facts: 'Associated with the Virgin Mary in Christian art, symbolizing purity and virtue. Unlike most lilies, it produces autumn foliage that persists through winter. The bulbs were used medicinally in ancient Greece and Rome. Intensely fragrant, especially at night.',
    cultivation: 'Grows in zones 6-9. Unique among lilies, it requires shallow planting with the bulb top just below soil surface. Prefers alkaline soil. Plant in late summer for spring blooms. Susceptible to botrytis in humid conditions.'
  },
  'lilium-martagon': {
    description: 'Lilium martagon, the Turk\'s Cap Lily, is native to Europe and Asia. Named for the distinctive recurved petals that resemble a Turkish turban, this woodland lily produces whorls of nodding, spotted flowers on tall stems.',
    facts: 'One of the earliest lilies to be cultivated in European gardens. Can live for decades and improves with age. The bulbs were once eaten in Siberia during famines. Extremely cold-hardy and shade-tolerant compared to most lilies.',
    cultivation: 'Hardy to zone 3. Prefers partial shade and humus-rich, well-drained soil. Very slow to establish but long-lived once settled. Can take 2-3 years to bloom from bulb. Plant bulbs deep, at least 6 inches. Deer-resistant.'
  },
  'tulipa-gesneriana': {
    description: 'Tulipa gesneriana, the Didier\'s Tulip, is the primary ancestor of most cultivated tulips. Native to Turkey and Central Asia, tulips were introduced to Europe in the 16th century, sparking "Tulip Mania" in 1637 Holland.',
    facts: 'During Tulip Mania, a single bulb could cost more than a house. The Ottoman Empire cultivated tulips for centuries before they reached Europe. Tulip petals are edible and were eaten during Dutch famine in WWII.',
    cultivation: 'Grows in zones 3-8. Requires cold winter dormancy. Plant bulbs in fall, 6-8 inches deep. Needs full sun and well-drained soil. After blooming, allow foliage to yellow naturally. Can be treated as annuals in warm climates.'
  },
  'tulipa-clusiana': {
    description: 'Tulipa clusiana, the Lady Tulip or Candy Tulip, is a delicate species tulip from Iran and the Middle East. Its elegant white and red striped petals open wide in sunlight and close at night, creating a starry effect.',
    facts: 'Named after Carolus Clusius, the botanist who first cultivated tulips in the Netherlands. Unlike hybrid tulips, species tulips reliably perennialize and multiply. The narrow, grass-like foliage blends easily into gardens.',
    cultivation: 'Hardy in zones 4-8. More heat-tolerant than most tulips. Prefers full sun and excellent drainage. Plant 4-6 inches deep. Returns year after year, unlike many hybrid tulips. Excellent for rock gardens and naturalizing.'
  },
  'lavandula-angustifolia': {
    description: 'Lavandula angustifolia, English Lavender, is a fragrant Mediterranean shrub prized for its aromatic flowers and foliage. Despite its common name, it originates from the Mediterranean region, not England.',
    facts: 'Romans used lavender to scent bathwater - the name derives from Latin "lavare" (to wash). Dried lavender retains scent for years, making it ideal for sachets and potpourri. Lavender oil has antiseptic and calming properties documented since ancient times.',
    cultivation: 'Grows in zones 5-9. Requires full sun and excellent drainage - hates wet roots. Drought-tolerant once established. Prune after flowering to maintain compact shape. Sandy or gravelly soil is ideal. Deer and rabbit resistant.'
  },
  'lavandula-stoechas': {
    description: 'Lavandula stoechas, Spanish Lavender or French Lavender, features distinctive "rabbit ear" bracts atop dense flower spikes. Native to the Mediterranean, it blooms earlier than English lavender with a more resinous scent.',
    facts: 'The species name references the Stoechades Islands off southern France where it grew abundantly. More ornamental but less cold-hardy than English lavender. The unusual bracts are actually modified leaves, not petals.',
    cultivation: 'Hardy in zones 7-9, needs winter protection in colder areas. Even more drought-demanding than English lavender. Prefers acidic to neutral soil. Continuous bloomer from spring to summer. Excellent in containers. Cut back hard after flowering.'
  }
};

function openSpecimenNotebook() {
  document.getElementById('specimen-notebook-modal').classList.remove('hidden');
  renderSpecimenList();
}

function closeSpecimenNotebook() {
  document.getElementById('specimen-notebook-modal').classList.add('hidden');
}

function renderSpecimenList() {
  const list = document.getElementById('specimen-list');
  list.innerHTML = '';
  
  if (GameState.grownSpecies.length === 0) {
    list.innerHTML = '<p class="hint">No specimens cultivated yet. Grow your first flower to begin your botanical collection!</p>';
    return;
  }
  
  GameState.grownSpecies.forEach(flowerId => {
    const flower = FLOWER_TYPES.find(f => f.id === flowerId);
    const encyclopedia = FLOWER_ENCYCLOPEDIA[flowerId];
    
    if (!flower) return;
    
    const entry = document.createElement('div');
    entry.className = 'specimen-entry';
    
    const illustration = getBotanicalIllustration ? getBotanicalIllustration(flowerId) : '';
    
    entry.innerHTML = `
      <div class="specimen-header">
        <div class="specimen-illustration">${illustration}</div>
        <div class="specimen-title">
          <h3>${flower.common}</h3>
          <p class="scientific-name"><em>${flower.name}</em></p>
          <p class="flower-family">Family: ${flower.color} series</p>
        </div>
      </div>
      <div class="specimen-body">
        ${encyclopedia ? `
          <div class="specimen-section">
            <h4>Description</h4>
            <p>${encyclopedia.description}</p>
          </div>
          <div class="specimen-section">
            <h4>Historical & Cultural Facts</h4>
            <p>${encyclopedia.facts}</p>
          </div>
          <div class="specimen-section">
            <h4>Cultivation Notes</h4>
            <p>${encyclopedia.cultivation}</p>
          </div>
        ` : `
          <div class="specimen-section">
            <p>A beautiful ${flower.color} flowering plant. Further botanical documentation pending.</p>
          </div>
        `}
      </div>
    `;
    
    list.appendChild(entry);
  });
  
  // Add progress indicator
  const progress = document.createElement('div');
  progress.className = 'specimen-progress';
  progress.innerHTML = `<p><strong>Specimens Documented:</strong> ${GameState.grownSpecies.length} / ${FLOWER_TYPES.length} species</p>`;
  list.appendChild(progress);
}
