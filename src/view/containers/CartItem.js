import { connect } from 'react-redux';
import CartItem from '../components/CartItem';

const mapStateToProps = ({ cart }, { id }) => ({
    addedCount: cart.items.reduce((count, bag) => count + (bag.id === id ? 1 : 0), 1),
});

export default connect(mapStateToProps)(CartItem);
