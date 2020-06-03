import React from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import Button from '../Button/Button';
import './buyerSetup.scss';
import { getRandomWallet } from '../../../lib/account/random';
import { saveAccount } from '../../../lib/account/storage';

const privateKey = 'textarea__item setup-seller__key private-key';
const publicKey = 'textarea__item setup-seller__key public-key';

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

function BuyerSetup() {
  const { handleSubmit, register, setValue, errors, getValues } = useForm();

  const [selectedPlan, setPlan] = React.useState('standart');
  const onSubmit = values => console.log(values);

  React.useEffect(() => {
    const account = JSON.parse(localStorage.getItem('buyerAccount'));
    if (account) {
      setValue([
        {
          privateKey: account.privateKey
        },
        {
          publicKey: account.publicKey
        }
      ]);
      setPlan(account.plan);
    }
  }, []);

  async function handleGetAccount() {
    const { privateKey, publicKey } = await getRandomWallet();
    setValue([
      {
        privateKey
      },
      { publicKey }
    ]);
  }

  function handleSaveAccount() {
    const accData = getValues();
    saveAccount({ ...accData, plan: selectedPlan }, 'buyerAccount');
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
            {Object.values(PLANS).map((plan, index) => (
              <div
                className={classNames(
                  'subscription',
                  plan.name.toLocaleLowerCase() === selectedPlan &&
                    'sub-selected'
                )}
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
            <Button
              content="Setup"
              className="buyer-setup-btn dark "
              onClick={handleGetAccount}
            >
              Random
            </Button>
            <Button
              className="buyer-setup-btn purple setup-btn"
              type="submit"
              onClick={handleSaveAccount}
            >
              Setup
            </Button>
          </div>
        </form>
      </div>
      <div className="info-buyer__block">
        <h4>You are not registered as a Buyer! </h4>
        <div>
          <p>
            In order to hide your identitity, the traking number of your
            delivery should be encrypted by the public key you control.
          </p>
          <p>Register with your own or generated and store new keypair.</p>
          <p>
            <b>Note</b>: If you loose your loose it your won’t be able to track
            your delivery.{' '}
          </p>
        </div>
      </div>
    </div>
  );
}
export default BuyerSetup;
