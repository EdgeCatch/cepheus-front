
import ipfsClient from 'ipfs-http-client';
import cryptico from 'cryptico';
import ItemManager from './ItemManager';

const nodeUrl = '/ip4/127.0.0.1/tcp/5001';

const itemManager = async () => {      
try {
    const privateKey = cryptico.generateRSAKey('', 2048);

    const publicKey = cryptico.publicKeyString(privateKey);
    
    const ipfs = ipfsClient(nodeUrl);

    awaid ipfs.id();

}
catch(e){
    console.error(e);
}
}