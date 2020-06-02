import React from 'react';
import SellerItem from './SellerItem';
import './refundItem.scss';

const sellerItems = () => {
    const arrItems = [];

    arrItems.length = 6;

    return (
        <>
            <>
                <SellerItem itemNameClass="cart" />
                <SellerItem itemNameClass="cart" />
                <SellerItem itemNameClass="cart" />
            </>
            <button>addItem</button>
        </>
    );
};

export default sellerItems;
