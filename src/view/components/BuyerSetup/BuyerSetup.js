import React from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import './buyerSetup.scss';
import { getRandomWallet } from '../../../contracts/account/random';
import { saveAccount } from '../../../contracts/account/storage';
import { setup } from '../../../contracts/account/setup';
import { Market } from '../../../contracts/market/index';
import store from '../../../store/index';

const privateKey = 'textarea__item setup-seller__key private-key';
const publicKey = 'textarea__item setup-seller__key public-key';

function BuyerSetup() {
    const { handleSubmit, register, setValue, errors, getValues } = useForm();
    const [isAccount, setAccount] = React.useState(false);
    const [plans, setPlans] = React.useState({});
    const [selectedPlanIndex, setPlanIndex] = React.useState(0);

    const onSubmit = values => console.log(values);

    React.useEffect(() => {
        const {
            market: { subscriptions },
        } = store.getState();

        setPlans(subscriptions);
        const account = JSON.parse(localStorage.getItem('buyerAccount'));

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
            setAccount(true);
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

        const Tezos = await setup(accData.privateKey);
        const market = await Market.init(Tezos);

        const pkh = await Tezos.signer.publicKeyHash();
        const operation = await market.register(`${selectedPlanIndex}`, await Tezos.signer.publicKey());

        saveAccount({ ...accData, plan: selectedPlanIndex }, 'buyerAccount');
    }
    async function handleChangePlan() {
        const accData = getValues();

        const Tezos = await setup(accData.privateKey);
        const market = await Market.init(Tezos);

        const pkh = await Tezos.signer.publicKeyHash();

        const operation = await market.changeSubscription(selectedPlanIndex);
    }
    return (
        <div className="buyer-setup">
            <div className="setup-buyer__block">
                <h3>Setup Your Buyer Account</h3>
                <form className="buyer-setup__form" onSubmit={handleSubmit(onSubmit)}>
                    <textarea
                        name="privateKey"
                        className={privateKey}
                        cols="30"
                        disabled={isAccount}
                        rows="10"
                        placeholder="Generated Seller Private Key"
                        ref={register({ required: 'Required' })}
                    />
                    <textarea
                        name="publicKey"
                        className={publicKey}
                        disabled={isAccount}
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
                        {isAccount ? (
                            <Button
                                className={classNames(
                                    'buyer-setup-btn setup-btn',
                                    JSON.parse(localStorage.getItem('buyerAccount')).plan === selectedPlanIndex
                                        ? 'dark'
                                        : 'purple',
                                )}
                                type="submit"
                                onClick={handleSaveAccount}
                            >
                                Change Plan
                            </Button>
                        ) : (
                            <Button
                                className="buyer-setup-btn purple setup-btn"
                                type="submit"
                                onClick={handleChangePlan}
                            >
                                Setup
                            </Button>
                        )}
                    </div>
                </form>
            </div>
            <div className="info-buyer__block">
                <h4>You are not registered as a Buyer! </h4>
                <div>
                    <p>
                        In order to hide your identitity, the traking number of your delivery should be encrypted by the
                        public key you control.
                    </p>
                    <p>Register with your own or generated and store new keypair.</p>
                    <p>
                        <b>Note</b>: If you loose your loose it your won’t be able to track your delivery.{' '}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default BuyerSetup;
