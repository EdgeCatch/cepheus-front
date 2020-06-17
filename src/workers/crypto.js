const cryptico = require('cryptico');
const Bip39 = require('bip39');

export function generateAccount() {
  const mnemonic = Bip39.generateMnemonic(128);
  const rsa = cryptico.generateRSAKey(mnemonic, 2048);
  const publicKey = cryptico.publicKeyString(rsa);
  return { mnemonic, publicKey };
}
