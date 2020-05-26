// @flow
import React from 'react';
import CardDeck from 'react-bootstrap/esm/CardDeck';
import axios from 'axios';
import _ from 'lodash';
import BagItem from '../../components/BagItem';
import './bagsAndCases.scss';

type Props = {
    setBags: (data: Object) => void,
    isReady: boolean,
    bags: Array<Object>,
};

class BagsAndCases extends React.Component<Props> {
    componentDidMount() {
        const { setBags } = this.props;

        axios.get('/bags.json').then(({ data }): Object => {
            setBags(data);
        });
    }

    render() {
        const { bags, isReady } = this.props;

        return (
            <div id="bag-page" className="cart-page__wrapper">
                <CardDeck id="card-items">
                    {!isReady ? 'Downloading...' : bags.map((id: string = _.uniqueId()) => <BagItem key={id} />)}
                </CardDeck>
            </div>
        );
    }
}

export default BagsAndCases;
