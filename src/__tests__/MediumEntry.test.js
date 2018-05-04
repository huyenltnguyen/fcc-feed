import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MediumEntry from '../components/MediumEntry';

configure({ adapter: new Adapter() });

describe('<MediumEntry />', () => {
  it('should render a thumbnail, an article title, and article description', () => {
    const entry = {
      title: 'Python interview question guide: how to code a linked list',
      thumbnail: 'https://cdn-images-1.medium.com/max/1024/1*Y2zqUEPWCjkWCWVnxmy3GQ.jpeg',
      description: 'I always understood the core concept of Linked Lists, but I never put it into practice.It wasn’t until my very first...'
    };

    const mediumEntry = mount(<MediumEntry entry={ entry } />);

    expect(mediumEntry.find('.entry-thumbnail img').length).toBe(1);
    expect(mediumEntry.find('.entry-thumbnail img').prop('alt')).toEqual('');
    expect(mediumEntry.find('.entry-thumbnail img').prop('src').length).toBeGreaterThan(0);
    expect(mediumEntry.find('.entry-body h2').text().length).toBeGreaterThan(0);
    expect(mediumEntry.find('.entry-body p').text().length).toBeGreaterThan(0);
    //expect(mediumEntry.props().entry.thumbnail.length).toBeGreaterThan(0);  // assert props.entry.thumnail
  });
});

