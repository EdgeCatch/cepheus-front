import _ from 'lodash';

export const addToCart = obj => ({
    type: 'ADD_TO_CART',
    payload: obj = {
        ...obj,
        id: _.uniqueId(),
    },
});

export const removeFromCart = id => ({
    type: 'REMOVE_FROM_CART',
    payload: id,
});
