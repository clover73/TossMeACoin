import Head from 'next/head';
import { useContext } from 'react';
import { TMACContext } from '../context/TossMeACoinContext';

const Home = () => {
  const { account, connectWallet } = useContext(TMACContext);

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

      <main>
        {account ? (
          <p>Connected account: {account}</p>
        ) : (
          <button type="button" onClick={connectWallet}>
            Connect wallet
          </button>
        )}
      </main>

      <footer></footer>
    </>
  );
};

export default Home;
