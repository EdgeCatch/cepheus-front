import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import setSellItemInfo from '../../store/actions/sellModalForm';
import SellerModalForm from '../components/SellerModalForm/SellerModalForm';

const mapStateToProps = state => ({
    sellItemInfoList: state.sellItemInfoList.sellItemInfoList,
});

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(setSellItemInfo, dispatch),
});

SellerModalForm = connect(mapStateToProps, mapDispatchToProps)(SellerModalForm);

export default reduxForm({
    form: 'sellModal',
    destroyOnUnmount: false,
})(SellerModalForm);
