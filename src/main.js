// src/main.js - Main Entry Point
// This file imports all modules and initializes the game

import { GameState, initializeGarden, updateMoneyDisplay } from './modules/state.js';
import { showNotification } from './modules/notifications.js';
import { render, renderSeedShop, renderUpgrades } from './modules/render.js';
import { selectSeed, plantSeed, handlePlotClick, waterPlant, waterAll, advanceDay, harvestPlant } from './modules/garden.js';
import { addToBouquet, removeFromBouquet, calculateBouquetValue, completeBouquet, generateMarketDemand, endWeek } from './modules/market.js';
import { startWeatherCycle, stopWeatherCycle, setWeather } from './modules/weather.js';
import { openUpgrades, closeUpgrades, openSeedCatalogue, closeSeedCatalogue, purchaseUpgrade } from './modules/upgrades.js';
import { openFlowerShop, closeFlowerShop, createShopBouquet, renderShopFlowers, renderArrangementCanvas, updateArrangementScores } from './modules/shop.js';
import { openSpecimenNotebook, closeSpecimenNotebook, renderSpecimenList } from './modules/notebook.js';
import { openHelp, closeHelp, switchView, selectWrapper, selectRibbon, clearArrangement, rotateSelectedFlower, copySelectedFlower, setStraight, cycleSensitivity, resizeSelectedFlower } from './modules/ui.js';
import { FLOWER_TYPES } from './data/flowers.js';
import { UPGRADES } from './data/upgrades.js';

// Expose handlers to global scope for render module to access
window.gardenHandlers = {
  selectSeed,
  plantSeed,
  handlePlotClick,
  waterPlant,
  harvestPlant
};

window.marketHandlers = {
  addToBouquet,
  removeFromBouquet,
  calculateBouquetValue
};

// Expose game state and data globally for backward compatibility
window.GameState = GameState;
window.FLOWER_TYPES = FLOWER_TYPES;
window.UPGRADES = UPGRADES;

// Initialize game on DOM ready
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

/**
 * Initialize the game
 */
function initGame() {
  initializeGarden();
}

/**
 * Attach all event listeners
 */
function attachEventListeners() {
  // Garden actions
  const waterAllBtn = document.getElementById('water-all-btn');
  const nextDayBtn = document.getElementById('next-day-btn');
  if (waterAllBtn) waterAllBtn.addEventListener('click', waterAll);
  if (nextDayBtn) nextDayBtn.addEventListener('click', advanceDay);
  
  // View toggle
  const gridViewBtn = document.getElementById('grid-view-btn');
  const visualViewBtn = document.getElementById('visual-view-btn');
  if (gridViewBtn) gridViewBtn.addEventListener('click', () => switchView('grid'));
  if (visualViewBtn) visualViewBtn.addEventListener('click', () => switchView('visual'));
  
  // Market
  const endWeekBtn = document.getElementById('end-week-btn');
  if (endWeekBtn) endWeekBtn.addEventListener('click', endWeek);
  
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
  const closeFlowerShopBtn = document.getElementById('close-flower-shop');
  const closeUpgradesBtn = document.getElementById('close-upgrades');
  const closeSpecimenNotebookBtn = document.getElementById('close-specimen-notebook');
  const closeSpecimenBtn = document.getElementById('close-specimen-btn');
  const closeHelpBtn = document.getElementById('close-help');
  
  if (closeFlowerShopBtn) closeFlowerShopBtn.addEventListener('click', closeFlowerShop);
  if (closeUpgradesBtn) closeUpgradesBtn.addEventListener('click', closeUpgrades);
  if (closeSpecimenNotebookBtn) closeSpecimenNotebookBtn.addEventListener('click', closeSpecimenNotebook);
  if (closeSpecimenBtn) closeSpecimenBtn.addEventListener('click', closeSpecimenNotebook);
  if (closeHelpBtn) closeHelpBtn.addEventListener('click', closeHelp);
  
  // Seed catalogue modal
  const seedCatalogueBtn = document.getElementById('open-seed-catalogue-btn');
  const closeSeedCatalogueBtn = document.getElementById('close-seed-catalogue-btn');
  if (seedCatalogueBtn) seedCatalogueBtn.addEventListener('click', openSeedCatalogue);
  if (closeSeedCatalogueBtn) closeSeedCatalogueBtn.addEventListener('click', closeSeedCatalogue);
  
  // Shop bouquet and arrangement tools
  const createShopBouquetBtn = document.getElementById('create-shop-bouquet');
  const clearArrangementBtn = document.getElementById('clear-arrangement');
  const copyFlowerBtn = document.getElementById('copy-flower-btn');
  const setStraightBtn = document.getElementById('set-straight-btn');
  const rotateCounterBtn = document.getElementById('rotate-counter-btn');
  const rotateClockwiseBtn = document.getElementById('rotate-clockwise-btn');
  const sizeUpBtn = document.getElementById('size-up');
  const sizeDownBtn = document.getElementById('size-down');
  const sensitivityDialBtn = document.getElementById('sensitivity-dial');
  
  if (createShopBouquetBtn) createShopBouquetBtn.addEventListener('click', createShopBouquet);
  if (clearArrangementBtn) clearArrangementBtn.addEventListener('click', clearArrangement);
  if (copyFlowerBtn) copyFlowerBtn.addEventListener('click', copySelectedFlower);
  if (setStraightBtn) setStraightBtn.addEventListener('click', setStraight);
  if (rotateCounterBtn) rotateCounterBtn.addEventListener('click', () => rotateSelectedFlower(false));
  if (rotateClockwiseBtn) rotateClockwiseBtn.addEventListener('click', () => rotateSelectedFlower(true));
  if (sizeUpBtn) sizeUpBtn.addEventListener('click', () => resizeSelectedFlower(1.2));
  if (sizeDownBtn) sizeDownBtn.addEventListener('click', () => resizeSelectedFlower(0.8));
  if (sensitivityDialBtn) sensitivityDialBtn.addEventListener('click', cycleSensitivity);
  
  // Wrapper and ribbon selection
  document.querySelectorAll('.wrapper-option').forEach(opt => {
    opt.addEventListener('click', () => selectWrapper(opt.dataset.wrapper));
  });
  document.querySelectorAll('.ribbon-option').forEach(opt => {
    opt.addEventListener('click', () => selectRibbon(opt.dataset.color));
  });
}

// Export for potential use
export {
  GameState,
  FLOWER_TYPES,
  UPGRADES,
  render,
  showNotification
};
