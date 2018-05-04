import React from 'react';
import { connect } from 'react-redux';
import { fetchEntries } from '../actions';
import mediumFeed from '../data/mock-medium-data.xml';  // temporary
import youtubeFeed from '../data/mock-youtube-data.xml'; // temporary
import libsynFeed from '../data/mock-libsyn-data.xml'; // temporary
import twitterFeed from '../data/mock-twitter-data.xml'; // temporary
import Entry from '../components/Entry';

class Newsfeed extends React.Component {
  // render entries from each platform
  renderEntries = (platform) => {
    // temporary
    return this.props.entries[platform].map((entry) => {
      return <Entry key={ entry.id } entry={ entry } platform={ platform } />
    });
  }

  renderNewsfeed = () => {
    return Object.keys(this.props.entries).map((platform) => {
      return (
        <ul key={ platform }>
          {
            // temporary
            this.renderEntries(platform)
          }
        </ul>
      )
    });
  }

  componentDidMount() {
    this.props.fetchEntries('medium', mediumFeed);

    // setTimeout(() => {
    //   this.props.fetchEntries('https://cors-everywhere.herokuapp.com/medium.freecodecamp.org/feed')
    // }, 10000);
  }

  render() {
    return (
      <div className='Newsfeed'>
        { this.renderNewsfeed() }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    entries: state.entries
  }
};

export default connect(mapStateToProps, { fetchEntries })(Newsfeed);
