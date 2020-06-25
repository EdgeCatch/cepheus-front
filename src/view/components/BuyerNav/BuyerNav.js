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
      <NavLink to="/" className="profile-nav" activeClassName="profile-nav-active">
        Account
      </NavLink>
      <NavLink to="/order" className="profile-nav" activeClassName="profile-nav-active">
        My Orders
      </NavLink>
      <NavLink to="/refund" className="profile-nav" activeClassName="profile-nav-active">
        My Refund Requests
      </NavLink>
    </div>
  ) : (
    <></>
  );
};

export default BuyerNav;
