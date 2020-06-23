import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Cigarettes from '../pages/Cigarettes';
import * as cartActions from '../../store/actions/cart';

const mapStateToProps = ({ bags, cart, market }) => ({
  bags: market.items,
  isReady: bags.isReady,
  market,
  totalPrice: cart.items.reduce((total, item) => total + item.price, 0),
});

const mapDispatchToProps = dispatch => ({
  // ...bindActionCreators(cartActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cigarettes);
