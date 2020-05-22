import React from 'react';
import Button from '../../../../Button';
import './sellerSetup.scss';

const privateKey = 'textarea__item setup-seller__key private-key';
const publicKey = 'textarea__item setup-seller__key public-key';

const SellerSetup = () => (
    <div className="buyer-setup">
        <div className="setup-buyer__block">
            <h3>Setup Your Seller Account</h3>
            <form className="buyer-setup__form">
                <textarea
                    name=""
                    className={publicKey}
                    cols="30"
                    rows="10"
                    placeholder="Generated Seller Private Key"
                />
                <textarea name="" className={privateKey} cols="30" rows="10" placeholder="Your Seller Public Key" />
            </form>
            <div className="sub-plans">
                <div className="subscription sub-free">
                    <span>Free</span>
                    <div className="sub-details">
                        <p>Price: 0% </p>
                        <p>Fee: </p>
                    </div>
                </div>
                <div className="subscription sub-standart">
                    <span>Free</span>
                    <div className="sub-details">
                        <p>Price: 0% </p>
                        <p>Fee: </p>
                    </div>
                </div>
                <div className="subscription sub-premium">
                    <span>Free</span>
                    <div className="sub-details">
                        <p>Price: 0% </p>
                        <p>Fee: </p>
                    </div>
                </div>
            </div>
            <div className="buyer-setup-buttons">
                <Button content="Setup" className="buyer-setup-btn dark ">
                    Random
                </Button>
                <Button className="buyer-setup-btn purple setup-btn"> Setup</Button>
            </div>
        </div>
        <div className="info-buyer__block">
            <h4>You are not registered as a Seller! </h4>
            <div>
                <p>
                    In order to hide your identitity, the traking number of your delivery should be encrypted by the
                    public key you control.
                </p>
                <p>Register with your own or generated and store new keypair.</p>
                <p>
                    <b>Note</b>: If you loose your loose it your won’t be able to track your delivery.
                </p>
            </div>
            <h4>Fees and Subscriptions </h4>
            <div>
                <p>There are two type of fees: base and subscription.</p>
                <p>
                    TON storage isn’t free and is payed on per block basics so the basic fee is needed to store Buyers
                    account in Blockchain for some paid time.
                </p>
                <p>
                    The buyers pays fee of the earned profit. Subscription determines the fee rate and is payed monthly.
                    If it wasn’t rebilled in time the Free plan is set by default.
                </p>
            </div>
        </div>
    </div>
);

export default SellerSetup;
