// @flow
import fetch from 'isomorphic-fetch'

export function selectSubreddit(subreddit: string) {
  return { type: 'SELECT_SUBREDDIT', subreddit }
}

export function invalidateSubreddit(subreddit: string) {
  return { type: 'INVALIDATE_SUBREDDIT', subreddit }
}

function requestPosts(subreddit: string) {
  return { type: 'REQUEST_POSTS', subreddit }
}

function receivePosts(subreddit: string, json) {
  return { type: 'RECEIVE_POSTS', subreddit,
           posts: json.data.children.map(child => child.data),
           receivedAt: Date.now()
         }
}

function fetchPosts(subreddit: string) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubredit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit: string) {
  return (dispatch, getState: Function) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    } else {
      return Promise.resolve
    }
  }
}
