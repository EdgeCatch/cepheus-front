import React from 'react';
import SellerItem from '../SellerItem/SellerItem';
import Modal from '../Modal/Modal';
import SellerModalForm from '../SellerModalForm';
import './sellerItems.scss';

class SellerItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalAddItemOpen: false,
        };
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

        return (
            <>
                <div className="seller-items__block">
                    <SellerItem itemNameClass="cart" />
                    <SellerItem itemNameClass="cart" />
                    <SellerItem itemNameClass="cart" />

                    <div className="seller-items_button">
                        <button className="purple" type="submit" onClick={() => this.openPurchaseModal()}>
                            addItem
                        </button>
                    </div>

                    <Modal
                        title="Your Delivery Details"
                        onCancel={this.handleCancel}
                        onSubmit={this.handleSubmit}
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
