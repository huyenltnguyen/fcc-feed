import React from 'react';

const MediumEntry = (props) => {
  const { entry } = props;

  return (
    <li className='Entry'>
      <a href='#'>
        <div className='entry-thumbnail'>
          <img alt='' src={ entry.thumbnail } />
        </div>

        <div className='entry-body'>
          <h2>{ entry.title }</h2>
          <p>{ entry.description }</p>
        </div>
      </a>
    </li>
  );
};

export default MediumEntry;