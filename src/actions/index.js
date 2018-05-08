import actionTypes from './actionTypes';
import mediumFeed from '../data/mock-medium-data.xml';  // temporary
import youtubeFeed from '../data/mock-youtube-data.xml'; // temporary
import libsynFeed from '../data/mock-libsyn-data.xml'; // temporary
import twitterFeed from '../data/mock-twitter-data.xml'; // temporary

const extractMediumEntryData = (xmlDoc) => {
  // create an array of item nodes from the HTMLCollection (array-like object)
  // so that we can use `map()` on it to extract its data
  const itemNodes = Array.from(xmlDoc.getElementsByTagName('item'));

  const entryData = itemNodes.map((itemNode) => {
    return {
      platform: 'medium',
      id: itemNode.getElementsByTagName('guid')[0].textContent,
      title: itemNode.getElementsByTagName('title')[0].textContent,
      pubDate: itemNode.getElementsByTagName('pubDate')[0].textContent,
      author: itemNode.getElementsByTagName('dc:creator')[0].textContent,
      link: itemNode.getElementsByTagName('link')[0].textContent,
      thumbnail: itemNode.getElementsByTagName('content:encoded')[0].textContent.match(/src="(.*?)"/)[0].replace(/(src=)|(")/g, ''),  // match url inside the src attribute (including the 'src=' string and the quotation marks), then extract the url only
      description: itemNode.getElementsByTagName('content:encoded')[0].textContent.match(/<p>.*(?=<\/p>)/)[0].replace(/<.*?>/g, '').split(' ').slice(0, 21).join(' ') + '...'  // match anything from <p> to </p> (</p> excluded), then remove all html tags and extract 20 words from the string
    };
  });

  return {
    medium: entryData
  };
};

const extractYoutubeEntryData = (xmlDoc) => {
  // create an array of item nodes from the HTMLCollection (array-like object)
  // so that we can use `map()` on it to extract its data
  const itemNodes = Array.from(xmlDoc.getElementsByTagName('entry'));

  const entryData = itemNodes.map((itemNode) => {
    return {
      platform: 'youtube',
      id: itemNode.getElementsByTagName('yt:videoId')[0].textContent,
      title: itemNode.getElementsByTagName('title')[0].textContent,
      link: itemNode.getElementsByTagName('link')[0].getAttribute('href').replace('watch?v=', 'embed/'),
      pubDate: itemNode.getElementsByTagName('published')[0].textContent,
      thumbnail: itemNode.getElementsByTagName('media:thumbnail')[0].getAttribute('url'),
      description: itemNode.getElementsByTagName('media:description')[0].textContent.split(' ').splice(0, 21).join(' ') + '...'
    }
  });

  return {
    youtube: entryData
  };
};

const extractLibsynEntryData = (xmlDoc) => {
  // create an array of item nodes from the HTMLCollection (array-like object)
  // so that we can use `map()` on it to extract its data
  // Libsyn returns all of their items, but we only need the 10 latest ones
  const itemNodes = Array.from(xmlDoc.getElementsByTagName('item')).slice(0, 10);

  const entryData = itemNodes.map((itemNode) => {
    return {
      platform: 'libsyn',
      id: itemNode.getElementsByTagName('guid')[0].textContent,
      title: itemNode.getElementsByTagName('title')[0].textContent,
      link: itemNode.getElementsByTagName('link')[0].textContent,
      pubDate: itemNode.getElementsByTagName('pubDate')[0].textContent,
      thumbnail: itemNode.getElementsByTagName('itunes:image')[0].getAttribute('href'),
      audioSource: itemNode.getElementsByTagName('enclosure')[0].getAttribute('url'),
      audioType: itemNode.getElementsByTagName('enclosure')[0].getAttribute('type'),
      description: itemNode.getElementsByTagName('itunes:summary')[0].textContent.split(' ').slice(0, 21).join(' ') + '...'
    };
  });

  return {
    libsyn: entryData
  };
};

const extractTwitterEntryData = (xmlDoc) => {
  // create an array of item nodes from the HTMLCollection (array-like object)
  // so that we can use `map()` on it to extract its data
  const itemNodes = Array.from(xmlDoc.getElementsByTagName('item'));

  const entryData = itemNodes.map((itemNode) => {
    return {
      platform: 'twitter',
      id: itemNode.getElementsByTagName('guid')[0].textContent,
      link: itemNode.getElementsByTagName('link')[0].textContent,
      pubDate: itemNode.getElementsByTagName('pubDate')[0].textContent,
    };
  });

  return {
    twitter: entryData
  }
};

const fetchEntriesFromAPlatform = (feedUrl, extractEntryDataFunction) => {
  const request = fetch(feedUrl);

  return request.then((res) => res.text())
    .then((str) => {
      // parse XML from str into a DOM document
      const xmlDoc = new DOMParser().parseFromString(str, 'application/xml');
      return extractEntryDataFunction(xmlDoc);
    });
};

export const fetchAllEntries = () => {
   // const mediumFeed = 'https://cors-everywhere.herokuapp.com/medium.freecodecamp.org/feed';
   // const youtubeFeed = 'https://cors-everywhere.herokuapp.com/youtube.com/feeds/videos.xml?channel_id=UC8butISFwT-Wl7EV0hUK0BQ';
   // const libsynFeed = 'http://freecodecamp.libsyn.com/rss';
   // const twitterFeed = 'https://twitrss.me/twitter_user_to_rss/?user=ossia';

  return (dispatch) => {
    Promise.all([
      fetchEntriesFromAPlatform(mediumFeed, extractMediumEntryData),
      fetchEntriesFromAPlatform(youtubeFeed, extractYoutubeEntryData),
      fetchEntriesFromAPlatform(libsynFeed, extractLibsynEntryData),
      fetchEntriesFromAPlatform(twitterFeed, extractTwitterEntryData)
    ])
    .then((data) => {
      const entries = Object.assign({}, ...data);

      dispatch({ type: actionTypes.FETCH_ALL_ENTRIES, payload: entries });
    });
  };
};
