import ipfsClient from 'ipfs-http-client';
import ItemManager from '../../ItemManager';
import OrderManager from '../../OrderManager';
import cryptico from 'cryptico';

const nodeUrl = '/ip4/127.0.0.1/tcp/5001';

const privateKey = cryptico.generateRSAKey('', 2048);
const publicKey = cryptico.publicKeyString(privateKey);
const ipfs = ipfsClient(nodeUrl);
const marketContractAddress = 'KT1N5h4c7kZ85DDjrYGqv6xmQRwufG2x2c5c';

const ItemManagerClient = new ItemManager(ipfs,marketContractAddress);
const OrderManagerClient = new OrderManager(ipfs);

const Initstate = {
  ItemManagerClient,
  OrderManagerClient
};

export default function reducer(state = Initstate, action) {
  switch (action.type) {
    case '':
      return state;
    default:
      return state;
  }
}
