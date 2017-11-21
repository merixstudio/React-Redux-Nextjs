import React from 'react';
import Head from 'next/head';


const Layout = ({ children }) => (
  <div>
    <Head>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css" />
    </Head>
    <div style={{
      maxWidth: '960px',
      margin: '50px auto',
    }}
    >
      { children }
    </div>
  </div>
);

export default Layout;
