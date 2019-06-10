const fetch = require('node-fetch');
const pLimit = require('p-limit');
const Debug = require('debug');

const db = require('./config');

const log = Debug('db:setup');
const Character = require('../models/character');

const superheroApi = `https://superheroapi.com/api/${process.env.LEGACY_ACCESS_TOKEN}`;
const maxId = 731;
const limit = pLimit(1); // pass in concurrency

console.log('This is gonna take a while. Please feel free to go grab some coffee :)');

function createPromises() {
  const promises = [];
  for (let i = 1; i < maxId + 1; i += 1) {
    const url = `${superheroApi}/${i}`;
    const promise = limit(() => callApi(url));
    promises.push(promise);
  }
  log(`${maxId} promises created`);
  return promises;
}

db.dropCollection('characters')
  .then((dropped) => {
    if (dropped) {
      log('dropped characters collection');
      return new Promise((resolve, reject) => {
        const promises = createPromises();
        if (promises.length) {
          resolve(promises);
        } else {
          reject(new Error('Error creating promises'));
        }
      });
    }
    throw Error('error dropping characters collection');
  })
  .then(promises => Promise.all(promises))
  .then((result) => {
    log(`all done! ${result.length} characters saved`);
    process.exit(0);
  })
  .catch((err) => {
    log('ERROR : ', err);
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
      const {
        response,
        error,
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
          aliases,
          'place-of-birth': placeOfBirth,
          'first-appearance': firstAppearance,
          publisher,
          alignment,
        },
        image: {
          url,
        },
      } = resJson;
      log(`api call ${response}!${error ? ` ${error}` : ''}`);

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
          alias: Array.isArray(aliases) ? aliases : [],
          placeOfBirth,
          firstAppearance,
          publisher,
          alignment,
        },
        image: url,
      });

      const charType = alignment === 'good' ? 'hero' : 'villain';
      return newCharacter.save()
        .then(newChar => ({ newChar, charType }));
    })
    .then(({ newChar, charType }) => {
      log(`new ${charType}, ${newChar.name}, of id ${newChar.id} saved`);
      return newChar;
    })
    .catch((err) => {
      log('err', err);
    });
}
