import React from 'react'
import Link from 'next/link';
import App from 'next/app'
import { Provider } from 'react-redux';

import withRedux from 'next-redux-wrapper';
import initsStore from '../app/store';

class MyApp extends App {
  render () {
    const { Component, pageProps, store } = this.props

    return (
      <Provider store={store}>
        <div style={{
          maxWidth: '960px',
          margin: '50px auto',
        }}
        >
          <Link href="/">
            <a>Homepage</a>
          </Link>
          <Component {...pageProps} />
        </div>
      </Provider>
    )
  }
}

export default withRedux(initsStore)(MyApp);
