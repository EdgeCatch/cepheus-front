// @flow
import React from 'react';

const bag = require('../InfoItem/img/bag.jpg');

type Props = {
    itemNameClass: any,
    // count: String,
    onRemove: Function,
};

const SellerItem = (props: Props) => {
    const { itemNameClass, onRemove } = props;

    return (
        <div className={`${itemNameClass} item`}>
            <div className="item__img">
                <img src={bag} alt="" />
            </div>
            <div className="item__info">
                <div className="info-elements">
                    <h4 className="item__info_article">Blue bag champion </h4>
                    <p className="item__info_exact">expire</p>
                </div>
                <div className="info-elements">
                    <h4 className="item__info_article">Category</h4>
                    <p className="item__info_exact">$109</p>
                </div>
                <div className="info-elements">
                    <h4 className="item__info_article">Type </h4>
                    <p className="item__info_exact">Suitcase</p>
                </div>
                <div className="info-elements">
                    <h4 className="item__info_article">Count </h4>
                    <p className="item__info_exact">1</p>
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

export default SellerItem;
