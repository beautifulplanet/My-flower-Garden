// inventory.js - Show harvested flowers and allow bouquet creation


  const { Player } = window;
  const invDiv = document.createElement('div');
  invDiv.innerHTML = '<h2>Inventory</h2>';
  if (Player.inventory.length === 0) {
    invDiv.innerHTML += '<p>No harvested flowers yet.</p>';
  } else {
    invDiv.innerHTML += '<ul>' + Player.inventory.map(f => `<li>${f.name} (Stage: ${f.stage})</li>`).join('') + '</ul>';
    invDiv.innerHTML += '<button id="make-bouquet">Create Bouquet</button>';
    invDiv.innerHTML += '<div id="bouquet-result"></div>';
  }
  container.appendChild(invDiv);
  const btn = document.getElementById('make-bouquet');
  if (btn) btn.onclick = () => createBouquet();
}

function createBouquet() {
  // Simple: combine all flowers into one bouquet
  const { Player } = window;
  if (Player.inventory.length === 0) return;
  const bouquet = { flowers: [...Player.inventory], quality: 1, value: 0 };
  bouquet.value = bouquet.flowers.reduce((sum, f) => sum + 5 * f.rarity, 0);
  Player.album.push(bouquet);
  Player.inventory = [];
  document.getElementById('bouquet-result').innerHTML = `<b>Bouquet created!</b> Value: $${bouquet.value}`;
}
