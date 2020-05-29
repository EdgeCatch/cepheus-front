import { combineReducers } from 'redux';
import reducer from './reducer';
import bags from './bags';
import cart from './cart';

const rootReducer = combineReducers({
    reducer,
    bags,
    cart,
});

export default rootReducer;
