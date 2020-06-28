// @flow
import * as React from 'react';
import Modal from '../../components/Modal/Modal';
import './cartPage.scss';
import CartItem from '../../containers/CartItem';
import CartModalForm from '../../components/CartModalForm';
import store from '../../../store/index';

type CartPageState = {
  isOpenModalPurchase: boolean
};

type CartPageProps = {
  totalPrice: String,
  cartItemsCount: String,
  addedCount: number,
  removeFromCart: Function,
  items: Array<Object>
};

class CartPage extends React.Component<CartPageProps, CartPageState> {
  constructor(props: CartPageProps) {
    super(props);
    this.state = {
      isOpenModalPurchase: false
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

  handleGetTotalPrice = () => {
    const {
      market: { items },
      cart: { cartItems }
    } = store.getState();
    const totalPrice = this.props.items.reduce((acc, curr) => {
      const [current] = items.filter(item => item.cid === curr.cid);
      return acc + parseFloat(current.value.price * curr.count);
    }, 0);
    return totalPrice;
  };

  render() {
    const { isOpenModalPurchase } = this.state;
    const { cartItemsCount, removeFromCart, items, addedCount } = this.props;

    console.log(items);
    const renderedItems = () =>
      items.map(item => (
        <CartItem
          key={item.cid}
          id={item.cid}
          count={item.count}
          remove={() => removeFromCart(item.cid)}
        />
      ));

    return (
      <>
        <div>
          <h4 className="cart-page__headline">Cart</h4>
        </div>
        <div className="cart-page__wrapper">
          <div className="cart-page">
            {addedCount > 0 && `(${addedCount})`}
            <div className="cart-items">{renderedItems()}</div>
            <div className="purchases_total">
              <p className="summary__article">Summary</p>
              <div className="summary__block">
                <p>Items count: {cartItemsCount}</p>
                <p>Total: ${this.handleGetTotalPrice()}</p>
                <button
                  id="make-order"
                  type="submit"
                  onClick={() => this.openPurchaseModal()}
                >
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
            <CartModalForm handleCancel={() => this.handleCancel()} />
          </Modal>
        </div>
      </>
    );
  }
}

export default CartPage;
