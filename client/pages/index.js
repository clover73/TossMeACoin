import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { TMACContext } from '../context/TossMeACoinContext';
import { client } from '../pages/_app';
import { gql } from '@apollo/client';
import Button from '../components/Button';

const Home = () => {
  const { account, connectWallet } = useContext(TMACContext);
  const router = useRouter();
  const [publicKey, setPublicKey] = useState('');
  const [error, setError] = useState('');

  const handleChange = async (event) => {
    const address = event.target.value;
    setPublicKey(address);
    if (error) setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const valid = publicKey.length == 42 && publicKey.substring(0, 2) == '0x';
    if (!valid) setError('Please enter a valid ETH address!');
    else {
      try {
        const { data } = await client.query({
          query: gql`
            {
              creator(publicKey: "${publicKey.toLocaleLowerCase()}") {
                createdAt
              }
            }`,
        });
        if (!data.creator)
          setError('Sorry, this address has not registered on our platform :(');
        else router.push(`/${publicKey}`);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Toss Me A Coin</title>
        <meta
          name="description"
          content="Toss Me A Coin - a decentralized Web3 donation platform"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center justify-center min-h-[80vh]">
        <div className="max-w-6xl mx-auto py-16 px-2 sm:px-6 lg:px-8">
          <div className="text-center color-[#262626] pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-7xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              Toss Me A{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5e17eb] to-[#c9e2a6]">
                Coin
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Web3 Decentralized Donation Platform Made For Content Creators
              </p>
              <div className="w-4/5 mx-auto flex justify-center text-xl">
                {!account ? (
                  <div className="m-4">
                    <Button onClick={connectWallet}>Connect wallet</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="publicKey"
                      value={publicKey}
                      onChange={handleChange}
                      placeholder="Find by ETH Public Key"
                      className="py-2 border-b-2 border-[#6666ff] outline-none focus:border-[#c9e2a6]"
                    />
                    <input
                      type="Submit"
                      defaultValue="Find creator"
                      className="bg-[#262626] hover:bg-[#000000] text-white font-bold py-2 px-4 rounded-full m-2 cursor-pointer"
                    />
                    {error && (
                      <p className="text-red-800 my-4 font-bold text-md">
                        {error}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer></footer>
    </>
  );
};

export default Home;
