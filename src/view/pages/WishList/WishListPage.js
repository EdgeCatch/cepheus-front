import React from 'react';
import Container from 'react-bootstrap/Container';
import PageHeadline from '../../components/PageHeadline/PageHeadline';
import './WishListPage.scss';

// eslint-disable-next-line react/prefer-stateless-function
class WishListPage extends React.Component {
    render() {
        return (
            <Container className="WishListPage">
                <PageHeadline headline="Wish List" />
            </Container>
        );
    }
}
export default WishListPage;
