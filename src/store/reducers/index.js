import { combineReducers } from 'redux';
import reducer from './reducer';
import bags from './bags';
import cart from './cart';
import market from './market';

const rootReducer = combineReducers({
  reducer,
  bags,
  cart,
  market
});

export default rootReducer;
