// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routePaths from './profileRoutePaths';
import * as Components from './profileComponents';

const ProfilePageRoutes = () => (
    <Switch>
        <Route path={routePaths.accountSetup()} component={Components.AccountSetup} />
        <Route path={routePaths.profileOrderItems()} component={Components.OrderTestItem} />
        <Route path={routePaths.buyerRefundRequest()} component={Components.RefundItem} />
        <Route path={routePaths.sellerItems()} component={Components.SellerItems} />
        <Route path={routePaths.TestItem()} component={Components.TestItem} />
        <Route path={routePaths.buyerSetupRegistered()} component={Components.RegisteredAccount} />
        <Route path={routePaths.sellerRefundRequest()} component={Components.RefundPage} />
        <Route path={routePaths.orderSellerItem()} component={Components.OrderSellerItem} />
    </Switch>
);

export default ProfilePageRoutes;
