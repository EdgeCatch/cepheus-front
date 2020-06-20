import * as React from 'react';
import PropTypes from 'prop-types';
import './cartItem.scss';
import InfoItem from '../InfoItem/InfoItem';

const CartItem = ({ remove, count, id }) => (
  <InfoItem itemNameClass="cart" count={count} onRemove={remove} id={id} />
);

CartItem.propTypes = {
  remove: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired
};

export default CartItem;
