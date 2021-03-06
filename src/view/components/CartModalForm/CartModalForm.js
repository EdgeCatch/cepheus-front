// @flow

import React from 'react';
import { ThanosWallet } from '@thanos-wallet/dapp';
import store from '../../../store/index';
import { getManagers } from '../../../ipfs';
import { MARKET_ADDRESS, TOKEN_ADDRESS } from '../../../config';
import { ModalContext } from '../Modal/Modal';

function CartModalForm({ handleCancel }) {
  const useModalContext = React.useContext(ModalContext);

  const [cridentials, setCridentails] = React.useState({
    name: '',
    phone: '',
    postOffice: ''
  });

  async function handleSubmitOrder(e) {
    useModalContext.setLoading(true);
    e.preventDefault();
    const { publicKey } = JSON.parse(localStorage.getItem('account'));
    const { orderManager } = await getManagers();
    const {
      cart: { items: itemsCart },
      market: { items: allItems }
    } = store.getState();
    const wallet = new ThanosWallet('Cepheus');

    await wallet.connect('carthagenet', { forcePermission: true });
    const tezos = wallet.toTezos();
    const contractMarket = await tezos.wallet.at(MARKET_ADDRESS);
    const contractToken = await tezos.wallet.at(TOKEN_ADDRESS);

    const accountPkh = await tezos.wallet.pkh();
    const contractStorage = await contractMarket.storage();

    for (const cartItem in itemsCart) {
      const search = allItems.find(item => item.cid == itemsCart[cartItem].cid);

      try {
        const { seller_id } = await contractStorage.items.get(search.cid);
        const cid = await orderManager.add(
          accountPkh,
          seller_id,
          cridentials.name,
          cridentials.phone,
          cridentials.postOffice,
          publicKey,
          search.value.seller,
          search.cid
        );
        const approveS = await contractToken.methods
          .approve(
            MARKET_ADDRESS,
            Number(search.value.price) * itemsCart[cartItem].count
          )
          .send();

        await approveS.confirmation();

        const operation = await contractMarket.methods
          .makeOrder(cid.string, search.cid, `${itemsCart[cartItem].count}`)
          .send();

        await operation.confirmation();
        store.dispatch({ type: 'CLEAR_CART', payload: '' });
        handleCancel();
      } catch (e) {
        console.error(e);
        alert(e.message);
      }
    }

    useModalContext.setLoading(false);
  }

  function handleChangeField(e) {
    setCridentails({ ...cridentials, [e.target.name]: e.target.value });
  }
  return (
    <form action="" className="purchases__modal_form" autocomplete="off">
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
