// @flow

import React from 'react';
import store from '../../../store/index';
import { getOrderManager } from '../../../ipfs';
import { ThanosWallet } from '@thanos-wallet/dapp';
import { MARKET_ADDRESS, TOKEN_ADDRESS } from '../../../config';
function CartModalForm() {
  const [cridentials, setCridentails] = React.useState({
    name: '',
    phone: '',
    postOffice: ''
  });
  async function handleSubmitOrder(e) {
    e.preventDefault();

    const { publicKey } = JSON.parse(localStorage.getItem('account'));
    const orderManager = getOrderManager();
    const {
      cart: { items: itemsCart },
      market: { items: allItems }
    } = store.getState();
    console.log(itemsCart, allItems);
    const search = allItems.filter(item => item.cid === itemsCart[0]);
    try {
      const wallet = new ThanosWallet('Cepheus');
      await wallet.connect('carthagenet', { forcePermission: true });
      const tezos = wallet.toTezos();
      const contractMarket = await tezos.wallet.at(MARKET_ADDRESS);
      const contractToken = await tezos.wallet.at(TOKEN_ADDRESS);

      const accountPkh = await tezos.wallet.pkh();
      const contractStorage = await contractMarket.storage();
      const { seller_id } = await contractStorage.items.get(search[0].cid);
      const cid = await orderManager.add(
        accountPkh,
        seller_id,
        cridentials.name,
        cridentials.phone,
        cridentials.postOffice,
        publicKey,
        search[0].value.seller,
        search[0].cid
      );

      const approve = await contractToken.methods
        .approve(MARKET_ADDRESS, search[0].value.price)
        .send();
      await approve.confirmation();
      console.log(cid, search[0].cid, search[0].value.price);

      const operation = await contractMarket.methods
        .makeOrder(cid.string, search[0].cid, '1')
        .send();
      await operation.confirmation();
      console.log('DONE', operation);
    } catch (e) {
      console.error(e);
    }
  }

  function handleChangeField(e) {
    setCridentails({ ...cridentials, [e.target.name]: e.target.value });
    console.log(cridentials);
  }
  return (
    <form action="" className="purchases__modal_form">
      <input
        name="name"
        className="purchases__modal_item"
        type="text"
        placeholder="Name"
        onChange={e => handleChangeField(e)}
      />

      <input
        name="phone"
        className="purchases__modal_item"
        type="text"
        placeholder="Phone number"
        onChange={e => handleChangeField(e)}
      />
      <textarea
        name="postOffice"
        className="textarea__item modal-item"
        cols="30"
        rows="10"
        placeholder="Nova Poshta Office"
        onChange={e => handleChangeField(e)}
      />
      <button id="make-order" onClick={e => handleSubmitOrder(e)}>
        Submit
      </button>
    </form>
  );
}

export default CartModalForm;
