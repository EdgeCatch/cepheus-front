import React from 'react';
import Container from 'react-bootstrap/Container';
import './CartPage.scss';

const CartPage = () => (
    <Container className="cartPage">
        <h4 className="cartPage__headline">Cart</h4>
        <div className="purchasesTotal">
            <p className="summary__article">Summary</p>
            <div className="summary__block">
                <p>Items count:</p>
                <p>Total price:</p>
                <button id="make-order" type="submit" onClick={() => alert('modal')}>
                    Make an Order
                </button>
            </div>
        </div>
    </Container>
);

export default CartPage;
