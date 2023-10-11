import "./index.css";
import Head from "next/head";

export default ({ Component, pageProps }) => (
  <>
    <Head>
      <title>WSA Scraper</title>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />
    </Head>
    <Component {...pageProps} />
  </>
);
