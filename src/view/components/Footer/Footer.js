// @flow
import React from 'react';
import { Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './footer.scss';

const Footer = () => {
    return (
        <Container className="d-flex justify-content-between">
            <Col className="d-flex flex-column">
                <Link> Learn more</Link>
                <Link>About Us </Link>
                <Link>About TON</Link>
                <Link>Terms And</Link>
                <Link>Conditions</Link>
                <Link>FAQ</Link>
            </Col>
            <Col className="d-flex flex-column">
                <Link>Help</Link>
                <Link>Subscriptions </Link>
                <Link>Delivery</Link>
                <Link>Withdraw And</Link>
                <Link>Refund</Link>
            </Col>
            <Col className="d-flex flex-column">
                <Link>Contact us </Link>
                <Link>Telegram</Link>
                <Link>Instagram</Link>
                <Link>Facebook</Link>
                <Link>Twitter</Link>
            </Col>
        </Container>
    );
};

export default Footer;
