# Flower Garden Game — A Botanical Journal

An immersive HTML5 botanical garden simulation featuring 48 rare and common flower species with realistic scientific names and Victorian-era notebook aesthetics.

## Structure
- **index.html**: Main game interface with compact modal design
- **game.js**: Complete game logic and state management (947 lines)
- **styles.css**: Victorian botanical journal theme with realistic flower visuals
- **/assets**: Future assets directory

## Features

### Core Gameplay
- **Dynamic Garden Grid**: Starts at 4×4, expandable to 16×16 through upgrades
- **48 Unique Flower Species**: Each with scientific and common names (e.g., *Rosa hybrida* 'Hybrid Tea Rose')
- **Realistic Flower Visuals**: Color-coded botanical symbols replace emojis for authentic look
- **Growth System**: Plant, water, and harvest with species-specific growth cycles
- **Resource Management**: Track money, inventory, and market demand

### Flower Tiers
1. **Common (5 species)**: Dandelion, Fern, Tulip, Marigold, Daisy
2. **Tier 1-2 (13 species)**: Pansy, Rose, Lily, Iris, Peony, Hydrangea, etc.
3. **Tier 3-4 (15 species)**: Orchids, Protea, Bird of Paradise, Lotus, etc.
4. **Premium/Rare (15 species)**: Ghost Orchid, Juliet Rose, Middlemist Red, Kadupul, etc.

### Advanced Features
- **Arrangement Studio**: Compact one-screen design with drag-drop flower positioning
- **Market System**: Weekly demand fluctuations (70%-160%) affecting bouquet values
- **Upgrade System**: Unlock new flowers, expand garden, improve tools
- **Real-time Scoring**: Aesthetic, Fashion, and Harmony scores
- **Wrapper & Ribbon Options**: Presentation choices affecting bouquet value
- **Always-Visible Money Counter**: Fixed position display in top-right corner

### UI/UX
- **Victorian Botanical Theme**: Sepia tones, aged paper textures, vintage typography
- **Dual Garden Views**: Grid view for management, Visual view for aesthetics
- **Compact Modals**: Optimized arrangement studio fits on one screen
- **Scientific Accuracy**: Latin nomenclature with common name references

## Getting Started
1. Open `index.html` in any modern browser
2. Start with 5 unlocked flower species and $100
3. Plant seeds, water regularly, harvest when ready
4. Create bouquets in the Arrangement Studio
5. Sell during weekly market cycles
6. Unlock rare species and expand your garden

## Controls
- **Click empty plot**: Plant selected seed
- **Click growing plant**: Water
- **Click ready flower**: Harvest
- **Arrangement Studio**: Drag flowers, rotate, resize, clear
- **View Toggle**: Switch between grid and visual garden
- **End Week**: Advance time and refresh market demand

## Technical Details
- Pure vanilla JavaScript (no frameworks)
- CSS Grid and Flexbox layouts
- Modular state management via GameState object
- Efficient rendering with minimal DOM manipulation
- Responsive design optimized for 1200px+ screens

## Future Enhancements
- Save/load system with localStorage
- Seasonal events and rare flower appearances
- Achievement system
- Gallery/album for collected species
- Sound effects and ambient music
