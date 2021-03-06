import ipfsClient from 'ipfs-http-client';
import ItemManager from './lib/ItemManager';
import OrderManager from './lib/OrderManager';
import cryptico from 'cryptico';
import { MARKET_ADDRESS } from '../config';
const nodeUrl = '/ip4/ipfs/tcp/5001';

export async function getManagers() {
  try {
    let ipfs = ipfsClient({
      host: '198.211.108.129',
      port: 5001,
      protocol: 'http'
    });

    let itemManager = await ItemManager.createInstance(ipfs, MARKET_ADDRESS);
    let orderManager = new OrderManager(ipfs);
    return { itemManager, orderManager };
  } catch (e) {
    console.log(e);
  }
}
