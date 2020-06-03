import React from 'react';
import PropTypes from 'prop-types';
import './refundItem.scss';

const RefundItem = () => {
    return (
        <div className="refund-list_item">
            <div className="test-item__info">
                <div className="test-info-elements">
                    <h4 className="item__info_article">Request </h4>
                    <p className="item__info_exact">$109</p>
                </div>
                <div className="test-info-elements">
                    <h4 className="item__info_article">Order</h4>
                    <p className="item__info_exact">$109</p>
                </div>
                <div className="test-info-elements">
                    <h4 className="item__info_article">Decoded traking number </h4>
                    <p className="item__info_exact">$109</p>
                </div>
                <div className="test-info-elements">
                    <h4 className="item__info_article">Date </h4>
                    <p className="item__info_exact">$109</p>
                </div>
                <div className="test-info-elements">
                    <h4 className="item__info_article">Status </h4>
                    <p className="item__info_exact">Requsted</p>
                </div>
                <div className="item__info_button">
                    <button type="submit" className="seller-refund purple">
                        Accept refund
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RefundItem;
