import React from 'react';
import styled from 'styled-components';
import SellerItem from '../SellerItem/SellerItem';
import Modal from '../Modal/Modal';
import SellerModalForm from '../SellerModalForm';
import { getManagers } from '../../../ipfs';

import './sellerItems.scss';

class SellerItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalAddItemOpen: false,
      items: [],
    };
  }

  onSubmit(e) {
    this.props.sellItems();
    this.setState({ isModalAddItemOpen: false });
    this.props.sellItemsList.push(<SellerItem itemNameClass="cart" />);
  }

  openPurchaseModal = () => {
    return this.setState({ isModalAddItemOpen: true });
  };

  handleSubmit = () => {
    this.setState({ isModalAddItemOpen: false });
  };

  handleCancel = () => {
    this.setState({ isModalAddItemOpen: false });
  };

  handleGetManagers = async () => {
    const { itemManager } = await getManagers();
    const { publicKey } = JSON.parse(localStorage.getItem('account'));
    const allItems = await itemManager.getAll();
    const myItems = allItems.filter(item => item.value.seller === publicKey);

    console.log(myItems);
    this.setState({ ...this.state, items: myItems });
  };

  render() {
    const { isModalAddItemOpen } = this.state;
    const { sellItemsList, ItemManager } = this.props;
    const goodsForSaleList = () => sellItemsList.map(item => item);

    this.handleGetManagers();

    return (
      <>
        <div className="seller-items__block">
          <div style={{ display: 'block', padding: '10px 0' }}>
            <button className="purple" type="submit" onClick={() => this.openPurchaseModal()}>
              Add Item
            </button>
          </div>
          <div className="seller-items_button">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {this.state.items.length &&
                this.state.items.map((order, index) => (
                  <div className="order-list_item">
                    <div className="test-item__info">
                      <div className="test-info-elements">
                        <img src={order.value.images[0]} alt="item images" width="64px" />
                      </div>
                      <div className="test-info-elements">
                        <h4 className="item__info_article">{order.value.name}</h4>
                        <p className="item__info_exact">${order.value.price}</p>
                      </div>
                      <div className="test-info-elements">
                        <h4 className="item__info_article">Size</h4>
                        <p className="item__info_exact">{order.value.size}</p>
                      </div>
                      <div className="test-info-elements">
                        <h4 className="item__info_article">Count </h4>
                        <p className="item__info_exact">{order.value.count}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <Modal title="Add new item" onCancel={this.handleCancel} isOpen={isModalAddItemOpen} buttonText="">
            <SellerModalForm />
          </Modal>
        </div>
      </>
    );
  }
}

export default SellerItems;
