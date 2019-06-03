This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

[API docs here](./API)


## Get Started

1. Make sure your MongoDB server is running. On MacOS, you can run `brew services start mongodb`.

2. `npm i` or `yarn` to install dependencies

3. `npm start` or `yarn start` to seed the database with legacy data and start both front-end and back-end servers.

4. If you don't have a legacy access token and are too lazy to generate one, feel free to use mine in `.env` (this won't be accessible via Github).


## Notes

**`db:setup` takes a while because I've only allowed one API call to be executed at a time. Increasing the concurrency count to 3 created a lot of API failures so decided to stick to 1.**

If you wish to re-seed the database, you will have to do it manually by opening MongoDB on your terminal (this is mentioned in the Roadmap section below).
- On MacOS, run `mongo`
- `db.characters.drop()`


## Scripts

In the project directory, you can run:

### `npm run commit`

Runs `npx git-cz` which allows you to utilize `commitizen` in standardizing commit messages.

### `npm run dev`

Runs `server:dev` and `client:start` (both front-end and back-end dev servers) concurrently.

### `npm run db:setup`

Seeds the local MongoDB with legacy API data.

### `npm run server:dev`

Runs the server in development mode. Automatically restarts when changes are saved.


### `npm client:start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner using Mocha.

### `npm run client:build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>


## Roadmap

1. Finish implementing `server.test.js`. The tricky part has been ensuring an open database connection and a server launch before actually running the tests. This may require refactoring `db/config.js` to be able to receive a callback. The same goes with the Express server.

2. Currently, the front-end only checks whether `token` is defined in `localStorage` to determine whether a user is authenticated. This is obviously not secure and will have to be fixed so that an API call is made in `componentWillMount` or sometime prior to rendering to check if the token is valid against the database.

3. `server-setup.js` currently does not drop existing collections before seeding the database. This is because `db/config.js` is not able to handle callbacks and will have to be refactored.

4. It would be nice for UX purposes to display a loading icon after a user submits the legacy access token or while the hero or villain lists are loading.

5. Enable users to deselect heros or villains. Currently, the page has to be refreshed or the user has to log out and log back in to clear their selections.

6. More graceful no-image handling. Suppress console warning of image 404s.


## Nice-to-haves

These are things that would be extra nice to have but not as crucial to the app as the suggestions in the Roadmap are.

1. Display powerstats in a hexagon using `d3` or other JS charting frameworks.

2. Refactor all back-end code to async await.