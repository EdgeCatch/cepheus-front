import React, { useState } from 'react';
import './orderTestItem.scss';
import { ThanosWallet } from '@thanos-wallet/dapp';
import { MARKET_ADDRESS, TOKEN_ADDRESS } from '../../../config';
import { getManagers } from '../../../ipfs';
import { Market } from '../../../contracts/market/index';
import { setup } from '../../../contracts/account/setup';
import Loader from '../Loader/Loader';
const orderEnchancer = require('./arrowEnhancer.png');

const OrderTestItem = () => {
  const [resolveOrder, setResolverOrder] = useState(false);
  const [ordersItems, setOrdersItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isModalDeliveryOpen, setIsModalDeliveryOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    async function getOrders() {
      setLoading(true);
      const { itemManager } = await getManagers();

      const accountPkh = localStorage.getItem('pkh');
      const Tezos = await setup();
      const market = await Market.init(Tezos);
      const contractStorage = await market.getFullStorage({});
      const items = await contractStorage.buyer_orders.get(accountPkh);
      const orders = items.map(item => itemManager.getByCid(item));
      const ordersAll = await Promise.all(orders);
      const ordersItems = ordersAll.map(item =>
        item.value.itemCid ? itemManager.getByCid(item.value.itemCid) : {}
      );
      const allOrdersItems = await Promise.all(ordersItems);
      setOrdersItems(allOrdersItems);
      setOrders(items);
      //   console.log(await itemManager.getByCid(item.value.itemCid));
      setLoading(false);
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
          onClick={() => {
            setIsModalDeliveryOpen(!isModalDeliveryOpen);
            console.log(isModalDeliveryOpen);
          }}
        >
          Delivery Info
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
      {!loading ? (
        orders.length ? (
          orders.slice(0, 1).map((order, index) => (
            <div className="order-list_item">
              <div className="test-item__info">
                <div className="test-info-elements">
                  <img
                    src={ordersItems[index].value.images[0]}
                    alt="item images"
                    width="64px"
                  />
                </div>
                <div className="test-info-elements">
                  <h4 className="item__info_article">
                    Order:{ordersItems[index].value.name}
                  </h4>
                  <p className="item__info_exact">
                    ${ordersItems[index].value.price}
                  </p>
                </div>
                <div className="test-info-elements">
                  <h4 className="item__info_article">Size</h4>
                  <p className="item__info_exact">
                    {ordersItems[index].value.size}
                  </p>
                </div>
                <div className="test-info-elements">
                  <h4 className="item__info_article">Count </h4>
                  <p className="item__info_exact">
                    ${ordersItems[index].value.count}
                  </p>
                </div>
                <div className="test-info-elements">
                  <h4 className="item__info_article">Tracking number </h4>
                  <p className="item__info_exact">$109</p>
                </div>

                <OrderButtons orderId={order} />
              </div>
            </div>
          ))
        ) : (
          <span>No items found</span>
        )
      ) : (
        <Loader
          style={{
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            left: '60%',
            top: '50%'
          }}
        />
      )}
    </React.Fragment>
  );
};

export default OrderTestItem;
