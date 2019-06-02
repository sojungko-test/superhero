const fetch = require('node-fetch');
const db = require('./db/config');
const Character = require('./models/character');

const superheroApi = `https://superheroapi.com/api/${process.env.ACCESS_TOKEN}`;
const maxId = 731;

for (let i = 1; i < maxId + 1; i += 1) {
  (() => {
    setTimeout(() => {
      callApi(i);
    }, 1000 * i);
  })();
}

async function callApi(i) {
  try {
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
      image: {
        url,
      },
    } = resJson;

    const newCharacter = new Character({
      name,
      powerstats: {
        intelligence: Number(intelligence) || 0,
        strength: Number(strength) || 0,
        speed: Number(speed) || 0,
        durability: Number(durability) || 0,
        power: Number(power) || 0,
        combat: Number(combat) || 0,
      },
      isGood: alignment === 'good',
      image: url,
    });
    newCharacter.save((err, newChar) => {
      if (err) {
        console.log('error saving character', err);
      } else {
        console.log('new character saved', newChar);
      }
    });
  } catch (err) {
    console.log('err', err);
  }
}
