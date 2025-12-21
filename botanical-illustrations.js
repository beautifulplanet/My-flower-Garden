// botanical-illustrations.js - Victorian-style SVG botanical illustrations
// Procedural flower generator based on real botanical characteristics

// Botanical characteristics database - based on real flower anatomy
const BOTANICAL_DATA = {
  // Petal configurations (based on real flower families)
  petalPatterns: {
    rose: { count: [20, 25, 30], layered: true, overlap: 0.3, curve: 'spiral' },
    tulip: { count: 6, layered: false, closed: true, curve: 'smooth' },
    daisy: { count: [16, 21, 34], layered: false, radial: true, curve: 'straight' },  // Fibonacci numbers
    lily: { count: 6, layered: false, recurved: true, curve: 'wavy' },
    orchid: { count: 3, specialized: true, labellum: true, curve: 'complex' },
    poppy: { count: 4, layered: false, papery: true, curve: 'ruffled' },
    carnation: { count: [20, 30], layered: true, serrated: true, curve: 'frilled' },
    sunflower: { ray: [13, 21, 34], disk: 'fibonacci', curve: 'straight' },  // Fibonacci spiral
    iris: { count: 6, falls: 3, standards: 3, curve: 'wavy' },
    peony: { count: [50, 100], layered: true, ruffly: true, curve: 'complex' }
  }
};

// Enhanced procedural flower generator with real botanical accuracy
function createBotanicalSVG(flower) {
  const color = flower.color;
  const common = flower.common;
  const scientificFamily = determineFlowerFamily(flower);
  
  // Realistic color palettes based on actual pigments
  const colorPalettes = {
    red: { 
      primary: '#dc143c', secondary: '#ff4757', dark: '#8b0000', light: '#ff6b7a',
      accent: '#c0392b', highlight: '#ff9999', shadow: '#660000'
    },
    pink: { 
      primary: '#ff69b4', secondary: '#ffb6c1', dark: '#c71585', light: '#ffc0cb',
      accent: '#ff1493', highlight: '#ffe4e1', shadow: '#8b2252'
    },
    yellow: { 
      primary: '#ffd700', secondary: '#f9e79f', dark: '#daa520', light: '#fff8dc',
      accent: '#ffed4e', highlight: '#fffacd', shadow: '#b8860b'
    },
    orange: { 
      primary: '#ff8c00', secondary: '#ffa500', dark: '#d2691e', light: '#ffe4b5',
      accent: '#ff6347', highlight: '#ffdab9', shadow: '#8b4513'
    },
    purple: { 
      primary: '#9370db', secondary: '#dda0dd', dark: '#6a5acd', light: '#e6e6fa',
      accent: '#8a2be2', highlight: '#f8f4ff', shadow: '#4b0082'
    },
    blue: { 
      primary: '#4169e1', secondary: '#87ceeb', dark: '#191970', light: '#b0e0e6',
      accent: '#1e90ff', highlight: '#e0f6ff', shadow: '#000080'
    },
    white: { 
      primary: '#fff', secondary: '#f8f8ff', dark: '#e8e8e8', light: '#fffafa',
      accent: '#f5f5f5', highlight: '#ffffff', shadow: '#d3d3d3'
    },
    green: { 
      primary: '#6b8e4a', secondary: '#709448', dark: '#4a6832', light: '#98fb98',
      accent: '#8fbc8f', highlight: '#e0f0e0', shadow: '#2f4f2f'
    }
  };
  
  const palette = colorPalettes[color] || colorPalettes.pink;
  const stemColor = '#5a7c3e';
  const leafDark = '#4a6832';
  const leafMid = '#6b8e4a';
  const leafLight = '#88ab5e';
  
  // Generate detailed botanical structure
  const flowerHead = generateFlowerHead(flower, palette, scientificFamily);
  const stem = generateStem(flower);
  const leaves = generateLeaves(flower, leafDark, leafMid, leafLight);
  const details = generateBotanicalDetails(flower, palette);
  
  return `
    <svg viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" class="botanical-svg">
      <defs>
        ${generateGradients(flower, palette)}
        <filter id="paper-texture-${flower.id}">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/>
          <feDiffuseLighting in="noise" lighting-color="white" surfaceScale="0.5">
            <feDistantLight azimuth="45" elevation="35"/>
          </feDiffuseLighting>
        </filter>
      </defs>
      <g class="botanical-flower" filter="url(#paper-texture-${flower.id})" opacity="0.02">
        <rect width="100" height="140" fill="white"/>
      </g>
      <g class="botanical-flower">
        ${stem}
        ${leaves}
        ${flowerHead}
        ${details}
      </g>
    </svg>
  `;
}

function determineFlowerFamily(flower) {
  const name = flower.common.toLowerCase();
  if (name.includes('rose')) return 'rosaceae';
  if (name.includes('tulip')) return 'liliaceae';
  if (name.includes('daisy') || name.includes('sunflower') || name.includes('cosmos') || name.includes('zinnia')) return 'asteraceae';
  if (name.includes('lily')) return 'liliaceae';
  if (name.includes('orchid')) return 'orchidaceae';
  if (name.includes('poppy')) return 'papaveraceae';
  if (name.includes('carnation')) return 'caryophyllaceae';
  if (name.includes('iris')) return 'iridaceae';
  if (name.includes('peony')) return 'paeoniaceae';
  if (name.includes('lavender')) return 'lamiaceae';
  return 'generic';
}

function generateGradients(flower, palette) {
  return `
    <linearGradient id="stem-grad-${flower.id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#88ab5e;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#5a7c3e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4a6832;stop-opacity:1" />
    </linearGradient>
    <radialGradient id="petal-grad-${flower.id}" cx="30%" cy="30%">
      <stop offset="0%" style="stop-color:${palette.highlight};stop-opacity:1" />
      <stop offset="40%" style="stop-color:${palette.light};stop-opacity:1" />
      <stop offset="70%" style="stop-color:${palette.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${palette.dark};stop-opacity:0.95" />
    </radialGradient>
    <radialGradient id="center-grad-${flower.id}">
      <stop offset="0%" style="stop-color:${palette.accent};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${palette.dark};stop-opacity:1" />
    </radialGradient>
  `;
}

function generateStem(flower) {
  const height = 90 + flower.growth * 5;
  const thickness = 2 + flower.growth * 0.4;
  const curve = 48 - flower.growth * 0.5;
  
  return `
    <!-- Main stem with natural curve -->
    <path d="M 50 140 Q ${curve} ${height + 20} 50 ${60 - flower.growth * 2}" 
          stroke="url(#stem-grad-${flower.id})" 
          stroke-width="${thickness}" 
          fill="none"
          stroke-linecap="round"/>
    <!-- Stem highlights for 3D effect -->
    <path d="M 50 140 Q ${curve + 1} ${height + 20} 51 ${60 - flower.growth * 2}" 
          stroke="rgba(136,171,94,0.6)" 
          stroke-width="${thickness * 0.3}" 
          fill="none"
          stroke-linecap="round"/>
  `;
}

function generateLeaves(flower, darkGreen, midGreen, lightGreen) {
  const leafCount = Math.min(2 + Math.floor(flower.rarity), 4);
  let leaves = '';
  
  for (let i = 0; i < leafCount; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const yPos = 95 - (i * 15) - flower.growth * 3;
    const xOffset = side * (20 + i * 5);
    const leafSize = 15 + flower.rarity * 2;
    
    leaves += `
      <!-- Leaf ${i + 1} -->
      <g>
        <!-- Leaf blade -->
        <path d="M ${50 + side * 2} ${yPos} 
                 Q ${50 + xOffset * 0.7} ${yPos - 3} ${50 + xOffset} ${yPos + 2}
                 Q ${50 + xOffset + side * 2} ${yPos + leafSize * 0.5} ${50 + xOffset - side * 3} ${yPos + leafSize}
                 Q ${50 + xOffset * 0.5} ${yPos + leafSize - 2} ${50 + side * 2} ${yPos + leafSize - 5}
                 Z" 
              fill="${midGreen}" 
              stroke="${darkGreen}" 
              stroke-width="0.8"/>
        <!-- Leaf vein -->
        <path d="M ${50 + side * 2} ${yPos + 2} Q ${50 + xOffset * 0.7} ${yPos + leafSize * 0.3} ${50 + xOffset - side * 3} ${yPos + leafSize - 2}" 
              stroke="${lightGreen}" 
              stroke-width="0.5" 
              fill="none"
              opacity="0.7"/>
        <!-- Secondary veins -->
        ${Array.from({length: 3}, (_, v) => {
          const vPos = yPos + (v + 1) * (leafSize / 4);
          return `<path d="M ${50 + xOffset * 0.7} ${vPos} L ${50 + xOffset * 0.9} ${vPos + 2}" stroke="${lightGreen}" stroke-width="0.3" opacity="0.5"/>`;
        }).join('')}
      </g>
    `;
  }
  
  return leaves;
}

function generateFlowerHead(flower, palette, family) {
  const centerY = 35 - flower.growth * 1.5;
  
  // Generate family-specific flower structures
  switch(family) {
    case 'rosaceae':
      return generateRoseFlower(50, centerY, palette, flower);
    case 'asteraceae':
      return generateDaisyFlower(50, centerY, palette, flower);
    case 'liliaceae':
      if (flower.common.includes('Tulip')) {
        return generateTulipFlower(50, centerY, palette, flower);
      }
      return generateLilyFlower(50, centerY, palette, flower);
    case 'orchidaceae':
      return generateOrchidFlower(50, centerY, palette, flower);
    case 'lamiaceae':
      return generateLavenderFlower(50, centerY, palette, flower);
    default:
      return generateGenericFlower(50, centerY, palette, flower);
  }
}

function generateRoseFlower(cx, cy, palette, flower) {
  const layers = 4;
  let petals = '';
  
  // Outer to inner layers
  for (let layer = layers; layer >= 1; layer--) {
    const petalCount = 5 + layer * 2;
    const radius = 14 - (layers - layer) * 3;
    const angleOffset = (layer % 2) * (Math.PI / petalCount);
    
    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2 + angleOffset;
      const px = cx + Math.cos(angle) * radius;
      const py = cy + Math.sin(angle) * radius;
      const petalR = 5 - layer * 0.3;
      
      petals += `
        <ellipse cx="${px}" cy="${py}" rx="${petalR}" ry="${petalR * 1.4}" 
                 fill="url(#petal-grad-${flower.id})" 
                 stroke="${palette.dark}" 
                 stroke-width="0.4"
                 opacity="${0.8 + layer * 0.05}"
                 transform="rotate(${angle * 180 / Math.PI} ${px} ${py})"/>
      `;
    }
  }
  
  // Center
  petals += `<circle cx="${cx}" cy="${cy}" r="3" fill="url(#center-grad-${flower.id})"/>`;
  
  return petals;
}

function generateDaisyFlower(cx, cy, palette, flower) {
  const petalCount = 16 + Math.floor(flower.rarity * 5);
  let petals = '';
  
  // Ray petals (ligules)
  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2;
    const px = cx + Math.cos(angle) * 13;
    const py = cy + Math.sin(angle) * 13;
    
    petals += `
      <ellipse cx="${px}" cy="${py}" rx="3.5" ry="8" 
               fill="${palette.primary}" 
               stroke="${palette.dark}" 
               stroke-width="0.4"
               transform="rotate(${angle * 180 / Math.PI} ${px} ${py})"/>
      <!-- Petal vein -->
      <line x1="${px}" y1="${py - 6}" x2="${px}" y2="${py + 6}"
            stroke="${palette.dark}" 
            stroke-width="0.2" 
            opacity="0.3"
            transform="rotate(${angle * 180 / Math.PI} ${px} ${py})"/>
    `;
  }
  
  // Disk florets with Fibonacci spiral pattern
  const diskRadius = 6;
  const floretCount = 55; // Fibonacci number
  for (let i = 0; i < floretCount; i++) {
    const theta = i * 137.5 * (Math.PI / 180); // Golden angle
    const r = Math.sqrt(i) * 0.9;
    const fx = cx + Math.cos(theta) * r;
    const fy = cy + Math.sin(theta) * r;
    
    petals += `<circle cx="${fx}" cy="${fy}" r="0.7" fill="#d4af37" opacity="0.9"/>`;
  }
  
  // Center highlight
  petals += `<circle cx="${cx}" cy="${cy}" r="4" fill="#f4d03f" opacity="0.6"/>`;
  
  return petals;
}

function generateTulipFlower(cx, cy, palette, flower) {
  return `
    <!-- Tulip cup shape -->
    <ellipse cx="${cx}" cy="${cy + 2}" rx="11" ry="18" fill="${palette.primary}" stroke="${palette.dark}" stroke-width="1"/>
    <path d="M ${cx - 11} ${cy + 5} Q ${cx - 11} ${cy - 10} ${cx} ${cy - 18} Q ${cx + 11} ${cy - 10} ${cx + 11} ${cy + 5}" 
          fill="${palette.secondary}" stroke="${palette.dark}" stroke-width="1"/>
    <!-- Inner petals -->
    <ellipse cx="${cx - 5}" cy="${cy}" rx="6" ry="14" fill="${palette.light}" stroke="${palette.dark}" stroke-width="0.6" opacity="0.8"/>
    <ellipse cx="${cx + 5}" cy="${cy}" rx="6" ry="14" fill="${palette.light}" stroke="${palette.dark}" stroke-width="0.6" opacity="0.8"/>
    <!-- Petal veining -->
    ${Array.from({length: 5}, (_, i) => `
      <line x1="${cx}" y1="${cy - 15 + i * 3}" x2="${cx}" y2="${cy + 10}" 
            stroke="${palette.dark}" stroke-width="0.3" opacity="0.2"/>
    `).join('')}
  `;
}

function generateLilyFlower(cx, cy, palette, flower) {
  const petals = 6;
  let flower_petals = '';
  
  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * Math.PI * 2 - Math.PI / 2;
    const px = cx + Math.cos(angle) * 15;
    const py = cy + Math.sin(angle) * 15;
    
    flower_petals += `
      <ellipse cx="${px}" cy="${py}" rx="4.5" ry="14" 
               fill="url(#petal-grad-${flower.id})" 
               stroke="${palette.dark}" 
               stroke-width="0.6"
               transform="rotate(${angle * 180 / Math.PI + 90} ${px} ${py})"/>
      <!-- Stamen extending from center -->
      <line x1="${cx + Math.cos(angle) * 3}" y1="${cy + Math.sin(angle) * 3}" 
            x2="${px}" y2="${py}" 
            stroke="${palette.dark}" stroke-width="0.5"/>
      <circle cx="${px}" cy="${py}" r="1.2" fill="#f4d03f"/>
    `;
  }
  
  return flower_petals;
}

function generateOrchidFlower(cx, cy, palette, flower) {
  return `
    <!-- Dorsal sepal -->
    <ellipse cx="${cx}" cy="${cy - 12}" rx="7" ry="10" fill="${palette.primary}" stroke="${palette.dark}" stroke-width="0.6"/>
    <!-- Lateral sepals -->
    <ellipse cx="${cx - 8}" cy="${cy - 2}" rx="6" ry="9" fill="${palette.secondary}" stroke="${palette.dark}" stroke-width="0.6" transform="rotate(-25 ${cx - 8} ${cy - 2})"/>
    <ellipse cx="${cx + 8}" cy="${cy - 2}" rx="6" ry="9" fill="${palette.secondary}" stroke="${palette.dark}" stroke-width="0.6" transform="rotate(25 ${cx + 8} ${cy - 2})"/>
    <!-- Labellum (lip) - most distinctive orchid feature -->
    <path d="M ${cx} ${cy + 2} Q ${cx - 10} ${cy + 5} ${cx - 12} ${cy + 12} Q ${cx - 10} ${cy + 18} ${cx} ${cy + 16} Q ${cx + 10} ${cy + 18} ${cx + 12} ${cy + 12} Q ${cx + 10} ${cy + 5} ${cx} ${cy + 2} Z" 
          fill="${palette.light}" stroke="${palette.dark}" stroke-width="0.7"/>
    <path d="M ${cx} ${cy + 4} Q ${cx - 6} ${cy + 7} ${cx - 7} ${cy + 12} Q ${cx - 5} ${cy + 15} ${cx} ${cy + 14} Q ${cx + 5} ${cy + 15} ${cx + 7} ${cy + 12} Q ${cx + 6} ${cy + 7} ${cx} ${cy + 4} Z" 
          fill="${palette.accent}" stroke="${palette.dark}" stroke-width="0.4"/>
    <!-- Column (reproductive structure) -->
    <ellipse cx="${cx}" cy="${cy}" rx="2" ry="4" fill="${palette.dark}"/>
  `;
}

function generateLavenderFlower(cx, cy, palette, flower) {
  let spikes = '';
  const stems = 3;
  
  for (let s = 0; s < stems; s++) {
    const sx = cx + (s - 1) * 8;
    const floretCount = 8 + Math.floor(flower.rarity * 2);
    
    // Individual florets on spike
    for (let i = 0; i < floretCount; i++) {
      const fy = cy - 15 + i * 3;
      spikes += `
        <ellipse cx="${sx}" cy="${fy}" rx="3" ry="1.8" 
                 fill="${palette.primary}" 
                 stroke="${palette.dark}" 
                 stroke-width="0.3"/>
      `;
    }
    
    // Spike stem
    spikes += `<line x1="${sx}" y1="${cy + 10}" x2="${sx}" y2="${cy - 15}" stroke="#5a7c3e" stroke-width="1.2"/>`;
  }
  
  return spikes;
}

function generateGenericFlower(cx, cy, palette, flower) {
  const petalCount = 5 + Math.floor(flower.rarity);
  let petals = '';
  
  for (let i = 0; i < petalCount; i++) {
    const angle = (i / petalCount) * Math.PI * 2;
    const px = cx + Math.cos(angle) * 12;
    const py = cy + Math.sin(angle) * 12;
    
    petals += `
      <ellipse cx="${px}" cy="${py}" rx="5" ry="9" 
               fill="url(#petal-grad-${flower.id})" 
               stroke="${palette.dark}" 
               stroke-width="0.5"
               transform="rotate(${angle * 180 / Math.PI} ${px} ${py})"/>
    `;
  }
  
  petals += `<circle cx="${cx}" cy="${cy}" r="4" fill="url(#center-grad-${flower.id})"/>`;
  
  return petals;
}

function generateBotanicalDetails(flower, palette) {
  // Add scientific details like stamens, pistils, etc.
  const cx = 50;
  const cy = 35 - flower.growth * 1.5;
  
  return `
    <!-- Stamens -->
    ${Array.from({length: 5}, (_, i) => {
      const angle = (i / 5) * Math.PI * 2;
      const sx = cx + Math.cos(angle) * 4;
      const sy = cy + Math.sin(angle) * 4;
      return `
        <line x1="${cx}" y1="${cy}" x2="${sx}" y2="${sy}" stroke="${palette.dark}" stroke-width="0.5"/>
        <circle cx="${sx}" cy="${sy}" r="0.9" fill="#f4d03f" stroke="${palette.dark}" stroke-width="0.3"/>
      `;
    }).join('')}
  `;
}

// Main function to get botanical illustration
function getBotanicalIllustration(flowerId) {
  const flower = FLOWER_TYPES.find(f => f.id === flowerId);
  if (!flower) return '';
  return createBotanicalSVG(flower);
}
