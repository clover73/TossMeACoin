import { useState } from 'react';
import { gql } from '@apollo/client';
import { client } from './_app';

const SupportPage = ({ creator }) => {
  const [receiverBalance, setReceiverBalance] = useState(0);
  const [donationsCount, setDonationsCount] = useState(0);

  return <p>Creator: {creator.name}</p>;
};

export default SupportPage;

export async function getStaticProps({ params }) {
  const { publicKey } = params;

  const { data } = await client.query({
    query: gql`
    {
      creator(publicKey: "${publicKey}") {
        publicKey
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
