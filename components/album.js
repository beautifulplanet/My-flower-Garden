// album.js - Album/gallery for bouquets


  const { Player } = window;
  const albumDiv = document.createElement('div');
  albumDiv.innerHTML = '<h2>Bouquet Album</h2>';
  if (Player.album.length === 0) {
    albumDiv.innerHTML += '<p>No bouquets saved yet.</p>';
  } else {
    albumDiv.innerHTML += '<ul>' + Player.album.map((b, i) => `<li>Bouquet #${i+1}: ${b.flowers.length} flowers, Value: $${b.value}</li>`).join('') + '</ul>';
  }
  container.appendChild(albumDiv);
}
