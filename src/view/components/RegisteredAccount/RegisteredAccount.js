import React from 'react';
import Button from '../Button/Button';
import './registeredAccount.scss';
import { privateKey, publicKey, withdraw, receiver } from '../../constants';

const RegisteredAccount = () => (
    <>
        <div className="seller-setup">
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
                <div className="buyer-setup-buttons">
                    <Button className="buyer-setup-btn purple setup-btn"> Update Plan</Button>
                </div>
            </div>
            <div className="info-buyer__block">
                <h4>Note! </h4>
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
            </div>
        </div>

        <div className="seller-setup">
            <div className="setup-buyer__block">
                <h3>Chose Fee Plan</h3>

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
                    <Button className="buyer-setup-btn purple setup-btn"> Withdraw</Button>
                </div>
            </div>

            <div className="info-buyer__block">
                <h4>Withdraw process</h4>
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
            </div>
        </div>

        <div className="seller-setup">
            <div className="setup-buyer__block">
                <h3>Withdraw Profit</h3>
                <form className="buyer-setup__form">
                    <textarea name="" className={receiver} cols="30" rows="10" placeholder="Receiver Address" />
                    <textarea name="" className={withdraw} cols="1" rows="1" placeholder="Amount" />
                </form>
                <div className="buyer-setup-buttons">
                    <Button className="buyer-setup-btn purple setup-btn"> Use</Button>
                </div>
            </div>
            <div className="info-buyer__block">
                <h4>Note! </h4>
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
            </div>
        </div>
    </>
);

export default RegisteredAccount;
