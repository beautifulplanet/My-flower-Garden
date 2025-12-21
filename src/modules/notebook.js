// src/modules/notebook.js - Specimen Notebook Module

import { GameState } from './state.js';
import { FLOWER_TYPES } from '../data/flowers.js';

// Flower Encyclopedia - detailed information about each species
export const FLOWER_ENCYCLOPEDIA = {
  'rosa-gallica': {
    description: 'Rosa gallica, commonly known as the French Rose or Gallic Rose, is one of the oldest cultivated roses, dating back to ancient times.',
    facts: 'Rosa gallica has been cultivated since at least the 12th century and was widely grown in medieval monastery gardens for medicinal purposes.',
    cultivation: 'Prefers full sun and well-drained soil. Hardy in zones 4-9. Forms compact bushes 3-4 feet tall.'
  },
  'bellis-perennis': {
    description: 'Bellis perennis, the Common Daisy or English Daisy, is a perennial herbaceous plant native to western, central, and northern Europe.',
    facts: 'The name "daisy" comes from "day\'s eye" because the flowers close at night and open at dawn.',
    cultivation: 'Extremely hardy, grows in zones 4-8. Prefers full sun to partial shade and moist, well-drained soil.'
  },
  'tulip': {
    description: 'Tulipa gesneriana, the Garden Tulip, is the primary ancestor of most cultivated tulips.',
    facts: 'During Tulip Mania in 1637, a single bulb could cost more than a house.',
    cultivation: 'Grows in zones 3-8. Requires cold winter dormancy. Plant bulbs in fall.'
  },
  'dandelion': {
    description: 'Taraxacum officinale, the Common Dandelion, is a flowering herbaceous perennial of the family Asteraceae.',
    facts: 'Every part of the dandelion is edible. The name comes from French "dent de lion" (lion\'s tooth).',
    cultivation: 'Grows almost anywhere. Hardy in all zones. Self-seeds prolifically.'
  },
  'fern': {
    description: 'Nephrolepis exaltata, the Boston Fern, is a species of fern native to tropical regions throughout the world.',
    facts: 'Boston Ferns are natural air purifiers and have been popular houseplants since Victorian times.',
    cultivation: 'Prefers indirect light and high humidity. Thrives in zones 9-11 outdoors.'
  },
  'rose': {
    description: 'Rosa hybrida, the Hybrid Tea Rose, represents the pinnacle of rose breeding, combining beauty with repeat flowering.',
    facts: 'Hybrid Tea roses were first developed in the late 19th century and remain the most popular rose class.',
    cultivation: 'Requires full sun, good drainage, and regular fertilization. Hardy in zones 5-9.'
  },
  'lily': {
    description: 'Lilium candidum, the Madonna Lily, is one of the oldest cultivated plants with religious significance.',
    facts: 'Depictions of Madonna Lilies appear in Minoan frescoes from 1580 BC.',
    cultivation: 'Grows in zones 6-9. Requires shallow planting unlike most lilies.'
  },
  'orchid-phalaenopsis': {
    description: 'Phalaenopsis amabilis, the Moth Orchid, is the most popular orchid genus for home cultivation.',
    facts: 'Moth orchids can bloom for up to three months and rebloom multiple times per year.',
    cultivation: 'Thrives in bright indirect light. Water weekly and provide humidity.'
  },
  'sunflower': {
    description: 'Helianthus annuus, the Common Sunflower, is an annual plant native to the Americas.',
    facts: 'Sunflowers exhibit heliotropism, tracking the sun across the sky when young.',
    cultivation: 'Easy to grow in full sun. Direct sow after last frost. Tolerates poor soil.'
  },
  'lavender': {
    description: 'Lavandula angustifolia, English Lavender, is a fragrant Mediterranean shrub.',
    facts: 'The name comes from Latin "lavare" meaning to wash, as Romans used it in baths.',
    cultivation: 'Requires full sun and excellent drainage. Drought-tolerant once established.'
  }
};

/**
 * Open the specimen notebook modal
 */
export function openSpecimenNotebook() {
  const modal = document.getElementById('specimen-notebook-modal');
  if (modal) {
    modal.classList.remove('hidden');
    renderSpecimenList();
  }
}

/**
 * Close the specimen notebook modal
 */
export function closeSpecimenNotebook() {
  const modal = document.getElementById('specimen-notebook-modal');
  if (modal) modal.classList.add('hidden');
}

/**
 * Render the list of collected specimens
 */
export function renderSpecimenList() {
  const list = document.getElementById('specimen-list');
  if (!list) return;
  
  list.innerHTML = '';
  
  if (GameState.grownSpecies.length === 0) {
    list.innerHTML = '<p class="hint">No specimens cultivated yet. Grow your first flower to begin your botanical collection!</p>';
    return;
  }
  
  GameState.grownSpecies.forEach(flowerId => {
    const flower = FLOWER_TYPES.find(f => f.id === flowerId);
    if (!flower) return;
    
    const encyclopedia = FLOWER_ENCYCLOPEDIA[flowerId];
    const entry = document.createElement('div');
    entry.className = 'specimen-entry';
    
    // Get illustration if available
    const illustration = typeof getBotanicalIllustration === 'function'
      ? getBotanicalIllustration(flowerId)
      : `<span class="flower-visual" data-color="${flower.color}">✿</span>`;
    
    entry.innerHTML = `
      <div class="specimen-header">
        <div class="specimen-illustration">${illustration}</div>
        <div class="specimen-title">
          <h3>${flower.common}</h3>
          <p class="scientific-name"><em>${flower.name}</em></p>
          <p class="flower-family">Color: ${flower.color}</p>
        </div>
      </div>
      <div class="specimen-body">
        ${encyclopedia ? `
          <div class="specimen-section">
            <h4>Description</h4>
            <p>${encyclopedia.description}</p>
          </div>
          <div class="specimen-section">
            <h4>Historical Facts</h4>
            <p>${encyclopedia.facts}</p>
          </div>
          <div class="specimen-section">
            <h4>Cultivation</h4>
            <p>${encyclopedia.cultivation}</p>
          </div>
        ` : `
          <div class="specimen-section">
            <p>A beautiful ${flower.color} flowering plant. Base value: $${flower.baseValue}. Requires ${flower.water} water per day over ${flower.growth} days to mature.</p>
          </div>
        `}
      </div>
    `;
    
    list.appendChild(entry);
  });
  
  // Add progress indicator
  const progress = document.createElement('div');
  progress.className = 'specimen-progress';
  progress.innerHTML = `<p><strong>Specimens Documented:</strong> ${GameState.grownSpecies.length} / ${FLOWER_TYPES.length} species</p>`;
  list.appendChild(progress);
}

/**
 * Get encyclopedia entry for a flower
 * @param {string} flowerId - The flower ID
 * @returns {Object|null} - Encyclopedia entry or null
 */
export function getFlowerEncyclopediaEntry(flowerId) {
  return FLOWER_ENCYCLOPEDIA[flowerId] || null;
}
