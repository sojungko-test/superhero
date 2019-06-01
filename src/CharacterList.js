import React from 'react';
import throttle from 'lodash.throttle';
import Profile from './Profile';

class CharacterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

    this.onChange = this.onChange.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  onChange(e) {
    const throttledGetResults = throttle(this.getResults, 300);
    throttledGetResults(e.target.value)
      .then((res) => {
        this.setState({ data: res.items });
      });
  }

  async getResults(query) {
    try {
      const url = `/search/${query}`;
      const res = await fetch(url, { method: 'GET' });
      return await res.json();
    } catch (err) {
      console.warn('Error fetching data', err);
    }
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
    );
  }
}

export default CharacterList;
