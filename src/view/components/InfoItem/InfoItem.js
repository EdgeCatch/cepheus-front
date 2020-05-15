import React from 'react';
import PropTypes from 'prop-types';
import './infoItem.scss';

const InfoItem = ({ itemNameClass }) => {
    return (
        <div className={`${itemNameClass} item`}>
            <div className="item__img">
                <img src="#" alt="" />
            </div>
            <div className="item__info">
                <div className="info-elements">
                    <h4 className="item__info_article">1 </h4>
                    <p className="item__info_exact" />
                </div>
                <div className="info-elements">
                    <h4 className="item__info_article">1 </h4>
                    <p className="item__info_exact" />
                </div>
                <div className="info-elements">
                    <h4 className="item__info_article">1 </h4>
                    <p className="item__info_exact" />
                </div>
            </div>
        </div>
    );
};

InfoItem.propTypes = {
    itemNameClass: PropTypes.string.isRequired,
};

export default InfoItem;
