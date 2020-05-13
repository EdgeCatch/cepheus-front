import React from 'react';
import Container from 'react-bootstrap/Container';
import Modal from '../../components/Modal/Modal';
import './CartPage.scss';

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
            <Container className="cart-page">
                <h4 className="cart-page__headline">Cart</h4>
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
                <Modal
                    title="Your Delivery Details"
                    onCancel={this.handleCancel}
                    onSubmit={this.handleSubmit}
                    isOpen={isOpenModalPurchase}
                >
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a
                    </p>
                </Modal>
            </Container>
        );
    }
}
export default CartPage;
