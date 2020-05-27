// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import store from './store/index';
import { AppRoot, ErrorBoundary } from './view/components';
import './view/styles/index.scss';
import { saveState } from './localStorage';

/* eslint-disable import/prefer-default-export */
export const history = createBrowserHistory();

const getRootElement = (): HTMLElement => (document.getElementById('root'): any);

const rootElement: HTMLElement = getRootElement();

const renderApp = Component => {
    // $FlowFixMe
    ReactDOM.render(Component, rootElement);
};

store.subscribe(() => {
    saveState(store.getState());
});

renderApp(
    <ErrorBoundary>
        <Provider store={store}>
            <Router history={history}>
                <AppRoot />
            </Router>
        </Provider>
    </ErrorBoundary>,
);
