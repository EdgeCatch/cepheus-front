// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import withStyles from 'react-jss';
import { Routes } from '../../routes';
import Divider from './Divider';
import Header from './Header';
import Footer from './Footer';
import './appRoot.scss';

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
