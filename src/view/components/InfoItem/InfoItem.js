import React from 'react';
import PropTypes from 'prop-types';
import './infoItem.scss';

const bag = require('./img/bag.jpg');

const InfoItem = ({ itemNameClass }) => {
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
                    <p className="item__info_exact">$109</p>{' '}
                </div>
                <div className="info-elements">
                    <h4 className="item__info_article">Total </h4>
                    <p className="item__info_exact">$109</p>
                </div>
                <button type="submit" className="remove-btn">
                    x
                </button>
            </div>
        </div>
    );
};

InfoItem.propTypes = {
    itemNameClass: PropTypes.string.isRequired,
};

export default InfoItem;
