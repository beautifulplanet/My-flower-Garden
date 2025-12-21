// src/modules/shop.js - Flower Shop Module

import { GameState } from './state.js';
import { FLOWER_TYPES } from '../data/flowers.js';
import { showNotification } from './notifications.js';
import { render } from './render.js';

/**
 * Open the flower shop page
 */
export function openFlowerShop() {
  document.getElementById('flower-shop-page').classList.remove('hidden');
  document.querySelector('.game-container').style.display = 'none';
  GameState.arrangementFlowers = [];
  renderShopFlowers();
  renderArrangementCanvas();
  updateArrangementScores();
}

/**
 * Close the flower shop page
 */
export function closeFlowerShop() {
  document.getElementById('flower-shop-page').classList.add('hidden');
  document.querySelector('.game-container').style.display = 'block';
}

/**
 * Render available flowers in the shop
 */
export function renderShopFlowers() {
  const container = document.getElementById('shop-available-flowers');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (GameState.inventory.length === 0) {
    container.innerHTML = '<p class="hint">No flowers available. Grow and harvest flowers first!</p>';
    return;
  }
  
  // Count flowers by type
  const counts = {};
  GameState.inventory.forEach(flower => {
    counts[flower.id] = (counts[flower.id] || 0) + 1;
  });
  
  Object.entries(counts).forEach(([id, count]) => {
    const flower = FLOWER_TYPES.find(f => f.id === id);
    if (!flower) return;
    
    const item = document.createElement('div');
    item.className = 'shop-flower-item';
    
    // Use getBotanicalIllustration if available
    const illustration = typeof getBotanicalIllustration === 'function' 
      ? getBotanicalIllustration(id) 
      : `<span class="flower-visual" data-color="${flower.color}">✿</span>`;
    
    item.innerHTML = `
      <div class="flower-visual">${illustration}</div>
      <span class="flower-label">${flower.common}</span>
      <span class="count">×${count}</span>
    `;
    item.addEventListener('click', () => addFlowerToCanvas(flower));
    container.appendChild(item);
  });
}

/**
 * Add a flower to the arrangement canvas
 * @param {Object} flowerType - The flower type to add
 */
export function addFlowerToCanvas(flowerType) {
  const idx = GameState.inventory.findIndex(f => f.id === flowerType.id);
  if (idx === -1) return;
  
  const flower = GameState.inventory.splice(idx, 1)[0];
  GameState.arrangementFlowers.push({
    id: Date.now(), // Unique ID for selection
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

/**
 * Create a bouquet from the current arrangement
 */
export function createShopBouquet() {
  if (GameState.arrangementFlowers.length === 0) {
    showNotification('Add flowers to the arrangement first!', 'warning');
    return;
  }
  
  const flowers = GameState.arrangementFlowers.map(f => f.data);
  let value = 0;
  
  // Calculate base value from flowers and market demand
  flowers.forEach(flower => {
    const demand = GameState.marketDemand[flower.id] || 1;
    value += Math.round(flower.baseValue * demand);
  });
  
  // Apply wrapper bonuses
  const wrapperBonus = { classic: 1, elegant: 1.1, rustic: 1.05, luxury: 1.2 };
  value = Math.round(value * (wrapperBonus[GameState.selectedWrapper] || 1));
  
  // Apply variety bonuses
  const uniqueTypes = new Set(flowers.map(f => f.id)).size;
  if (uniqueTypes >= 3) value = Math.round(value * 1.3);
  else if (uniqueTypes >= 2) value = Math.round(value * 1.15);
  
  // Add to bouquets for sale
  GameState.bouquets.push({
    flowers: flowers,
    value: value,
    wrapper: GameState.selectedWrapper,
    ribbon: GameState.selectedRibbon
  });
  
  GameState.arrangementFlowers = [];
  showNotification(`💐 Exquisite arrangement created! Worth $${value}`, 'success');
  closeFlowerShop();
  render();
}

/**
 * Render the arrangement canvas
 */
export function renderArrangementCanvas() {
  const canvas = document.getElementById('arrangement-canvas');
  if (!canvas) return;
  
  canvas.innerHTML = '';
  
  // Add wrapper background
  const wrapperStyles = {
    classic: 'rgba(245, 235, 220, 0.8)',
    elegant: 'rgba(240, 230, 240, 0.8)',
    rustic: 'rgba(230, 220, 200, 0.8)',
    luxury: 'rgba(250, 240, 230, 0.8)'
  };
  canvas.style.background = wrapperStyles[GameState.selectedWrapper] || wrapperStyles.classic;
  
  // Render each flower
  GameState.arrangementFlowers.forEach((flower, idx) => {
    const flowerEl = document.createElement('div');
    flowerEl.className = 'canvas-flower';
    flowerEl.style.left = `${flower.x}px`;
    flowerEl.style.top = `${flower.y}px`;
    flowerEl.style.transform = `rotate(${flower.rotation}deg) scale(${flower.scale})`;
    
    // Use botanical illustration
    const illustration = typeof getBotanicalIllustration === 'function'
      ? getBotanicalIllustration(flower.data.id)
      : `<span class="flower-visual" data-color="${flower.data.color}">✿</span>`;
    
    flowerEl.innerHTML = illustration;
    
    // Selection state
    if (GameState.selectedArrangementFlower === flower.id) {
      flowerEl.classList.add('selected');
    }
    
    // Click to select
    flowerEl.addEventListener('click', (e) => {
      e.stopPropagation();
      GameState.selectedArrangementFlower = flower.id;
      renderArrangementCanvas();
    });
    
    // Drag functionality
    makeDraggable(flowerEl, flower);
    
    canvas.appendChild(flowerEl);
  });
  
  // Click canvas to deselect
  canvas.addEventListener('click', () => {
    GameState.selectedArrangementFlower = null;
    renderArrangementCanvas();
  });
}

/**
 * Make a flower element draggable
 * @param {HTMLElement} element - The element to make draggable
 * @param {Object} flower - The flower data object
 */
function makeDraggable(element, flower) {
  let isDragging = false;
  let startX, startY;
  
  element.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - flower.x;
    startY = e.clientY - flower.y;
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    flower.x = e.clientX - startX;
    flower.y = e.clientY - startY;
    element.style.left = `${flower.x}px`;
    element.style.top = `${flower.y}px`;
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      updateArrangementScores();
    }
  });
}

/**
 * Update arrangement scores display
 */
export function updateArrangementScores() {
  const scoresEl = document.getElementById('arrangement-scores');
  if (!scoresEl) return;
  
  const flowers = GameState.arrangementFlowers.map(f => f.data);
  
  if (flowers.length === 0) {
    scoresEl.innerHTML = '<p class="hint">Add flowers to see scores</p>';
    return;
  }
  
  // Calculate scores
  let baseValue = 0;
  flowers.forEach(flower => {
    const demand = GameState.marketDemand[flower.id] || 1;
    baseValue += Math.round(flower.baseValue * demand);
  });
  
  const wrapperBonus = { classic: 1, elegant: 1.1, rustic: 1.05, luxury: 1.2 };
  const wrapperMultiplier = wrapperBonus[GameState.selectedWrapper] || 1;
  
  const uniqueTypes = new Set(flowers.map(f => f.id)).size;
  const varietyMultiplier = uniqueTypes >= 3 ? 1.3 : uniqueTypes >= 2 ? 1.15 : 1;
  
  const totalValue = Math.round(baseValue * wrapperMultiplier * varietyMultiplier);
  
  scoresEl.innerHTML = `
    <div class="score-item">Base Value: $${baseValue}</div>
    <div class="score-item">Wrapper Bonus: ×${wrapperMultiplier.toFixed(2)}</div>
    <div class="score-item">Variety (${uniqueTypes} types): ×${varietyMultiplier.toFixed(2)}</div>
    <div class="score-total">Total: $${totalValue}</div>
  `;
}
