import React from 'react';

const TwitterEntry = (props) => {
  const { entry } = props;

  return (
    <li className='entry TwitterEntry'>
      <div className='entry-avatar'>
        <img alt='' src={ entry.avatar } />
      </div>

      <div className='entry-body'>
        <h2>{ entry.tweet }</h2>
      </div>
    </li>
  );
};

export default TwitterEntry;