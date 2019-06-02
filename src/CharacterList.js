import React from 'react';
import throttle from 'lodash.throttle';
import './CharacterList.css';
import Profile from './Profile';
import { getSessionToken } from './utils/local-storage';

class CharacterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };

    this.onChange = this.onChange.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  async onChange(e) {
    const throttledGetResults = throttle(this.getResults, 300);
    const res = await throttledGetResults(e.target.value);
    if (res) {
      this.setState({ data: res });
    }
  }

  async getResults(query) {
    const { type } = this.props;
    let alignment;

    if (type === 'hero') {
      alignment = 'good';
    } else if (type === 'villain') {
      alignment = 'bad';
    }
    try {
      const url = `/search/${query}?alignment=${alignment}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getSessionToken()}`,
        },
      });
      return await res.json();
    } catch (err) {
      console.warn('Error fetching data', err);
    }
  }

  render() {
    const { data } = this.state;
    const { callback, type, character } = this.props;

    return (
      <div className="CharacterList">
        <input className="CharacterList-input" onChange={this.onChange} />
        {
          character ? (
            <li className="CharacterList-item">
              <Profile item={character} customTheme="selected" />
            </li>
          )
            : (
              <p>Please choose a {type}</p>
            )
        }
        <ul className="CharacterList-list">
          {
            data && data.filter(item => !!item) // type check
              .map((item, i) => (
                <li
                  className="CharacterList-item"
                  key={i}
                  onClick={() => callback(item)}
                >
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
