/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'react-router-dom';

const BuyerNav = () => (
    <div className="buyer-component">
        <Link to="/buyer">Buyer</Link>
        <Link to="/test">Orders</Link>
        <Link to="/test">Refund Requests</Link>
    </div>
);

export default BuyerNav;
