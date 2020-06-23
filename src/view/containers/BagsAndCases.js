import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import BagsAndCases from '../pages/BagsAndCases';
import * as bagsActions from '../../store/actions/bags';
import * as marketActions from '../../store/actions/market';

const mapStateToProps = ({ bags, cart, market }) => ({
    bags: market.items,
    isReady: bags.isReady,
    market,
    totalPrice: cart.items.reduce((total, item) => total + item.price, 0),
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators([bagsActions, marketActions], dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BagsAndCases));
