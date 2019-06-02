const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  powerstats: {
    intelligence: { type: Number, default: 0 },
    strength: { type: Number, default: 0 },
    durability: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
    power: { type: Number, default: 0 },
    combat: { type: Number, default: 0 },
  },
  isGood: Boolean,
  image: String,
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
