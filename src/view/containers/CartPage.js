import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import CartPage from '../pages/Cart/CartPage';
import * as bagsActions from '../../store/actions/bags';

const mapStateToProps = ({ cart }) => ({
    totalPrice: cart.items.reduce((total, book) => total + book.price, 0),
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(bagsActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartPage));
