import React from 'react';
import CharacterList from './CharacterList';
// import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hero: null,
      villain: null,
    };

    this.setHero = this.setHero.bind(this);
    this.setVillain = this.setVillain.bind(this);
  }

  setHero(hero) {
    this.setState({ hero });
  }

  setVillain(villain) {
    this.setState({ villain });
  }

  render() {
    const { hero, villain } = this.state;
    return (
      <div className="App">
        <CharacterList character={hero} callback={this.setHero} type="hero" />
        <CharacterList character={villain} callback={this.setVillain} type="villain" />
      </div>
    );
  }
}

export default App;
