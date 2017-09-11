import { combineReducers } from 'redux'
import {
  SELECT_CATEGORY, INVALIDATE_CATEGORY,
  REQUEST_POSTS, RECEIVE_POSTS,
  HANDLE_ERROR, IMAGE_LOADED, IMAGE_ERROR,
  LOGIN_FULFILLED, LOGOUT_FULFILLED,
  LOGIN_REJECTED, LOGOUT_REJECTED
} from './actions'

function selectedCategory(state = '', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
    }
}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  error: false,
  items: [],
  loadedItems: []
}, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
      return Object.assign({}, state, {
        error: false,
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        error: false,
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    case HANDLE_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: true
      })
    case IMAGE_LOADED:
      return Object.assign({}, state, {
        loadedItems: [...new Set([...state.loadedItems, action.item])]
      })
    case IMAGE_ERROR:
      return Object.assign({}, state, {
        items: state.items.filter(i => i.uuid !== action.item.uuid)
      })
    default:
      return state
  }
}

function postsByCategory(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORY:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
    case HANDLE_ERROR:
    case IMAGE_LOADED:
    case IMAGE_ERROR:
      return Object.assign({}, state, {
        [action.category]: posts(state[action.category], action)
      })
    default:
      return state
  }
}

function user(state = {
  details: null,
  loginStatus: null
}, action) {
  switch (action.type) {
    case LOGIN_FULFILLED:
      return Object.assign({}, state, {
        loginStatus: 'loggedIn',
        details: action.data
      })
    case LOGOUT_FULFILLED:
      return Object.assign({}, state, {
        loginStatus: 'loggedOut',
        details: null
      })
    case LOGIN_REJECTED:
      return Object.assign({}, state, {
        loginStatus: 'loggedOut',
        details: null
      })
    case LOGOUT_REJECTED:
      return Object.assign({}, state, {
        loginStatus: 'loggedIn',
        details: action.data
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user,
  postsByCategory,
  selectedCategory
})

export default rootReducer
