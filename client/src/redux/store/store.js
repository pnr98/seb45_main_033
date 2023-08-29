import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/reducer';

export const store = createStore(
  combineReducers({
    rootReducer
  }),
  applyMiddleware(thunk)
);
