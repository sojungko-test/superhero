const fetch = require('node-fetch');
const db = require('./db/config');
const Character = require('./models/character');

const superheroApi = `https://superheroapi.com/api/${process.env.ACCESS_TOKEN}`;
const maxId = 731;

for (let i = 1; i < maxId + 1; i += 1) {
  (async function callApi() {
    const res = await fetch(`${superheroApi}/${i}`);
    const resJson = await res.json();
    const {
      name,
      powerstats: {
        intelligence,
        strength,
        speed,
        durability,
        power,
        combat,
      },
      biography: {
        alignment,
      },
    } = resJson;

    const newCharacter = new Character({
      name,
      powerstats: {
        intelligence: Number(intelligence),
        strength: Number(strength),
        speed: Number(speed),
        durability: Number(durability),
        power: Number(power),
        combat: Number(combat),
      },
      isGood: alignment === 'good',
    });
    newCharacter.save((err, newChar) => {
      if (err) {
        console.log('error saving character', err);
      } else {
        console.log('new character saved', newChar);
      }
    });
  }());
}
