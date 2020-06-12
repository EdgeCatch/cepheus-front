import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import reducer from './reducer';
import bags from './bags';
import cart from './cart';
import market from './market';
import sellItems from './selltems';
import sellItemsInfo from './sellModalReducer';

const rootReducer = combineReducers({
    form: formReducer,
    reducer,
    bags,
    cart,
    market,
    sellItems,
    sellItemsInfo,
});

export default rootReducer;
