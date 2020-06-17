const tokenAddress = 'KT1VkQSzjPhx5FGtrowtsRhsQyP7QuR3o9YK';
const marketAddress = 'KT1DvB7iNXf2RS7sETMU4mE96534NuqBPA2g';

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

  async setSettings(subscriptions, cashback, itemsDb) {
    const operation = await this.contract.methods
      .setSettings(subscriptions, cashback, itemsDb)
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

  async withdraw(address, amount) {
    const operation = await this.contract.methods
      .withdraw(address, amount)
      .send();
    await operation.confirmation();
    return operation;
  }

  async withdrawFee(address, amount) {
    const operation = await this.contract.methods
      .withdrawFee(address, amount)
      .send();
    await operation.confirmation();
    return operation;
  }
}
