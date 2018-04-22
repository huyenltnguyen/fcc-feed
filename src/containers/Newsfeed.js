import React from 'react';
import { connect } from 'react-redux';
import { fetchEntries } from '../actions';
import mediumFeed from '../data/mock-medium-data.xml';  // temporary

class Newsfeed extends React.Component {
  renderEntries = () => {
    return Object.keys(this.props.entries).map(platformName => {
      return (
        <div key={ platformName }>
          {
            // temporary
            this.props.entries[platformName].map(item => <div key={ item.id }>{ item.title }</div>)
          }
        </div>
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
        { this.renderEntries() }
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
