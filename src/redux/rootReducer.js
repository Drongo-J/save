// rootReducer.js
import { combineReducers } from 'redux';
import { searchReducer } from './reducers';

const rootReducer = combineReducers({
  search: searchReducer,
  // Add more reducers here if you have additional slices of state.
});

export default rootReducer;
