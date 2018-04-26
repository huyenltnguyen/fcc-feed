import React, { Component } from 'react';
import Navbar from './Navbar';
import Menu from './Menu';
import Newsfeed from '../containers/Newsfeed';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Newsfeed />
        <Menu />
      </div>
    );
  }
}

export default App;
