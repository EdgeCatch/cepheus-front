const initialState = {
  subscriptions: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SUBSCRIPTIONS':
      return {
        ...state,
        subscriptions: action.subscriptions
      };

    default:
      return state;
  }
};
