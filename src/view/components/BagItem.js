// @flow
import * as React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/Button';

const BagItem = bag => {
    const { title, price, addToCart, addedCount } = bag;

    return (
        <Card style={{ width: 'auto', height: '19rem' }}>
            <Card.Img style={{ width: '12rem', margin: '10px auto', height: '10rem' }} variant="top" src="/bag.jpg" />
            <Card.Body />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Link className="purple" href="#">
                    <Button onClick={addToCart.bind(this, bag)} variant="dark">
                        Добавить в корзину {addedCount > 0 && `(${addedCount}`}
                    </Button>
                    <p>{price}</p>
                </Card.Link>
            </Card.Body>
        </Card>
    );
};

export default BagItem;
