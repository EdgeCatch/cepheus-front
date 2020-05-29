import React from 'react';
import PropTypes from 'prop-types';
import './homeImgBlock.scss';
import { Link } from 'react-router-dom';

const HomeImgBlock = ({ imgElement, text, link }) => (
    <div className="home-page__block_item">
        <Link to={link}>
            <img className="block_item-img" src={imgElement} alt={text} />
            <h4>
                <span>{text}</span>
            </h4>
        </Link>
    </div>
);

HomeImgBlock.propTypes = {
    imgElement: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};

export default HomeImgBlock;
