// @flow
import React from 'react';
import BagItem from '../../containers/BagItem';
import bagItems from './bagItems';
import Filter from '../../components/Filter';
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

        setBags(bagItems);
    }

    render() {
        const { isReady } = this.props;

        return (
            <div className="bag-page">
                <Filter />
                <div id="catalog-products">
                    {!isReady ? 'Downloading...' : bagItems.map(bag => <BagItem key={bag.id} {...bag} />)}
                </div>
            </div>
        );
    }
}

export default BagsAndCases;
