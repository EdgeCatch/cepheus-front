import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import BagsAndCases from '../pages/BagsAndCases';
import * as bagsActions from '../../store/actions/bags';

const mapStateToProps = ({ bags, cart }) => ({
    bags: bags.items,
    isReady: bags.isReady,
    totalPrice: cart.items.reduce((total, book) => total + book.price, 0),
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(bagsActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BagsAndCases));
