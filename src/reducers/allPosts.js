import actionTypes from '../actions/actionTypes';

const posts = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SAVE_ALL_POSTS:
    console.log(action.payload)
      return Object.assign(state, action.payload);
    default:
      return state;
  }

};

export default posts;