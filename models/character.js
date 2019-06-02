const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: true },
  powerstats: {
    intelligence: { type: Number, default: 0 },
    strength: { type: Number, default: 0 },
    durability: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
    power: { type: Number, default: 0 },
    combat: { type: Number, default: 0 },
  },
  biography: {
    fullName: String,
    alterEgos: { type: [String], default: [] },
    alias: { type: [String], default: [] },
    placeOfBirth: String,
    firstAppearance: String,
    publisher: String,
    alignment: String,
  },
  image: String,
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
