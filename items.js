/*
  Rarity:
  0: Common 
  1: Uncommon 
  2: Rare
  3: Epic
  4: Legendary
*/

const items = [
  {
    name: "Pink Flamingo",
    type: "Harvesting Tool",
    description: "From suburban lawns to the front lines, the Pink Flamingo Pickaxe is always ready for action.",
    cost: 1500,
    special: "This item has a pink tracer.",
    src: "flamingo",
    frames: 39,
    mainframe: 13,
    rarity: 3
  },
  {
    name: "Mogul Master",
    type: "Outfit",
    description: "Winter ski outfits represent some of the countries with the most Fortnite players.",
    cost: 1500,
    special: null,
    src: "skigirl",
    frames: 50,
    mainframe: 27,
    rarity: 3
  },
  {
    name: "Plunja",
    type: "Harvesting Tool",
    description: "The competition is circling the drain.",
    cost: 800,
    special: null,
    src: "ninjaplunger",
    frames: 39,
    mainframe: 14,
    rarity: 2
  },
  {
    name: "Crackshot",
    type: "Outfit",
    description: "Get out there and... crack some nuts.",
    cost: 2000,
    special: null,
    src: "crackshot",
    frames: 46,
    mainframe: 20,
    rarity: 4
  },
  {
    name: "Sparkle Specialist",
    type: "Outfit",
    description: "It's time to shine!",
    cost: "Battlepass 1",
    special: "Animated clothing.",
    src: "sparkle_specialist",
    frames: 43,
    mainframe: 20,
    rarity: 3,
    set: "Fortnite Fever Set"
  },
  {
    name: "Blue Squire",
    type: "Outfit",
    description: "The bold warrior of Moisty Mire.",
    cost: "Battlepass 1",
    special: null,
    src: "blue_squire",
    frames: 44,
    mainframe: 22,
    rarity: 2,
    set: "Fort Knights Set"
  },
  {
    name: "Cloud Strike",
    type: "Glider",
    description: "Forecasting storms all week.",
    cost: 1200,
    special: "Animated texture",
    src: "cloud_strike",
    frames: 38,
    mainframe: 5,
    rarity: 3
  },
  {
    name: "Get Down!",
    type: "Glider",
    description: "Can you dig it?",
    cost: "Battlepass 1",
    special: "Animated texture",
    src: "get_down",
    frames: 39,
    mainframe: 1,
    rarity: 3,
    set: "Fortnite Fever Set"
  }, {
    name: "Chomp Jr.",
    type: "Harvesting Tool",
    description: "They're going to need a bigger fort.",
    cost: 1500,
    special: "Jiggle physics and special sound effect.",
    src: "chomp_jr",
    frames: 35,
    mainframe: 1,
    rarity: 3
  }, {
    name: "Disco Brawl",
    type: "Harvesting Tool",
    description: "Ready for a ballroom blitz",
    cost: 1500,
    special: "Animated texture on inspect, but not animated in game!",
    src: "disco_brawl",
    frames: 34,
    mainframe: 5,
    rarity: 3,
    set: "Fortnite Fever Set"
  }, {
    name: "AC/DC",
    type: "Harvesting Tool",
    description: "Warning: High Voltage!",
    cost: "Battlepass 1",
    special: "Animated texture & sound effect.",
    src: "acdc",
    frames: 34,
    mainframe: 21,
    rarity: 3
  }, {
    name: "Royale Knight",
    type: "Outfit",
    description: "The dauntless champion of Tomato Town.",
    cost: "Battlepass 1",
    special: null,
    src: "royale_knight",
    frames: 42,
    mainframe: 21,
    rarity: 2,
    set: "Fort Knights Set"
  }, {
    name: "Party Animal",
    type: "Harvesting Tool",
    description: "Red plastic cups not included.",
    cost: 1500,
    special: "Animated texture in game, special splash animation when hiting objects, special sound effect.",
    src: "party_animal",
    frames: 30,
    mainframe: 21,
    rarity: 3
  }, {
    name: "Axecalibur",
    type: "Harvesting Tool",
    description: "Stone and anvil not included.",
    cost: "Battlepass 1",
    special: null,
    src: "axecalibur",
    frames: 34,
    mainframe: 2,
    rarity: 2,
    set: "Fort Knights Set"
  }, {
    name: "Cuddle Team Leader",
    type: "Outfit",
    description: "Hut it out.",
    cost: "2000",
    special: null,
    src: "cuddle_team_leader",
    frames: 33,
    mainframe: 15,
    rarity: 4,
    set: "Royale Hearts Set"
  }, {
    name: "Pure Salt",
    type: "Emote",
    description: "All-purpose seasoning.",
    cost: "500",
    special: "Sound effect.",
    src: "pure_salt",
    rarity: 2
  }, {
    name: "Death Valley",
    type: "Harvesting Tool",
    description: "Whenever you need a skull on a stick, the Death Valley pickaxe is there for you.",
    cost: 1500,
    src: "death_valley",
    rarity: 3,
    frames: 34,
    mainframe: 12
  }, {
    name: "Survival Specialist",
    type: "Outfit",
    description: "Rare Survival Specialist outfit.",
    cost: 1200,
    src: "survival_specialist",
    rarity: 3,
    frames: 41,
    mainframe: 20
  }, {
    name: "Stealth",
    type: "Glider",
    description: "Shh.",
    cost: 500,
    src: "stealth",
    rarity: 1,
    frames: 39,
    mainframe: 1
  }, {
    name: "Arctic Assassin",
    type: "Outfit",
    description: "Stay frosty.",
    cost: 1200,
    src: "artic_assassin",
    rarity: 2,
    frames: 42,
    mainframe: 19,
    set: "Artic Command Set"
  }, {
    name: "Kiss Kiss",
    type: "Emote",
    description: "Show some love.",
    cost: 500,
    src: "kiss_kiss",
    rarity: 2,
    set: "Royale Hearts Set"
  }, {
    name: "True Love",
    type: "Emote",
    description: "Get Romantic.",
    cost: 200,
    src: "true_love",
    rarity: 1,
    set: "Royale Hearts Set"
  }, {
    name: "Black Knight",
    type: "Outfit",
    description: "The odious scourge of Wailing Woods.",
    cost: "Battlepass 1",
    src: "black_knight",
    rarity: 4,
    frames: 42,
    mainframe: 19,
    set: "Fort Knights Set"
  }
];


const rarityColors = ["common", "uncommon", "rare", "epic", "legendary"];

const rarityColorsHex = ["#cacbcb", "#91eb01", "#00e9f0", "#d928f6", "#f1b459"]
