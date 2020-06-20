// @flow
import React from 'react';
import { Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './footer.scss';

const Footer = () => {
    return (
        <Container id="footer" className="d-flex justify-content-between">
            <Col className="d-flex flex-column">
                <Link to="#"> Learn more</Link>
                <Link to="#">About Us </Link>
                <Link to="#">About TON</Link>
                <Link to="#">Terms And</Link>
                <Link to="#">Conditions</Link>
                <Link to="#">FAQ</Link>
            </Col>
            <Col className="d-flex flex-column">
                <Link to="#">Help</Link>
                <Link to="#">Subscriptions </Link>
                <Link to="#">Delivery</Link>
                <Link to="#">Withdraw And</Link>
                <Link to="#">Refund</Link>
            </Col>
            <Col className="d-flex flex-column">
                <Link to="#">Contact us </Link>
                <Link to="#">Telegram</Link>
                <Link to="#">Instagram</Link>
                <Link to="#">Facebook</Link>
                <Link to="#">Twitter</Link>
            </Col>
        </Container>
    );
};

export default Footer;
