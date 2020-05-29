/* eslint-disable import/no-unresolved */
import React from 'react';
import { NavLink } from 'react-router-dom';
import './buyerNav.scss';

const BuyerNav = () => (
    <div className="buyer-component">
        <NavLink to="/buyer" className="profile-nav" activeClassName="profile-nav-active">
            Buyer
        </NavLink>
        <NavLink to="/order" className="profile-nav" activeClassName="profile-nav-active">
            Orders
        </NavLink>
        <NavLink to="/test" className="profile-nav" activeClassName="profile-nav-active">
            Refund Requests
        </NavLink>
    </div>
);

export default BuyerNav;
