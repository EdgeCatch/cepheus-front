// @flow
import React from 'react';
import axios from 'axios';
import BagItem from '../../containers/BagItem';
import './bagsAndCases.scss';

type Props = {
    setBags: (data: Object) => void,
    isReady: boolean,
    bags: Array<Object>,
    totalPrice: string,
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
                <div id="card-items">
                    {!isReady ? 'Downloading...' : bags.map(bag => <BagItem key={bag.id} {...bag} />)}
                </div>
            </div>
        );
    }
}

export default BagsAndCases;
