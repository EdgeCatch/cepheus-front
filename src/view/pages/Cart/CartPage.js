// @flow
import * as React from 'react';
import Modal from '../../components/Modal/Modal';
import './cartPage.scss';
import CartItem from '../../components/CartItem';
import CartModalForm from '../../components/CartModalForm';

type CartPageState = {
    isOpenModalPurchase: boolean,
};

type CartPageProps = {
    totalPrice: String,
    cartItemsCount: String,
    addedCount: number,
    removeFromCart: Function,
    items: Array<Object>,
};

class CartPage extends React.Component<CartPageProps, CartPageState> {
    constructor(props: CartPageProps) {
        super(props);
        this.state = {
            isOpenModalPurchase: false,
            // items: [],
        };
    }

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
        const { totalPrice, cartItemsCount, removeFromCart, items, addedCount } = this.props;

        const renderedItems = () =>
            items.map(item => (
                <CartItem key={item.id} id={item.id} count={item.addedCount} remove={() => removeFromCart(item.id)} />
            ));

        return (
            <div className="cart-page__wrapper">
                <h4 className="cart-page__headline">Cart</h4>
                <div className="cart-page">
                    {addedCount > 0 && `(${addedCount})`}
                    <div className="cart-items">{renderedItems()}</div>
                    <div className="purchases_total">
                        <p className="summary__article">Summary</p>
                        <div className="summary__block">
                            <p>Items count: {cartItemsCount}</p>
                            <p>Total price: ${totalPrice}</p>
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
