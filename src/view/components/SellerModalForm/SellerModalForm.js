// @flow

import React from 'react';
import './sellerModalForm.scss';

const SellerModalForm = () => (
    <form action="" className="seller-items__modal_form">
        <input className=" seller-modal__item" type="text" placeholder="Name" />
        <input className=" seller-modal__item" type="text" placeholder="Price" />
        <input className=" seller-modal__item" type="text" placeholder="Category" />
        <input className=" seller-modal__item" type="text" placeholder="Type" />
        <input className=" seller-modal__item" type="text" placeholder="Count" />
        <input className=" seller-modal__item" type="text" placeholder="Size" />
        <input className=" seller-modal__item" type="text" placeholder="Style" />
        <input className=" seller-modal__item" type="text" placeholder="Colour" />
    </form>
);

export default SellerModalForm;
