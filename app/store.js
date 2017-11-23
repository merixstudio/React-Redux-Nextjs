import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

const enhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware),
);

const initsStore = initialState => createStore(reducers, initialState, enhancer);

export default initsStore;
