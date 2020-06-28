// @flow
import React from 'react';
import BagItem from '../../containers/BagItem';
import Filter from '../../components/Filter/Filter';
import './alcohol.scss';
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

function Alchol({ isReady, market, bags, ...props }) {
  React.useEffect(() => {
    async function handleGetManagers() {
      const { itemManager, orderManager, publicKey } = await getManagers();

      return { itemManager, orderManager, publicKey };
    }
    handleGetManagers();
  }, []);

  return (
    <div className="bag-page">
      <Filter />
      <div id="catalog-products">
        {bags.length ? (
          <React.Fragment>
            {bags.map((bag, index) => (
              <BagItem key={index} {...bag} />
            ))}
          </React.Fragment>
        ) : (
          <span>No items found</span>
        )}
      </div>
    </div>
  );
}

export default Alchol;
