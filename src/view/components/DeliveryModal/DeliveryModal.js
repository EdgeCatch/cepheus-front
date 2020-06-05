// @flow

import React from 'react';
import './deliveryModal.scss';

const DeliveryModal = () => (
    <form action="" className="delivery-items__modal_form">
        <div className="delivery__modal__block">
            <p>Receiver: Katerina Litiuch </p>
            <p>Phone number: +0974574491</p>
            <p>Nova Pashta Office: Kyiv, office №53</p>
        </div>
        <input className="modal__item" type="text" placeholder="Tracking Number" />
    </form>
);

export default DeliveryModal;
