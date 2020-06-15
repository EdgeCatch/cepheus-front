import IpfsManager from './IpfsManager';

export default class OrderManager extends IpfsManager {
    async add(buyer, seller, encryptedForBuyer, encryptedForSeller) {
        const order = {
            buyer,
            seller,
            encryptedForBuyer,
            encryptedForSeller,
        };

        this.prevCid = await this.ipfs.dag.put(order);
        return this.prevCid;
    }
}
