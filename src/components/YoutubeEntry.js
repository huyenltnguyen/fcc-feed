import React from 'react';

const YoutubeEntry = (props) => {
  const { entry } = props;

  return (
    <li className='Entry'>
      <a href='#'>
        <iframe src={ entry.link } allowfullscreen='true'></iframe>

        <div className='entry-body'>
          <h2>{ entry.title }</h2>
        </div>
      </a>
    </li>
  );
};

export default YoutubeEntry;