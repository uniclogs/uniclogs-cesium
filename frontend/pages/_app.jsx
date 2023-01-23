import React from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <div className="app">
      <Head>
        <title>UniClOGS Cesium</title>
      </Head>
      <Component {...pageProps}/>
    </div>
  );
}

export default MyApp;
