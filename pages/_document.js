/* eslint-disable react/no-danger */

import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { renderStatic } from 'glamor/server';

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = renderStatic(() => page.html);
    return { ...page, ...styles };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids;
    }
  }

  render() {
    return (
      <html lang="en-US">
        <Head>
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          <title>Dire Tools: Table</title>
          <link rel="stylesheet" href="/static/css/index.css" />
          <link rel="shortcut icon" href="/static/img/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="/static/img/favicon.ico" type="image/x-icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
