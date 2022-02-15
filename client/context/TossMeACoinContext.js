import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../utils/constants';

export const TMACContext = React.createContext();

const ethereum = null;

export const TMACProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [receivedDonations, setReceivedDonations] = useState(null);
  const [sentDonations, setSentDonations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) alert('Please install Metamask!');

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setReceivedDonations(await getReceivedDonations());
        setSentDonations(await getSentDonations());
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSmartContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const TMACContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    return TMACContract.connect(signer);
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask!');

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setAccount(accounts[0]);
      setReceivedDonations(await getReceivedDonations());
      setSentDonations(await getSentDonations());
    } catch (error) {
      console.error(error);
    }
  };

  const getReceivedDonations = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask!');

      const TMACContract = getSmartContract();
      const receivedDonationsData = await TMACContract.getReceivedDonations();

      const receivedDonations = receivedDonationsData.map((donantion) => ({
        addressFrom: donantion.from,
        addressTo: donantion.to,
        amount: ethers.utils.formatEther(donantion.amount),
        name: donantion.name,
        message: donantion.message,
        timestamp: new Date(
          donantion.timestamp.toNumber() * 1000
        ).toLocaleString(),
      }));

      return receivedDonations;
    } catch (error) {
      console.error(error);
    }
  };
  const getSentDonations = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask!');

      const TMACContract = getSmartContract();
      const sentDonationsData = await TMACContract.getSentDonations();

      const sentDonations = sentDonationsData.map((donantion) => ({
        addressFrom: donantion.from,
        addressTo: donantion.to,
        amount: ethers.utils.formatEther(donantion.amount),
        name: donantion.name,
        message: donantion.message,
        timestamp: new Date(
          donantion.timestamp.toNumber() * 1000
        ).toLocaleString(),
      }));

      return sentDonations;
    } catch (error) {
      console.error(error);
    }
  };
  const sendDonation = async (donationData) => {
    try {
      if (!ethereum) return alert('Please install MetaMask!');

      const { to, amount, name, message } = donationData;

      const parsedAmount = ethers.utils.parseEther(amount);

      const TMACContract = getSmartContract();
      const donationHash = await TMACContract.donateCoin(to, name, message, {
        value: parsedAmount,
      });

      setIsLoading(true);
      console.log(`Loading - ${donationHash.hash}`);
      await donationHash.wait();
      console.log(`Success - ${donationHash.hash}`);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    ethereum = window.ethereum;
    checkIfWalletIsConnected();
  }, []);

  return (
    <TMACContext.Provider
      value={{
        account,
        connectWallet,
        receivedDonations,
        sentDonations,
        sendDonation,
        isLoading,
      }}
    >
      {children}
    </TMACContext.Provider>
  );
};
