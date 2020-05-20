// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import withStyles from 'react-jss';
import { Routes } from '../../routes';
import './appRoot.scss';
import Divider from './Divider/Divider';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const AppRoot = () => {
    return (
        <div id="wrapper">
            <Header />
            <Route component={Routes} />
            <Divider />
            <Footer />
        </div>
    );
};

export default withStyles({ padding: 0, margin: 0 })(AppRoot);
