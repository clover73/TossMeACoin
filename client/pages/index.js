import Head from 'next/head';
import { useContext } from 'react';

import { TMACContext } from '../context/TossMeACoinContext';

const Home = () => {
  const { account, connectWallet, receivedDonations, sentDonations } =
    useContext(TMACContext);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {account ? (
          <p>Connected account: {account}</p>
        ) : (
          <button type="button" onClick={connectWallet}>
            Connect wallet
          </button>
        )}
        <p className="text-3xl font-bold underline">Hello Tailwind</p>
        {account && (
          <div>
            <div>
              <h2>Your Donations</h2>
              {sentDonations.length > 0 ? (
                sentDonations.map((donation) => (
                  <div key={donation.timestamp}>
                    <p>Sent to {donation.addressTo}</p>
                    <p>Amount {donation.amount}</p>
                    <p>Name {donation.name}</p>
                    <p>Message {donation.message}</p>
                  </div>
                ))
              ) : (
                <p>No donations sent</p>
              )}
            </div>
            <div>
              <h2>Donations Received</h2>
              {receivedDonations.length > 0 ? (
                receivedDonations.map((donation) => (
                  <div key={donation.timestamp}>
                    <p>Received from {donation.addressFrom}</p>
                    <p>Amount {donation.amount}</p>
                    <p>Name {donation.name}</p>
                    <p>Message {donation.message}</p>
                  </div>
                ))
              ) : (
                <p>No donations recived</p>
              )}
            </div>
          </div>
        )}
      </main>

      <footer></footer>
    </>
  );
};

export default Home;
