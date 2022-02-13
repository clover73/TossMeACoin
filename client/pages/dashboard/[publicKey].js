import { useRouter } from 'next/router';

const CreatorDashboard = () => {
  const router = useRouter();
  const { publicKey } = router.query;

  return <p>Public Key: {publicKey}</p>;
};

export default CreatorDashboard;
