// src/data/upgrades.js - Upgrades Data

export const UPGRADES = [
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
  
  // Tier 6 unlocks - Ultra Rare & Exotic
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

// Helper function to get upgrade by ID
export function getUpgradeById(id) {
  return UPGRADES.find(u => u.id === id);
}

// Get available upgrades (not purchased yet)
export function getAvailableUpgrades(purchasedUpgrades) {
  return UPGRADES.filter(u => !purchasedUpgrades.includes(u.id));
}
