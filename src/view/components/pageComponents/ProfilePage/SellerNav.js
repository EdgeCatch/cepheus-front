/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'react-router-dom';

const SellerNav = () => (
    <div className="seller-component">
        <Link to="/profile/buyer">Seller</Link>
        <Link to="/profile/buyer">Buyer</Link>
        <Link to="/profile/buyer">Items</Link>
        <Link to="/profile/buyer">Refund Requests</Link>
    </div>
);

export default SellerNav;
