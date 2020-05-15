// @flow
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';
import iconsCollection from './icons/index';
import './navigation.scss';

const Navigation = () => (
    <Navbar className="header d-flex d-flex justify-content-between">
        <div className="header__logo">
            <div className="header__logo_item">
                <Link to="">
                    <img className="header__logo_img" src={iconsCollection.base} alt="logo" />
                    <span className="logo_item-text">Cepheus</span>
                </Link>
            </div>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2 header__input" />
            </Form>
        </div>
        <Nav id="header__nav">
            <Nav.Link href="/" className="header__nav_items">
                Home
            </Nav.Link>
            <Nav.Link href="#features" className="header__nav_items">
                Market
            </Nav.Link>
            <Nav.Link href="#pricing" className="header__nav_items">
                Help
            </Nav.Link>
            <Nav.Link href="/wish-list" className="header__nav_items">
                <img className="wishlist" src={iconsCollection.heart} alt="" />
            </Nav.Link>
            <Nav.Link href="/cart">
                <img className="header__nav_icons" src={iconsCollection.cart} alt="" />
            </Nav.Link>
            <Nav.Link href="#profile">
                <img className="header__nav_icons" src={iconsCollection.user} alt="" />
            </Nav.Link>
        </Nav>
    </Navbar>
);

export default Navigation;
