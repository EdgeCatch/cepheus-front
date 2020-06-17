// @flow
import * as React from 'react';
import Card from 'react-bootstrap/esm/Card';
import './bagItem.scss';

type Props = {
  title: String,
  price: String,
  addToCart: Function
};

const BagItem = (bag: Props) => {
  const {
    value: {
      title,
      price,
      addToCart,
      images: [firstImage]
    }
  } = bag;
  console.log(bag);
  return (
    <div className="goods-tile" style={{ width: '420px', margin: '15px' }}>
      <Card style={{ border: 'none' }}>
        <Card.Body className="item__body">
          <Card.Img
            style={{ width: '11rem', margin: '10px auto', height: '11rem' }}
            variant="top"
            src={firstImage}
          />
          <img src="" alt="" />
          <p>{title}</p>
          <p>{price || 0}$</p>
        </Card.Body>
      </Card>
      <div className="add-to-card_btn purple">Add to cart</div>
    </div>
  );
};

export default BagItem;
