// upgrades.js - Upgrades for garden, seeds, tools


  const { Player } = window;
  const upDiv = document.createElement('div');
  upDiv.innerHTML = '<h2>Upgrades</h2>';
  upDiv.innerHTML += `<p>Money: $${Player.money}</p>`;
  upDiv.innerHTML += `<button id="upgrade-garden">Upgrade Garden Size ($50)</button> <button id="upgrade-tools">Upgrade Tools ($30)</button>`;
  container.appendChild(upDiv);
  document.getElementById('upgrade-garden').onclick = () => upgradeGarden();
  document.getElementById('upgrade-tools').onclick = () => upgradeTools();
}

function upgradeGarden() {
  const { Player } = window;
  if (Player.money >= 50 && Player.upgrades.gardenSize < 8) {
    Player.money -= 50;
    Player.upgrades.gardenSize += 2;
    alert('Garden size upgraded!');
  } else {
    alert('Not enough money or max size reached.');
  }
}

function upgradeTools() {
  const { Player } = window;
  if (Player.money >= 30 && Player.upgrades.tools < 3) {
    Player.money -= 30;
    Player.upgrades.tools += 1;
    alert('Tools upgraded!');
  } else {
    alert('Not enough money or max level reached.');
  }
}
