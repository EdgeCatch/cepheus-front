import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './orderTestItem.scss';

const orderEnchancer = require('./arrowEnhancer.png');

const OrderTestItem = () => {
    const [resolveOrder, setResolverOrder] = useState(false);

    const OrderButtons = () => {
        return resolveOrder ? (
            <div className="resolve-buttons">
                {/* temporary button feature to change a state of bool */}
                <button type="submit" className="purple" onClick={() => setResolverOrder(!resolveOrder)}>
                    Confirm
                </button>
                <button type="submit" className="dark">
                    Request Refund
                </button>
            </div>
        ) : (
            <img
                className="order-detail__enhancer"
                src={orderEnchancer}
                alt=""
                onClick={() => {
                    setResolverOrder(!resolveOrder);
                }}
            />
        );
    };

    return (
        <div className="order-list_item">
            <div className="test-item__info">
                <div className="test-info-elements">
                    <h4 className="item__info_article">Order </h4>
                    <p className="item__info_exact">$109</p>
                </div>
                <div className="test-info-elements">
                    <h4 className="item__info_article">Date</h4>
                    <p className="item__info_exact">$109</p>
                </div>
                <div className="test-info-elements">
                    <h4 className="item__info_article">Status </h4>
                    <p className="item__info_exact">$109</p>
                </div>
                <div className="test-info-elements">
                    <h4 className="item__info_article">Tracking number </h4>
                    <p className="item__info_exact">$109</p>
                </div>

                <OrderButtons />
            </div>
        </div>
    );
};

export default OrderTestItem;
