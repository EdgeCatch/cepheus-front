import React from 'react';
import PropTypes from 'prop-types';
import './pageHeadLine.scss';

const PageHeadline = ({ headline }) => <h2 className="page__headline">{headline}</h2>;

PageHeadline.propTypes = {
    headline: PropTypes.string.isRequired,
};
export default PageHeadline;
