// @flow
import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import routePaths from './homeRoutePaths';
import * as Components from './homeComponents';

function ProfilePageRoutes() {
  const account = JSON.parse(localStorage.getItem('account')) || {};

  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <Switch>
        <Route path={routePaths.cigarettes()} component={Components.Cigarettes} />
      </Switch>
    </Suspense>
  );
}

export default ProfilePageRoutes;
