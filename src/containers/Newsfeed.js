import React from 'react';
import { connect } from 'react-redux';
import { fetchAllEntries } from '../actions';
import Entry from '../components/Entry';

class Newsfeed extends React.Component {
  renderNewsfeed = () => {
    // convert the entries object into an array of entries
    // then sort it by date, from latest to oldest
    const entryArray = Object.keys(this.props.entries).reduce((accumulator, currentPlatform) => {
      return accumulator.concat(this.props.entries[currentPlatform]);  // flatten the array
    }, []).sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();  // latest first
    });
    console.log(entryArray);

    return (
      <ul>
        {
          entryArray.map((entry) => <Entry key={ entry.id } entry={ entry } />)
        }
      </ul>
    );

    // return entryArray.map((entry) => {
    //   return (
    //     <ul>
    //       {
    //         // temporary
    //         this.renderEntry(entry)
    //       }
    //     </ul>
    //   )
    // });
  }

  componentDidMount() {
    this.props.fetchAllEntries();

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

export default connect(mapStateToProps, { fetchAllEntries })(Newsfeed);
