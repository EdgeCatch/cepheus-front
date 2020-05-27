/* eslint-disable no-underscore-dangle */
import { createStore, compose } from 'redux';
import rootReducer from './reducers/index';
import { loadState } from '../localStorage';

const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState,
    compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);

export default store;
