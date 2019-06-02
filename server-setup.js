const fetch = require('node-fetch');
const db = require('./db/config');
const Character = require('./models/character');

const superheroApi = `https://superheroapi.com/api/${process.env.ACCESS_TOKEN}`;
const maxId = 731;

for (let i = 1; i < maxId + 1; i += 1) {
  (() => {
    setTimeout(() => {
      callApi(i);
    }, 300 * i);
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
        full_name: fullName,
        'alter-egos': alterEgos,
        alias,
        'place-of-birth': placeOfBirth,
        'first-appearance': firstAppearance,
        publisher,
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
      biography: {
        fullName,
        alterEgos: Array.isArray(alterEgos) ? alterEgos : [],
        alias: Array.isArray(alias) ? alias : [],
        placeOfBirth,
        firstAppearance,
        publisher,
        alignment,
      },
      image: url,
    });

    const charType = alignment === 'good' ? 'hero' : 'villain';

    newCharacter.save((err, newChar) => {
      if (err) {
        console.log(`error saving ${charType}`, err);
      } else {
        console.log(`new ${charType} saved`, newChar);
      }
    });
  } catch (err) {
    console.log('err', err);
  }
}
