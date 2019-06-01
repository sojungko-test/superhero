import React from 'react';
import throttle from 'lodash.throttle';
import Profile from './Profile';

class CharacterList extends React.Component {
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
      .then((res) => {
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
      <div className="container">
        <input onChange={this.onChange} />
        {
          character ? <Profile item={character} />
            : (
              <p>Please choose a {type}</p>
            )
        }
        <ul>
          {
            data && data.filter(item => !!item) // type check
              .map((item, i) => (
                <li key={i} onClick={() => callback(item)}>
                  <Profile item={item} />
                </li>
              ))
          }
        </ul>
      </div>
    )
  }
}

export default CharacterList;
