// utils.js - Core data structures and utilities

// Flower types
export const FLOWER_TYPES = [
  { name: 'Tulip', type: 'basic', growth: 3, water: 2, soil: 2, rarity: 1, seedCost: 5 },
  { name: 'Fern', type: 'filler', growth: 2, water: 1, soil: 1, rarity: 1, seedCost: 3 },
  { name: 'Dandelion', type: 'easy', growth: 1, water: 1, soil: 1, rarity: 0.5, seedCost: 1 }
  // Add more as unlocked
];

// Player state
export const Player = {
  money: 50,
  inventory: [], // harvested flowers
  seeds: { Tulip: 0, Fern: 0, Dandelion: 0 },
  upgrades: {
    gardenSize: 4,
    tools: 1,
    soil: 1
  },
  album: [] // saved bouquets
};

// Market state
export const Market = {
  week: 1,
  demand: {}, // e.g., { Tulip: 1.2, Fern: 0.8 }
};

// Utility functions
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function formatCurrency(val) {
  return `$${val.toFixed(2)}`;
}

// Expose for browser modules
if (typeof window !== 'undefined') {
  window.Player = Player;
  window.Market = Market;
  window.FLOWER_TYPES = FLOWER_TYPES;
  window.formatCurrency = formatCurrency;
  window.randomInt = randomInt;
}
