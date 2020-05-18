import React from 'react';
import PropTypes from 'prop-types';
import './cartItem.scss';
import InfoItem from '../../../InfoItem/InfoItem';

const CartItem = ({ remove }) => <InfoItem itemNameClass="cart" onRemove={remove} />;

CartItem.propTypes = {
    remove: PropTypes.func.isRequired,
};

export default CartItem;
