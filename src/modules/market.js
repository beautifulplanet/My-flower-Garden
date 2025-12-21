// src/modules/market.js - Market & Bouquet Logic

import { GameState, updateMoneyDisplay } from './state.js';
import { showNotification } from './notifications.js';
import { FLOWER_TYPES } from '../data/flowers.js';
import { render, renderCurrentBouquet, renderBouquetsForSale, renderInventory } from './render.js';

/**
 * Add a flower from inventory to current bouquet
 * @param {Object} flower - The flower to add
 */
export function addToBouquet(flower) {
  const idx = GameState.inventory.findIndex(f => f.id === flower.id);
  if (idx === -1) return;
  
  GameState.currentBouquet.push(GameState.inventory.splice(idx, 1)[0]);
  renderCurrentBouquet();
  renderInventory();
}

/**
 * Remove a flower from bouquet back to inventory
 * @param {number} idx - Index in the current bouquet
 */
export function removeFromBouquet(idx) {
  const flower = GameState.currentBouquet.splice(idx, 1)[0];
  GameState.inventory.push(flower);
  renderCurrentBouquet();
  renderInventory();
}

/**
 * Calculate the value of a bouquet based on flowers and market demand
 * @param {Array} flowers - Array of flowers in the bouquet
 * @returns {number} - Total value
 */
export function calculateBouquetValue(flowers) {
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

/**
 * Complete the current bouquet and add to sale list
 */
export function completeBouquet() {
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
  showNotification(`💐 Arrangement completed! Worth $${value}`, 'success');
  renderCurrentBouquet();
  renderBouquetsForSale();
}

/**
 * Generate random market demand for all flower types
 */
export function generateMarketDemand() {
  GameState.marketDemand = {};
  FLOWER_TYPES.forEach(flower => {
    GameState.marketDemand[flower.id] = 0.7 + Math.random() * 0.9; // 0.7 to 1.6
  });
}

/**
 * End the week - sell all bouquets and start new week
 */
export function endWeek() {
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
  showNotification(`📦 Week concluded! Sold arrangements for $${total}`, 'success');
  updateMoneyDisplay();
  render();
}
