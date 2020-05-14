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
                    buttonText="Buy"
                >
                    <form action="" className="purchases__modal_form">
                        <input className="purchases__modal_item" type="text" placeholder="Password" />
                        <input className="purchases__modal_item" type="text" placeholder="Receiver" />
                        <input className="purchases__modal_item" type="text" placeholder="Phone number" />
                        <textarea
                            name=""
                            className="textarea__item"
                            cols="30"
                            rows="10"
                            placeholder="Nova Poshta Office"
                        />
                    </form>
                </Modal>
            </Container>
        );
    }
}
export default CartPage;
