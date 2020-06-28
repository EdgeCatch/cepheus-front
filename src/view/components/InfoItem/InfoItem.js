// @flow
import React from 'react';
import './infoItem.scss';
import store from '../../../store/index';

const bag = require('./img/bag.jpg');

type Props = {
  itemNameClass: any,
  count: String,
  onRemove: Function
};

const InfoItem = (props: Props) => {
  const { itemNameClass, onRemove, count, id } = props;
  const {
    market: { items }
  } = store.getState();
  const [curr] = items.filter(item => item.cid === id);
  return (
    <div className={`${itemNameClass} item`}>
      <div className="item__img">
        <img src={curr.value.images[0]} alt="" style={{ width: '64px' }} />
      </div>
      <div className="item__info">
        <div className="info-elements">
          <span className="item__info_article">
            {curr.value.name.slice(0, 15)}
          </span>
          <span className="item__info_exact">{curr.value.size}</span>
          <span className="item__info_exact">{curr.value.colour}</span>
        </div>
        <div className="info-elements">
          <span className="item__info_article">Price</span>
          <span className="item__info_exact">${curr.value.price}</span>
        </div>
        <div className="info-elements">
          <span className="item__info_article">Count </span>
          <span className="item__info_exact">{count}</span>
        </div>
        <div className="info-elements">
          <span className="item__info_article">Total </span>
          <span className="item__info_exact">${count * curr.value.price}</span>
        </div>
        <button type="submit" className="remove-btn" onClick={onRemove}>
          x
        </button>
      </div>
    </div>
  );
};

export default InfoItem;
