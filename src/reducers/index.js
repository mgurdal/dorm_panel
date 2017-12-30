import { combineReducers } from 'redux';
import nodes from './nodeReducer';
import posts from './postReducer';

export default combineReducers({
  nodes: nodes,
  posts: posts
})
