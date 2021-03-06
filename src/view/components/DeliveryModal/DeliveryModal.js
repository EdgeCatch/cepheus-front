// @flow

import React from 'react';
import './deliveryModal.scss';

const DeliveryModal = () => (
  <form action="" className="delivery-items__modal_form" autocomplete="off">
    <div className="delivery__modal__form_block">
      <p>Receiver: Katerina Litiuch </p>
      <p>Phone number: +0974574491</p>
      <p>Nova Pashta Office: Kyiv, office №53</p>
    </div>
    <input
      className="delivery-modal__form_input"
      type="text"
      placeholder="Tracking Number"
    />
  </form>
);

export default DeliveryModal;
