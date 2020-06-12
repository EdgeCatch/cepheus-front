// @flow
import * as React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeaderLogo from '../HeaderLogo';
import iconsCollection from './icons/index';
import './navigation.scss';

const Navigation = () => (
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
                <img className="header__nav_icons" src={iconsCollection.cart} alt="" />
            </Link>
            <Link to="/profile">
                <img className="header__nav_icons" src={iconsCollection.user} alt="" />
            </Link>
        </Nav>
    </Navbar>
);

export default Navigation;
