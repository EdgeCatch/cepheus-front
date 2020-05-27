// @flow
import * as React from 'react';
import * as _ from 'lodash';
import Modal from '../../components/Modal/Modal';
import './cartPage.scss';
import CartItem from '../../components/pageComponents/CartPage/CartItem';
import CartModalForm from '../../components/pageComponents/CartPage/CartModalForm';

type CartPageState = {
    isOpenModalPurchase: boolean,
    items: Array<Object>,
};

type CartPageProps = {
    totalPrice: String,
    cartItemsCount: String,
};

class CartPage extends React.Component<CartPageProps, CartPageState> {
    constructor(props: CartPageProps) {
        super(props);
        this.state = {
            isOpenModalPurchase: false,
            items: [],
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

    addItem = () => {
        const item = {
            id: _.uniqueId(),
        };

        this.setState(prevState => ({
            items: [...prevState.items, item],
        }));
    };

    delete(id) {
        this.setState(prevState => ({
            items: prevState.items.filter(el => el !== id),
        }));
    }

    render() {
        const { isOpenModalPurchase, items } = this.state;
        const { totalPrice, cartItemsCount } = this.props;
        const renderedItems = () =>
            items.map(item => <CartItem key={item.id} id={item.id} remove={() => this.delete(item)} />);

        return (
            <div className="cart-page__wrapper">
                <h4 className="cart-page__headline">Cart</h4>
                <div className="cart-page">
                    <button type="button" className="add-cart" onClick={this.addItem}>
                        Add TestItem
                    </button>
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
