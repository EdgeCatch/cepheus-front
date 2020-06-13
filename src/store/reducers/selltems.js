const initState = {
    sellItemsList: [],
    sellItemInfoList: [],
};

const sellItemsInfo = (state = initState, action) => {
    switch (action.type) {
        case 'SELL_ITEMS_INCREMENT':
            return {
                ...state,
                sellItemsList: state.sellItemsList,
                sellItemInfoList: [...state.sellItemInfoList, action.payload],
            };
        default:
            return state;
    }
};

export default sellItemsInfo;
