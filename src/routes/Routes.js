// @flow
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import routePaths from './routePaths';
import * as Pages from '../view/pages';

const Routes = () => (
    <main className="content__container">
        <Switch>
            <Route exact path={routePaths.homePage()} component={Pages.HomePage} />
            <Route path={routePaths.wishListPage()} component={Pages.WishListPage} />
            <Route path={routePaths.cartPage()} component={Pages.CartPage} />
            <Route path={routePaths.profilePage()} component={Pages.ProfilePage} />
            <Route path={routePaths.bagsPage()} component={Pages.BagsAndCases} />
        </Switch>
    </main>
);

export default withRouter(Routes);
