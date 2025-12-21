# 🌸 Victorian Botanical Garden — A Flower Growing Game

A beautiful HTML5 botanical garden simulation featuring 48 rare flower species, procedural SVG illustrations, variable weather system, and Victorian-era aesthetics.

## 🎮 How to Play

### Starting Out
1. **Open the game**: Launch `index.html` in any modern browser
2. **Starting resources**: You begin with $100 and 5 unlocked flower species
3. **Your goal**: Grow flowers, create beautiful arrangements, and unlock rare species

### 🌱 Planting & Growing

**Step 1: Choose Seeds**
- Click the **"📖 Seed Catalogue"** button above your garden
- Browse available seeds (locked varieties show in the catalogue when unlocked)
- Click a seed to select it (it will highlight)
- Note the **Growth** and **Water** requirements

**Step 2: Plant in Garden**
- Switch to **Plot View** (button at top of garden panel)
- Click any **empty plot** (gray square) to plant your selected seed
- Seeds cost money — make sure you have enough!

**Step 3: Water Your Plants**
- **Click individual plants** in Plot View to water them one at a time
- Or click **"Water All"** button to water everything (costs $5)
- Plants need watering equal to their **Water** requirement
- Watch the water droplet indicators on each plot

**Step 4: Wait & Watch Them Grow**
- Click **"Advance Day"** button to progress time
- Plants grow 1 stage per day if properly watered
- Switch to **Garden View** to see your flowers in beautiful botanical detail
- Watch the weather change: sunny ☀️ → cloudy ☁️ → rainy 🌧️ → sunset 🌅 → night 🌙

**Step 5: Harvest**
- When plants reach full growth, they're ready to harvest
- **Click the mature flower** in Plot View to harvest
- Harvested flowers go to your **Inventory**

### 💐 Creating Flower Arrangements

**Opening the Flower Shop**
- Click **"Flower Shop"** button in the header
- This opens a full-page arrangement studio with a crystal vase

**Arranging Flowers (Fusion 360 Style)**
1. Click a flower from your inventory on the left
2. **Click the flower in the vase to select it** (it glows golden)
3. **Click anywhere on the canvas** to move it to that position
4. Use **Victorian brass controls** at the bottom:
   - **Copy**: Duplicate the selected flower (if you have more in inventory)
   - **Straighten**: Reset flower to vertical
   - **Rotate**: Turn flower left/right (adjust sensitivity with dial)
   - **Size**: Make flower bigger or smaller

**Scoring Your Arrangement**
- Arrangements are scored on **Aesthetic**, **Harmony**, and **Value**
- **Penalties apply for**:
  - Flowers upside-down (-15% aesthetic, -40% value)
  - Flowers off the table (-20% aesthetic, -50% value)
  - Flowers not in the vase
  - Overlapping flowers (-10% per cluster)

**Completing the Sale**
- Click **"Complete Arrangement"** when satisfied
- Your arrangement is added to the weekly market

### 💰 Weekly Market

- Click **"End Week"** to sell all your arrangements
- Market demand fluctuates (70%-160% of base value)
- High-demand flowers sell for premium prices
- Check the **"Current Demand"** section to see which flowers are hot

### 🔓 Upgrades & Progression

- Click **"Upgrades"** in the header
- Spend money to:
  - **Unlock rare flower species** (48 total varieties)
  - **Expand garden size** (up to 16×16 plots)
  - **Improve watering tools** (reduce Water All cost)
  - **Unlock faster growth** (reduce days needed)

### 📖 Botanical Herbarium

- Collect botanical illustrations by growing each species to maturity
- Click **"Specimen Notebook"** to view your collection
- Each flower has scientific (*Latin*) and common names
- Full-color procedural SVG illustrations

## 🎨 Game Features

### Visual Systems
- **48 Procedural Flower Illustrations**: Unique SVG artwork for each species
- **Variable Weather System**: Dynamic sky with sun, clouds, rain, sunset, night cycle
- **Realistic Garden View**: Layered soil, grass, swaying flowers, butterflies, birds
- **Crystal Vase Design**: Victorian cut-glass styling with light refraction effects
- **Victorian UI**: Pinyon Script and Crimson Text fonts, aged paper textures

### Flower Varieties

**Common (5 species)**: Dandelion, Fern, Tulip, Marigold, Daisy  
**Tier 1 (10 species)**: Pansy, Zinnia, Cosmos, Snapdragon, Sunflower, etc.  
**Tier 2 (8 species)**: Rose, Lily, Iris, Carnation, Chrysanthemum, Dahlia, Peony, Hydrangea  
**Tier 3 (10 species)**: Orchids, Protea, Delphinium, Anemone, Ranunculus, Gardenia, Camellia  
**Tier 4 (8 species)**: Bird of Paradise, Calla Lily, Amaryllis, Hellebore, Passion Flower, Lotus, Magnolia, Wisteria  
**Premium Rare (7 species)**: Blue Poppy, Ghost Orchid, Middlemist Red, Chocolate Cosmos, Juliet Rose, Kadupul, Corpse Flower

## 🕹️ Controls Reference

### Garden Controls
- **Click empty plot** → Plant selected seed
- **Click growing plant** → Water plant
- **Click mature plant** → Harvest
- **Plot View / Garden View** → Toggle between management and visual modes
- **Water All** → Water every plant ($5)
- **Advance Day** → Progress time by 1 day

### Flower Shop Controls
- **Click flower to select** → Highlights with golden glow
- **Click canvas** → Move selected flower to that point
- **Copy button** → Duplicate selected flower
- **Straighten button** → Reset rotation to 0°
- **Rotate buttons** → Turn left/right (sensitivity adjustable)
- **Size buttons** → Scale up/down
- **Sensitivity dial** → Adjust rotation: 1°, 3°, 5°, or 15° per click

## 🗂️ File Structure

- **index.html** — Main game interface (372 lines)
- **game.js** — Complete game logic (1,356 lines)
- **botanical-illustrations.js** — Procedural SVG flower generator (427 lines)
- **styles.css** — Victorian theme with weather effects (3,000+ lines)
- **assets/** — Paper textures and future assets
- **README.md** — This file!

## 🚀 Getting Started

1. Clone or download this repository
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari)
3. No server or build process needed — pure HTML5!
4. Start planting and creating beautiful arrangements

## 💡 Tips & Strategies

- **Start simple**: Grow common flowers first to build up money
- **Water efficiently**: Use "Water All" when you have many plants
- **Check market demand**: Sell flowers when demand is high (>100%)
- **Experiment with arrangements**: Try different layouts to maximize scores
- **Use the sensitivity dial**: Fine rotation (1°-3°) for precise placement, coarse (15°) for quick adjustments
- **Plan your garden**: Leave space for expansion before buying upgrades
- **Collect the herbarium**: Grow every species at least once for the complete collection

## 🎯 Pro Arrangement Tips

- Keep flowers **inside the vase area** (center of canvas)
- Avoid **overlapping** flowers (causes -10% penalty)
- Keep flowers **upright** (upside-down = -40% value!)
- Don't let flowers **fall off the table** (bottom edge)
- Use **copy function** strategically for symmetrical designs
- **Rotate slightly** for natural, organic arrangements

## ⚙️ Technical Details

- Pure vanilla JavaScript (no frameworks)
- Procedural SVG generation for botanical accuracy
- CSS animations for weather, plants, and wildlife
- LocalStorage save system (auto-saves progress)
- Responsive design for various screen sizes

---

**Enjoy your Victorian botanical garden! 🌺🦋**
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
