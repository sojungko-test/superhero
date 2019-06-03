import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import CharacterList from '../../src/CharacterList';
import Profile from '../../src/Profile';

describe('<CharacterList />', () => {
  it('does not break when data is undefined or null', () => {
    const wrapper = shallow(<CharacterList />);
    wrapper.setState({ data: null });
    expect(wrapper.find('[data-attr="character-list"]').length).to.equal(1);
  });

  it('does not break when data is an empty array', () => {
    const wrapper = shallow(<CharacterList />);
    expect(wrapper.find('[data-attr="character-list"]').length).to.equal(1);
  });

  it('renders choose prompt if no character is selected', () => {
    const wrapper = shallow(<CharacterList type="hero" />);
    const pTag = wrapper.find('p');
    const li = wrapper.find('ul[data-attr="character-list-li"]');

    expect(pTag.length).to.equal(1);
    expect(pTag.text()).to.equal('Please choose a hero');
    expect(li.length).to.equal(0);
  });

  it('renders chosen character\'s profile', () => {
    const character = {};
    const wrapper = shallow(<CharacterList character={character} />);
    const chosenLi = wrapper.find('li[data-attr="character-list-chosen"]');
    const profile = wrapper.find(Profile);

    expect(chosenLi.length).to.equal(1);
    expect(profile.length).to.equal(1);
  });
});


