import React from 'react';
import SellerItem from '../SellerItem/SellerItem';
import Modal from '../Modal/Modal';
import SellerModalForm from '../SellerModalForm';
import '../refundItem.scss';

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
                <>
                    <SellerItem itemNameClass="cart" />
                    <SellerItem itemNameClass="cart" />
                    <SellerItem itemNameClass="cart" />

                    <Modal
                        title="Your Delivery Details"
                        onCancel={this.handleCancel}
                        onSubmit={this.handleSubmit}
                        isOpen={isModalAddItemOpen}
                        buttonText="Add Item"
                    >
                        <SellerModalForm />
                    </Modal>
                </>
                <button className="purple" type="submit" onClick={() => this.openPurchaseModal()}>
                    addItem
                </button>
            </>
        );
    }
}

export default SellerItems;
