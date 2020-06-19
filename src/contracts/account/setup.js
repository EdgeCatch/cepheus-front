import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';

const provider = 'https://api.tez.ie/rpc/carthagenet';

export const setup = async (
  secretKey = 'edskRvJ57F7SM8yJi96rASgBSeLd6a8DCkqQg9p4WyMtMSR5skd9jPWRfHaY3jwjc8yHYRKbmKpj4t7KwGUyH6cK6quLrXqS6K'
) => {
  let tezos = new TezosToolkit();
  await tezos.setProvider({
    rpc: provider,
    signer: await new InMemorySigner.fromSecretKey(secretKey)
  });
  return tezos;
};
