import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ProfilePageRoutes from '../../../routes/ProfilePageRoutes/ProfilePageRoutes';
import ProfileNavbar from '../../components/ProfileNavbar/ProfileNavbar';
import { Market } from '../../../contracts/market/index';
import { setup } from '../../../contracts/account/setup';
import store from '../../../store/index';

import './profilePage.scss';

class ProfilePage extends React.Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
  };
  async componentDidMount() {
    let Tezos = await setup();
    let market = await Market.init(Tezos);
    let initialStorage = await market.getFullStorage({
      subscriptions: ['0', '1', '2']
    });
    store.dispatch({
      type: 'SET_SUBSCRIPTIONS',
      subscriptions: initialStorage.subscriptionsExtended
    });
  }

  render() {
    const hs = createBrowserHistory();

    return (
      <Router history={hs}>
        <div className="cart-page__wrapper">
          <ProfileNavbar />
          <div className="profile__main_column">
            <Route render={ProfilePageRoutes} />
          </div>
        </div>
      </Router>
    );
  }
}

export default ProfilePage;
