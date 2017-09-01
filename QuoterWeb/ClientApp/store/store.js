import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducers from '../reducers';

import initialState from './initialState';

export default  createStore(appReducers, initialState, applyMiddleware(...[thunk]));
