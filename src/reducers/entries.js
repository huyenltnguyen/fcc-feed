import _ from 'lodash';
import actionTypes from '../actions/actionTypes';

const entries = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ENTRIES:
      const newState = Object.assign({}, state, action.payload);
      // if found new articles: return the current state,
      // but save the new articles somewhere else
      // and wait for a click event to reveal/update on the index page

      // if (Object.keys(state).length && !_.isEqual(state, newState)) {
      //   console.log('found new articles');
      // }
      // console.log('update state');

      return newState;
    default:
      return state;
  }
};

export default entries;