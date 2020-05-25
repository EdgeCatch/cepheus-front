/* eslint-disable no-unused-vars */
import React from 'react';
import Container from 'react-bootstrap/Container';
import CardDeck from 'react-bootstrap/CardDeck';
import axios from 'axios';
import BagItem from '../../components/BagItem';
import './bagsAndCases.scss';

class BagsAndCases extends React.Component {
    componentDidMount() {
        // eslint-disable-next-line react/prop-types
        const { bags, setBags } = this.props;

        axios.get('/bags.json').then(({ data }) => {
            setBags(data);
        });
    }

    render() {
        const { bags, isReady } = this.props;

        return (
            <div id="bag-page" className="cart-page__wrapper">
                <CardDeck id="card-items">
                    {!isReady ? 'Downloading...' : bags.map((bag, i) => <BagItem key={i} {...bag} />)}
                </CardDeck>
            </div>
        );
    }
}

export default BagsAndCases;
