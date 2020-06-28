import React from 'react';
import { useForm } from 'react-hook-form';
import store from '../../../store';
import Button from '../Button/Button';
import './registeredAccount.scss';
import { privateKey, publicKey, withdraw, receiver } from '../../constants';
import { ThanosWallet } from '@thanos-wallet/dapp';
import { MARKET_ADDRESS, TOKEN_ADDRESS } from '../../../config';
import { setSubscriptions } from '../../../store/actions/market';
import Loader from '../../components/Loader/Loader';

function RegisteredAccount() {
  const { handleSubmit, register, setValue, errors, getValues } = useForm();
  const {
    market: { subscriptions }
  } = store.getState();

  const { subscription: subscriptionSaved } = JSON.parse(
    localStorage.getItem('account')
  );
  const [isPlansLoading, setPlansLoading] = React.useState(false);
  const [isWithdrawLoading, setIsWithdrawLoading] = React.useState(false);

  const [subscription, setSubscription] = React.useState(subscriptionSaved);
  React.useEffect(() => {
    const { publicKey } = JSON.parse(localStorage.getItem('account'));

    setValue([{ publicKey }]);

    // async function handleTransferMoney() {
    //   const wallet = new ThanosWallet('Cepheus');
    //   await wallet.connect('carthagenet', { forcePermission: true });
    //   const tezos = wallet.toTezos();
    //   const contractToken = await tezos.wallet.at(MARKET_ADDRESS);
    //   console.log(contractToken.methods, 'aa');
    //   // const t = await contractToken.methods
    //   //   .transfer(
    //   //     'tz1YMUyxoBs1FjLGz5caLwh9ScxnnxXWAuMn',
    //   //     'tz1ec53idwXui2LHEP1E9A3cVTT229gghEsW',
    //   //     '500'
    //   //   )
    //   //   .send();
    //   // t.confirmation();
    // }
    // handleTransferMoney();
  }, []);

  async function handleUpdatePlan() {
    const wallet = new ThanosWallet('Cepheus');
    await wallet.connect('carthagenet', { forcePermission: true });
    setPlansLoading(true);
    const tezos = wallet.toTezos();
    const contractMarket = await tezos.wallet.at(MARKET_ADDRESS);
    const contractToken = await tezos.wallet.at(TOKEN_ADDRESS);

    if (subscriptions[subscription].price.toNumber() !== 0) {
      console.log(subscriptions[subscription].price);
      const approve = await contractToken.methods
        .approve(MARKET_ADDRESS, `${subscriptions[subscription].price}`)
        .send();
      await approve.confirmation();
    }

    const changeSubscription = await contractMarket.methods
      .changeSubscription(`${subscription}`)
      .send();
    await changeSubscription.confirmation();
    const storage = localStorage.getItem('account') || '';
    console.log(storage);

    const account = JSON.parse(storage);

    localStorage.setItem(
      'account',
      JSON.stringify({ ...account, subscription })
    );

    setPlansLoading(false);
  }

  async function handleWithdraw() {
    setIsWithdrawLoading(true);
    try {
      const { receiverAddress, amount } = getValues();
      const wallet = new ThanosWallet('Cepheus');
      await wallet.connect('carthagenet', { forcePermission: true });
      const tezos = wallet.toTezos();
      const contractMarket = await tezos.wallet.at(MARKET_ADDRESS);
      console.log(receiverAddress, amount);
      const withdraw = await contractMarket.methods
        .withdraw(receiverAddress, `${amount}`)
        .send();
      await withdraw.confirmation();
    } catch (e) {
      console.error(e);
    }
    setIsWithdrawLoading(false);
  }

  return (
    <>
      <div style={{ position: 'relative' }}>
        <div
          className="seller-setup-item "
          style={isPlansLoading ? { filter: 'brightness(0.5)' } : {}}
        >
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
              {Object.keys(subscriptions).map((item, index) => (
                <React.Fragment key={index}>
                  {subscriptions[item] && (
                    <div
                      className={
                        index == subscription
                          ? 'subscription sub-free sub-selected'
                          : 'subscription sub-free'
                      }
                      onClick={() => setSubscription(item)}
                    >
                      <span>{subscriptions[item].name}</span>
                      <div className="sub-details">
                        <p>Price: {subscriptions[item].price.toNumber()} </p>
                        <p>Fee: {subscriptions[item].fee.toNumber()}</p>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div
              className="buyer-setup-buttons"
              style={
                subscription == subscriptionSaved
                  ? { filter: 'brightness(0.5)' }
                  : {}
              }
            >
              <Button
                className="buyer-setup-btn purple setup-btn"
                onClick={() => handleUpdatePlan()}
                disabled={subscription === subscriptionSaved ? true : false}
              >
                Update Plan
              </Button>
            </div>
          </div>
          <div className="info-buyer__block">
            <h4>Note! </h4>
            <div>
              <p>
                In order to hide your identitity, the tracking number of the
                delivery is encrypted by buyer and seller RSA public keys
              </p>
              <p>
                You set up this public key before. In order to display tracking
                number of your orders your RSA private key is needed.
              </p>
              <p>
                If you don’t need to see tracking numbers and delivery details
                you may skip filling this form.
              </p>
            </div>
          </div>
        </div>
        {isPlansLoading && (
          <Loader
            style={{
              transform: 'translate(-50%, -50%)',
              position: 'absolute',
              left: '50%',
              top: '50%'
            }}
          />
        )}
      </div>
      <div className="seller-setup-item " style={{ position: 'relative' }}>
        {isWithdrawLoading && (
          <Loader
            style={{
              transform: 'translate(-50%, -50%)',
              position: 'absolute',
              left: '50%',
              top: '50%'
            }}
          />
        )}
        <div
          className="setup-buyer__block"
          style={
            isWithdrawLoading
              ? { filter: 'brightness(0.5)', position: 'relative' }
              : { position: 'relative' }
          }
        >
          <h3>Withdraw Profit</h3>
          <form className="buyer-setup__form">
            <textarea
              name="receiverAddress"
              className={receiver}
              cols="30"
              rows="10"
              placeholder="Receiver Address"
              ref={register({ required: 'Required' })}
            />
            <textarea
              name="amount"
              className={withdraw}
              cols="1"
              rows="1"
              placeholder="Amount"
              ref={register({ required: 'Required' })}
            />
          </form>
          <div className="buyer-setup-buttons">
            <Button
              className="buyer-setup-btn purple setup-btn"
              onClick={() => handleWithdraw()}
            >
              Use
            </Button>
          </div>
        </div>
        <div className="info-buyer__block">
          <h4>Withdraw process</h4>
          <div>
            <p>
              Users who receive profit or refund don’t receive amout immediatly
              but should call separate function.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default RegisteredAccount;
