import React from 'react';

const LibsynEntry = (props) => {
  const { entry } = props;

  return (
    <li className='entry LibsynEntry'>
      <div className='entry-thumbnail'>
        <img alt='' src={ entry.thumbnail } />
      </div>

      <div className='entry-body'>
        <h2>{ entry.title }</h2>
        <p>{ entry.description }</p>
        <audio controls>
          <source src={ entry.audioSource } type={ entry.audioType }></source>
          Your browser does not support the <code>audio</code> element.
        </audio>
      </div>
    </li>
  );
};

export default LibsynEntry;