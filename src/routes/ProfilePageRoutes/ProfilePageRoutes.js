// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routePaths from './profileRoutePaths';
import * as Components from './profileComponents';

const ProfilePageRoutes = () => (
    <Switch>
        <Route path={routePaths.buyerSetup()} component={Components.SellerSetup} />
        <Route path={routePaths.profileOrderItems()} component={Components.OrderTestItem} />
        <Route path={routePaths.profileRefundRequest()} component={Components.refundItem} />
        <Route path={routePaths.sellerItems()} component={Components.sellerItems} />
        <Route path={routePaths.TestItem()} component={Components.TestItem} />
        <Route path={routePaths.buyerSetupRegistered()} component={Components.registeredAccount} />
    </Switch>
);

export default ProfilePageRoutes;
