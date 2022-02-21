import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { gql } from '@apollo/client';
import { client } from './_app';
import { TMACContext } from '../context/TossMeACoinContext';
import EditProfile from '../components/EditProfile';
import ProfileInfo from '../components/ProfileInfo';
import DonationCard from '../components/DonationCard';
import Button from '../components/Button';

import { FaWrench } from 'react-icons/fa';

const SupportPage = ({ publicKey, creator }) => {
  if (!creator) {
    return (
      <>
        <Head>
          <title>Address has not been registered!</title>
        </Head>
        <main className="flex items-center justify-center min-h-[80vh] m-4">
          <h1 className="text-5xl md:text-7xl text-center font-extrabold leading-tighter tracking-tighter mb-4">
            Sorry but this address hasn't registered on our platform!
          </h1>
        </main>
      </>
    );
  }

  const {
    sendDonation,
    isLoading,
    success,
    account,
    connectWallet,
    receivedDonations,
    sentDonations,
  } = useContext(TMACContext);

  const [edit, setEdit] = useState(false);
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

      <main className="flex items-center justify-center min-h-[80vh] text-[#262626] m-4">
        <div className="max-w-xl color-[#262626] pb-12 md:pb-16">
          <div className="text-center mx-auto">
            <div className="w-full text-center mx-auto p-6 my-4 rounded shadow-2xl">
              {isLoggedIn && edit ? (
                <EditProfile creator={creator} publicKey={publicKey} />
              ) : (
                <ProfileInfo creator={creator} publicKey={publicKey} />
              )}
              {isLoggedIn && !edit ? (
                <Button
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  Edit profile <FaWrench className="inline align-text-top" />
                </Button>
              ) : (
                <></>
              )}
            </div>
            <div className="w-full text-left mx-auto text-xl p-6 rounded shadow-2xl">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block mb-2 text-md font-medium text-[#262626]">
                    Your name
                  </label>
                  <input
                    type="text"
                    className="shadow-sm bg-[#6666ff] border border-[#6666ff] text-[#ffffff] placeholder-gray-200 text-sm rounded-lg focus:ring-[#5e17eb] focus:border-[#5e17eb] block w-full p-2.5"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-md font-medium text-[#262626]">
                    Message
                  </label>
                  <textarea
                    rows="3"
                    cols="25"
                    maxLength="256"
                    className="shadow-sm bg-[#6666ff] border border-[#6666ff] text-[#ffffff] placeholder-gray-200 text-sm rounded-lg focus:ring-[#5e17eb] focus:border-[#5e17eb] block w-full p-2.5"
                    placeholder="Message to the creator"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-md font-medium text-[#262626]">
                    ETH Amount
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    className="shadow-sm bg-[#6666ff] border border-[#6666ff] text-[#ffffff] placeholder-gray-200 text-sm rounded-lg focus:ring-[#5e17eb] focus:border-[#5e17eb] block w-full p-2.5"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  {account ? (
                    isLoading ? (
                      <p className="text-md font-medium">Loading...</p>
                    ) : (
                      <input
                        className="bg-[#6666ff] hover:bg-[#5e17eb] text-white font-bold py-2 px-4 mx-4 my-4 rounded-full"
                        type="submit"
                        value="Send Donation"
                      />
                    )
                  ) : (
                    <Button onClick={connectWallet}>Connect wallet</Button>
                  )}
                  {success && (
                    <p className="text-md font-medium text-[#c9e2a6]">
                      Your donation has been sent!
                    </p>
                  )}
                </div>
              </form>
            </div>
            {isLoggedIn && (
              <div className="max-w-xl color-[#262626] pb-12 md:pb-16 mt-6">
                <div className="w-full mx-auto text-xl p-6 mb-12 rounded shadow-2xl">
                  <h2 className="font-bold text-4xl md:text-5xl my-4">
                    Your Donations
                  </h2>
                  {sentDonations && sentDonations.length != 0 ? (
                    sentDonations.map((donation) => (
                      <DonationCard donation={donation} address={publicKey} />
                    ))
                  ) : (
                    <p>No donations sent</p>
                  )}
                </div>
                <div className="w-full mx-auto text-xl p-6 rounded shadow-2xl">
                  <h2 className="font-bold text-4xl md:text-5xl my-4">
                    Donations Received
                  </h2>
                  {receivedDonations && receivedDonations.length != 0 ? (
                    receivedDonations.map((donation) => (
                      <DonationCard donation={donation} address={publicKey} />
                    ))
                  ) : (
                    <p>No donations received</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default SupportPage;

export async function getStaticProps({ params }) {
  const { publicKey } = params;

  // TODO Check if a public key is valid
  const valid = publicKey.length == 42 && publicKey.substring(0, 2) == '0x';

  if (!valid) {
    return {
      redirect: { destination: '404' },
    };
  }

  const { data } = await client.query({
    query: gql`
    {
      creator(publicKey: "${publicKey.toLocaleLowerCase()}") {
        name
        bio
        createdAt
        avatarURL
        customLink
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
