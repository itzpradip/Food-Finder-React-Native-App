import { createStore, combineReducers } from 'redux';

import cartReducer from './cart/Reducer';

const rootReducer = combineReducers({
    cart: cartReducer
});

export default createStore(rootReducer);