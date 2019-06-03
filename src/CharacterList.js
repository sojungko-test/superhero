import React from 'react';
import throttle from 'lodash.throttle';
import './CharacterList.css';
import Profile from './Profile';
import { getToken } from './utils/local-storage';

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
    const throttledGetResults = throttle(this.getResults, 500);
    try {
      const res = await throttledGetResults(e.target.value);
      if (res) {
        this.setState({ data: res });
      }
    } catch (err) {
      console.warn('Error handling input change', err);
    }
  }

  async getResults(query) {
    const { type } = this.props;
    let alignment;

    switch (type) {
      case 'hero':
        alignment = 'good';
        break;
      case 'villain':
        alignment = 'bad';
        break;
      default:
    }

    try {
      const url = `/api/search/${query}?alignment=${alignment}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
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
      <div className="CharacterList" data-attr="character-list">
        <input className="CharacterList-input" onChange={this.onChange} />
        {
          character ? (
            <li className="CharacterList-item" data-attr="character-list-chosen">
              <Profile item={character} customTheme="selected" />
            </li>
          )
            : (
              <p>Please choose a {type}</p>
            )
        }
        <ul className="CharacterList-list" data-attr="character-list-ul">
          {
            data && !!data.length && data.filter(item => !!item) // type check
              .map((item, i) => (
                <li
                  className="CharacterList-item"
                  data-attr="character-list-li"
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
