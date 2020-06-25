import React from 'react';
import { NavLink } from 'react-router-dom';

const SellerNav = () => {
  const [isLogin, setIsLogin] = React.useState(false);
  React.useEffect(() => {
    const account = localStorage.getItem('account');
    setIsLogin(!!account);
  });
  return isLogin ? (
    <div className="seller-component">
      {/* <NavLink to="/seller" className="profile-nav" activeClassName="profile-nav-active">
            Seller
        </NavLink> */}

      <React.Fragment>
        <NavLink
          to="/seller-order"
          className="profile-nav"
          activeClassName="profile-nav-active"
        >
          Orders
        </NavLink>
        <NavLink
          to="/seller-items"
          className="profile-nav"
          activeClassName="profile-nav-active"
        >
          Items
        </NavLink>
        <NavLink
          to="/seller-refund"
          className="profile-nav"
          activeClassName="profile-nav-active"
        >
          Refund Requests
        </NavLink>
      </React.Fragment>
    </div>
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default SellerNav;
