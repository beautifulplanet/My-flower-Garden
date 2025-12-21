// src/modules/upgrades.js - Upgrades & Shop System

import { GameState, updateMoneyDisplay } from './state.js';
import { showNotification } from './notifications.js';
import { UPGRADES } from '../data/upgrades.js';
import { render } from './render.js';

/**
 * Open the upgrades modal
 */
export function openUpgrades() {
  document.getElementById('upgrade-modal').classList.remove('hidden');
  renderUpgrades();
}

/**
 * Close the upgrades modal
 */
export function closeUpgrades() {
  document.getElementById('upgrade-modal').classList.add('hidden');
}

/**
 * Open the seed catalogue modal
 */
export function openSeedCatalogue() {
  document.getElementById('seed-catalogue-modal').classList.remove('hidden');
}

/**
 * Close the seed catalogue modal
 */
export function closeSeedCatalogue() {
  document.getElementById('seed-catalogue-modal').classList.add('hidden');
}

/**
 * Render the upgrades list
 */
export function renderUpgrades() {
  const list = document.getElementById('upgrades-list');
  if (!list) return;
  
  list.innerHTML = '';
  
  UPGRADES.forEach(upgrade => {
    // Skip already purchased upgrades
    if (GameState.upgrades.includes(upgrade.id)) return;
    
    // Check if upgrade is available (larger gardens only show if not already at that size)
    if (upgrade.type === 'garden' && upgrade.value <= GameState.gardenSize) return;
    if (upgrade.type === 'auto-water' && upgrade.value <= GameState.autoWaterLevel) return;
    
    const card = document.createElement('div');
    card.className = 'upgrade-card';
    const description = upgrade.description ? `<div class="upgrade-desc">${upgrade.description}</div>` : '';
    const canAfford = GameState.money >= upgrade.cost;
    
    card.innerHTML = `
      <div class="upgrade-name">${upgrade.name}</div>
      ${description}
      <div class="upgrade-cost">Cost: $${upgrade.cost}</div>
      <button class="action-btn upgrade-btn" ${!canAfford ? 'disabled' : ''}>Purchase</button>
    `;
    
    card.querySelector('.upgrade-btn').addEventListener('click', () => purchaseUpgrade(upgrade));
    list.appendChild(card);
  });
  
  // Show message if no upgrades available
  if (list.children.length === 0) {
    list.innerHTML = '<p class="hint">All available upgrades purchased! More coming soon...</p>';
  }
}

/**
 * Purchase an upgrade
 * @param {Object} upgrade - The upgrade to purchase
 */
export function purchaseUpgrade(upgrade) {
  if (GameState.money < upgrade.cost) {
    showNotification('Not enough money!', 'error');
    return;
  }
  
  GameState.money -= upgrade.cost;
  GameState.upgrades.push(upgrade.id);
  
  // Apply upgrade effects
  switch (upgrade.type) {
    case 'garden':
      expandGarden(upgrade.value);
      break;
    case 'tool':
      GameState.toolLevel += upgrade.value;
      break;
    case 'auto-water':
      GameState.autoWaterLevel = upgrade.value;
      showNotification(`🌧️ ${upgrade.name} activated! Your plants will be automatically watered each day.`, 'success');
      break;
    case 'seed':
      // Seed unlocks are handled via the upgrades array check in render
      break;
  }
  
  showNotification(`✨ Purchased: ${upgrade.name}!`, 'success');
  updateMoneyDisplay();
  renderUpgrades();
  render();
}

/**
 * Expand the garden to a new size
 * @param {number} newSize - New garden dimension (e.g., 6 for 6x6)
 */
function expandGarden(newSize) {
  const oldSize = GameState.gardenSize;
  GameState.gardenSize = newSize;
  
  // Create new garden preserving existing plants
  const newGarden = [];
  for (let row = 0; row < newSize; row++) {
    for (let col = 0; col < newSize; col++) {
      if (row < oldSize && col < oldSize) {
        const oldIdx = row * oldSize + col;
        newGarden.push(GameState.garden[oldIdx]);
      } else {
        newGarden.push(null);
      }
    }
  }
  
  GameState.garden = newGarden;
}

/**
 * Check if a seed type is unlocked
 * @param {string} seedId - The flower ID
 * @returns {boolean} - Whether the seed is unlocked
 */
export function isSeedUnlocked(seedId) {
  return GameState.upgrades.includes(`unlock-${seedId}`);
}
