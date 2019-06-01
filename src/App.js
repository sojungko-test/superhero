import React from 'react';
import throttle from 'lodash.throttle';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hero: null,
      villain: null,
    }

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
      <div className='App'>
        <PowerStat character={hero} type='hero'/>
        <PowerStat character={villain} type='villain' />         
        <List callback={this.setHero} type='hero'/>
        <List callback={this.setVillain} type='villain'/>
      </div>
    );

  }
}

function PowerStat({ character, type }) {
  if (character) {
    return (
      <Profile item={character} />
    )
  } else {
    return (
      <p>Please choose a {type}</p>
    )
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }

    this.onChange = this.onChange.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  onChange(e) {
    const throttledGetResults = throttle(this.getResults, 500);
    throttledGetResults(e.target.value)
      .then(res => {
        this.setState({ data: res.items });
      });
  }

  getResults(query) {
    if (!query) return Promise.resolve([]);
    // const endpoint = `https://superheroapi.com/api/${process.env.ACCESS_KEY}`;
    const endpoint = 'https://api.github.com/search/users';


    const url = `${endpoint}?q=${query}`;
    return fetch(url, { method: 'GET' })
      .then(res => res.json())
      .catch(err => console.warn('Error fetching data', err));
  }

  render() {
    const { data } = this.state;
    const { callback, type } = this.props;

    return (
      <div className='container'>
        <input onChange={this.onChange}>
        </input>
        <ul>
          {
            data && data.filter(item => !!item) // type check
              .map((item, i) => (
                <ListItem
                  key={i}
                  item={item}
                  callback={callback}
                />
              ))
          }
        </ul>
      </div>  
    )
  }
}

function ListItem(props) {
  const { callback, item } = props;
  return (
    <li onClick={() => callback(item)}>
      <Profile item={item}/>
    </li>
  )
}

function Profile(props) {
  const { item } = props;
  const {
    login,
    type,
    score,
    id,
    url,
  } = item

  return (
    <ul>
      <li>{login}</li>
      <li>{type}</li>
      <li>{score}</li>
      <li>{id}</li>
      <li>{url}</li>
    </ul>
  )
}      

export default App;
