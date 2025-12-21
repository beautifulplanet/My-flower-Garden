// src/modules/garden.js - Garden Logic

import { GameState, updateMoneyDisplay } from './state.js';
import { showNotification } from './notifications.js';
import { FLOWER_TYPES } from '../data/flowers.js';
import { render, renderHerbarium } from './render.js';

/**
 * Select a seed type for planting
 * @param {string} seedId - ID of the flower type
 */
export function selectSeed(seedId) {
  GameState.selectedSeed = seedId;
  const flower = FLOWER_TYPES.find(f => f.id === seedId);
  showNotification(`Selected ${flower.common} seed`, 'info');
}

/**
 * Plant a seed in a plot
 * @param {number} plotIdx - Index of the garden plot
 */
export function plantSeed(plotIdx) {
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
  updateMoneyDisplay();
  
  GameState.garden[plotIdx] = {
    ...flower,
    stage: 0,
    watered: 0
  };
  
  showNotification(`🌱 Planted ${flower.common}!`, 'success');
  render();
}

/**
 * Handle click on a garden plot
 * @param {number} plotIdx - Index of the plot clicked
 */
export function handlePlotClick(plotIdx) {
  const plant = GameState.garden[plotIdx];
  if (!plant) return;
  
  if (plant.stage >= plant.growth) {
    harvestPlant(plotIdx);
  } else {
    waterPlant(plotIdx);
  }
}

/**
 * Water a single plant (costs $1)
 * @param {number} plotIdx - Index of the plant to water
 */
export function waterPlant(plotIdx) {
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
  updateMoneyDisplay();
  plant.watered++;
  showNotification(`💧 Watered ${plant.common} for $${waterCost}. Water level: ${plant.watered}/${plant.water}`, 'success');
  render();
}

/**
 * Water all plants at once (costs $5 minus tool level)
 */
export function waterAll() {
  const cost = Math.max(1, 5 - GameState.toolLevel);
  
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
    showNotification(`💧 Watered ${count} plants for $${cost}!`, 'success');
  } else {
    showNotification('All plants are already well watered!', 'info');
    GameState.money += cost; // Refund if nothing to water
  }
  
  updateMoneyDisplay();
  render();
}

/**
 * Advance to the next day - plants grow if watered
 */
export function advanceDay() {
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
  
  // Process plant growth
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
  
  // Build notification message
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

/**
 * Harvest a fully grown plant
 * @param {number} plotIdx - Index of the plant to harvest
 */
export function harvestPlant(plotIdx) {
  const plant = GameState.garden[plotIdx];
  if (!plant || plant.stage < plant.growth) return;
  
  // Add to inventory
  GameState.inventory.push({ ...plant });
  GameState.garden[plotIdx] = null;
  
  // Track species for specimen notebook
  if (!GameState.grownSpecies.includes(plant.id)) {
    GameState.grownSpecies.push(plant.id);
  }
  
  // Unlock botanical card if first time harvesting this species
  if (!GameState.collectedCards.includes(plant.id)) {
    GameState.collectedCards.push(plant.id);
    showNotification(`🌸 Harvested ${plant.common}! ✨ NEW botanical illustration unlocked!`, 'success');
    renderHerbarium();
  } else {
    showNotification(`🌸 Harvested ${plant.common}!`, 'success');
  }
  
  render();
}
