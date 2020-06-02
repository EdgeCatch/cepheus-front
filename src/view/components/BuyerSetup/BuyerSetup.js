import React from 'react';
import SellerSetup from '../SellerSetup/SellerSetup';
import Button from '../Button/Button';
import './buyerSetup.scss';

const privateKey = 'textarea__item setup-seller__key private-key';
const publicKey = 'textarea__item setup-seller__key public-key';

class BuyerSetup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false,
            isBuyer: false,
        };
    }

    render() {
        return (
            <>
                <div className="buyer-setup">
                    <div className="setup-buyer__block">
                        <h3>Setup Your Buyer Account</h3>
                        <form className="buyer-setup__form">
                            <textarea
                                name=""
                                className={privateKey}
                                cols="30"
                                rows="10"
                                placeholder="Generated Buyer Private Key"
                            />
                            <textarea
                                name=""
                                className={publicKey}
                                cols="30"
                                rows="10"
                                placeholder="Your Buyer Public Key"
                            />
                        </form>
                        <div className="buyer-setup-buttons">
                            <Button content="Setup" className="buyer-setup-btn dark ">
                                Random
                            </Button>
                            <Button className="buyer-setup-btn purple setup-btn"> Setup</Button>
                        </div>
                    </div>
                    <div className="info-buyer__block">
                        <h4>You are not registered as a Buyer! </h4>
                        <div>
                            <p>
                                In order to hide your identitity, the traking number of your delivery should be
                                encrypted by the public key you control.
                            </p>
                            <p>Register with your own or generated and store new keypair.</p>
                            <p>
                                <b>Note</b>: If you loose your loose it your won’t be able to track your delivery.{' '}
                            </p>
                        </div>
                    </div>
                </div>
                <SellerSetup />
            </>
        );
    }
}

export default BuyerSetup;
