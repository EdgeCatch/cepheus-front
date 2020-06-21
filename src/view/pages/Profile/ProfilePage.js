import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import ProfilePageRoutes from '../../../routes/ProfilePageRoutes/ProfilePageRoutes';
import ProfileNavbar from '../../components/ProfileNavbar/ProfileNavbar';
import { Market } from '../../../contracts/market/index';
import { setup } from '../../../contracts/account/setup';
import store from '../../../store/index';

import './profilePage.scss';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isRegistered: false,
      // isBuyer: false,
    };
  }

  async componentDidMount() {
    const Tezos = await setup();
    const market = await Market.init(Tezos);
    const initialStorage = await market.getFullStorage({
      subscriptions: ['0', '1', '2']
    });

    store.dispatch({
      type: 'SET_SUBSCRIPTIONS',
      subscriptions: initialStorage.subscriptionsExtended
    });
  }

  render() {
    return (
      <Router>
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
