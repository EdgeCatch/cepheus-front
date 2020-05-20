import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './icon.scss';

const Icon = ({ name, className, size, onClick, disabled }) => {
    const classes = classNames('fa', `fa-${name}`, { func: onClick }, { disabled }, className);

    const elemSize = size ? { fontSize: `${size}rem` } : null;

    return <i className={classes} onClick={disabled ? null : onClick} style={elemSize} />;
};

Icon.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.number,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};

Icon.defaultProps = {
    name: '',
    className: '',
    size: null,
    onClick: null,
    disabled: false,
};

export default Icon;
