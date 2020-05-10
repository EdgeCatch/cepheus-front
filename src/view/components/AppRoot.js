// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import withStyles from 'react-jss';
import { Routes } from '../../routes';
import './AppRoot.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const AppRoot = () => {
    return (
        <div>
            <Header />
            <Route component={Routes} />
            <Footer />
        </div>
    );
};

export default withStyles({ padding: 0, margin: 0 })(AppRoot);
