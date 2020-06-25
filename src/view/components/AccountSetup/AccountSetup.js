import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { ThanosWallet } from '@thanos-wallet/dapp';
import store from '../../../store/index';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import { generateAccount, getAccount } from '../../../workers';
import { saveAccount } from '../../../contracts/account/storage';
import './sellerSetup.scss';
import { MARKET_ADDRESS } from '../../../config';
import { publicKey, privateKey } from '../../constants';

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

function AccountSetup() {
  const { handleSubmit, register, setValue, errors, getValues } = useForm();

  const [selectedPlan, setPlan] = React.useState('free');
  const [loading, setLoading] = React.useState(false);
  const [subscriptions, setSubscription] = React.useState([]);
  const onSubmit = values => console.log(values);

  React.useEffect(() => {
    store.subscribe(() => setSubscription(store.getState().market.subscriptions));

    console.log(subscriptions);
  }, []);

  async function handleGetAccount() {
    setLoading(true);
    const { mnemonic, publicKey } = await generateAccount();

    setValue([
      {
        mnemonic,
      },
      {
        publicKey,
      },
    ]);
    setLoading(false);
  }

  async function handleAuthAccount() {
    setLoading(true);

    const accData = getValues();
    const wallet = new ThanosWallet('Cepheus');

    await wallet.connect('carthagenet', { forcePermission: true });
    const tezos = wallet.toTezos();
    const accountPkh = await tezos.wallet.pkh();

    console.log(accData);
    const { mnemonic, publicKey } = await getAccount(accData.mnemonic);

    localStorage.setItem('pkh', accountPkh);
    localStorage.setItem(
      'account',
      JSON.stringify({
        mnemonic,
        publicKey,
      }),
    );
    document.location.reload();
    setLoading(false);
  }

  async function handleSaveAccount() {
    setLoading(true);
    const accData = getValues();

    try {
      const wallet = new ThanosWallet('Cepheus');

      await wallet.connect('carthagenet', { forcePermission: true });
      const tezos = wallet.toTezos();
      const contract = await tezos.wallet.at(MARKET_ADDRESS);
      const plan = Object.keys(PLANS).indexOf(selectedPlan);
      const operation = await contract.methods.register(`${plan}`, accData.publicKey).send();

      await operation.confirmation();
      localStorage.setItem('pkh', await tezos.wallet.pkh());
      localStorage.setItem(
        'account',
        JSON.stringify({
          mnemonic: accData.mnemonic,
          publicKey: accData.publicKey,
        }),
      );
      document.location.reload();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <div
      className="seller-setup"
      style={{
        position: 'relative',
      }}
    >
      {loading && (
        <div
          style={{
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            left: ' 50%',
            top: '50%',
          }}
        >
          <Loader />
        </div>
      )}
      <div className="setup-buyer__block" style={{ opacity: loading ? '0.5' : '1' }}>
        <h3>Setup Your Account</h3>
        <form className="buyer-setup__form-unregistered" onSubmit={handleSubmit(onSubmit)}>
          <textarea
            name="mnemonic"
            className={privateKey}
            cols="30"
            rows="10"
            placeholder="Mnemonic phrase"
            ref={register({ required: 'Required' })}
          />
          <textarea
            name="publicKey"
            className={publicKey}
            cols="30"
            rows="10"
            placeholder="Public Key"
            ref={register({ required: 'Required' })}
          />

          <div className="sub-plans">
            {Object.values(PLANS).map((plan, index) => (
              <div
                className={classNames('subscription', plan.name.toLocaleLowerCase() === selectedPlan && 'sub-selected')}
                onClick={() => setPlan(plan.name.toLocaleLowerCase())}
              >
                <span>{plan.name}</span>
                <div className="sub-details">
                  <p>Price: {plan.price} </p>
                  <p>Fee: {plan.fee}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="buyer-setup-buttons">
            <Button content="Random" className="buyer-setup-btn dark " onClick={handleGetAccount}>
              Random
            </Button>

            <Button className="buyer-setup-btn purple setup-btn" type="submit" onClick={handleSaveAccount}>
              Register
            </Button>
            <Button className="buyer-setup-btn purple setup-btn" type="submit" onClick={handleAuthAccount}>
              Auth
            </Button>
          </div>
        </form>
      </div>
      <div className="info-buyer__block" style={{ opacity: loading ? '0.5' : '1' }}>
        <h4>You are not registered as a Seller! </h4>
        <div>
          <p>
            In order to hide your identitity, the tracking number of the delivery is encrypted by buyer and seller RSA
            public keys.
          </p>
          <p>
            You set up this public key before. In order to display tracking number of your orders your RSA private key
            is needed
          </p>
          <p>
            <b>Note</b>: If you don’t need to see tracking numbers and delivery details you may skip filling this form.
          </p>
        </div>
        <h4>Fees and Subscriptions </h4>
        <div>
          <p>There are few fees plans.</p>
          <p>Fee is needed to incentivise community to solve possible issues and improve the platform.</p>
          <p>
            The buyers pays fee of the earned profit. Subscription determines the fee rate and is payed monthly. If it
            isn't rebilled in time the Free plan is set by default. You may update it in any tim
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountSetup;
