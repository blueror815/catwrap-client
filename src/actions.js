import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const INVALIDATE_CATEGORY = 'INVALIDATE_CATEGORY'
export const HANDLE_ERROR = 'HANDLE_ERROR'
export const IMAGE_LOADED = 'IMAGE_LOADED'
export const IMAGE_ERROR = 'IMAGE_ERROR'

export const LOGIN_FULFILLED = 'LOGIN_FULFILLED'
export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED'

export const LOGIN_REJECTED = 'LOGIN_REJECTED'
export const LOGOUT_REJECTED = 'LOGOUT_REJECTED'

// const _SERVER_URL = '//ec2-54-203-233-57.us-west-2.compute.amazonaws.com/post/';
const _SERVER_URL = '//localhost:8080/post/';

export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export function invalidateCategory(category) {
  return {
    type: INVALIDATE_CATEGORY,
    category
  }
}

export function imageLoaded(category, item) {
  return {
    type: IMAGE_LOADED,
    category,
    item
  }
}

export function imageError(category, item) {
  return {
    type: IMAGE_ERROR,
    category,
    item
  }
}

function requestPosts(category) {
  return {
    type: REQUEST_POSTS,
    category
  }
}

function receivePosts(category, json) {
  return {
    type: RECEIVE_POSTS,
    category,
    posts: json.data,
    receivedAt: Date.now()
  }
}

function handleError(category, error) {
  return {
    type: HANDLE_ERROR,
    category,
    error
  }
}

function checkStatus(res) {
  return new Promise((resolve, reject) => {
    if (res.status === "ok" || res.status === 200) {
      resolve(res)
    } else {
      reject(res)
    }
  })
}

function fetchPosts(category) {
  return dispatch => {
    dispatch(requestPosts(category))
    //return fetch(`https://www.reddit.com/r/${category}.json`)
    return fetch(_SERVER_URL+category)
      .then(response => response.json())
      .then(json => checkStatus(json))
      .then(json => dispatch(receivePosts(category, json)))
      .catch(err => dispatch(handleError(category, err)))
  }
}

function shouldFetchPosts(state, category) {
  const posts = state.postsByCategory[category]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(category) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), category)) {
      return dispatch(fetchPosts(category))
    }
  }
}
