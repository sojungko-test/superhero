import React from 'react';
import CharacterList from './CharacterList';
import Login from './Login';
// import logo from './logo.svg';
import './App.css';

import {
  authenticateUser,
  isUserAuthenticated,
  deauthenticateUser,
} from './utils/local-storage';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hero: null,
      villain: null,
      userIsLoggedIn: false,
    };

    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.setHero = this.setHero.bind(this);
    this.setVillain = this.setVillain.bind(this);
  }

  componentWillMount() {
    if (isUserAuthenticated()) {
      this.setState({ userIsLoggedIn: true });
    }
  }


  setHero(hero) {
    this.setState({ hero });
  }

  setVillain(villain) {
    this.setState({ villain });
  }

  async loginUser(apiToken) {
    try {
      const res = await fetch('/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiToken }),
      });
      const resJson = await res.json();
      console.log('resJson', resJson);
      authenticateUser(resJson.token);
      this.setState({ userIsLoggedIn: true });
    } catch (err) {
      console.warn('error logging in user', err);
    }
  }

  logoutUser() {
    deauthenticateUser();
    this.setState({ userIsLoggedIn: false });
  }

  render() {
    const { hero, villain, userIsLoggedIn } = this.state;
    return (
      <div className="App">
        {userIsLoggedIn ? (
          <React.Fragment>
            <button
              className="App-button"
              type="submit"
              onClick={this.logoutUser}
            >
              Logout
            </button>
            <div className="App-list">
              <CharacterList character={hero} callback={this.setHero} type="hero" />
              <CharacterList character={villain} callback={this.setVillain} type="villain" />
            </div>
          </React.Fragment>
        )
          : <Login loginUser={this.loginUser} />
        }
      </div>
    );
  }
}

export default App;
