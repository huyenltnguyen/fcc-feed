import actionTypes from './actionTypes';

const extractEntryDataFromList = (platformName, itemNodes) => {
  const entryData = itemNodes.map((itemNode) => {
    return {
      id: itemNode.getElementsByTagName('guid')[0].textContent,
      title: itemNode.getElementsByTagName('title')[0].textContent,
      pubDate: itemNode.getElementsByTagName('pubDate')[0].textContent,
      author: itemNode.getElementsByTagName('dc:creator')[0].textContent,
      link: itemNode.getElementsByTagName('link')[0].textContent,
      thumbnail: itemNode.getElementsByTagName('content:encoded')[0].textContent.match(/src="(.*?)"/)[0].replace(/(src=)|(")/g, '')
    };
  });

  return {
    [platformName]: entryData
  };
};

export const fetchEntries = (feedUrl) => {
   //const mediumFeed = 'https://cors-everywhere.herokuapp.com/medium.freecodecamp.org/feed';
  const request = fetch(feedUrl);

  return (dispatch) => {
    request.then((res) => res.text())
      .then((str) => {
        // parse XML from str into a DOM document
        const xmlDoc = new DOMParser().parseFromString(str, 'application/xml');
        // create an array of item nodes from the HTMLCollection (array-like object)
        // so that we can use `map()` on it to extract its data
        const itemNodeArr = Array.from(xmlDoc.getElementsByTagName('item'));
        const entries = extractEntryDataFromList('medium', itemNodeArr); // temporary
        dispatch({ type: actionTypes.FETCH_ENTRIES, payload: entries })
    });
  };
};
