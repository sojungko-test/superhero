const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  powerstats: {
    intelligence: { type: Number },
    strength: { type: Number },
    durability: { type: Number },
    speed: { type: Number },
    power: { type: Number },
    combat: { type: Number },
  },
  isGood: Boolean,
});

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
