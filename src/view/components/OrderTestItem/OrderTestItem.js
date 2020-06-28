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
  const [selectedParcel, setSelectedParcel] = useState(-1);
  const [isModalRefundOpen, setIsModalRefundOpen] = useState(false);
  const [refundTrackNumber, setRefundTrackNumber] = useState(null);
  const [isRefundLoading, setRefundLoading] = useState(false);

  async function getOrders() {
    setLoading(true);
    const { itemManager } = await getManagers();

    const accountPkh = localStorage.getItem('pkh');
    try {
      const Tezos = await setup();
      const market = await Market.init(Tezos);
      const contractStorage = await market.getFullStorage({});
      const items = (await contractStorage.buyer_orders.get(accountPkh)) || [];
      const orders = items.map(item => itemManager.getByCid(item));
      const ordersAll = await Promise.all(orders);
      const ordersItems = ordersAll.map(item =>
        item.value.itemCid ? itemManager.getByCid(item.value.itemCid) : {}
      );
      const allOrdersItems = await Promise.all(ordersItems);
      setOrdersItems(allOrdersItems);
      setOrders(items);
    } catch (e) {
      console.log(e);
      setOrdersItems([]);
      setOrders([]);
    }
    setLoading(false);
  }

  React.useEffect(() => {
    getOrders();
  }, []);
  async function handleConfirmReceive() {
    setDetailsLoad(true);
    try {
      const wallet = new ThanosWallet('Cepheus');
      await wallet.connect('carthagenet', { forcePermission: true });
      const tezos = wallet.toTezos();
      const contract = await tezos.wallet.at(MARKET_ADDRESS);
      const operation = await contract.methods
        .confirmReceiving(orders[selectedParcel])
        .send();
      await operation.confirmation();
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
    await getOrders();
    setDetailsLoad(false);
    setIsModalDeliveryOpen(false);
  }

  async function handleRequestRefund() {
    setRefundLoading(true);
    try {
      const wallet = new ThanosWallet('Cepheus');
      await wallet.connect('carthagenet', { forcePermission: true });
      const tezos = wallet.toTezos();
      const contract = await tezos.wallet.at(MARKET_ADDRESS);
      const operation = await contract.methods
        .requestRefund(orders[selectedParcel], refundTrackNumber)
        .send();
      await operation.confirmation();
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
    setRefundLoading(false);
  }

  async function fetchDeliveryDetails(index) {
    setDetailsLoad(true);
    setSelectedParcel(index);
    const { itemManager } = await getManagers();

    const { publicKey } = JSON.parse(localStorage.getItem('account'));
    try {
      const Tezos = await setup();
      const market = await Market.init(Tezos);
      const contractStorage = await market.getFullStorage({});
      const items = await contractStorage.orders.get(orders[index]);
      if (items.delivery_ipfs.length) {
        const deliveryData = await itemManager.getByCid(items.delivery_ipfs);
        setDeliveryDetails(deliveryData.value);
      } else {
        setDeliveryDetails({});
      }
    } catch (e) {
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
        {console.log(orders[index], 'resolve')}
        <button
          type="submit"
          className="dark"
          onClick={() => setIsModalRefundOpen(true)}
        >
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
                    {ordersItems[index].value.name}
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
              <React.Fragment>
                {deliveryDetails.received ? (
                  <span>Delivery was received</span>
                ) : (
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
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          padding: '10px 0'
                        }}
                      >
                        <button
                          className="purple"
                          onClick={() => handleConfirmReceive()}
                        >
                          Confirm receive
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
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
                The Seller has not provided delivery information yet
              </span>
            )}
          </React.Fragment>
        )}
      </Modal>
      <Modal
        title="Request refund"
        onCancel={() => setIsModalRefundOpen(false)}
        isOpen={isModalRefundOpen}
      >
        {isRefundLoading ? (
          <Loader
            style={{
              transform: 'translate(-50%, -50%)',
              position: 'absolute',
              left: '50%',
              top: '40%'
            }}
          />
        ) : (
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
                name="refundTrackNumber"
                value={refundTrackNumber}
                onChange={e => setRefundTrackNumber(e.target.value)}
                placeholder="Track number"
                component="input"
              />
            </div>
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '10px 0'
                }}
              >
                <button
                  className="purple"
                  onClick={() => handleRequestRefund()}
                >
                  Confirm refund
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default reduxForm({
  form: 'sellModal',
  destroyOnUnmount: false
})(OrderTestItem);
