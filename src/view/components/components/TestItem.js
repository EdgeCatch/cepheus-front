import React from 'react';
import PropTypes from 'prop-types';

const TestItem = ({ itemNameClass, onRemove }) => {
    return (
        <div className={`${itemNameClass} item`}>
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
                <button type="submit" className="remove-btn" onClick={onRemove}>
                    x
                </button>
            </div>
        </div>
    );
};

TestItem.propTypes = {
    itemNameClass: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default TestItem;
