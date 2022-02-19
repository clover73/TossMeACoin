import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { gql } from '@apollo/client';
import { client } from './_app';

import { TMACContext } from '../context/TossMeACoinContext';

const SupportPage = ({ publicKey, creator }) => {
  const {
    sendDonation,
    isLoading,
    account,
    connectWallet,
    receivedDonations,
    sentDonations,
  } = useContext(TMACContext);

  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [amount, setAmount] = useState('');

  const isLoggedIn = account == publicKey.toLocaleLowerCase();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      to: publicKey,
      amount,
      name,
      message: msg,
    };
    sendDonation(data);
  };

  useEffect(() => {
    if (isLoading) {
      setName('');
      setAmount(0);
      setMsg('');
    }
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>{publicKey} Toss Me A Coin</title>
      </Head>

      <main className="flex items-center justify-center min-h-[80vh]">
        <h2>Send donations to {publicKey}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:{' '}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Message:{' '}
            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
          </label>
          <label>
            Amount:{' '}
            <input
              type="number"
              step="0.0001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          {account ? (
            isLoading ? (
              <p>Loading...</p>
            ) : (
              <input type="submit" value="Send Donation" />
            )
          ) : (
            <button onClick={connectWallet}>Connect wallet</button>
          )}
        </form>
        {isLoggedIn && (
          <div>
            <div>
              <h2>Your Donations</h2>
              {sentDonations && sentDonations.length != 0 ? (
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
              {receivedDonations && receivedDonations.length != 0 ? (
                receivedDonations.map((donation) => (
                  <div key={donation.timestamp}>
                    <p>Received from {donation.addressFrom}</p>
                    <p>Amount {donation.amount}</p>
                    <p>Name {donation.name}</p>
                    <p>Message {donation.message}</p>
                  </div>
                ))
              ) : (
                <p>No donations received</p>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default SupportPage;

export async function getStaticProps({ params }) {
  const { publicKey } = params;

  // TODO Check if a public key is valid

  const { data } = await client.query({
    query: gql`
    {
      creator(publicKey: "${publicKey.toLocaleLowerCase()}") {
        name
        bio
        createdAt
        avatarURL
        bannerURL
        Twitter
        Instagram
        YouTube
        TikTok
        LinkedIn
        GitHub
        Website
      }
    }`,
  });

  return {
    props: {
      publicKey,
      creator: data.creator,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      {
        creators {
          publicKey
        }
      }
    `,
  });

  const paths = data.creators.map((creator) => ({
    params: { publicKey: creator.publicKey },
  }));

  return { paths, fallback: 'blocking' };
}
