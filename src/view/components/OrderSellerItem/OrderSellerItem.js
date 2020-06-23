import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { ThanosWallet } from '@thanos-wallet/dapp';
import { MARKET_ADDRESS, TOKEN_ADDRESS } from '../../../config';
import Modal from '../Modal/Modal';
import Button from '../Button';

import DeliveryModal from '../DeliveryModal/DeliveryModal';
import Loader from '../../components/Loader/Loader';
import { Market } from '../../../contracts/market/index';
import { setup } from '../../../contracts/account/setup';
import './orderSellerItem.scss';
import { getManagers } from '../../../ipfs';
import { ModalContext } from '../Modal/Modal';

const orderEnchancer = require('./arrowEnhancer.png');

function OrderSellerItem({ orderId }) {
  const [resolveOrder, setResolverOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalDeliveryOpen, setIsModalDeliveryOpen] = useState(false);
  const [ordersItems, setOrdersItems] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = React.useState(-1);
  const [orders, setOrders] = useState([]);
  const useModalContext = React.useContext(ModalContext);

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
    const items = (await contractStorage.seller_orders.get(accountPkh)) || [];
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
  async function handleAcceptOrder(ipfs) {
    try {
      const { itemManager } = await getManagers();
      const deliveryCid = await itemManager.addDeliveryInfo(
        'NOVA123123',
        'LOX EBAT TEBYA NAEBALI'
      );
      const wallet = new ThanosWallet('Cepheus');
      await wallet.connect('carthagenet', { forcePermission: true });
      const tezos = wallet.toTezos();
      const contractMarket = await tezos.wallet.at(MARKET_ADDRESS);
      console.log(selectedOrderId, ipfs, deliveryCid);
      const operation = await contractMarket.methods
        .acceptOrder(selectedOrderId, deliveryCid.string)
        .send();
      await operation.confirmation();
      console.log('Done!');
    } catch (e) {
      console.log(e);
    }
  }

  const OrderButtons = ({ orderId, status }) => {
    const [loading, setLoading] = useState(false);

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
                  onClick={() => {
                    setSelectedOrderId(orderId);
                    setIsModalDeliveryOpen(true);
                  }}
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

      <Modal
        title="Your Delivery Details"
        // onCancel={this.handleCancel}
        // onSubmit={this.handleSubmit}
        isOpen={isModalDeliveryOpen}
      >
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
            <Field
              className=" seller-modal__item"
              type="text"
              name="type"
              value={'1'}
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
            <Field
              className=" seller-modal__item"
              type="text"
              name="type"
              value={'1'}
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
      </Modal>
    </React.Fragment>
  );
}

export default reduxForm({
  form: 'sellModal',
  destroyOnUnmount: false
})(OrderSellerItem);
