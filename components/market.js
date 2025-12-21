// market.js - Weekly market logic and selling bouquets


  const { Market, FLOWER_TYPES, Player, formatCurrency } = window;
  // Generate or show current week's demand
  if (Object.keys(Market.demand).length === 0) {
    FLOWER_TYPES.forEach(f => {
      Market.demand[f.name] = 0.8 + Math.random() * 0.8; // 0.8x to 1.6x
    });
  }
  const week = Market.week;
  const demand = Market.demand;

  const marketDiv = document.createElement('div');
  marketDiv.innerHTML = `<h2>Weekly Market - Week ${week}</h2>`;
  marketDiv.innerHTML += '<ul>' + FLOWER_TYPES.map(f => `<li>${f.name}: <b>${(demand[f.name]*100).toFixed(0)}%</b> demand</li>`).join('') + '</ul>';

  // List bouquets in inventory
  if (Player.inventory.length === 0) {
    marketDiv.innerHTML += '<p>No harvested flowers. Harvest from your garden first!</p>';
  } else {
    marketDiv.innerHTML += '<button id="sell-btn">Sell Bouquets</button>';
    marketDiv.innerHTML += '<div id="sell-results"></div>';
  }
  container.appendChild(marketDiv);

  const sellBtn = document.getElementById('sell-btn');
  if (sellBtn) {
    sellBtn.onclick = () => sellBouquets();
  }
}

function sellBouquets() {
  // Simple: sell all flowers as single bouquets for demo
  const { Player, Market, FLOWER_TYPES, formatCurrency } = window;
  let total = 0;
  let results = '';
  Player.inventory.forEach(flower => {
    const base = 5 * flower.rarity;
    const demand = Market.demand[flower.name] || 1;
    const quality = (flower.soil / flower.soil) * 1; // Placeholder for quality
    const value = Math.round((base + 2) * demand * quality);
    total += value;
    results += `<li>${flower.name}: ${formatCurrency(value)}</li>`;
  });
  Player.money += total;
  Player.inventory = [];
  document.getElementById('sell-results').innerHTML = `<ul>${results}</ul><b>Total: ${formatCurrency(total)}</b>`;
}
