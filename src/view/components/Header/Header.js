// @flow
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import './header.scss';

const Header = () => {
    return (
        <Navbar className="header d-flex d-flex justify-content-around">
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2 header__input" />
            </Form>
            <Nav className="">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Market</Nav.Link>
                <Nav.Link href="#pricing">Help</Nav.Link>
                <Nav.Link href="#pricing">WishList</Nav.Link>
                <Nav.Link href="#pricing">CartLogo</Nav.Link>
                <Nav.Link href="#pricing">ProfileLogo</Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default Header;
