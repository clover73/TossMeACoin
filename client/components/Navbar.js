import Link from 'next/link';
import { useContext } from 'react';
import { TMACContext } from '../context/TossMeACoinContext';
import Button from './Button';

const Navbar = () => {
  const { account, connectWallet } = useContext(TMACContext);

  return (
    <nav>
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center sm:justify-between justify-center h-16">
          <div>
            <Link href="/">
              <img
                className="h-16 w-auto cursor-pointer"
                src="/logo.svg"
                alt="Toss Me A Coins"
              />
            </Link>
          </div>
          <div className="hidden sm:block">
            {account ? (
              <div className="bg-[#5e17eb] text-white font-bold py-2 px-4 rounded-full">{`${account.substring(
                0,
                5
              )}...${account.substring(36, 41)}`}</div>
            ) : (
              <Button onClick={connectWallet}>Connect wallet</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
