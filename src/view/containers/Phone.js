import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Phones from '../pages/Phones';
import * as bagsActions from '../../store/actions/bags';
import * as marketActions from '../../store/actions/market';

const mapStateToProps = ({ bags, cart, market }) => ({
  bags: market.items.filter(item => item.value.category === 'phone'),
  isReady: bags.isReady,
  market
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators([bagsActions, marketActions], dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Phones));
