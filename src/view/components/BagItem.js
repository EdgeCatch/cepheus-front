// @flow
import * as React from 'react';
import Card from 'react-bootstrap/esm/Card';
import './bagItem.scss';

const BagItem = bag => {
    const { title, price, addToCart, addedCount } = bag;

    return (
        <div className="goods-tile" style={{ width: 'calc( ( 100% - 40px ) / 3 );', margin: '15px' }}>
            <Card style={{ border: 'none' }}>
                <Card.Body className="item__body">
                    <Card.Img
                        style={{ width: '11rem', margin: '10px auto', height: '11rem' }}
                        variant="top"
                        src="/bag.jpg"
                    />
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

// {addedCount > 0 && `${addedCount}`}
export default BagItem;
