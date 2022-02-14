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
          <div>Logo</div>
          <div>
            <Link href="/creators">
              <a>Explore creators</a>
            </Link>
            <a>Connect wallet</a>
          </div>
        </nav>
        <Component {...pageProps} />{' '}
      </TMACProvider>
    </ApolloProvider>
  );
};

export default MyApp;
