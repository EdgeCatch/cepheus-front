import ipfsClient from 'ipfs-http-client';
import cryptico from 'cryptico';
import OrderManager from './OrderManager';
import ItemManager from './ItemManager';

const nodeUrl = '/ip4/127.0.0.1/tcp/5001';

const main = async () => {
  try {
    const privateKey = cryptico.generateRSAKey('', 2048);

    const publicKey = cryptico.publicKeyString(privateKey);

    const ipfs = ipfsClient(nodeUrl);

    await ipfs.id();
    const marketContractAddress = 'KT1N5h4c7kZ85DDjrYGqv6xmQRwufG2x2c5c';
    const itemManager = await ItemManager.createInstance(
      ipfs,
      marketContractAddress
    );
    const orderManager = new OrderManager(ipfs);

    await itemManager.add(
      'seller',
      'name',
      'price',
      'category',
      'type',
      'count',
      'size',
      'colour',
      [('image', 'image')]
    );
    const cid = await orderManager.add(
      'dfda83b95889',
      '34e842d6b8fd',
      'name',
      'phone',
      'postOffice',
      publicKey,
      publicKey
    );

    const cid1 = await orderManager.add(
      'dfda83b95889',
      '3233231',
      'amazing',
      'phone',
      'postOffice',
      publicKey,
      publicKey
    );

    console.log(await orderManager.getByCid(cid));
    console.log(await orderManager.getByCid(cid1));
    console.log(await orderManager.getAll());
  } catch (e) {
    console.log(e);
  }
};

main().then(() => console.log('Done!'));
