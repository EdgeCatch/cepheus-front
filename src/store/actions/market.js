/* eslint-disable import/prefer-default-export */
export const setSubscriptions = subscriptions => ({
  type: 'SET_SUBSCRIPTIONS',
  payload: subscriptions
});

export const setItems = items => ({
  type: 'SET_ITEMS',
  payload: items
});
