import Layout from '../components/layout/layout';
import '../styles/globals.css';
import Head from 'next/head';
import { NotificationContextProvider } from '../store/notification-context';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Js Events App</title>
          <meta name="description" content="Next js Events"></meta>
          <meta
            name="viewport"
            content="initial-scale=1.0,width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
