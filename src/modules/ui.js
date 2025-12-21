// src/modules/ui.js - UI Helpers and Modals

import { GameState } from './state.js';

/**
 * Open the help modal
 */
export function openHelp() {
  const modal = document.getElementById('help-modal');
  if (modal) modal.classList.remove('hidden');
}

/**
 * Close the help modal
 */
export function closeHelp() {
  const modal = document.getElementById('help-modal');
  if (modal) modal.classList.add('hidden');
}

/**
 * Switch between grid view and visual garden view
 * @param {string} view - 'grid' or 'visual'
 */
export function switchView(view) {
  const gridView = document.getElementById('grid-view');
  const visualView = document.getElementById('visual-view');
  const gridBtn = document.getElementById('grid-view-btn');
  const visualBtn = document.getElementById('visual-view-btn');
  
  if (!gridView || !visualView) return;
  
  if (view === 'grid') {
    gridView.classList.remove('hidden');
    visualView.classList.add('hidden');
    if (gridBtn) gridBtn.classList.add('active');
    if (visualBtn) visualBtn.classList.remove('active');
  } else {
    gridView.classList.add('hidden');
    visualView.classList.remove('hidden');
    if (gridBtn) gridBtn.classList.remove('active');
    if (visualBtn) visualBtn.classList.add('active');
  }
}

/**
 * Select wrapper style for arrangements
 * @param {string} wrapper - Wrapper style ID
 */
export function selectWrapper(wrapper) {
  GameState.selectedWrapper = wrapper;
  document.querySelectorAll('.wrapper-option').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.wrapper === wrapper);
  });
}

/**
 * Select ribbon color for arrangements
 * @param {string} color - Ribbon color hex
 */
export function selectRibbon(color) {
  GameState.selectedRibbon = color;
  document.querySelectorAll('.ribbon-option').forEach(opt => {
    opt.classList.toggle('selected', opt.dataset.color === color);
  });
}

/**
 * Clear the current arrangement canvas
 */
export function clearArrangement() {
  GameState.arrangementFlowers = [];
  GameState.selectedArrangementFlower = null;
  const canvas = document.getElementById('arrangement-canvas');
  if (canvas) canvas.innerHTML = '';
}

/**
 * Rotate the selected flower in arrangement
 * @param {boolean} clockwise - Rotate direction
 */
export function rotateSelectedFlower(clockwise = true) {
  if (!GameState.selectedArrangementFlower) return;
  
  const degrees = GameState.rotationSensitivity * (clockwise ? 1 : -1);
  const flower = GameState.arrangementFlowers.find(f => f.id === GameState.selectedArrangementFlower);
  if (flower) {
    flower.rotation = (flower.rotation || 0) + degrees;
  }
}

/**
 * Copy the selected flower in arrangement
 */
export function copySelectedFlower() {
  if (!GameState.selectedArrangementFlower) return;
  
  const original = GameState.arrangementFlowers.find(f => f.id === GameState.selectedArrangementFlower);
  if (original) {
    const copy = {
      ...original,
      id: Date.now(),
      x: original.x + 10,
      y: original.y + 10
    };
    GameState.arrangementFlowers.push(copy);
  }
}

/**
 * Set selected flower rotation to 0 (straight)
 */
export function setStraight() {
  if (!GameState.selectedArrangementFlower) return;
  
  const flower = GameState.arrangementFlowers.find(f => f.id === GameState.selectedArrangementFlower);
  if (flower) {
    flower.rotation = 0;
  }
}

/**
 * Cycle through rotation sensitivity values
 */
export function cycleSensitivity() {
  const sensitivities = [1, 3, 5, 15];
  const currentIdx = sensitivities.indexOf(GameState.rotationSensitivity);
  GameState.rotationSensitivity = sensitivities[(currentIdx + 1) % sensitivities.length];
  
  const dial = document.getElementById('sensitivity-dial');
  if (dial) {
    dial.textContent = `${GameState.rotationSensitivity}°`;
  }
}

/**
 * Resize the selected flower
 * @param {number} factor - Scale factor (e.g., 1.2 for 20% larger)
 */
export function resizeSelectedFlower(factor) {
  if (!GameState.selectedArrangementFlower) return;
  
  const flower = GameState.arrangementFlowers.find(f => f.id === GameState.selectedArrangementFlower);
  if (flower) {
    flower.scale = (flower.scale || 1) * factor;
  }
}
