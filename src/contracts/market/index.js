const tokenAddress = 'KT1Wa2qurk5GrvvzDXc9mBmzrC2BcbBpWGzF';
const marketAddress = 'KT19AYHqyctcRGmToHzCRDegmAkFea1q2URQ';

export class Market {
  constructor(Tezos, contract) {
    this.tezos = Tezos;
    this.contract = contract;
  }
  static async init(Tezos) {
    return new Market(Tezos, await Tezos.contract.at(marketAddress));
  }

  async getFullStorage(
    maps = {
      subscriptions: [],
      accounts: [],
      items: [],
      orders: [],
      refunds: []
    }
  ) {
    const storage = await this.contract.storage();
    var result = {
      ...storage
    };
    for (let key in maps) {
      result[key + 'Extended'] = await maps[key].reduce(
        async (prev, current) => {
          let entry;

          try {
            entry = await storage[key].get(current);
          } catch (ex) {
            console.error(ex);
          }

          return {
            ...(await prev),
            [current]: entry
          };
        },
        Promise.resolve({})
      );
    }
    return result;
  }

  async setSettings(subscriptions, cashback, items_db, orders_db) {
    const operation = await this.contract.methods
      .setSettings(subscriptions, cashback, items_db, orders_db)
      .send();
    await operation.confirmation();
    return operation;
  }

  async register(subscription, public_key) {
    let storage = await this.getFullStorage({ subscriptions: [subscription] });
    if (storage.subscriptionsExtended[subscription].price != 0) {
      let token = await this.tezos.contract.at(storage.token);
      let operation = await token.methods
        .approve(
          marketAddress,
          storage.subscriptionsExtended[subscription].price
        )
        .send();
      await operation.confirmation();
    }
    const operation = await this.contract.methods
      .register(subscription, public_key)
      .send();
    await operation.confirmation();
    return operation;
  }

  async makeOrder(ipfs, itemId, count) {
    let storage = await this.getFullStorage({ items: [itemId] });
    if (storage.itemsExtended[itemId].price != 0) {
      let token = await this.tezos.contract.at(storage.token);
      let operation = await token.methods
        .approve(
          marketAddress,
          storage.itemsExtended[itemId].price * parseInt(count)
        )
        .send();
      await operation.confirmation();
    }
    const operation = await this.contract.methods
      .makeOrder(ipfs, itemId, count)
      .send();
    await operation.confirmation();
    return operation;
  }

  async acceptOrder(ipfs) {
    const operation = await this.contract.methods.acceptOrder(ipfs).send();
    await operation.confirmation();
    return operation;
  }

  async confirmReceiving(ipfs) {
    const operation = await this.contract.methods.confirmReceiving(ipfs).send();
    await operation.confirmation();
    return operation;
  }

  async changeSubscription(subscription) {
    let storage = await this.getFullStorage({ subscriptions: [subscription] });
    if (storage.subscriptionsExtended[subscription].price != 0) {
      let token = await this.tezos.contract.at(storage.token);
      let operation = await token.methods
        .approve(
          marketAddress,
          storage.subscriptionsExtended[subscription].price
        )
        .send();
      await operation.confirmation();
    }
    const operation = await this.contract.methods
      .changeSubscription(subscription)
      .send();
    await operation.confirmation();
    return operation;
  }

  async addItem(ipfs, price) {
    const operation = await this.contract.methods.addItem(ipfs, price).send();
    await operation.confirmation();
    return operation;
  }

  async deleteItem(ipfs) {
    const operation = await this.contract.methods.deleteItem(ipfs).send();
    await operation.confirmation();
    return operation;
  }
}

// describe('Market', function () {
//     before(async function () {
//         this.timeout(1000000);
//         let tezos = await setup();
//         let tezos1 = await setup("../key1");
//         let token = await tezos.contract.at(tokenAddress);
//         let operation = await token.methods
//             .transfer(await tezos.signer.publicKeyHash(), await tezos1.signer.publicKeyHash(), 10000)
//             .send();
//         await operation.confirmation();
//     });

//     describe('SetSettings()', function () {
//         it('should update settings', async function () {
//             this.timeout(1000000);
//             let market = await Market.init(await setup());
//             let initialStorage = await market.getFullStorage({ subscriptions: ["0", "1"] });
//             assert.equal(initialStorage.fee_pool, 0);
//             let subscriptions = MichelsonMap.fromLiteral({
//                 "0": {
//                     price: "0",
//                     fee: "200"
//                 },
//                 "1": {
//                     price: "100",
//                     fee: "100"
//                 },
//                 "2": {
//                     price: "5000",
//                     fee: "0"
//                 }
//             });
//             let operation = await market.setSettings(subscriptions, 100, "Qmeg1Hqu2Dxf35TxDg18b7StQTMwjCqhWigm8ANgm8wA3p", "Qmeg1Hqu2Dxf35TxDg18b7StQTMwjCqhWigm8ANgm8wA3p")
//             assert(operation.status === "applied", "Operation was not applied");
//             let updatedStorage = await market.getFullStorage({ subscriptions: ["0", "1", "2"] });
//             assert.equal(updatedStorage.subscriptionsExtended["2"].price, 5000);
//             assert.equal(updatedStorage.subscriptionsExtended["2"].fee, 0);
//             assert.equal(updatedStorage.cashback, 100);
//         });
//     });

//     describe('Register()', function () {
//         it('should register free account', async function () {
//             this.timeout(1000000);
//             let Tezos = await setup();
//             let market = await Market.init(Tezos);
//             let pkh = await Tezos.signer.publicKeyHash();
//             let initialStorage = await market.getFullStorage({ accounts: [pkh] });
//             assert.equal(initialStorage.accountsExtended[pkh], undefined);

//             let operation = await market.register("0", await Tezos.signer.publicKey());
//             assert(operation.status === "applied", "Operation was not applied");
//             let updatedStorage = await market.getFullStorage({ accounts: [pkh] });

//             assert.equal(updatedStorage.accountsExtended[pkh].public_key, await Tezos.signer.publicKey());
//             assert.equal(updatedStorage.accountsExtended[pkh].balance, 0);
//             assert.equal(updatedStorage.accountsExtended[pkh].subscription, 0);
//             assert.equal(updatedStorage.accountsExtended[pkh].refunds_count, 0);
//             assert.equal(updatedStorage.accountsExtended[pkh].deals_count, 0);
//         });

//         it('should register paid account', async function () {
//             this.timeout(1000000);
//             let Tezos = await setup("../key1");
//             let market = await Market.init(Tezos);
//             let pkh = await Tezos.signer.publicKeyHash();
//             let initialStorage = await market.getFullStorage({ accounts: [pkh] });
//             assert.equal(initialStorage.accountsExtended[pkh], undefined);

//             let operation = await market.register("1", await Tezos.signer.publicKey());
//             assert(operation.status === "applied", "Operation was not applied");
//             let updatedStorage = await market.getFullStorage({ accounts: [pkh] });

//             assert.equal(updatedStorage.accountsExtended[pkh].public_key, await Tezos.signer.publicKey());
//             assert.equal(updatedStorage.accountsExtended[pkh].balance, 0);
//             assert.equal(updatedStorage.accountsExtended[pkh].subscription, 1);
//             assert.equal(updatedStorage.accountsExtended[pkh].refunds_count, 0);
//             assert.equal(updatedStorage.accountsExtended[pkh].deals_count, 0);
//         });
//     });

//     describe('ChangeSubscription()', function () {
//         it('should updated to paid subscription', async function () {
//             this.timeout(1000000);
//             let Tezos = await setup();
//             let market = await Market.init(Tezos);
//             let pkh = await Tezos.signer.publicKeyHash();

//             let operation = await market.changeSubscription("1");
//             assert(operation.status === "applied", "Operation was not applied");
//             let updatedStorage = await market.getFullStorage({ accounts: [pkh] });

//             assert.equal(updatedStorage.accountsExtended[pkh].public_key, await Tezos.signer.publicKey());
//             assert.equal(updatedStorage.accountsExtended[pkh].balance, 0);
//             assert.equal(updatedStorage.accountsExtended[pkh].subscription, 1);
//             assert.equal(updatedStorage.accountsExtended[pkh].refunds_count, 0);
//             assert.equal(updatedStorage.accountsExtended[pkh].deals_count, 0);
//         });
//     });

//     describe('AddItem()', function () {
//         it('should add new item', async function () {
//             this.timeout(1000000);
//             let Tezos = await setup();
//             let market = await Market.init(Tezos);
//             let pkh = await Tezos.signer.publicKeyHash();
//             let ipfs = "Qmeg1Hqu2Dxf35TxDg18b7StQTMwjCqhWigm8ANgm8wA3p";
//             let price = "1000";

//             let operation = await market.addItem(ipfs, price);
//             assert(operation.status === "applied", "Operation was not applied");
//             let updatedStorage = await market.getFullStorage({ items: [ipfs] });

//             assert.equal(updatedStorage.itemsExtended[ipfs].seller_id, pkh);
//             assert.equal(updatedStorage.itemsExtended[ipfs].price, parseInt(price));
//         });
//     });

//     describe('MakeOrder()', function () {
//         it('should make an order', async function () {
//             this.timeout(1000000);
//             let Tezos = await setup("../key1");
//             let Tezos1 = await setup();
//             let market = await Market.init(Tezos);
//             let ipfs = "Qmeg1Hqu2Dxf35TxDg18b7StQTMwjCqhWigm8ANgm8wA3p";
//             let itemId = "Qmeg1Hqu2Dxf35TxDg18b7StQTMwjCqhWigm8ANgm8wA3p";
//             let count = "4";
//             let pkh = await Tezos.signer.publicKeyHash();
//             let pkh1 = await Tezos1.signer.publicKeyHash();

//             let operation = await market.makeOrder(ipfs, itemId, count);
//             assert(operation.status === "applied", "Operation was not applied");
//             let updatedStorage = await market.getFullStorage({ orders: [ipfs] });

//             assert.equal(updatedStorage.ordersExtended[ipfs].seller_id, pkh1);
//             assert.equal(updatedStorage.ordersExtended[ipfs].buyer_id, pkh);
//             assert.equal(updatedStorage.ordersExtended[ipfs].total_price, 4000);
//             assert.equal(updatedStorage.ordersExtended[ipfs].status, 1);
//             assert.equal(updatedStorage.ordersExtended[ipfs].item, itemId);
//             assert.equal(updatedStorage.ordersExtended[ipfs].count, parseInt(count));
//         });
//     });

//     describe('AcceptOrder()', function () {
//         it('should accept an order', async function () {
//             this.timeout(1000000);
//             let Tezos = await setup();
//             let Tezos1 = await setup("../key1");
//             let market = await Market.init(Tezos);
//             let ipfs = "Qmeg1Hqu2Dxf35TxDg18b7StQTMwjCqhWigm8ANgm8wA3p";
//             let pkh = await Tezos.signer.publicKeyHash();
//             let pkh1 = await Tezos1.signer.publicKeyHash();

//             let operation = await market.acceptOrder(ipfs);
//             assert(operation.status === "applied", "Operation was not applied");
//             let updatedStorage = await market.getFullStorage({ orders: [ipfs] });

//             assert.equal(updatedStorage.ordersExtended[ipfs].seller_id, pkh);
//             assert.equal(updatedStorage.ordersExtended[ipfs].buyer_id, pkh1);
//             assert.equal(updatedStorage.ordersExtended[ipfs].status, 2);
//         });
//     });

//     describe('ConfirmReceiving()', function () {
//         it('should confirm receiving an order', async function () {
//             this.timeout(1000000);
//             let Tezos = await setup("../key1");
//             let Tezos1 = await setup();
//             let market = await Market.init(Tezos);
//             let ipfs = "Qmeg1Hqu2Dxf35TxDg18b7StQTMwjCqhWigm8ANgm8wA3p";
//             let pkh = await Tezos.signer.publicKeyHash();
//             let pkh1 = await Tezos1.signer.publicKeyHash();

//             let prevStorage = await market.getFullStorage({ orders: [ipfs], accounts: [pkh1] });
//             let operation = await market.confirmReceiving(ipfs);
//             assert(operation.status === "applied", "Operation was not applied");
//             let updatedStorage = await market.getFullStorage({ orders: [ipfs], accounts: [pkh1] });

//             assert.equal(updatedStorage.ordersExtended[ipfs], undefined);
//             assert.equal(updatedStorage.accountsExtended[pkh1].balance, parseInt(4000 * 0.99));
//             assert.equal(updatedStorage.accountsExtended[pkh1].deals_count, 1);
//             assert.equal(updatedStorage.fee_pool - prevStorage.fee_pool, parseInt(4000 * 0.01));
//         });
//     });

//     describe('DeleteItem()', function () {
//         it('should delete item', async function () {
//             this.timeout(1000000);
//             let Tezos = await setup();
//             let market = await Market.init(Tezos);
//             let ipfs = "Qmeg1Hqu2Dxf35TxDg18b7StQTMwjCqhWigm8ANgm8wA3p";

//             let operation = await market.deleteItem(ipfs);
//             assert(operation.status === "applied", "Operation was not applied");
//             let updatedStorage = await market.getFullStorage({ items: [ipfs] });

//             assert.equal(updatedStorage.itemsExtended[ipfs], undefined);
//         });
//     });
// });
