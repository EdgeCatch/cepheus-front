// @flow
import React, { Suspense } from 'react';
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
            <Suspense fallback={<div>Завантаження...</div>}>
                <Route component={Routes} />
                <Divider />
            </Suspense>
            <Footer />
        </div>
    );
};

export default withStyles({ padding: 0, margin: 0 })(AppRoot);
