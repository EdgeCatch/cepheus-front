import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import { ThanosWallet } from '@thanos-wallet/dapp';
import { generateAccount, getAccount } from '../../../workers';
import { saveAccount } from '../../../contracts/account/storage';
import './sellerSetup.scss';
import { MARKET_ADDRESS } from '../../../config';
import { publicKey, privateKey } from '../../constants';

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
  const { handleSubmit, register, setValue, errors, getValues } = useForm();

  const [selectedPlan, setPlan] = React.useState('standart');
  const [loading, setLoading] = React.useState(false);
  const onSubmit = values => console.log(values);

  React.useEffect(() => {
    // const mnemonic = Bip39.generateMnemonic(128);
    // const rsa1 = cryptico.generateRSAKey(mnemonic);
    // const account = JSON.parse(localStorage.getItem('sellerAccount'));
    // if (account) {
    //   setValue([
    //     {
    //       privateKey: account.privateKey
    //     },
    //     {
    //       publicKey: account.publicKey
    //     }
    //   ]);
    //   setPlan(account.plan);
    // }
  }, []);

  async function handleGetAccount() {
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

  async function handleAuthAccount() {
    const accData = getValues();
    console.log(accData);
    const { mnemonic, publicKey } = await getAccount(accData.mnemonic);
    localStorage.setItem(
      'account',
      JSON.stringify({
        mnemonic,
        publicKey
      })
    );
    document.location.reload();
  }

  async function handleSaveAccount() {
    setLoading(true);
    const accData = getValues();

    try {
      const available = await ThanosWallet.isAvailable();
      if (!available) {
        throw new Error('Thanos Wallet not installed');
      }
      const wallet = new ThanosWallet('Cepheus');
      await wallet.connect('carthagenet', { forcePermission: true });
      const tezos = wallet.toTezos();
      const contract = await tezos.wallet.at(MARKET_ADDRESS);

      const operation = await contract.methods
        .register('0', accData.publicKey)
        .send();
      await operation.confirmation();
      localStorage.setItem(
        'account',
        JSON.stringify({
          mnemonic: accData.mnemonic,
          publicKey: accData.publicKey
        })
      );
      document.location.reload();
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

// <<<<<<< ipfs
//                     <div className="sub-plans">
//                         {Object.values(PLANS).map(plan => (
//                             <div
//                                 key={_.uniqueId()}
//                                 className={classNames(
//                                     'subscription',
//                                     plan.name.toLocaleLowerCase() === selectedPlan && 'sub-selected',
//                                 )}
//                                 onClick={() => setPlan(plan.name.toLocaleLowerCase())}
//                             >
//                                 <span>{plan.name}</span>
//                                 <div className="sub-details">
//                                     <p>Price: {plan.price} </p>
//                                     <p>Fee: {plan.fee}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="buyer-setup-buttons">
//                         <Button content="Setup" className="buyer-setup-btn dark " onClick={handleGetAccount}>
//                             Random
//                         </Button>
//                         <Link to="/buyer-registered">
//                             {' '}
//                             <Button
//                                 className="buyer-setup-btn purple setup-btn"
//                                 type="submit"
//                                 onClick={handleSaveAccount}
//                             >
//                                 Setup
//                             </Button>
//                         </Link>
//                     </div>
//                 </form>
//             </div>
//             <div className="info-buyer__block">
//                 <h4>You are not registered as a Seller! </h4>
//                 <div>
//                     <p>
//                         In order to hide your identitity, the traking number of your delivery should be encrypted by the
//                         public key you control.
//                     </p>
//                     <p>Register with your own or generated and store new keypair.</p>
//                     <p>
//                         <b>Note</b>: If you loose your loose it your won’t be able to track your delivery.
//                     </p>
//                 </div>
//                 <h4>Fees and Subscriptions </h4>
//                 <div>
//                     <p>There are two type of fees: base and subscription.</p>
//                     <p>
//                         TON storage isn’t free and is payed on per block basics so the basic fee is needed to store
//                         Buyers account in Blockchain for some paid time.
//                     </p>
//                     <p>
//                         The buyers pays fee of the earned profit. Subscription determines the fee rate and is payed
//                         monthly. If it wasn’t rebilled in time the Free plan is set by default.
//                     </p>
// =======
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
        <form
          className="buyer-setup__form-unregistered"
          onSubmit={handleSubmit(onSubmit)}
        >
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
// >>>>>>> develop
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
            <Button
              className="buyer-setup-btn purple setup-btn"
              type="submit"
              onClick={handleAuthAccount}
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
        <h4>You are not registered as a Seller! </h4>
        <div>
          <p>
            In order to hide your identitity, the traking number of your
            delivery should be encrypted by the public key you control.
          </p>
          <p>Register with your own or generated and store new keypair.</p>
          <p>
            <b>Note</b>: If you loose your loose it your won’t be able to track
            your delivery.
          </p>
        </div>
        <h4>Fees and Subscriptions </h4>
        <div>
          <p>There are two type of fees: base and subscription.</p>
          <p>
            TON storage isn’t free and is payed on per block basics so the basic
            fee is needed to store Buyers account in Blockchain for some paid
            time.
          </p>
          <p>
            The buyers pays fee of the earned profit. Subscription determines
            the fee rate and is payed monthly. If it wasn’t rebilled in time the
            Free plan is set by default.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountSetup;
