import actionTypes from './actionTypes';

const extractMediumEntryData = (xmlDoc) => {
  // create an array of item nodes from the HTMLCollection (array-like object)
  // so that we can use `map()` on it to extract its data
  const itemNodes = Array.from(xmlDoc.getElementsByTagName('item'));

  const entryData = itemNodes.map((itemNode) => {
    return {
      id: itemNode.getElementsByTagName('guid')[0].textContent,
      title: itemNode.getElementsByTagName('title')[0].textContent,
      pubDate: itemNode.getElementsByTagName('pubDate')[0].textContent,
      author: itemNode.getElementsByTagName('dc:creator')[0].textContent,
      link: itemNode.getElementsByTagName('link')[0].textContent,
      thumbnail: itemNode.getElementsByTagName('content:encoded')[0].textContent.match(/src="(.*?)"/)[0].replace(/(src=)|(")/g, '')  // match url inside the src attribute (including the 'src=' string and the quotation marks), then extract the url only
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
      id: itemNode.getElementsByTagName('yt:videoId')[0].textContent,
      title: itemNode.getElementsByTagName('title')[0].textContent,
      link: itemNode.getElementsByTagName('link')[0].getAttribute('href').replace('watch?v=', 'embed/'),
      pubDate: itemNode.getElementsByTagName('published')[0].textContent,
      thumbnail: itemNode.getElementsByTagName('media:thumbnail')[0].getAttribute('url'),
      description: itemNode.getElementsByTagName('media:description')[0].textContent
    }
  });

  return {
    youtube: entryData
  };
};

export const fetchEntries = (platform, feedUrl) => {
   // const mediumFeed = 'https://cors-everywhere.herokuapp.com/medium.freecodecamp.org/feed';
   // const youtubeFeed = 'https://cors-everywhere.herokuapp.com/youtube.com/feeds/videos.xml?channel_id=UC8butISFwT-Wl7EV0hUK0BQ';
  const request = fetch(feedUrl);
  let entries = {};

  return (dispatch) => {
    request.then((res) => res.text())
      .then((str) => {
        // parse XML from str into a DOM document
        const xmlDoc = new DOMParser().parseFromString(str, 'application/xml');

        if (platform === 'medium') {
          entries = { ...extractMediumEntryData(xmlDoc) };
        } else if (platform === 'youtube') {
          entries = { ...extractYoutubeEntryData(xmlDoc) };
          console.log(entries);
        }

        dispatch({ type: actionTypes.FETCH_ENTRIES, payload: entries })
    });
  };
};
