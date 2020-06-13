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
    console.log(e.target.value);
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
    const { sellItemsList, ItemManagerClient } = this.props;

    const goodsForSaleList = () => sellItemsList.map(item => item);

    console.log(ItemManagerClient)
    // const fn = async () => {
    // const cid = await ItemManagerClient.ipfs.add(
    //     'dfda83b95889',
    //     '3233231',
    //     'amazing',
    //     'phone',
    //     'postOffice',
    //     1,
    //     2,)
    //     console.log(await ItemManagerClient.getByCid(cid));
    // }
    //  fn().then(() => console.log("test"))
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
              add Item
            </button>
          </div>

          <Modal
            title="Your Delivery Details"
            onCancel={this.handleCancel}
            onSubmit={this.onSubmit.bind(this)}
            isOpen={isModalAddItemOpen}
            buttonText="Add Item"
          >
            <SellerModalForm />
          </Modal>
        </div>
      </>
    );
  }
}

export default SellerItems;
