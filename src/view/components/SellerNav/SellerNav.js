import React from 'react';
import { NavLink } from 'react-router-dom';

const SellerNav = () => (
    <div className="seller-component">
        {/* <NavLink to="/seller" className="profile-nav" activeClassName="profile-nav-active">
            Seller
        </NavLink> */}
        <NavLink to="/seller-order" className="profile-nav" activeClassName="profile-nav-active">
            Orders
        </NavLink>
        <NavLink to="/seller-items" className="profile-nav" activeClassName="profile-nav-active">
            Items
        </NavLink>
        <NavLink to="/seller-refund" className="profile-nav" activeClassName="profile-nav-active">
            Refund Requests
        </NavLink>
    </div>
);

export default SellerNav;
