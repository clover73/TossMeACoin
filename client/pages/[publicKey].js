import { useState, useContext } from 'react';
import { gql } from '@apollo/client';
import { client } from './_app';

import { TMACContext } from '../context/TossMeACoinContext';

const SupportPage = ({ publicKey, creator }) => {
  const { sendDonation } = useContext(TMACContext);

  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [amount, setAmount] = useState('');

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

  return (
    <div>
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
        <input type="submit" value="Send Donation" />
      </form>
    </div>
  );
};

export default SupportPage;

export async function getStaticProps({ params }) {
  const { publicKey } = params;

  const { data } = await client.query({
    query: gql`
    {
      creator(publicKey: "${publicKey}") {
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
