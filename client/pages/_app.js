import '../styles/globals.css';
import Link from 'next/link';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { TMACProvider } from '../context/TossMeACoinContext';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <TMACProvider>
        <nav>
          <Link href="/">Home</Link>
        </nav>
        <Component {...pageProps} />{' '}
      </TMACProvider>
    </ApolloProvider>
  );
};

export default MyApp;
