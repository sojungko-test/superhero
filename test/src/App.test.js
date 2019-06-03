import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from '../../src/App';
import Login from '../../src/Login';
import CharacterList from '../../src/CharacterList';

describe('<App />', () => {
  it('renders login page if user is not logged in', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(Login).length).to.equal(1);
    expect(wrapper.find(CharacterList).length).to.equal(0);
  });

  it('renders search page if user is logged in', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({ userIsLoggedIn: true });

    expect(wrapper.find(Login).length).to.equal(0);
    expect(wrapper.find(CharacterList).length).to.equal(2);
  });
});



