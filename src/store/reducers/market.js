const initialState = {
  subscriptions: [],
  items: []
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_SUBSCRIPTIONS':
      return {
        ...state,
        subscriptions: action.subscriptions
      };

    case 'SET_ITEMS':
      return {
        ...state,
        items: action.items
      };
    default:
      return state;
  }
};
