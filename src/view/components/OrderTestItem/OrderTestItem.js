import React, { useState } from 'react';
import './orderTestItem.scss';
import { Field, reduxForm } from 'redux-form';
import Modal from '../Modal/Modal';
import Button from '../Button';

import { ThanosWallet } from '@thanos-wallet/dapp';
import { MARKET_ADDRESS, TOKEN_ADDRESS } from '../../../config';
import { getManagers } from '../../../ipfs';
import { Market } from '../../../contracts/market/index';
import { setup } from '../../../contracts/account/setup';
import Loader from '../Loader/Loader';
const orderEnchancer = require('./arrowEnhancer.png');

const OrderTestItem = () => {
  const [resolveOrder, setResolverOrder] = useState([]);
  const [ordersItems, setOrdersItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isModalDeliveryOpen, setIsModalDeliveryOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({});
  const [isDetailsLoad, setDetailsLoad] = useState(false);
  React.useEffect(() => {
    async function getOrders() {
      setLoading(true);
      const { itemManager } = await getManagers();

      const accountPkh = localStorage.getItem('pkh');
      const Tezos = await setup();
      const market = await Market.init(Tezos);
      const contractStorage = await market.getFullStorage({});
      console.log(contractStorage, 'ss', accountPkh);
      const items = (await contractStorage.buyer_orders.get(accountPkh)) || [];
      const orders = items.map(item => itemManager.getByCid(item));
      const ordersAll = await Promise.all(orders);
      const ordersItems = ordersAll.map(item =>
        item.value.itemCid ? itemManager.getByCid(item.value.itemCid) : {}
      );
      const allOrdersItems = await Promise.all(ordersItems);
      setOrdersItems(allOrdersItems);
      setOrders(items);
      setLoading(false);
    }

    getOrders();
  }, []);

  async function fetchDeliveryDetails(index) {
    setDetailsLoad(true);
    const { itemManager } = await getManagers();

    const { publicKey } = JSON.parse(localStorage.getItem('account'));
    const Tezos = await setup();
    const market = await Market.init(Tezos);
    const contractStorage = await market.getFullStorage({});
    const items = await contractStorage.orders.get(orders[index]);
    if (items.delivery_ipfs.length) {
      const deliveryData = await itemManager.getByCid(items.delivery_ipfs);
      console.log(deliveryData);
      setDeliveryDetails(deliveryData.value);
    } else {
      setDeliveryDetails({});
    }

    setDetailsLoad(false);
  }
  const OrderButtons = ({ index }) => {
    return resolveOrder[index] ? (
      <div className="resolve-buttons">
        {/* temporary button feature to change a state of bool */}
        <button
          type="submit"
          className="purple"
          onClick={() => {
            setIsModalDeliveryOpen(!isModalDeliveryOpen);
            fetchDeliveryDetails(index);
          }}
        >
          Delivery Info
        </button>
        <button type="submit" className="dark">
          Request Refund
        </button>
        <img
          className="order-detail__enhancer"
          src={orderEnchancer}
          alt=""
          onClick={() => {
            resolveOrder[index] = !resolveOrder[index];
            setResolverOrder([...resolveOrder]);
          }}
        />
      </div>
    ) : (
      <img
        className="order-detail__enhancer"
        src={orderEnchancer}
        alt=""
        onClick={() => {
          resolveOrder[index] = !resolveOrder[index];
          setResolverOrder([...resolveOrder]);
        }}
      />
    );
  };

  return (
    <React.Fragment>
      {!loading ? (
        orders.length ? (
          orders.map((order, index) => (
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

                <OrderButtons orderId={order} index={index} />
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
      <Modal
        title="Your Delivery Details"
        onCancel={() => setIsModalDeliveryOpen(false)}
        // onSubmit={this.handleSubmit}
        isOpen={isModalDeliveryOpen}
      >
        {isDetailsLoad ? (
          <Loader
            style={{
              transform: 'translate(-50%, -50%)',
              position: 'absolute',
              left: '50%',
              top: '40%'
            }}
          />
        ) : (
          <React.Fragment>
            {Object.keys(deliveryDetails).length ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}
                >
                  <input
                    className=" seller-modal__item"
                    type="text"
                    name="type"
                    value={deliveryDetails.parcelId}
                    placeholder="Track number"
                    component="input"
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}
                >
                  <textarea
                    className=" seller-modal__item"
                    type="text"
                    name="type"
                    value={deliveryDetails.description}
                    placeholder="Description information"
                    component="textarea"
                    props={{ rows: '10' }}
                  />
                </div>
              </div>
            ) : (
              <span
                style={{
                  transform: 'translate(-50%, -50%)',
                  position: 'absolute',
                  left: '50%',
                  top: '45%',
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                The Seller has not yet provided delivery information
              </span>
            )}
          </React.Fragment>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default reduxForm({
  form: 'sellModal',
  destroyOnUnmount: false
})(OrderTestItem);
