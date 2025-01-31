import Head from "next/head";
import "@/styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>The Relationship Test</title>
        <meta name="description" content="The magic of knowing your relationship!" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
