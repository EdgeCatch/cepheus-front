import React, { useState } from 'react';
import './orderTestItem.scss';
import { ThanosWallet } from '@thanos-wallet/dapp';
import { MARKET_ADDRESS, TOKEN_ADDRESS } from '../../../config';
import { getManagers } from '../../../ipfs';
const orderEnchancer = require('./arrowEnhancer.png');

const OrderTestItem = () => {
  const [resolveOrder, setResolverOrder] = useState(false);
  const [orders, setOrders] = useState([]);
  React.useEffect(() => {
    async function getOrders() {
      const { itemManager } = await getManagers();
      const wallet = new ThanosWallet('Cepheus');
      await wallet.connect('carthagenet', { forcePermission: true });
      const tezos = wallet.toTezos();
      const contractMarket = await tezos.wallet.at(MARKET_ADDRESS);
      const contractToken = await tezos.wallet.at(TOKEN_ADDRESS);
      const accountPkh = await tezos.wallet.pkh();
      const contractStorage = await contractMarket.storage();
      const items = await contractStorage.buyer_orders.get(accountPkh);
      const orders = items.map(item => itemManager.getByCid(item));
      const ordersAll = await Promise.all(orders);
      const ordersItems = ordersAll.map(item =>
        item.value.itemCid ? itemManager.getByCid(item.value.itemCid) : {}
      );
      const allOrdersItems = await Promise.all(ordersItems);
      console.log(allOrdersItems);
      setOrders(allOrdersItems);

      //   console.log(await itemManager.getByCid(item.value.itemCid));
    }

    getOrders();
  }, []);
  const OrderButtons = () => {
    return resolveOrder ? (
      <div className="resolve-buttons">
        {/* temporary button feature to change a state of bool */}
        <button
          type="submit"
          className="purple"
          onClick={() => setResolverOrder(!resolveOrder)}
        >
          Confirm
        </button>
        <button type="submit" className="dark">
          Request Refund
        </button>
      </div>
    ) : (
      <img
        className="order-detail__enhancer"
        src={orderEnchancer}
        alt=""
        onClick={() => {
          setResolverOrder(!resolveOrder);
        }}
      />
    );
  };

  return (
    <React.Fragment>
      {orders.length ? (
        orders.slice(0, 1).map(order => (
          <div className="order-list_item">
            <div className="test-item__info">
              <div className="test-info-elements">
                <img
                  src={order.value.images[0]}
                  alt="item images"
                  width="64px"
                />
              </div>
              <div className="test-info-elements">
                <h4 className="item__info_article">Order:{order.value.name}</h4>
                <p className="item__info_exact">${order.value.price}</p>
              </div>
              <div className="test-info-elements">
                <h4 className="item__info_article">Size</h4>
                <p className="item__info_exact">{order.value.size}</p>
              </div>
              <div className="test-info-elements">
                <h4 className="item__info_article">Count </h4>
                <p className="item__info_exact">${order.value.count}</p>
              </div>
              <div className="test-info-elements">
                <h4 className="item__info_article">Tracking number </h4>
                <p className="item__info_exact">$109</p>
              </div>

              <OrderButtons />
            </div>
          </div>
        ))
      ) : (
        <span>Loading</span>
      )}
    </React.Fragment>
  );
};

export default OrderTestItem;
