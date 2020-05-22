/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'react-router-dom';

const SellerNav = () => (
    <div className="seller-component">
        <Link to="/seller">Seller</Link>
        <Link to="/buyer">Buyer</Link>
        <Link to="/buyer">Items</Link>
        <Link to="/buyer">Refund Requests</Link>
    </div>
);

export default SellerNav;
