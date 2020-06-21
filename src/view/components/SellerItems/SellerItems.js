import React from 'react';
import SellerItem from '../SellerItem/SellerItem';
import Modal from '../Modal/Modal';
import SellerModalForm from '../SellerModalForm';
import './sellerItems.scss';

class SellerItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalAddItemOpen: false
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

  render() {
    const { isModalAddItemOpen } = this.state;
    const { sellItemsList, ItemManager } = this.props;

    const goodsForSaleList = () => sellItemsList.map(item => item);

    return (
      <>
        <div className="seller-items__block">
          {goodsForSaleList()}
          <div className="seller-items_button">
            <button
              className="purple"
              type="submit"
              onClick={() => this.openPurchaseModal()}
            >
              Add Item
            </button>
          </div>

          <Modal
            title="Add new item"
            onCancel={this.handleCancel}
            isOpen={isModalAddItemOpen}
            buttonText=""
          >
            <SellerModalForm />
          </Modal>
        </div>
      </>
    );
  }
}

export default SellerItems;
