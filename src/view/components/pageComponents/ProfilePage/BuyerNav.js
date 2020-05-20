/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'react-router-dom';

const BuyerNav = () => (
    <div className="buyer-component">
        <Link to="/profile/buyer">Buyer</Link>
        <Link to="/profile/test">Orders</Link>
        <Link to="/profile/test">Refund Requests</Link>
    </div>
);

export default BuyerNav;
