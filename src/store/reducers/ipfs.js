// import ItemManager from '../../CepheusIpfsV2/lib/ItemManager';
// import OrderManager from '../../CepheusIpfsV2/lib/OrderManager';

// would be better to use was shown in an example but idk who to get insances from this async function
// import { main } from '../../CepheusIpfsV2/client';

// just instances of following clients
// const ItemManagerClient = new ItemManager();
// const OrderManagerClient = new OrderManager();

// main().then(() => console.log('Done!'));

const Initstate = {
    // ItemManagerClient,
    // OrderManagerClient,
};

export default function reducer(state = Initstate, action) {
    switch (action.type) {
        case '':
            return state;
        default:
            return state;
    }
}
