// src/modules/state.js - Game State Management

// Game State - Central state object
export const GameState = {
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

// Initialize the garden array based on size
export function initializeGarden() {
  const size = GameState.gardenSize;
  GameState.garden = Array(size * size).fill(null).map(() => null);
}

// Reset game to initial state
export function resetGameState() {
  GameState.money = 100;
  GameState.week = 1;
  GameState.day = 1;
  GameState.gardenSize = 4;
  GameState.inventory = [];
  GameState.bouquets = [];
  GameState.marketDemand = {};
  GameState.selectedSeed = null;
  GameState.currentBouquet = [];
  GameState.upgrades = [];
  GameState.toolLevel = 0;
  GameState.autoWaterLevel = 0;
  GameState.arrangementFlowers = [];
  GameState.selectedWrapper = 'classic';
  GameState.selectedRibbon = '#8b4557';
  GameState.selectedArrangementFlower = null;
  GameState.collectedCards = [];
  GameState.grownSpecies = [];
  GameState.rotationSensitivity = 3;
  GameState.currentWeather = 'sunny';
  initializeGarden();
}

// Update money with optional notification
export function updateMoney(amount, reason = '') {
  GameState.money += amount;
  updateMoneyDisplay();
  return GameState.money;
}

// Update money display in UI
export function updateMoneyDisplay() {
  const moneyEl = document.getElementById('money');
  const moneyDisplayEl = document.getElementById('money-display');
  if (moneyEl) moneyEl.textContent = `$${GameState.money}`;
  if (moneyDisplayEl) moneyDisplayEl.textContent = `$${GameState.money}`;
}

// Check if player can afford something
export function canAfford(cost) {
  return GameState.money >= cost;
}

// Spend money (returns true if successful)
export function spendMoney(amount) {
  if (canAfford(amount)) {
    GameState.money -= amount;
    updateMoneyDisplay();
    return true;
  }
  return false;
}
