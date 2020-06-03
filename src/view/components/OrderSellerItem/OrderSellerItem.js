import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import SellerModalForm from '../SellerModalForm';
import './orderSellerItem.scss';

const orderEnchancer = require('./arrowEnhancer.png');

const OrderSellerItem = () => {
    const [resolveOrder, setResolverOrder] = useState(false);

    let [isModalDeliverOpen, setIsModalDeliverOpen] = useState(false);

    // const openPurchaseModal = () => {
    //     isModalDeliverOpen = true;
    // };
    const handleSubmit = () => {
        isModalDeliverOpen = false;
    };
    const handleCancel = () => {
        isModalDeliverOpen = false;
    };

    const OrderButtons = () => {
        return resolveOrder ? (
            <div className="resolve-buttons">
                {/* temporary button feature to change a state of bool */}
                <button type="submit" className="purple" onClick={() => setResolverOrder(!resolveOrder)}>
                    Delivery Info
                </button>
                <button type="submit" className="dark">
                    Request Refund
                </button>
            </div>
        ) : (
            <img
                className="order-detail__enhancer"
                src={orderEnchancer}
                alt=""
                onClick={() => {
                    setResolverOrder(!resolveOrder);
                }}
            />
        );
    };

    return (
        <div className="order-list_item">
            <div className="test-item__info">
                <div className="test-info-elements">
                    <h4 className="item__info_article">Order </h4>
                    <p className="item__info_exact">$109</p>
                </div>
                <div className="test-info-elements">
                    <h4 className="item__info_article">Date</h4>
                    <p className="item__info_exact">$109</p>
                </div>
                <div className="test-info-elements">
                    <h4 className="item__info_article">Status </h4>
                    <p className="item__info_exact">$109</p>
                </div>
                <div className="test-info-elements">
                    <h4 className="item__info_article">Tracking number </h4>
                    <p className="item__info_exact">$109</p>
                </div>

                <OrderButtons />
            </div>

            <Modal
                title="Your Delivery Details"
                onCancel={() => handleCancel()}
                onSubmit={() => handleSubmit()}
                isOpen={isModalDeliverOpen}
                buttonText="Add Item"
            >
                <SellerModalForm />
            </Modal>
        </div>
    );
};

export default OrderSellerItem;
