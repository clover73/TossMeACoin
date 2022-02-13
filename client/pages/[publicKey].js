import { useRouter } from 'next/router';

const SupportPage = () => {
  const router = useRouter();
  const { publicKey } = router.query;

  return <p>Public Key: {publicKey}</p>;
};

export default SupportPage;
