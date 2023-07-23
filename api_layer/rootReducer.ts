// rootReducer.ts
import {combineReducers} from 'redux';
import apiReducer from './apiReducer';
// Add other reducers here

const rootReducer = combineReducers({
  api: apiReducer,
  // Add other reducers here
});

export default rootReducer;
