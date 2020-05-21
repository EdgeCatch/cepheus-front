// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import './cartItem.scss';
import typeof InfoItem from '../../../InfoItem';

const CartItem = ({ remove }) => <InfoItem itemNameClass="cart" onRemove={remove} />;

CartItem.propTypes = {
    remove: PropTypes.func.isRequired,
};

export default CartItem;
