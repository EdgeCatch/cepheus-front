const initialState = {
  items: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      let tempItems = state.items;
      let itemIndex = tempItems.findIndex((item, index) => {
        if (item.cid === action.payload) {
          return true;
        }
        return false;
      });

      if (itemIndex > -1) {
        tempItems[itemIndex].count = tempItems[itemIndex].count + 1;
      } else {
        tempItems = [...tempItems, { cid: action.payload, count: 1 }];
      }

      return {
        ...state,
        items: tempItems
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(o => o.cid !== action.payload)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    default:
      return state;
  }
};
