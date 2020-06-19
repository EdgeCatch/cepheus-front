import ipfsClient from 'ipfs-http-client';
import ItemManager from './lib/ItemManager';
import OrderManager from './lib/OrderManager';
import cryptico from 'cryptico';
import { MARKET_ADDRESS } from '../config';
const nodeUrl = '/ip4/127.0.0.1/tcp/5001';

export async function getManagers(mnemonic) {
  try {
    let ipfs = ipfsClient(nodeUrl);

    let itemManager = await ItemManager.createInstance(ipfs, MARKET_ADDRESS);
    let orderManager = new OrderManager(ipfs);
    return { itemManager, orderManager };
  } catch (e) {
    console.log(e);
  }
}
