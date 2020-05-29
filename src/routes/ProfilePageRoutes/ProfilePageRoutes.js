// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routePaths from './profileRoutes/profileRoutePaths';
import * as Components from './profileRoutes';

const ProfilePageRoutes = () => (
    <Switch>
        <Route path={routePaths.buyerSetup()} component={Components.BuyerSetup} />
        <Route path={routePaths.sellerSetup()} component={Components.SellerSetup} />
        <Route path={routePaths.TestItem()} component={Components.TestItem} />
        <Route path={routePaths.TestItem()} component={Components.TestItem} />
        <Route path={routePaths.TestItem()} component={Components.TestItem} />
        <Route path={routePaths.TestItem()} component={Components.TestItem} />
    </Switch>
);

export default ProfilePageRoutes;
