import React from 'react';
import { connect } from 'react-redux';
import { fetchEntries } from '../actions';
import mediumFeed from '../data/mock-medium-data.xml';  // temporary
import Entry from '../components/Entry';

class Newsfeed extends React.Component {
  renderEntry = (platformName) => {
    // temporary
    return this.props.entries[platformName].map((entry) => {
      return <Entry key={ entry.id } entry={ entry } />
    });
  }

  renderNewsfeed = () => {
    return Object.keys(this.props.entries).map((platformName) => {
      return (
        <ul key={ platformName }>
          {
            // temporary
            this.renderEntry(platformName)
          }
        </ul>
      )
    });
  }

  componentDidMount() {
    this.props.fetchEntries(mediumFeed);

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
