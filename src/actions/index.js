import actionTypes from './actionTypes';

export const saveAllPosts = (posts) => {
  return {
    type: actionTypes.SAVE_ALL_POSTS,
    payload: posts
  }
}