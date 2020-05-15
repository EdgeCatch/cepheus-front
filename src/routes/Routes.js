// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routePaths from './routePaths';
import * as Pages from '../view/pages';

const Routes = () => (
    <main className="content__container">
        <Switch>
            <Route exact path={routePaths.homePage()} component={Pages.HomePage} />
            <Route exact path={routePaths.wishListPage()} component={Pages.WishListPage} />
            <Route exact path={routePaths.cartPage()} component={Pages.CartPage} />
            <Route exact path={routePaths.profilePage()} component={Pages.ProfilePage} />
            <Route exact path={routePaths.bagsPage()} component={Pages.BagsAndCases} />
        </Switch>
    </main>
);

export default Routes;
