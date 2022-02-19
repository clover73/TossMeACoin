import '../styles/globals.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { TMACProvider } from '../context/TossMeACoinContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const token = Buffer.from(
  `${process.env.API_USER}:${process.env.PASSWORD}`,
  'utf8'
).toString('base64');

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Basic ${token}`,
  },
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <TMACProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </TMACProvider>
    </ApolloProvider>
  );
};

export default MyApp;
