// @flow
import React from 'react';
import './infoItem.scss';

const bag = require('./img/bag.jpg');

type Props = {
    itemNameClass: any,
    count: String,
    onRemove: Function,
};

const InfoItem = (props: Props) => {
    const { itemNameClass, onRemove, count } = props;

    return (
        <div className={`${itemNameClass} item`}>
            <div className="item__img">
                <img src={bag} alt="" />
            </div>
            <div className="item__info">
                <div className="info-elements">
                    <h4 className="item__info_article">Blue bag champion </h4>
                    <p className="item__info_exact">$109</p>{' '}
                </div>
                <div className="info-elements">
                    <h4 className="item__info_article">Price</h4>
                    <p className="item__info_exact">$109</p>{' '}
                </div>
                <div className="info-elements">
                    <h4 className="item__info_article">Count </h4>
                    <p className="item__info_exact">{count}</p>
                </div>
                <div className="info-elements">
                    <h4 className="item__info_article">Total </h4>
                    <p className="item__info_exact">$109</p>
                </div>
                <button type="submit" className="remove-btn" onClick={onRemove}>
                    x
                </button>
            </div>
        </div>
    );
};

export default InfoItem;
