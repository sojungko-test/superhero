const fetch = require('node-fetch');
const pLimit = require('p-limit');
const { promisify } = require('util');

const db = require('./db/config');
const Character = require('./models/character');

const superheroApi = `https://superheroapi.com/api/${process.env.ACCESS_TOKEN}`;
const maxId = 731;
const limit = pLimit(3);

function createPromises() {
  const urls = [];
  for (let i = 1; i < maxId + 1; i += 1) {
    urls.push(`${superheroApi}/${i}`);
  }
  const promises = urls.map((url) => {
    console.log('url', url);
    return limit(() => callApi(url));
  });
  return promises;
}

const asyncCreatePromises = promisify(createPromises);

asyncCreatePromises()
  .then(promises => Promise.all(promises))
  .then((result) => {
    console.log('result', result);
  });

async function fetchRetry(url, n) {
  try {
    return await fetch(url);
  } catch (err) {
    if (n === 1) throw err;
    return fetchRetry(url, n - 1);
  }
}

async function callApi(url) {
  return fetchRetry(url, 5)
    .then(res => res.json())
    .then((resJson) => {
      console.log('resJson', resJson);
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
      console.log('newChar', newCharacter);
      const charType = alignment === 'good' ? 'hero' : 'villain';

      newCharacter.save((err, newChar) => {
        if (err) {
          console.log(`error saving ${charType}`, err);
          return false;
        }
        console.log(`new ${charType} saved`, newChar);
        return true;
      });
    })
    .catch((err) => {
      console.log('err', err);
    });
}
