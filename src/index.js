// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
// $FlowFixMe
import { createBrowserHistory } from 'history';
import { AppRoot, ErrorBoundary } from './view/components';
import './style.css';
// eslint-disable-next-line import/prefer-default-export
export const history = createBrowserHistory();

const getRootElement = (): HTMLElement => (document.getElementById('root'): any);

const rootElement: HTMLElement = getRootElement();

const renderApp = Component => {
    // $FlowFixMe
    ReactDOM.render(Component, rootElement);
};

renderApp(
    <ErrorBoundary>
        <Router history={history}>
            <AppRoot />
        </Router>
    </ErrorBoundary>,
);
