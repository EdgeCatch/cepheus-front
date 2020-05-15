import React from 'react';
import Modal from '../../components/Modal/Modal';
import './CartPage.scss';
import CartItem from '../../components/pageComponents/CartPage/CartItem/CartItem';
import CartModalForm from '../../components/pageComponents/CartPage/CartModalForm/CartModalForm';

class CartPage extends React.Component {
    state = {
        isOpenModalPurchase: false,
    };

    openPurchaseModal = () => {
        return this.setState({ isOpenModalPurchase: true });
    };

    handleSubmit = () => {
        this.setState({ isOpenModalPurchase: false });
    };

    handleCancel = () => {
        this.setState({ isOpenModalPurchase: false });
    };

    render() {
        const { isOpenModalPurchase } = this.state;

        return (
            <div>
                <h4 className="cart-page__headline">Cart</h4>
                <div className="cart-page">
                    <CartItem />
                    <div className="purchases_total">
                        <p className="summary__article">Summary</p>
                        <div className="summary__block">
                            <p>Items count:</p>
                            <p>Total price:</p>
                            <button id="make-order" type="submit" onClick={() => this.openPurchaseModal()}>
                                Make an Order
                            </button>
                        </div>
                    </div>
                </div>
                <Modal
                    title="Your Delivery Details"
                    onCancel={this.handleCancel}
                    onSubmit={this.handleSubmit}
                    isOpen={isOpenModalPurchase}
                    buttonText="Buy"
                >
                    <CartModalForm />
                </Modal>
            </div>
        );
    }
}
export default CartPage;
