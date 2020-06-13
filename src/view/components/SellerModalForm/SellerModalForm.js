// @flow

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import setSellItemInfo from '../../../store/actions/sellModalForm';
import './sellerModalForm.scss';

let SellerModalForm = props => {
    const [state, setState] = React.useState({
        name: '',
        price: '',
        count: '',
        size: '',
        style: '',
        color: '',
        category: '',
        type: '',
    });

    function handleChange(evt) {
        const { value, name } = evt.target;

        setState({
            [name]: value,
        });
        setSellItemInfo(state.target);
    }
    console.log(props.sellItemInfoList);

    return (
        <form className="seller-items__modal_form" onSubmit={props.handleSubmit}>
            <Field
                className=" seller-modal__item"
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                placeholder="Name"
                component="input"
            />
            <Field
                className=" seller-modal__item"
                type="text"
                value={state.price}
                onChange={handleChange}
                component="input"
                name="price"
                placeholder="Price"
            />
            <Field
                className=" seller-modal__item"
                type="text"
                name="category"
                value={state.category}
                placeholder="Category"
                component="input"
            />
            <Field
                className=" seller-modal__item"
                type="text"
                name="category"
                value={state.type}
                placeholder="Type"
                component="input"
            />
            <Field
                className=" seller-modal__item"
                type="text"
                name="count"
                value={state.count}
                onChange={handleChange}
                placeholder="Count"
                component="input"
            />
            <Field
                className=" seller-modal__item"
                type="text"
                value={state.size}
                onChange={handleChange}
                placeholder="Size"
                component="input"
                name="size"
            />
            <Field
                className=" seller-modal__item"
                type="text"
                value={state.style}
                onChange={handleChange}
                placeholder="Style"
                component="input"
                name="style"
            />
            <Field
                className=" seller-modal__item"
                type="text"
                value={state.color}
                onChange={handleChange}
                placeholder="Color"
                component="input"
                name="color"
            />
        </form>
    );
};

// const mapStateToProps = state => ({
//     sellItemInfoList: state.sellItemInfoList,
// });

const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(setSellItemInfo, dispatch),
});

SellerModalForm = connect(null, mapDispatchToProps)(SellerModalForm);

export default reduxForm({
    form: 'sellModal',
    destroyOnUnmount: false,
})(SellerModalForm);
