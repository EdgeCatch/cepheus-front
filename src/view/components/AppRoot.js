// @flow
import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import withStyles from 'react-jss';
import { Routes } from '../../routes';
import Divider from './Divider';
import Header from './Header';
import Footer from './Footer';
import './appRoot.scss';
import store from '../../store/index';
import { getManagers } from '../../ipfs';
import { Market } from '../../contracts/market/index';
import { setup } from '../../contracts/account/setup';
import { TOKEN_ADDRESS, MARKET_ADDRESS } from '../../config';
import { ThanosWallet } from '@thanos-wallet/dapp';

function AppRoot() {
  React.useEffect(() => {
    async function setSubscriptions() {
      const Tezos = await setup();
      const market = await Market.init(Tezos);
      const contractStorage = await market.getFullStorage({
        subscriptions: [0, 1, 2]
      });
      console.log(contractStorage.subscriptions.toJSON(), 'subs');
    }
    async function setManagers() {
      // const wallet = new ThanosWallet('Cepheus');
      // await wallet.connect('carthagenet', { forcePermission: true });
      // const tezos = wallet.toTezos();
      // const contractToken = await tezos.wallet.at(TOKEN_ADDRESS);
      // const accountPkh = await tezos.wallet.pkh();
      // console.log(accountPkh);
      // const op = await contractToken.methods
      //   .transfer(accountPkh, 'tz1bQEJqMqC92ommfsRB6pWG9LVBKNgXPysh', '500')
      //   .send();
      // await op.confirmation();

      const { itemManager } = await getManagers();
      const items = (await itemManager.getAll()) || [];

      store.dispatch({
        type: 'SET_ITEMS',
        items
      });
    }
    setManagers();
    setSubscriptions();
  }, []);
  return (
    <div id="wrapper">
      <Header />
      <Suspense fallback={<div>Завантаження...</div>}>
        <Route component={Routes} />
        <Divider />
      </Suspense>
      <Footer />
    </div>
  );
}

export default withStyles({ padding: 0, margin: 0 })(AppRoot);
