import React from 'react';
import { Route, HashRouter as Router } from 'react-router-dom';
import ProfilePageRoutes from '../../../routes/ProfilePageRoutes/ProfilePageRoutes';
import ProfileNavbar from '../../components/ProfileNavbar/ProfileNavbar';
import './profilePage.scss';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // isRegistered: false,
            // isBuyer: false,
        };
    }

    render() {
        return (
            <Router>
                <div className="cart-page__wrapper">
                    <ProfileNavbar />
                    <div className="profile__main_column">
                        <div className="profile__main_column-inher">
                            <Route render={ProfilePageRoutes} />
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default ProfilePage;
