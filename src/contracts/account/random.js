// import * as Bip39 from 'bip39';
import { InMemorySigner } from '@taquito/signer';
import * as TaquitoUtils from '@taquito/utils';
import * as Ed25519 from 'ed25519-hd-key';

const TEZOS_BIP44_COINTYPE = 1729;

export async function getRandomWallet() {
  //   const mnemonic = Bip39.generateMnemonic(128);
  //   const seed = Bip39.mnemonicToSeedSync(mnemonic);
  const hdAccIndex = 0;
  const privateKey = seedToHDPrivateKey('seed', hdAccIndex);
  const [publicKey, publicKeyHash] = await getPublicKeyAndHash(privateKey);

  return { privateKey, publicKey, publicKeyHash };
}

async function getPublicKeyAndHash(privateKey) {
  const signer = await createMemorySigner(privateKey);

  return Promise.all([signer.publicKey(), signer.publicKeyHash()]);
}

async function createMemorySigner(privateKey, encPassword = '') {
  return InMemorySigner.fromSecretKey(privateKey, encPassword);
}

function seedToHDPrivateKey(seed, hdAccIndex) {
  return seedToPrivateKey(deriveSeed(seed, getMainDerivationPath(hdAccIndex)));
}

function getMainDerivationPath(accIndex) {
  return `m/44'/${TEZOS_BIP44_COINTYPE}'/${accIndex}'/0'`;
}

function seedToPrivateKey(seed) {
  return TaquitoUtils.b58cencode(seed.slice(0, 32), TaquitoUtils.prefix.edsk2);
}

function deriveSeed(seed, derivationPath) {
  try {
    const { key } = Ed25519.derivePath(derivationPath, seed.toString('hex'));

    return key;
  } catch (_err) {
    throw new 'Invalid derivation path'();
  }
}
