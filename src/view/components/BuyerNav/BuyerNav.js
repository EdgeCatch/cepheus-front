import React from 'react';
import { NavLink } from 'react-router-dom';
import './buyerNav.scss';

const BuyerNav = () => {
  const [isLogin, setIsLogin] = React.useState(false);
  React.useEffect(() => {
    const account = localStorage.getItem('account');
    setIsLogin(!!account);
  });
  return isLogin ? (
    <div className="buyer-component">
      <NavLink
        to="/"
        className="profile-nav"
        activeClassName="profile-nav-active"
      >
        Account
      </NavLink>
      <NavLink
        to="/order"
        className="profile-nav"
        activeClassName="profile-nav-active"
      >
        Orders
      </NavLink>
      <NavLink
        to="/refund"
        className="profile-nav"
        activeClassName="profile-nav-active"
      >
        Refund Requests
      </NavLink>
    </div>
  ) : (
    <React.Fragment></React.Fragment>
  );
};
export default BuyerNav;
