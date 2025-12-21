// main.js - Entry point for Flower Garden Game
import { renderGarden } from './garden.js';
import { renderMarket } from './market.js';
import { renderInventory } from './inventory.js';
import { renderUpgrades } from './upgrades.js';
import { renderAlbum } from './album.js';

const mainContent = document.getElementById('main-content');
const navButtons = document.querySelectorAll('nav button');

function showSection(section) {
  mainContent.innerHTML = '';
  switch (section) {
    case 'garden':
      renderGarden(mainContent);
      break;
    case 'market':
      renderMarket(mainContent);
      break;
    case 'inventory':
      renderInventory(mainContent);
      break;
    case 'upgrades':
      renderUpgrades(mainContent);
      break;
    case 'album':
      renderAlbum(mainContent);
      break;
    default:
      mainContent.textContent = 'Section coming soon!';
  }
}

navButtons.forEach(btn => {
  btn.addEventListener('click', () => showSection(btn.dataset.section));
});

// Show garden by default
showSection('garden');
