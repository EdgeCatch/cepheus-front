import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BagsAndCases from '../pages/BagsAndCases';
import * as bagsActions from '../../store/actions/bags';

const mapStateToProps = ({ bags }) => ({
    bags: bags.items,
    isReady: bags.isReady,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(bagsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BagsAndCases);
