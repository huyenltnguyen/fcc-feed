import React from 'react';

const Navbar = () => {
  return (
    <nav>
      <button className='toggleMenu' aria-label='Menu'>
        <i className='fas fa-bars'></i>
      </button>
      <h1>
        <a href='#'>freeCodeCamp Newsfeed</a>
      </h1>
    </nav>
  );
};

export default Navbar;