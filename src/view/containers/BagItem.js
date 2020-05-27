// @flow

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import BagItem from '../components/BagItem';
import * as cartActions from '../../store/actions/cart';

const mapStateToProps = ({ cart }, { id }) => ({
    addedCount: cart.items.reduce((count, bag) => count + (bag.id === id ? 1 : 0), 0),
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(cartActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BagItem));
