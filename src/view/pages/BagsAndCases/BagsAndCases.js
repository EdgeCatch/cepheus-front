// @flow
import React from 'react';
import BagItem from '../../containers/BagItem';
import bagItems from './bagItems';
import './bagsAndCases.scss';
import { ThanosWallet } from '@thanos-wallet/dapp';
import { MARKET_ADDRESS } from '../../../config';
import store from '../../../store/index';
import { getManagers } from '../../../ipfs';

type Props = {
  setBags: (data: Object) => void,
  isReady: boolean,
  bags: Array<Object>,
  totalPrice: string
};

function BagsAndCases({ isReady, market, bags, ...props }) {
  const [bagsState, setBags] = React.useState([]);
  React.useEffect(() => {
    async function handleGetManagers() {
      const { itemManager, orderManager, publicKey } = await getManagers();
      return { itemManager, orderManager, publicKey };
    }
    handleGetManagers();
  }, []);

  React.useEffect(() => {
    setBags(bags);
  }, [bags]);

  // async componentDidMount() {
  //   // const { setBags } = this.props;
  //   const { itemManager, orderManager, publicKey } = await getManagers();
  //   console.log(this.props, 'props');
  //   // const cid = await itemManager.add(
  //   //   'seller',
  //   //   'name',
  //   //   'price',
  //   //   'category',
  //   //   'type',
  //   //   'count',
  //   //   'size',
  //   //   'colour',
  //   //   [('image', 'image')]
  //   // );
  //   // console.log('Added', cid);
  //   // const available = await ThanosWallet.isAvailable();
  //   // if (!available) {
  //   //   throw new Error('Thanos Wallet not installed');
  //   // }
  //   // const wallet = new ThanosWallet('Cepheus');
  //   // await wallet.connect('carthagenet', { forcePermission: true });
  //   // const tezos = wallet.toTezos();
  //   // const contract = await tezos.wallet.at(MARKET_ADDRESS);
  //   // const operation = await contract.methods.addItem(cid.string, '1000').send();
  //   // await operation.confirmation();

  //   // setBags(bagItems);
  // }

  return (
    <div className="bag-page">
      <div id="card-items">
        {!true
          ? 'Downloading...'
          : bagsState.map(bag => <BagItem key={bag.id} {...bag} />)}
      </div>
    </div>
  );
}

export default BagsAndCases;
