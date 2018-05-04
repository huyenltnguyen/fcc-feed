import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TwitterEntry from '../components/TwitterEntry';
import { Tweet } from 'react-twitter-widgets';

configure({ adapter: new Adapter() });

describe('<TwitterEntry />', () => {
  it('renders a <Tweet /> component', () => {
    const entry = {
      id: 'https://twitter.com/freeCodeCamp/status/988523915810164736'
    };
    const tweetId = entry.id.replace(/https:.*\//, '');

    const twitterEntry = mount(<TwitterEntry entry={ entry } />);

    expect(twitterEntry.contains(<Tweet tweetId={ tweetId } />)).toEqual(true);
  });
});