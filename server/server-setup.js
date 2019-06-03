const { promisify } = require('util');
const fetch = require('node-fetch');
const pLimit = require('p-limit');
const Debug = require('debug');

const log = Debug('server:server-setup');
const db = require('../db/config');
const Character = require('../models/character');

const superheroApi = `https://superheroapi.com/api/${process.env.LEGACY_ACCESS_TOKEN}`;
const maxId = 731;
const limit = pLimit(1);

function createPromises() {
  const urls = [];
  for (let i = 1; i < maxId + 1; i += 1) {
    urls.push(`${superheroApi}/${i}`);
  }
  const promises = urls.map((url) => {
    log('pushing legacy url to array of urls', url);
    return limit(() => callApi(url));
  });
  return promises;
}

const asyncCreatePromises = promisify(createPromises);

asyncCreatePromises()
  .then(promises => Promise.all(promises))
  .then((result) => {
    log('all done!', result);
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
      log('resJson', resJson);
      const {
        id,
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
        id: Number(id) || 0,
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

      log('newChar', newCharacter);
      const charType = alignment === 'good' ? 'hero' : 'villain';

      return { newChar: newCharacter.save(), charType };
    })
    .then(({ charType }) => {
      log(`new ${charType} saved`);
      return true;
    })
    .catch((err) => {
      log('err', err);
    });
}
