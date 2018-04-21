import React from 'react';
import mediumFeed from '../data/mock-medium-data.xml';  // temporary
import { connect } from 'react-redux';
import { saveAllPosts } from '../actions';

class Newsfeed extends React.Component {
  renderPosts = () => {
    console.log(this.props.allPosts)
    return !Object.keys(this.props.allPosts).length
      ? 'Loading...'
      : Object.keys(this.props.allPosts).map(platformName => {
        return (
          <div key={ platformName }>
            {
              // temporary
              this.props.allPosts[platformName].map(item => <div key={ item.id }>{ item.title }</div>)
            }
          </div>
        )
      });
  }

  extractPostInfoFromList = (platformName, itemNodes) => {
    const postInfo = itemNodes.map(itemNode => {
      return {
        id: itemNode.getElementsByTagName('guid')[0].textContent,
        title: itemNode.getElementsByTagName('title')[0].textContent
      };
    });

    return {
      [platformName]: postInfo
    };
  };

  componentDidMount() {
    //const mediumFeed = 'https://cors-everywhere.herokuapp.com/medium.freecodecamp.org/feed';
    fetch(mediumFeed)
      .then(res => res.text())
      .then(str => {
        // parse XML from str into a DOM document
        const xmlDoc = new DOMParser().parseFromString(str, 'application/xml');
        // create an array of item nodes from the HTMLCollection (array-like object)
        // so that we can use `map()` on it to extract its data
        const itemNodeArr = Array.from(xmlDoc.getElementsByTagName('item'));
        const posts = this.extractPostInfoFromList('medium', itemNodeArr); // temporary
        console.log('posts', posts);
        saveAllPosts(posts);
      });
  }

  render() {
    return (
      <div className='Newsfeed'>
        { this.renderPosts() }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allPosts: state.allPosts
  }
};

export default connect(mapStateToProps, { saveAllPosts })(Newsfeed);
