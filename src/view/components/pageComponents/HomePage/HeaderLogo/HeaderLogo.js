import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import iconsCollection from './icons/index';

const HeaderLogo = () => (
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
);

export default HeaderLogo;
