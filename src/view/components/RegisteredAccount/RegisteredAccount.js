import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '../Button/Button';
import './registeredAccount.scss';
import { privateKey, publicKey, withdraw, receiver } from '../../constants';

function RegisteredAccount() {
    const { handleSubmit, register, setValue, errors, getValues } = useForm();

    React.useEffect(() => {
        const { mnemonic, publicKey } = JSON.parse(localStorage.getItem('account'));

        setValue([
            {
                mnemonic,
            },
            { publicKey },
        ]);
    }, []);

    return (
        <>
            <div className="seller-setup-item ">
                <div className="setup-buyer__block">
                    <h3>Setup Your Account</h3>
                    <form className="buyer-setup__form-registered ">
                        <textarea
                            name="publicKey"
                            className={privateKey}
                            cols="30"
                            rows="10"
                            placeholder="Your Public Key"
                            ref={register({ required: 'Required' })}
                        />
                    </form>
                    <div className="sub-plans">
                        <div className="subscription sub-free sub-selected">
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
                        <Button className="buyer-setup-btn purple setup-btn" onClick={() => alert('Coming soon')}>
                            {' '}
                            Update Plan
                        </Button>
                    </div>
                </div>
                <div className="info-buyer__block">
                    <h4>Note! </h4>
                    <div>
                        <p>
                            In order to hide your identitity, the traking number of your delivery should be encrypted by
                            the public key you control.
                        </p>
                        <p>Register with your own or generated and store new keypair.</p>
                        <p>
                            <b>Note</b>: If you loose your loose it your won’t be able to track your delivery.
                        </p>
                    </div>
                </div>
            </div>

            <div className="seller-setup-item ">
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
                        <Button className="buyer-setup-btn purple setup-btn" onClick={() => alert('Coming soon')}>
                            {' '}
                            Withdraw
                        </Button>
                    </div>
                </div>

                <div className="info-buyer__block">
                    <h4>Withdraw process</h4>
                    <div>
                        <p>
                            Users who receive profit or refund don’t receive amout immediatly but should call separate
                            function.
                        </p>
                        <p>You can send tokens to any address you wish.</p>
                        <p>
                            <b>Note</b>: If you loose your loose it your won’t be able to track your delivery.
                        </p>
                    </div>
                </div>
            </div>

            <div className="seller-setup-item ">
                <div className="setup-buyer__block">
                    <h3>Withdraw Profit</h3>
                    <form className="buyer-setup__form">
                        <textarea name="" className={receiver} cols="30" rows="10" placeholder="Receiver Address" />
                        <textarea name="" className={withdraw} cols="1" rows="1" placeholder="Amount" />
                    </form>
                    <div className="buyer-setup-buttons">
                        <Button className="buyer-setup-btn purple setup-btn" onClick={() => alert('Coming soon')}>
                            {' '}
                            Use
                        </Button>
                    </div>
                </div>
                <div className="info-buyer__block">
                    <h4>Note! </h4>
                    <div>
                        <p>
                            In order to hide your identitity, the traking number of your delivery should be encrypted by
                            the public key you control.
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
}
export default RegisteredAccount;
