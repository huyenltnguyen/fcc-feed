import React from 'react';
import { Tweet } from 'react-twitter-widgets';

const TwitterEntry = (props) => {
  const { entry } = props;
  const tweetId = entry.id.replace(/https:.*\//, '');

  return (
    <li className='entry TwitterEntry'>
      <Tweet tweetId={ tweetId } />
    </li>
  );
};

export default TwitterEntry;