import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import YoutubeEntry from '../components/YoutubeEntry';

configure({ adapter: new Adapter() });

describe('<YoutubeEntry />', () => {
  it('renders an iframe a title, a description', () => {
    const entry = {
      title: 'HTML Tutorial - How to Make a Super Simple Website',
      link: 'https://www.youtube.com/watch?v=PlxWf493en4',
      description: 'If you\'re an absolute beginner in web development, you can learn the basics of HTML here. This video covers setting up an HTML file...'
    };

    const youtubeEntry = mount(<YoutubeEntry entry={ entry } />);

    expect(youtubeEntry.find('iframe').length).toBe(1);
    expect(youtubeEntry.find('iframe').prop('title').length).toBeGreaterThan(0);
    expect(youtubeEntry.find('iframe').prop('src').length).toBeGreaterThan(0);
    expect(youtubeEntry.find('.entry-body h2').text().length).toBeGreaterThan(0);
    expect(youtubeEntry.find('.entry-body p').text().length).toBeGreaterThan(0);
  });
});