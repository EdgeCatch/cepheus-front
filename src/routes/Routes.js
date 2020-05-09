// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routePaths from './routePaths';
import * as Pages from '../view/pages';

const Routes = () => (
    <Switch>
        <Route exact path={routePaths.homePage()} component={Pages.HomePage} />
    </Switch>
);

export default Routes;
