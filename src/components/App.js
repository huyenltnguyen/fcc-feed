import React, { Component } from 'react';
import Navbar from './Navbar';
import Newsfeed from '../containers/Newsfeed';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Newsfeed />
      </div>
    );
  }
}

export default App;
