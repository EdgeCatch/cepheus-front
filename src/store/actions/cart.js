import _ from 'lodash';

export const addToCart = cid => ({
  type: 'ADD_TO_CART',
  payload: cid
});

export const removeFromCart = id => ({
  type: 'REMOVE_FROM_CART',
  payload: id
});
