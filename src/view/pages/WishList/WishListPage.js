import React from 'react';
import Container from 'react-bootstrap/Container';

import './WishListPage.scss';

// eslint-disable-next-line react/prefer-stateless-function
class WishListPage extends React.Component {
    render() {
        return (
            <Container className="WishListPage">
                <h2>wishes</h2>
            </Container>
        );
    }
}
export default WishListPage;
