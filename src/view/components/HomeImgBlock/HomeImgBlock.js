import React from 'react';
import PropTypes from 'prop-types';
import './homeImgBlock.scss';

const HomeImgBlock = ({ imgElement, text }) => (
    <div className="homePage__block_item">
        <img className="block_item-img" src={imgElement} alt={text} />
        <h4>
            <span>{text}</span>
        </h4>
    </div>
);

HomeImgBlock.propTypes = {
    imgElement: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default HomeImgBlock;
