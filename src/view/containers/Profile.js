import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import ProfilePage from '../pages/Profile';
import * as marketActions from '../../store/actions/market';

const mapStateToProps = () => ({ subscriptions: {} });

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(marketActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));
