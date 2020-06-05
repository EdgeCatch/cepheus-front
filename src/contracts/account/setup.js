import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';

const provider = 'https://api.tez.ie/rpc/carthagenet';

export const setup = async (secretKey = '') => {
  let tezos = new TezosToolkit();
  await tezos.setProvider({
    rpc: provider,
    signer: await new InMemorySigner.fromSecretKey(secretKey)
  });
  return tezos;
};
