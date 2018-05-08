import React from 'react';
import { connect } from 'react-redux';
import { filterEntriesByPlatform } from '../actions';

const Menu = (props) => {
  return (
    <div className='Menu'>
      <h3>Menu</h3>
      <ul>
        <li onClick={ () => props.filterEntriesByPlatform() }>All</li>
        <li onClick={ () => props.filterEntriesByPlatform('medium') }>Medium</li>
        <li onClick={ () => props.filterEntriesByPlatform('youtube') }>Youtube</li>
        <li onClick={ () => props.filterEntriesByPlatform('libsyn') }>Libsyn</li>
        <li onClick={ () => props.filterEntriesByPlatform('twitter') }>Quincy's Twitter</li>
      </ul>
    </div>
  );
};

export default connect(null, { filterEntriesByPlatform })(Menu);