import React from 'react';
import * as _ from 'lodash';
import Modal from '../../components/Modal/Modal';
import './CartPage.scss';
import CartItem from '../../components/pageComponents/CartPage/CartItem/CartItem';
import CartModalForm from '../../components/pageComponents/CartPage/CartModalForm/CartModalForm';

class CartPage extends React.Component {
    constructor(props) {
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

        this.setState({
            items: [...this.state.items, item],
        });
    };

    delete(id) {
        this.setState(prevState => ({
            items: prevState.items.filter(el => el !== id),
        }));
    }

    render() {
        const { isOpenModalPurchase, items } = this.state;
        const renderedItems = () =>
            items.map(item => <CartItem key={item.id} id={item.id} remove={() => this.delete(item)} />);

        return (
            <div>
                <h4 className="cart-page__headline">Cart</h4>
                <div className="cart-page">
                    <button type="button" onClick={this.addItem}>
                        Add TestItem
                    </button>
                    <div className="cart-items">{renderedItems()}</div>
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
