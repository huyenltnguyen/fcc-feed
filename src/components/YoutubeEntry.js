import React from 'react';

const YoutubeEntry = (props) => {
  const { entry } = props;

  return (
    <li className='entry YoutubeEntry'>
      <a href='#'>
        <iframe title={ entry.title } src={ entry.link } allowfullscreen='true'></iframe>

        <div className='entry-body'>
          <h2>{ entry.title }</h2>
          <p>{ entry.description }</p>
        </div>
      </a>
    </li>
  );
};

export default YoutubeEntry;