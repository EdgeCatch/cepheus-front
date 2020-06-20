export default class IpfsManager {
    constructor(ipfs, prevCid) {
        this.ipfs = ipfs;
        this.prevCid = prevCid;
    }

    async traverse(cid) {
        const result = [];

        while (cid) {
            const current = await this.ipfs.dag.get(cid);

            result.push(current);
            const { prev } = current.value;

            if (prev) {
                cid = prev;
                this.traverse(cid);
            } else {
                return result;
            }
        }
    }

    async getAll() {
        return await this.traverse(this.prevCid);
    }

    async getByCid(cid) {
        return await this.ipfs.dag.get(cid);
    }
}
