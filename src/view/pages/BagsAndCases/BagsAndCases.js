// @flow
import React from 'react';
import BagItem from '../../containers/BagItem';
import bagItems from './bagItems';
import Filter from '../../components/Filter/Filter';
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
  React.useEffect(() => {
    async function handleGetManagers() {
      const { itemManager, orderManager, publicKey } = await getManagers();

      console.log(itemManager, orderManager, publicKey);
      return { itemManager, orderManager, publicKey };
    }
    handleGetManagers();
  }, []);



  return (
    <div className="bag-page">
      <Filter />
      <div id="catalog-products">
        {bags.map(bag => (
          <BagItem key={bag.id} {...bag} />
        ))}
      </div>
    </div>
  );
}

export default BagsAndCases;
