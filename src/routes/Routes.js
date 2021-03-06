// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routePaths from './ProfilePageRoutes/routePaths';
import * as Pages from '../view/pages';

const Routes = () => (
  <main className="content__container">
    <Switch>
      <Route exact path={routePaths.homePage()} component={Pages.HomePage} />
      <Route path={routePaths.wishListPage()} component={Pages.WishListPage} />
      <Route path={routePaths.cartPage()} component={Pages.CartPage} />
      <Route path={routePaths.profilePage()} component={Pages.ProfilePage} />
      <Route path={routePaths.bagsPage()} component={Pages.BagsAndCases} />
      <Route path={'/parfumes'} component={Pages.Parfumes} />
      <Route path={'/phone'} component={Pages.Phone} />
      <Route path={'/ties'} component={Pages.Ties} />
      <Route path={'/alchol'} component={Pages.Alchol} />
      <Route path={'/cigarettes'} component={Pages.Cigarettes} />
    </Switch>
  </main>
);

export default Routes;
