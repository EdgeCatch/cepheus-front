import React, { useState } from 'react';
import { reduxForm } from 'redux-form';
import { ThanosWallet } from '@thanos-wallet/dapp';
import { useForm } from 'react-hook-form';
import { MARKET_ADDRESS } from '../../../config';
import Modal, { ModalContext } from '../Modal/Modal';
import Button from '../Button';

import Loader from '../../components/Loader/Loader';
import { Market } from '../../../contracts/market/index';
import { setup } from '../../../contracts/account/setup';
import './orderSellerItem.scss';
import { getManagers } from '../../../ipfs';

const orderEnchancer = require('./arrowEnhancer.png');

function OrderSellerItem({ orderId }) {
  const [resolveOrder, setResolverOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalDeliveryOpen, setIsModalDeliveryOpen] = useState(false);
  const [ordersItems, setOrdersItems] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = React.useState(-1);
  const [orders, setOrders] = useState([]);
  const [isDetailsLoading, setIsDetailsLoading] = React.useState(false);
  const { register, getValues } = useForm();

  React.useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    setLoading(true);
    const { itemManager } = await getManagers();
    const accountPkh = localStorage.getItem('pkh');

    try {
      const Tezos = await setup();
      const market = await Market.init(Tezos);
      const contractStorage = await market.getFullStorage();
      const items = (await contractStorage.seller_orders.get(accountPkh)) || [];

      const orders = items.map(item => itemManager.getByCid(item));
      const ordersAll = await Promise.all(orders);
      const ordersItems = ordersAll.map(async (item, index) => {
        if (item.value.itemCid) {
          console.log(items[index], 'items[index]');
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
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }
  async function handleAcceptRefund() {
    const wallet = new ThanosWallet('Cepheus');
    await wallet.connect('carthagenet', { forcePermission: true });
    const tezos = wallet.toTezos();
    const contractMarket = await tezos.wallet.at(MARKET_ADDRESS);
    const acceptRefund = await contractMarket.methods
      .acceptRefund(selectedOrderId)
      .send();
    await acceptRefund.confirmation();
    console.log('DONE');
    await getOrders();
  }
  async function handleAcceptOrder() {
    setIsDetailsLoading(true);
    const { track_number, description } = getValues();

    try {
      const { itemManager } = await getManagers();
      const deliveryCid = await itemManager.addDeliveryInfo(
        track_number,
        description
      );
      const wallet = new ThanosWallet('Cepheus');

      await wallet.connect('carthagenet', { forcePermission: true });
      const tezos = wallet.toTezos();
      const contractMarket = await tezos.wallet.at(MARKET_ADDRESS);
      const operation = await contractMarket.methods
        .acceptOrder(selectedOrderId, deliveryCid.string)
        .send();

      await operation.confirmation();
      await getOrders();
    } catch (e) {
      console.log(e);
    }
    setIsModalDeliveryOpen(false);
    setIsDetailsLoading(false);
  }

  const OrderButtons = ({ orderId, status }) => {
    const [loading, setLoading] = useState(false);
    return (
      <div className="resolve-buttons">
        {console.log(status, 'seller status')}
        {!loading ? (
          <>
            {status === 1 && (
              <>
                <button
                  type="submit"
                  className="purple"
                  onClick={() => {
                    setSelectedOrderId(orderId);
                    setIsModalDeliveryOpen(true);
                  }}
                >
                  Confirm
                </button>
              </>
            )}
            {status === 2 && (
              <>
                <span>Confirmed</span>
              </>
            )}
            {status === 3 && (
              <>
                <span>Requested refund</span>
                <button
                  type="submit"
                  className="purple"
                  onClick={() => handleAcceptRefund()}
                >
                  Accept refund
                </button>
              </>
            )}
            {status === 6 && (
              <>
                <span>Received</span>
              </>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    );
  };

  return (
    <>
      {!loading ? (
        orders.length ? (
          orders.map((order, index) => (
            <React.Fragment>
              {Object.keys(order).length && (
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

                    <OrderButtons
                      orderId={order}
                      status={ordersItems[index].status}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
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
        title="Delivery Details"
        onCancel={() => setIsModalDeliveryOpen(false)}
        isOpen={isModalDeliveryOpen}
      >
        {isDetailsLoading ? (
          <div
            style={{
              transform: 'translate(-50%, -50%)',
              position: 'absolute',
              left: ' 50%',
              top: '40%'
            }}
          >
            <Loader />
          </div>
        ) : (
          <>
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
                  name="track_number"
                  ref={register({ required: 'Required' })}
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
                  name="description"
                  ref={register({ required: 'Required' })}
                  placeholder="Description information"
                  component="textarea"
                  props={{ rows: '10' }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <Button
                className=" purple buy-btn "
                onClick={() => handleAcceptOrder(orderId)}
              >
                Submit
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default reduxForm({
  form: 'sellModal',
  destroyOnUnmount: false
})(OrderSellerItem);
