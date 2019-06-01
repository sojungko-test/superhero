import React from 'react';
import throttle from 'lodash.throttle';
import Card from '@material-ui/core/Card';
// import logo from './logo.svg';
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
        <List character={hero} callback={this.setHero} type='hero'/>
        <List character={villain} callback={this.setVillain} type='villain'/>
      </div>
    );

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
    const { callback, type, character } = this.props;

    return (
      <div className='container'>
        <input onChange={this.onChange}>
        </input>
        <PowerStat character={character} type={type} />
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

function PowerStat({ character, type }) {
  return character ? (
    <Profile item={character} />
  )
    : (
      <p>Please choose a {type}</p>
    )
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
    <Card>
      <p>Login: {login}</p>
      <p>Type: {type}</p>
      <p>Score: {score}</p>
      <p>ID: {id}</p>
      <p>URL: {url}</p>
    </Card>
  )
}      

export default App;
