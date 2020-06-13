import React from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import { getRandomWallet } from '../../../contracts/account/random';
import { saveAccount } from '../../../contracts/account/storage';
import { setup } from '../../../contracts/account/setup';
import { Market } from '../../../contracts/market/index';
import store from '../../../store/index';

import './sellerSetup.scss';

const privateKey = 'textarea__item setup-seller__key private-key';
const publicKey = 'textarea__item setup-seller__key public-key';

const PLANS = {
    free: {
        name: 'Free',
        price: 0,
        fee: '1.5%',
    },
    standart: {
        name: 'Standart',
        price: 1000,
        fee: '0.5%',
    },
    premium: {
        name: 'Premium',
        price: 2000,
        fee: '0%',
    },
};

function SellerSetup() {
    const { handleSubmit, register, setValue, errors, getValues } = useForm();
    const [plans, setPlans] = React.useState({});
    const [selectedPlanIndex, setPlanIndex] = React.useState(0);

    const onSubmit = values => console.log(values);

    React.useEffect(() => {
        const {
            market: { subscriptions },
        } = store.getState();

        setPlans(subscriptions);
        const account = JSON.parse(localStorage.getItem('sellerAccount'));

        if (account) {
            setValue([
                {
                    privateKey: account.privateKey,
                },
                {
                    publicKey: account.publicKey,
                },
            ]);
            setPlanIndex(account.plan);
        }
    }, []);

    async function handleGetAccount() {
        const { privateKey, publicKey } = await getRandomWallet();

        setValue([
            {
                privateKey,
            },
            { publicKey },
        ]);
    }

    async function handleSaveAccount() {
        const accData = getValues();

        const Tezos = await setup();
        const market = await Market.init(Tezos);
        const pkh = await Tezos.signer.publicKeyHash();

        const initialStorage = await market.getFullStorage({ accounts: [pkh] });
        // assert.equal(initialStorage.accountsExtended[pkh], undefined);
        const operation = await market.register('0', await Tezos.signer.publicKey());
        // assert(operation.status === 'applied', 'Operation was not applied');
        const updatedStorage = await market.getFullStorage({ accounts: [pkh] });

        saveAccount({ ...accData, plan: selectedPlanIndex }, 'sellerAccount');
    }

    return (
        <div className="buyer-setup">
            <div className="setup-buyer__block">
                <h3>Setup Your Seller kek</h3>
                <form className="buyer-setup__form" onSubmit={handleSubmit(onSubmit)}>
                    <textarea
                        name="privateKey"
                        className={privateKey}
                        cols="30"
                        rows="10"
                        placeholder="Generated Seller Private Key"
                        ref={register({ required: 'Required' })}
                    />
                    <textarea
                        name="publicKey"
                        className={publicKey}
                        cols="30"
                        rows="10"
                        placeholder="Your Seller Public Key"
                        ref={register({ required: 'Required' })}
                    />

                    <div className="sub-plans">
                        {Object.values(plans).map((plan, index) => (
                            <div
                                key={index}
                                className={classNames('subscription', index == selectedPlanIndex && 'sub-selected')}
                                onClick={() => setPlanIndex(index)}
                            >
                                <span>{index}</span>
                                <div className="sub-details">
                                    <p>Price: {Number(plan.price)} </p>
                                    <p>Fee: {Number(plan.fee)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="buyer-setup-buttons">
                        <Button content="Setup" className="buyer-setup-btn dark " onClick={handleGetAccount}>
                            Random
                        </Button>
                        <Button className="buyer-setup-btn purple setup-btn" type="submit" onClick={handleSaveAccount}>
                            Setup
                        </Button>
                    </div>
                </form>
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
                        TON storage isn’t free and is payed on per block basics so the basic fee is needed to store
                        Buyers account in Blockchain for some paid time.
                    </p>
                    <p>
                        The buyers pays fee of the earned profit. Subscription determines the fee rate and is payed
                        monthly. If it wasn’t rebilled in time the Free plan is set by default.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SellerSetup;
