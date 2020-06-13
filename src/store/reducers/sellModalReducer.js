const initState = {
    sellItemInfoList: [],
};

const sellModalReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_SELL_ITEM_INFO':
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default sellModalReducer;
