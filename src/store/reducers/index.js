import { combineReducers } from 'redux';
import reducer from './reducer';
import bags from './bags';

const rootReducer = combineReducers({
    reducer,
    bags,
});

export default rootReducer;
