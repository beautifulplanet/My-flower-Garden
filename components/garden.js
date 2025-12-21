// garden.js - Garden grid logic and rendering



let garden = [];

  return window.Player.upgrades.gardenSize;
}

  const size = getGridSize();
  if (garden.length !== size * size) {
    garden = Array(size * size).fill(null);
  }
}

  initGarden();
  const size = getGridSize();
  const grid = document.createElement('div');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = `repeat(${size}, 60px)`;
  grid.style.gridGap = '8px';
  grid.style.margin = '0 auto 2rem auto';
  grid.style.justifyContent = 'center';

  garden.forEach((plant, idx) => {
    const cell = document.createElement('div');
    cell.style.width = '60px';
    cell.style.height = '60px';
    cell.style.background = '#f8f5e9';
    cell.style.border = '1px solid #bfa77a';
    cell.style.borderRadius = '8px';
    cell.style.display = 'flex';
    cell.style.alignItems = 'center';
    cell.style.justifyContent = 'center';
    cell.style.cursor = 'pointer';
    if (plant) {
      cell.innerHTML = `<span title="${plant.name} (Stage: ${plant.stage})">${plant.name[0]}</span>`;
      cell.style.opacity = plant.stage >= plant.growth ? 1 : 0.7;
      cell.onclick = () => harvestPlant(idx);
    } else {
      cell.textContent = '+';
      cell.title = 'Plant a seed';
      cell.onclick = () => plantSeed(idx);
    }
    grid.appendChild(cell);
  });

  container.appendChild(grid);

  // Add water/grow/harvest controls (for demo)
  const controls = document.createElement('div');
  controls.style.marginTop = '1rem';
  controls.innerHTML = `<button id="water-btn">Water All</button> <button id="grow-btn">Advance Growth</button>`;
  container.appendChild(controls);
  document.getElementById('water-btn').onclick = waterAll;
  document.getElementById('grow-btn').onclick = growAll;
}

  if (garden[idx]) return;
  const { FLOWER_TYPES, Player } = window;
  const seed = prompt('Plant which seed? (Tulip, Fern, Dandelion)').toLowerCase();
  const found = FLOWER_TYPES.find(f => f.name.toLowerCase() === seed);
  if (found && Player.money >= found.seedCost) {
    garden[idx] = { ...found, stage: 0, watered: 0, soil: found.soil };
    Player.money -= found.seedCost;
    updateGarden();
  } else if (found) {
    alert('Not enough money for this seed.');
  } else {
    alert('Unknown seed.');
  }
}

  garden.forEach(plant => {
    if (plant && plant.watered < plant.water) plant.watered++;
  });
  updateGarden();
}

  garden.forEach(plant => {
    if (plant && plant.watered >= plant.water && plant.stage < plant.growth) {
      plant.stage++;
      plant.watered = 0;
    }
  });
  updateGarden();
}

  const { Player } = window;
  const plant = garden[idx];
  if (plant && plant.stage >= plant.growth) {
    Player.inventory.push({ ...plant });
    garden[idx] = null;
    updateGarden();
  }
}

function updateGarden() {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '';
  renderGarden(mainContent);
}
