// @flow
import * as React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import HeaderLogo from '../HeaderLogo';
import iconsCollection from './icons/index';
import store from '../../../store/index';
import './navigation.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as cartActions from '../../../store/actions/cart';

function Navigation({ items, ...props }) {
  const [isLogin, setIsLogin] = React.useState(false);
  React.useEffect(() => {
    const account = localStorage.getItem('account');
    setIsLogin(!!account);
  }, [isLogin]);

  async function handleLogout() {
    localStorage.removeItem('account');
    localStorage.removeItem('pkh');
    setIsLogin(false);
  }
  return (
    <Navbar className="header d-flex d-flex justify-content-between">
      <HeaderLogo />
      <Nav id="header__nav">
        <Link to="/" className="header__nav_items">
          Home
        </Link>
        <Link to="#features" className="header__nav_items">
          Market
        </Link>
        <Link to="#pricing" className="header__nav_items">
          Help
        </Link>
        <Link to="/wish-list" className="header__nav_items">
          <img className="wishlist" src={iconsCollection.heart} alt="" />
        </Link>
        <Link to="/cart">
          <div style={{ position: 'relative' }}>
            {!!items.length && (
              <div
                style={{
                  background: 'rgb(84, 88, 247)',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  right: '-5px',
                  top: '-5px'
                }}
              >
                {items.length}
              </div>
            )}

            <img
              className="header__nav_icons"
              src={iconsCollection.cart}
              alt=""
            />
          </div>
        </Link>
        <Link to="/profile">
          <img
            className="header__nav_icons"
            src={iconsCollection.user}
            alt=""
          />
        </Link>
        {isLogin && (
          <Link to="/" onClick={() => handleLogout()}>
            <img
              className="header__nav_icons"
              src={iconsCollection.logout}
              alt=""
            />
          </Link>
        )}
      </Nav>
    </Navbar>
  );
}

const mapStateToProps = ({ cart }) => ({
  totalPrice: cart.items.reduce((total, book) => total + book.price, 0),
  cartItemsCount: cart.items.length,
  items: cart.items
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(cartActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
