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
import BagsAndCases from '../BagsAndCases';

type Props = {
  setBags: (data: Object) => void,
  isReady: boolean,
  bags: Array<Object>,
  totalPrice: string,
};

function AlcoPage({ isReady, market, bags, ...props }) {
  //   React.useEffect(() => {
  //     async function handleGetManagers() {
  //       const { itemManager, orderManager, publicKey } = await getManagers();

  //       console.log(itemManager, orderManager, publicKey);
  //       return { itemManager, orderManager, publicKey };
  //     }
  //     handleGetManagers();
  //   }, []);

  return (
    <>
      <BagsAndCases bags={bags} />
    </>
  );
}

export default AlcoPage;
