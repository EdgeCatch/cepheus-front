// @flow
import * as React from 'react';
import Card from 'react-bootstrap/esm/Card';
import './bagItem.scss';

type Props = {
    title: String,
    price: String,
    addToCart: Function,
};

const BagItem = (bag: Props) => {
    const { title, price, addToCart } = bag;

    return (
        <div className="goods-tile" style={{ width: 'calc( ( 100% - 40px ) / 3 )', margin: '15px' }}>
            <Card style={{ border: 'none' }}>
                <Card.Body className="item__body">
                    <Card.Img
                        style={{ width: '11rem', margin: '10px auto', height: '11rem' }}
                        variant="top"
                        src="/bag.jpg"
                    />
                    <img src="" alt="" />
                    <p>{title}</p>
                    <p>${price}</p>
                </Card.Body>
            </Card>
            <div className="add-to-card_btn purple" onClick={addToCart.bind(this, bag)}>
                Add to cart
            </div>
        </div>
    );
};

export default BagItem;
