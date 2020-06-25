// @flow
import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routePaths from './profileRoutePaths';
import * as Components from './profileComponents';

function ProfilePageRoutes() {
  const account = JSON.parse(localStorage.getItem('account')) || {};

  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <Switch>
        {Object.keys(account).length ? (
          <React.Fragment>
            <Route
              path={routePaths.profileOrderItems()}
              component={Components.OrderTestItem}
            />
            {/* <Route
              path={routePaths.buyerRefundRequest()}
              component={Components.RefundItem}
            /> */}
            <Route
              path={routePaths.sellerItems()}
              component={Components.SellerItems}
            />
            <Route
              path={routePaths.sellerRefundRequest()}
              component={Components.RefundPage}
            />
            <Route
              path={routePaths.orderSellerItem()}
              component={Components.OrderSellerItem}
            />
            <Route
              path={routePaths.TestItem()}
              component={Components.TestItem}
            />
            <Route
              path={routePaths.buyerSetupRegistered()}
              exact
              component={Components.RegisteredAccount}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Redirect to={routePaths.accountSetup()} />
            <Route
              path={routePaths.accountSetup()}
              exact
              component={Components.AccountSetup}
            />
          </React.Fragment>
        )}
      </Switch>
    </Suspense>
  );
}

export default ProfilePageRoutes;
