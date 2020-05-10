// @flow
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import './footer.scss';

const Footer = () => {
    return (
        <Navbar className="footer">
            <Container className=" d-flex justify-content-around">
                <Col>1 of 2</Col>
                <Col>2 of 2</Col>
                <Col>2 of 2</Col>
            </Container>
        </Navbar>
    );
};

export default Footer;
