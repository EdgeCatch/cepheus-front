import React, { useState } from 'react';
import { ThanosWallet } from '@thanos-wallet/dapp';
import { MARKET_ADDRESS, TOKEN_ADDRESS } from '../../../config';
import Modal from '../Modal/Modal';
import DeliveryModal from '../DeliveryModal/DeliveryModal';
import Loader from '../../components/Loader/Loader';
import { Market } from '../../../contracts/market/index';
import { setup } from '../../../contracts/account/setup';
import './orderSellerItem.scss';
import { getManagers } from '../../../ipfs';

const orderEnchancer = require('./arrowEnhancer.png');

const OrderSellerItem = ({ orderId }) => {
  const [resolveOrder, setResolverOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalDeliverOpen, setIsModalDeliverOpen] = useState(false);
  const [ordersItems, setOrdersItems] = useState([]);
  const [orders, setOrders] = useState([]);

  React.useEffect(() => {
    getOrders();
    console.log(orders, ordersItems);
  }, []);

  async function getOrders() {
    setLoading(true);
    const { itemManager } = await getManagers();

    const accountPkh = localStorage.getItem('pkh');
    const Tezos = await setup();
    const market = await Market.init(Tezos);
    const contractStorage = await market.getFullStorage({});
    const items = await contractStorage.seller_orders.get(accountPkh);
    const orders = items.map(item => itemManager.getByCid(item));
    const ordersAll = await Promise.all(orders);
    const ordersItems = ordersAll.map(async (item, index) => {
      if (item.value.itemCid) {
        const i = await contractStorage.orders.get(items[index]);

        return {
          ...(await itemManager.getByCid(item.value.itemCid)),
          status: i.status.toNumber()
        };
      }
    });
    const allOrdersItems = await Promise.all(ordersItems);
    setOrdersItems(allOrdersItems);
    setOrders(items);
    //   console.log(await itemManager.getByCid(item.value.itemCid));
    setLoading(false);
  }

  const OrderButtons = ({ orderId, status }) => {
    const [loading, setLoading] = useState(false);
    async function handleAcceptOrder(ipfs) {
      setLoading(true);
      const wallet = new ThanosWallet('Cepheus');
      await wallet.connect('carthagenet', { forcePermission: true });
      const tezos = wallet.toTezos();
      const contractMarket = await tezos.wallet.at(MARKET_ADDRESS);

      const operation = await contractMarket.methods.acceptOrder(ipfs).send();
      await operation.confirmation();
      console.log('Done!');
      setLoading(false);
    }

    return resolveOrder ? (
      <div className="resolve-buttons">
        {/* temporary button feature to change a state of bool */}
        {!loading ? (
          <React.Fragment>
            {status === 1 && (
              <React.Fragment>
                <button
                  type="submit"
                  className="purple"
                  onClick={() => handleAcceptOrder(orderId)}
                >
                  Confirm
                </button>
                <button type="submit" className="dark">
                  Request Refund
                </button>
                <img
                  className="order-detail__enhancer"
                  src={orderEnchancer}
                  alt=""
                  onClick={() => {
                    setResolverOrder(!resolveOrder);
                  }}
                />
              </React.Fragment>
            )}
            {status === 2 && (
              <React.Fragment>
                <span>Confirmed</span>
                <img
                  className="order-detail__enhancer"
                  src={orderEnchancer}
                  alt=""
                  onClick={() => {
                    setResolverOrder(!resolveOrder);
                  }}
                />
              </React.Fragment>
            )}
            {status === 3 && (
              <React.Fragment>
                <span>Requested refund</span>
                <img
                  className="order-detail__enhancer"
                  src={orderEnchancer}
                  alt=""
                  onClick={() => {
                    setResolverOrder(!resolveOrder);
                  }}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <Loader />
        )}
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
                <OrderButtons
                  orderId={order}
                  status={ordersItems[index].status}
                />
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

export default OrderSellerItem;
