import React from 'react';
import MediumEntry from './MediumEntry';
import YoutubeEntry from './YoutubeEntry';
import LibsynEntry from './LibsynEntry';
import TwitterEntry from './TwitterEntry';

const Entry = (props) => {
  const { entry } = props;

  return (
    entry.platform === 'medium'
    ? <MediumEntry entry={ entry } />
    : entry.platform === 'youtube'
    ? <YoutubeEntry entry={ entry } />
    : entry.platform === 'libsyn'
    ? <LibsynEntry entry={ entry } />
    : entry.platform === 'twitter'
    ? <TwitterEntry entry={ entry } />
    : null
  );
};

export default Entry;