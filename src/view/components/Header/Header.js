// @flow
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import heart from './icons/heart.svg';
import cart from './icons/cart.svg';
import user from './icons/user.svg';
import base from './icons/base.svg';

import './header.scss';

const Header = () => {
    return (
        <Navbar className="header d-flex d-flex justify-content-around">
            <div className="header__logo">
                <div className="header__logo_item">
                    <img className="header__logo_img" src={base} alt="logo" />
                    <span className="logo_item-text">Cepheus</span>
                </div>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2 header__input" />
                </Form>
            </div>
            <Nav id="header__nav">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Market</Nav.Link>
                <Nav.Link href="#pricing">Help</Nav.Link>
                <Nav.Link href="#pricing">
                    <img className="header__nav_icons" src={heart} alt="" />
                </Nav.Link>
                <Nav.Link href="#pricing">
                    {' '}
                    <img className="header__nav_icons" src={cart} alt="" />
                </Nav.Link>
                <Nav.Link href="#pricing">
                    {' '}
                    <img className="header__nav_icons" src={user} alt="" />
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default Header;
