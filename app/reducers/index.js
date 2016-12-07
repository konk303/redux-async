// @flow
import { combineReducers } from 'redux'
import selectedSubreddit from './selectedSubreddit'
import postsBySubredit from './postsBySubreddit'

const rootReducer = combineReducers({
  selectedSubreddit,
  postsBySubredit
})

export default rootReducer
