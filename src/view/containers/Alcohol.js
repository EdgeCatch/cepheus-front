import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Alcohol from '../pages/AlcoPage';
import * as bagsActions from '../../store/actions/bags';
import * as marketActions from '../../store/actions/market';

const mapStateToProps = ({ bags, cart, market }) => ({
  bags: market.items.filter(item => item.value.category === 'alchol'),
  isReady: bags.isReady,
  market
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators([bagsActions, marketActions], dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Alcohol)
);
