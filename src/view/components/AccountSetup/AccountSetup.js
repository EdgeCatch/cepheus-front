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
import { Market } from '../../../contracts/market/index';
import { setup } from '../../../contracts/account/setup';

const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    fee: '1.5%'
  },
  standart: {
    name: 'Standart',
    price: 1000,
    fee: '0.5%'
  },
  premium: {
    name: 'Premium',
    price: 2000,
    fee: '0%'
  }
};

function AccountSetup() {
  const {
    market: { subscriptions }
  } = store.getState();

  const { register, setValue, errors, getValues } = useForm();

  const [selectedPlan, setPlan] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  async function handleGetAccount(e) {
    e.preventDefault();

    setLoading(true);
    const { mnemonic, publicKey } = await generateAccount();

    setValue([
      {
        mnemonic
      },
      {
        publicKey
      }
    ]);
    setLoading(false);
  }

  async function handleAuthAccount(e) {
    e.preventDefault();

    setLoading(true);
    const accData = getValues();
    const wallet = new ThanosWallet('Cepheus');
    await wallet.connect('carthagenet', { forcePermission: true });
    const tezos = wallet.toTezos();
    const accountPkh = await tezos.wallet.pkh();
    const Tezos = await setup();
    const market = await Market.init(Tezos);
    const contractStorage = await market.getFullStorage();
    const account = (await contractStorage.accounts.get(accountPkh)) || {};

    if (Object.keys(account).length) {
      if (account.public_key == accData.publicKey) {
        const { publicKey } = await getAccount(accData.mnemonic);
        localStorage.setItem('pkh', accountPkh);
        localStorage.setItem(
          'account',
          JSON.stringify({
            publicKey,
            subscription: account.subscription
          })
        );
        document.location.reload();
      } else {
        console.error('Wrong public key');
      }
    } else {
      console.error('Account is not registered');
    }

    setLoading(false);
  }

  async function handleSaveAccount(e) {
    e.preventDefault();
    setLoading(true);
    const accData = getValues();

    try {
      const wallet = new ThanosWallet('Cepheus');

      await wallet.connect('carthagenet', { forcePermission: true });
      const tezos = wallet.toTezos();
      const contract = await tezos.wallet.at(MARKET_ADDRESS);
      const plan = Object.keys(PLANS).indexOf(selectedPlan);
      const operation = await contract.methods
        .register(`${selectedPlan}`, accData.publicKey)
        .send();

      await operation.confirmation();
      localStorage.setItem('pkh', await tezos.wallet.pkh());
      localStorage.setItem(
        'account',
        JSON.stringify({
          publicKey: accData.publicKey,
          subscription: selectedPlan
        })
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
        position: 'relative'
      }}
    >
      {loading && (
        <div
          style={{
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            left: ' 50%',
            top: '50%'
          }}
        >
          <Loader />
        </div>
      )}
      <div
        className="setup-buyer__block"
        style={{ opacity: loading ? '0.5' : '1' }}
      >
        <h3>Setup Your Account</h3>
        <form className="buyer-setup__form-unregistered" autoComplete="off">
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
            {Object.values(subscriptions).map((item, index) => (
              <React.Fragment key={index}>
                {item && (
                  <div
                    className={classNames(
                      'subscription',
                      index === selectedPlan && 'sub-selected'
                    )}
                    onClick={() => setPlan(index)}
                  >
                    <span>{item.name}</span>
                    <div className="sub-details">
                      <p>Price: {item.price.toNumber()} </p>
                      <p>Fee: {item.fee.toNumber()}</p>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="buyer-setup-buttons">
            <Button
              content="Random"
              className="buyer-setup-btn dark "
              onClick={e => handleGetAccount(e)}
            >
              Random
            </Button>

            <Button
              className="buyer-setup-btn purple setup-btn"
              onClick={e => handleSaveAccount(e)}
            >
              Register
            </Button>
            <Button
              className="buyer-setup-btn purple setup-btn"
              onClick={e => handleAuthAccount(e)}
            >
              Auth
            </Button>
          </div>
        </form>
      </div>
      <div
        className="info-buyer__block"
        style={{ opacity: loading ? '0.5' : '1' }}
      >
        <h4>You are not registered yet! </h4>
        <div>
          <p>
            In order to hide your identitity, the tracking number of the
            delivery is encrypted by buyer and seller RSA public keys.
          </p>
          <p>
            You set up this public key before. In order to display tracking
            number of your orders your RSA private key is needed
          </p>
          <p>
            <b>Note</b>: If you don’t need to see tracking numbers and delivery
            details you may skip filling this form.
          </p>
        </div>
        <h4>Fees and Subscriptions </h4>
        <div>
          <p>There are few fees plans.</p>
          <p>
            Fee is needed to incentivise community to solve possible issues and
            improve the platform.
          </p>
          <p>
            The buyers pays fee of the earned profit. Subscription determines
            the fee rate and is payed monthly. If it isn't rebilled in time the
            Free plan is set by default. You may update it in any tim
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountSetup;
