import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CartPage from '../pages/Cart/CartPage';
import * as cartActions from '../../store/actions/cart';

const mapStateToProps = ({ cart }) => ({
    totalPrice: cart.items.reduce((total, book) => total + book.price, 0),
    cartItemsCount: cart.items.length,
    items: cart.items,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(cartActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
