// @flow
import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import routePaths from './profileRoutePaths';
import * as Components from './profileComponents';

function ProfilePageRoutes() {
  const account = JSON.parse(localStorage.getItem('account')) || {};

  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <Switch>
        <Route
          path={routePaths.profileOrderItems()}
          component={Components.OrderTestItem}
        />
        <Route
          path={routePaths.buyerRefundRequest()}
          component={Components.RefundItem}
        />
        <Route
          path={routePaths.sellerItems()}
          component={Components.SellerItems}
        />
        <Route path={routePaths.TestItem()} component={Components.TestItem} />
        {Object.keys(account).length ? (
          <Route
            path={routePaths.buyerSetupRegistered()}
            component={Components.RegisteredAccount}
          />
        ) : (
          <Route
            path={routePaths.accountSetup()}
            component={Components.AccountSetup}
          />
        )}

        <Route
          path={routePaths.sellerRefundRequest()}
          component={Components.RefundPage}
        />
        <Route
          path={routePaths.orderSellerItem()}
          component={Components.OrderSellerItem}
        />
      </Switch>
    </Suspense>
  );
}

export default ProfilePageRoutes;
