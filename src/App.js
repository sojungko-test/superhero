import React from 'react';
import CharacterList from './CharacterList';
import Login from './Login';
// import logo from './logo.svg';
import './App.css';

import {
  authenticateUser,
  isUserAuthenticated,
  deauthenticateUser,
  getApiToken,
  getSessionToken,
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
    this.setHero = this.setHero.bind(this);
    this.setVillain = this.setVillain.bind(this);
  }

  // componentWillMount() {
  //   if (isUserAuthenticated()) {
  //     const sessionToken = getSessionToken();
  //     // check against api
  //   }
  // }


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
    } catch (err) {
      console.warn('error logging in user', err);
    }
  }

  render() {
    const { hero, villain, userIsLoggedIn } = this.state;
    return (
      <div className="App">
        {userIsLoggedIn ? (
          <React.Fragment>
            <CharacterList character={hero} callback={this.setHero} type="hero" />
            <CharacterList character={villain} callback={this.setVillain} type="villain" />
          </React.Fragment>
        )
          : <Login loginUser={this.loginUser} />
        }
      </div>
    );
  }
}

export default App;
