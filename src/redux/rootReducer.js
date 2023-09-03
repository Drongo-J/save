// rootReducer.js
import { combineReducers } from 'redux';
import { booksReducer, commentsReducer, searchReducer } from './reducers';

const rootReducer = combineReducers({
  search: searchReducer,
  books: booksReducer,
  comments: commentsReducer,
  // Add more reducers here if you have additional slices of state.
});

export default rootReducer;
