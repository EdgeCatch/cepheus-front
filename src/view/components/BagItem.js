import React from 'react';
import Card from 'react-bootstrap/Card';

const BagItem = () => (
    <Card style={{ width: 'auto', height: '19rem' }}>
        <Card.Img style={{ width: '12rem', margin: '10px auto', height: '10rem' }} variant="top" src="/bag.jpg" />
        <Card.Body />
        <Card.Body>
            <Card.Title>Blue Bag Champion</Card.Title>
            <Card.Link className="purple" href="#">
                Add to cart
            </Card.Link>
        </Card.Body>
    </Card>
);

export default BagItem;
