import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LibsynEntry from '../components/LibsynEntry';

configure({ adapter: new Adapter() });

describe('<LibsynEntry />', () => {
  it('renders a thumbnail, a title, a description and an audio player', () => {
    const entry = {
      title: 'Ep. 28 - How to land a six figure job in tech with no connections',
      thumbnail: 'https://ssl-static.libsyn.com/p/assets/2/f/f/7/2ff7cc8aa33fe438/freecodecamp-square-logo-large-1400.jpg',
      description: 'Austin was stuck in a job he hated. But given his non-traditional background and lack of Silicon Valley network, he knew he\'d have to work...',
      audioSource: 'https://traffic.libsyn.com/secure/freecodecamp/Ep._28_-_How_to_land_a_six_figure_job_in_tech_with_no_connections_final_edit.mp3?dest-id=603849',
      audioType: 'audio/mpeg'
    };

    const libsynEntry = mount(<LibsynEntry entry={ entry } />);

    expect(libsynEntry.find('.entry-thumbnail img').length).toBe(1);
    expect(libsynEntry.find('.entry-thumbnail img').prop('alt')).toEqual('');
    expect(libsynEntry.find('.entry-thumbnail img').prop('src').length).toBeGreaterThan(0);
    expect(libsynEntry.find('.entry-body h2').text().length).toBeGreaterThan(0);
    expect(libsynEntry.find('.entry-body p').text().length).toBeGreaterThan(0);
    expect(libsynEntry.find('audio').length).toBe(1);
    expect(libsynEntry.find('audio source').prop('src').length).toBeGreaterThan(0);
    expect(libsynEntry.find('audio source').prop('type').length).toBeGreaterThan(0);
  })
});