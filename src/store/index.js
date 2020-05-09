/* eslint-disable no-underscore-dangle */
import { createStore, compose } from 'redux';

const store = createStore(compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;
