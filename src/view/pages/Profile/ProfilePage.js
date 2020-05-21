import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ProfilePageRoutes from '../../components/pageComponents/ProfilePage/ProfilePageRoutes';
import ProfileNavbar from '../../components/pageComponents/ProfilePage/ProfileNavbar';
import './profilePage.scss';

class ProfilePage extends React.Component {
    state = {
        // eslint-disable-next-line react/no-unused-state
        mockUp: true,
    };

    render() {
        const hs = createBrowserHistory();

        return (
            <Router history={hs}>
                <div className="cart-page__wrapper">
                    <ProfileNavbar />
                    <div className="profile__main_column">
                        <Route component={ProfilePageRoutes} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default ProfilePage;
