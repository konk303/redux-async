// @flow
function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case 'INVALIDATE_SUBREDDIT':
      return { ...state, didInvalidate: true }
    case 'REQUEST_POSTS':
      return { ...state, isFetching: true, didInvalidate: false }
    case 'RECEIVE_POSTS':
      return { ...state,
               isFetching: false,
               didInvalidate: false,
               items: action.posts,
               lastUpdated: action.receivedAt
             }
    default:
      return state
  }
}

function postsBySubredit(state = {}, action) {
  switch (action.type) {
    case 'INVALIDATE_SUBREDDIT':
    case 'REQUEST_POSTS':
    case 'RECEIVE_POSTS':
      return { ...state,
               [action.subreddit]: posts(state[action.subreddit], action)
             }
    default:
      return state
  }
}

export default postsBySubredit
