import React from 'react';
import styled from 'styled-components';
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

// <<<<<<< ipfs
//     render() {
//         const { isModalAddItemOpen } = this.state;
//         const { sellItemsList, ItemManagerClient } = this.props;
// =======
  render() {
    const { isModalAddItemOpen } = this.state;
    const { sellItemsList, ItemManager } = this.props;
// >>>>>>> develop

    const goodsForSaleList = () => sellItemsList.map(item => item);

// <<<<<<< ipfs
//         console.log(ItemManagerClient);
//         // const fn = async () => {
//         // const cid = await ItemManagerClient.ipfs.add(
//         //     'dfda83b95889',
//         //     '3233231',
//         //     'amazing',
//         //     'phone',
//         //     'postOffice',
//         //     1,
//         //     2,)
//         //     console.log(await ItemManagerClient.getByCid(cid));
//         // }
//         //  fn().then(() => console.log("test"))
//         return (
//             <>
//                 <div className="seller-items__block">
//                     {goodsForSaleList()}
//                     <div className="seller-items_button">
//                         <button className="purple" type="submit" onClick={() => this.openPurchaseModal()}>
//                             add Item
//                         </button>
//                     </div>
// =======
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
// >>>>>>> develop

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
