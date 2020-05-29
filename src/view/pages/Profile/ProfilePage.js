import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ProfilePageRoutes from '../../../routes/ProfilePageRoutes/ProfilePageRoutes';
import ProfileNavbar from '../../components/ProfileNavbar';
import './profilePage.scss';

class ProfilePage extends React.Component {
    state = {
        // eslint-disable-next-line react/no-unused-state
    };

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
