import React from 'react';
import MediumEntry from './MediumEntry';
import YoutubeEntry from './YoutubeEntry';
import LibsynEntry from './LibsynEntry';

const Entry = (props) => {
  const { entry, platform } = props;

  return (
    platform === 'medium'
    ? <MediumEntry entry={ entry } />
    : platform === 'youtube'
    ? <YoutubeEntry entry={ entry } />
    : platform === 'libsyn'
    ? <LibsynEntry entry={ entry } />
    : null
  );
};

export default Entry;