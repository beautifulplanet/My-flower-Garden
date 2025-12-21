// src/data/flowers.js - Flower Types Data

export const FLOWER_TYPES = [
  // Common flowers (unlocked at start)
  { id: 'dandelion', name: 'Taraxacum officinale', common: 'Dandelion', cost: 2, growth: 1, water: 1, rarity: 0.5, baseValue: 3, color: 'yellow' },
  { id: 'fern', name: 'Nephrolepis exaltata', common: 'Boston Fern', cost: 5, growth: 2, water: 1, rarity: 1, baseValue: 5, color: 'green' },
  { id: 'tulip', name: 'Tulipa gesneriana', common: 'Garden Tulip', cost: 8, growth: 3, water: 2, rarity: 1, baseValue: 8, color: 'red' },
  { id: 'marigold', name: 'Tagetes erecta', common: 'African Marigold', cost: 6, growth: 2, water: 2, rarity: 1, baseValue: 6, color: 'orange' },
  { id: 'daisy', name: 'Bellis perennis', common: 'Common Daisy', cost: 6, growth: 2, water: 1, rarity: 1, baseValue: 6, color: 'white' },
  
  // Tier 1 - Low cost (locked initially)
  { id: 'pansy', name: 'Viola tricolor', common: 'Wild Pansy', cost: 9, growth: 3, water: 2, rarity: 1.2, baseValue: 9, color: 'purple', locked: true },
  { id: 'zinnia', name: 'Zinnia elegans', common: 'Youth-and-Age', cost: 11, growth: 3, water: 2, rarity: 1.3, baseValue: 10, color: 'pink', locked: true },
  { id: 'cosmos', name: 'Cosmos bipinnatus', common: 'Garden Cosmos', cost: 11, growth: 3, water: 2, rarity: 1.2, baseValue: 9, color: 'pink', locked: true },
  { id: 'snapdragon', name: 'Antirrhinum majus', common: 'Snapdragon', cost: 12, growth: 3, water: 2, rarity: 1.4, baseValue: 11, color: 'red', locked: true },
  { id: 'sunflower', name: 'Helianthus annuus', common: 'Common Sunflower', cost: 12, growth: 4, water: 2, rarity: 1.5, baseValue: 12, color: 'yellow', locked: true },
  
  // Tier 2 - Medium cost
  { id: 'rose', name: 'Rosa hybrida', common: 'Hybrid Tea Rose', cost: 23, growth: 5, water: 3, rarity: 2, baseValue: 20, color: 'red', locked: true },
  { id: 'lily', name: 'Lilium candidum', common: 'Madonna Lily', cost: 18, growth: 4, water: 2, rarity: 1.8, baseValue: 18, color: 'white', locked: true },
  { id: 'iris', name: 'Iris germanica', common: 'Bearded Iris', cost: 20, growth: 4, water: 2, rarity: 1.7, baseValue: 17, color: 'purple', locked: true },
  { id: 'carnation', name: 'Dianthus caryophyllus', common: 'Carnation', cost: 15, growth: 4, water: 2, rarity: 1.6, baseValue: 14, color: 'pink', locked: true },
  { id: 'chrysanthemum', name: 'Chrysanthemum morifolium', common: 'Florist Mum', cost: 17, growth: 4, water: 2, rarity: 1.6, baseValue: 15, color: 'yellow', locked: true },
  { id: 'dahlia', name: 'Dahlia pinnata', common: 'Garden Dahlia', cost: 21, growth: 5, water: 3, rarity: 1.9, baseValue: 19, color: 'red', locked: true },
  { id: 'peony', name: 'Paeonia lactiflora', common: 'Chinese Peony', cost: 24, growth: 5, water: 3, rarity: 2.1, baseValue: 22, color: 'pink', locked: true },
  { id: 'hydrangea', name: 'Hydrangea macrophylla', common: 'Bigleaf Hydrangea', cost: 23, growth: 5, water: 3, rarity: 2, baseValue: 21, color: 'blue', locked: true },
  
  // Tier 3 - High cost
  { id: 'orchid-phalaenopsis', name: 'Phalaenopsis amabilis', common: 'Moth Orchid', cost: 38, growth: 6, water: 3, rarity: 2.5, baseValue: 35, color: 'white', locked: true },
  { id: 'orchid-cattleya', name: 'Cattleya labiata', common: 'Corsage Orchid', cost: 42, growth: 6, water: 3, rarity: 2.6, baseValue: 38, color: 'purple', locked: true },
  { id: 'protea', name: 'Protea cynaroides', common: 'King Protea', cost: 45, growth: 7, water: 3, rarity: 2.8, baseValue: 42, color: 'pink', locked: true },
  { id: 'delphinium', name: 'Delphinium elatum', common: 'Candle Larkspur', cost: 30, growth: 5, water: 3, rarity: 2.2, baseValue: 28, color: 'blue', locked: true },
  { id: 'anemone', name: 'Anemone coronaria', common: 'Poppy Anemone', cost: 27, growth: 5, water: 2, rarity: 2, baseValue: 24, color: 'red', locked: true },
  { id: 'ranunculus', name: 'Ranunculus asiaticus', common: 'Persian Buttercup', cost: 33, growth: 5, water: 3, rarity: 2.3, baseValue: 30, color: 'pink', locked: true },
  { id: 'gardenia', name: 'Gardenia jasminoides', common: 'Cape Jasmine', cost: 36, growth: 6, water: 3, rarity: 2.4, baseValue: 32, color: 'white', locked: true },
  { id: 'camellia', name: 'Camellia japonica', common: 'Japanese Camellia', cost: 35, growth: 6, water: 3, rarity: 2.3, baseValue: 31, color: 'red', locked: true },
  
  // Tier 4 - Very high cost (exotic)
  { id: 'bird-of-paradise', name: 'Strelitzia reginae', common: 'Crane Flower', cost: 60, growth: 8, water: 4, rarity: 3, baseValue: 55, color: 'orange', locked: true },
  { id: 'calla-lily', name: 'Zantedeschia aethiopica', common: 'Calla Lily', cost: 53, growth: 7, water: 3, rarity: 2.8, baseValue: 48, color: 'white', locked: true },
  { id: 'amaryllis', name: 'Hippeastrum hybridum', common: 'Amaryllis', cost: 48, growth: 6, water: 3, rarity: 2.7, baseValue: 45, color: 'red', locked: true },
  { id: 'hellebore', name: 'Helleborus niger', common: 'Christmas Rose', cost: 57, growth: 7, water: 3, rarity: 2.9, baseValue: 52, color: 'white', locked: true },
  { id: 'passion-flower', name: 'Passiflora caerulea', common: 'Blue Passionflower', cost: 54, growth: 7, water: 4, rarity: 2.8, baseValue: 50, color: 'blue', locked: true },
  { id: 'lotus', name: 'Nelumbo nucifera', common: 'Sacred Lotus', cost: 68, growth: 8, water: 5, rarity: 3.2, baseValue: 62, color: 'pink', locked: true },
  { id: 'magnolia', name: 'Magnolia grandiflora', common: 'Southern Magnolia', cost: 63, growth: 8, water: 4, rarity: 3.1, baseValue: 58, color: 'white', locked: true },
  { id: 'wisteria', name: 'Wisteria sinensis', common: 'Chinese Wisteria', cost: 57, growth: 7, water: 3, rarity: 2.9, baseValue: 53, color: 'purple', locked: true },
  
  // Tier 5 - Premium/Rare
  { id: 'blue-poppy', name: 'Meconopsis betonicifolia', common: 'Himalayan Blue Poppy', cost: 90, growth: 9, water: 4, rarity: 3.5, baseValue: 80, color: 'blue', locked: true },
  { id: 'ghost-orchid', name: 'Dendrophylax lindenii', common: 'Ghost Orchid', cost: 113, growth: 10, water: 4, rarity: 4, baseValue: 100, color: 'white', locked: true },
  { id: 'juliet-rose', name: 'Rosa \'Sweet Juliet\'', common: 'Juliet Rose', cost: 98, growth: 9, water: 4, rarity: 3.7, baseValue: 88, color: 'peach', locked: true },
  { id: 'kadupul', name: 'Epiphyllum oxypetalum', common: 'Queen of the Night', cost: 120, growth: 10, water: 5, rarity: 4.2, baseValue: 110, color: 'white', locked: true },
  { id: 'chocolate-cosmos', name: 'Cosmos atrosanguineus', common: 'Chocolate Cosmos', cost: 83, growth: 8, water: 3, rarity: 3.3, baseValue: 75, color: 'brown', locked: true },
  { id: 'parrot-flower', name: 'Impatiens psittacina', common: 'Parrot Flower', cost: 105, growth: 9, water: 4, rarity: 3.8, baseValue: 95, color: 'red', locked: true },
  { id: 'jade-vine', name: 'Strongylodon macrobotrys', common: 'Jade Vine', cost: 102, growth: 9, water: 4, rarity: 3.7, baseValue: 92, color: 'jade', locked: true },
  { id: 'middlemist-red', name: 'Camellia \'Middlemist\'', common: 'Middlemist Red', cost: 135, growth: 11, water: 5, rarity: 4.5, baseValue: 125, color: 'pink', locked: true },
  { id: 'corpse-flower', name: 'Amorphophallus titanum', common: 'Titan Arum', cost: 128, growth: 12, water: 5, rarity: 4.3, baseValue: 115, color: 'purple', locked: true },
  { id: 'black-bat', name: 'Tacca chantrieri', common: 'Black Bat Flower', cost: 108, growth: 9, water: 4, rarity: 3.9, baseValue: 98, color: 'black', locked: true },
  { id: 'bleeding-heart', name: 'Lamprocapnos spectabilis', common: 'Bleeding Heart', cost: 42, growth: 6, water: 3, rarity: 2.5, baseValue: 38, color: 'pink', locked: true },
  { id: 'foxglove', name: 'Digitalis purpurea', common: 'Common Foxglove', cost: 29, growth: 5, water: 2, rarity: 2.1, baseValue: 26, color: 'purple', locked: true },
  { id: 'edelweiss', name: 'Leontopodium alpinum', common: 'Edelweiss', cost: 72, growth: 8, water: 3, rarity: 3.2, baseValue: 65, color: 'white', locked: true },
  { id: 'fire-lily', name: 'Gloriosa superba', common: 'Flame Lily', cost: 78, growth: 8, water: 4, rarity: 3.3, baseValue: 70, color: 'red', locked: true },
  
  // Tier 6 - Ultra Rare & Exotic
  { id: 'rothschild-orchid', name: 'Paphiopedilum rothschildianum', common: "Rothschild's Slipper Orchid", cost: 200, growth: 14, water: 5, rarity: 5, baseValue: 180, color: 'gold', locked: true },
  { id: 'saffron-crocus', name: 'Crocus sativus', common: 'Saffron Crocus', cost: 165, growth: 12, water: 4, rarity: 4.5, baseValue: 150, color: 'purple', locked: true },
  { id: 'vanilla-orchid', name: 'Vanilla planifolia', common: 'Vanilla Orchid', cost: 180, growth: 13, water: 5, rarity: 4.7, baseValue: 165, color: 'cream', locked: true },
  { id: 'dragon-arum', name: 'Dracunculus vulgaris', common: 'Dragon Arum', cost: 145, growth: 11, water: 4, rarity: 4.2, baseValue: 135, color: 'purple', locked: true },
  { id: 'moonflower', name: 'Ipomoea alba', common: 'Moonflower', cost: 95, growth: 9, water: 4, rarity: 3.6, baseValue: 88, color: 'white', locked: true },
  { id: 'angel-trumpet', name: 'Brugmansia arborea', common: "Angel's Trumpet", cost: 155, growth: 11, water: 4, rarity: 4.3, baseValue: 140, color: 'white', locked: true },
  { id: 'night-blooming-cereus', name: 'Selenicereus grandiflorus', common: 'Night-Blooming Cereus', cost: 175, growth: 12, water: 4, rarity: 4.6, baseValue: 160, color: 'white', locked: true },
  { id: 'corpse-lily', name: 'Rafflesia arnoldii', common: 'Corpse Lily', cost: 250, growth: 15, water: 6, rarity: 5.5, baseValue: 230, color: 'red', locked: true },
  { id: 'youtan-poluo', name: 'Youtan Poluo', common: 'Udumbara Flower', cost: 300, growth: 18, water: 6, rarity: 6, baseValue: 280, color: 'white', locked: true },
  { id: 'black-orchid', name: 'Coelogyne pandurata', common: 'Black Orchid', cost: 220, growth: 14, water: 5, rarity: 5.2, baseValue: 200, color: 'black', locked: true },
];

// Helper function to get flower by ID
export function getFlowerById(id) {
  return FLOWER_TYPES.find(f => f.id === id);
}

// Get unlocked flowers
export function getUnlockedFlowers(upgrades) {
  return FLOWER_TYPES.filter(f => {
    if (!f.locked) return true;
    return upgrades.includes(`unlock-${f.id}`);
  });
}
