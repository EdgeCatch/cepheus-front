import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFormValues } from 'redux-form';
import * as sellItems from '../../store/actions/sellItems';
import SellerItems from '../components/SellerItems/SellerItems';

const mapStateToProps = state => ({
  sellItemsList: state.sellItems.sellItemsList,
  ItemManagerClient: state.ipfs.ItemManagerClient
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(sellItems, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SellerItems);
