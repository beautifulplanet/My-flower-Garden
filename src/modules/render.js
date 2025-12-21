// src/modules/render.js - Rendering Functions

import { GameState } from './state.js';
import { FLOWER_TYPES } from '../data/flowers.js';

// Import getBotanicalIllustration from external file (if available)
// Falls back to simple emoji if not available
function getBotanicalIllustrationSafe(flowerId) {
  if (typeof getBotanicalIllustration === 'function') {
    return getBotanicalIllustration(flowerId);
  }
  // Fallback to colored flower symbol
  const flower = FLOWER_TYPES.find(f => f.id === flowerId);
  return `<span class="flower-visual" data-color="${flower?.color || 'green'}">✿</span>`;
}

/**
 * Main render function - updates all UI elements
 */
export function render() {
  console.log('Starting render...');
  renderStats();
  renderGarden();
  renderSeedShop();
  renderInventory();
  renderHerbarium();
  renderMarketDemand();
  renderBouquetsForSale();
  console.log('Render complete');
}

/**
 * Render the stats bar (money, week, garden size)
 */
export function renderStats() {
  const moneyEl = document.getElementById('money');
  const moneyDisplay = document.getElementById('money-display');
  const weekEl = document.getElementById('week');
  const gardenSizeEl = document.getElementById('garden-size');
  
  if (moneyEl) moneyEl.textContent = `$${GameState.money}`;
  if (moneyDisplay) moneyDisplay.textContent = `$${GameState.money}`;
  if (weekEl) weekEl.textContent = GameState.week;
  if (gardenSizeEl) gardenSizeEl.textContent = `${GameState.gardenSize}×${GameState.gardenSize}`;
}

/**
 * Render the garden grid
 */
export function renderGarden() {
  const grid = document.getElementById('garden-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = `repeat(${GameState.gardenSize}, 80px)`;
  
  // Import handlers dynamically to avoid circular deps
  const { handlePlotClick, plantSeed } = window.gardenHandlers || {};
  
  GameState.garden.forEach((plant, idx) => {
    const plot = document.createElement('div');
    plot.className = 'plot';
    
    if (plant) {
      const growthPercent = plant.stage / plant.growth;
      const scale = 0.5 + (growthPercent * 0.5);
      const flowerSymbol = plant.stage >= plant.growth ? '✿' : '❀';
      plot.innerHTML = `<div class="flower-visual" data-color="${plant.color}" style="transform: scale(${scale})">${flowerSymbol}</div>`;
      plot.title = `${plant.common}\n(${plant.name})\nStage: ${plant.stage}/${plant.growth}\nWater: ${plant.watered}/${plant.water}\nClick to ${plant.stage >= plant.growth ? 'harvest' : 'water ($1)'}`;
      
      if (plant.stage >= plant.growth) {
        plot.classList.add('ready');
        plot.style.background = '#d4f4dd';
      } else if (plant.stage > 0) {
        plot.style.background = '#e8f5e9';
      }
      
      plot.addEventListener('click', () => {
        if (handlePlotClick) handlePlotClick(idx);
      });
    } else {
      plot.textContent = '+';
      plot.title = 'Plant a seed';
      plot.addEventListener('click', () => {
        if (plantSeed) plantSeed(idx);
      });
    }
    
    grid.appendChild(plot);
  });
  
  renderVisualGarden();
}

/**
 * Render the visual garden view (3D-like representation)
 */
export function renderVisualGarden() {
  const visualPlants = document.getElementById('visual-plants');
  if (!visualPlants) return;
  
  visualPlants.innerHTML = '';
  
  // Import handler dynamically
  const { handlePlotClick } = window.gardenHandlers || {};
  
  GameState.garden.forEach((plant, idx) => {
    if (!plant) return;
    
    const growthPercent = plant.stage / plant.growth;
    const row = Math.floor(idx / GameState.gardenSize);
    const col = idx % GameState.gardenSize;
    const size = GameState.gardenSize;
    
    // Calculate position with slight random offset for natural look
    const colWidth = 100 / size;
    const randomOffset = (idx % 3 - 1) * 1.5;
    
    const visualPlant = document.createElement('div');
    visualPlant.className = 'visual-plant botanical-plant';
    visualPlant.style.left = `${col * colWidth + colWidth / 2 + randomOffset}%`;
    
    // Position plants in rows from bottom
    const rowHeight = 40;
    const baseOffset = 10;
    visualPlant.style.bottom = `${baseOffset + (size - 1 - row) * rowHeight}px`;
    
    // Scale based on growth
    const minSize = 35;
    const maxSize = 75;
    const flowerSize = minSize + (growthPercent * (maxSize - minSize));
    visualPlant.style.width = `${flowerSize}px`;
    visualPlant.style.height = `${flowerSize * 1.2}px`;
    visualPlant.style.opacity = `${0.5 + (growthPercent * 0.5)}`;
    visualPlant.title = `${plant.common}\n(${plant.name})\nClick to ${plant.stage >= plant.growth ? 'harvest' : 'water ($1)'}`;
    
    // Z-index based on row
    visualPlant.style.zIndex = row + 1;
    
    // Show full botanical illustration for mature plants
    if (plant.stage >= plant.growth) {
      visualPlant.innerHTML = getBotanicalIllustrationSafe(plant.id);
      visualPlant.classList.add('mature-flower');
      visualPlant.style.animation = `sway ${3 + (idx % 3)}s ease-in-out infinite`;
      visualPlant.style.animationDelay = `${idx * 0.2}s`;
    } else if (GameState.collectedCards.includes(plant.id) && plant.stage >= plant.growth * 0.5) {
      visualPlant.innerHTML = getBotanicalIllustrationSafe(plant.id);
      visualPlant.style.filter = 'saturate(0.6) brightness(0.9) sepia(0.1)';
    } else {
      // Growing seedling SVG
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
    visualPlant.addEventListener('click', () => {
      if (handlePlotClick) handlePlotClick(idx);
    });
    
    visualPlants.appendChild(visualPlant);
  });
}

/**
 * Render the seed shop/catalogue
 */
export function renderSeedShop() {
  const shop = document.getElementById('seed-shop');
  if (!shop) return;
  
  shop.innerHTML = '';
  
  // Import selectSeed dynamically
  const { selectSeed } = window.gardenHandlers || {};
  
  FLOWER_TYPES.forEach(flower => {
    // Skip locked flowers unless unlocked
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
    
    seedCard.addEventListener('click', () => {
      if (selectSeed) selectSeed(flower.id);
      renderSeedShop(); // Re-render to show selection
    });
    shop.appendChild(seedCard);
  });
}

/**
 * Render the inventory of harvested flowers
 */
export function renderInventory() {
  const inv = document.getElementById('inventory');
  if (!inv) return;
  
  inv.innerHTML = '';
  
  if (GameState.inventory.length === 0) {
    inv.innerHTML = '<p class="hint">No harvested flowers yet</p>';
    return;
  }
  
  // Import addToBouquet dynamically
  const { addToBouquet } = window.marketHandlers || {};
  
  // Count flowers by type
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
    item.addEventListener('click', () => {
      if (addToBouquet) addToBouquet(flower);
    });
    inv.appendChild(item);
  });
}

/**
 * Render the herbarium (collected botanical illustrations)
 */
export function renderHerbarium() {
  const herbarium = document.getElementById('herbarium');
  if (!herbarium) return;
  
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
        ${getBotanicalIllustrationSafe(flowerId)}
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

/**
 * Render the market demand display
 */
export function renderMarketDemand() {
  const demand = document.getElementById('market-demand');
  if (!demand) return;
  
  demand.innerHTML = '';
  
  Object.entries(GameState.marketDemand).forEach(([id, multiplier]) => {
    const flower = FLOWER_TYPES.find(f => f.id === id);
    if (!flower) return;
    
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

/**
 * Render bouquets ready for sale
 */
export function renderBouquetsForSale() {
  const container = document.getElementById('bouquets-for-sale');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (GameState.bouquets.length === 0) {
    container.innerHTML = '<p class="hint">No arrangements ready for market</p>';
    return;
  }
  
  GameState.bouquets.forEach((bouquet, idx) => {
    const card = document.createElement('div');
    card.className = 'bouquet-card';
    card.innerHTML = `
      <div class="bouquet-flowers">${bouquet.flowers.map(f => f.emoji || '🌸').join(' ')}</div>
      <div class="bouquet-value">Value: $${bouquet.value}</div>
    `;
    container.appendChild(card);
  });
}

/**
 * Render current bouquet being assembled
 */
export function renderCurrentBouquet() {
  const container = document.getElementById('current-bouquet');
  if (!container) return;
  
  container.innerHTML = '';
  
  // Import handlers dynamically
  const { removeFromBouquet, calculateBouquetValue } = window.marketHandlers || {};
  
  if (GameState.currentBouquet.length === 0) {
    container.innerHTML = '<p class="hint">Select flowers from inventory</p>';
    const bouquetValue = document.getElementById('bouquet-value');
    if (bouquetValue) bouquetValue.textContent = '$0';
    return;
  }
  
  GameState.currentBouquet.forEach((flower, idx) => {
    const item = document.createElement('div');
    item.className = 'bouquet-flower';
    item.innerHTML = `<div class="flower-visual" data-color="${flower.color}" title="${flower.common}">❀</div>`;
    item.addEventListener('click', () => {
      if (removeFromBouquet) removeFromBouquet(idx);
    });
    container.appendChild(item);
  });
  
  // Update value display
  const valueEl = document.getElementById('bouquet-value');
  if (valueEl && calculateBouquetValue) {
    const value = calculateBouquetValue(GameState.currentBouquet);
    valueEl.textContent = `$${value}`;
  }
}
