import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import {GoogleAnalytics} from "../utils/GoogleAnalytics";

import AppData from "../app";

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const isProduction = process.env.NODE_ENV === 'production';
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps, isProduction }
    }

    render() {
        return (
            <Html lang='en'>
                <Head>
                    <GoogleAnalytics code={AppData.gaCode} />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="icon" type="image/x-icon" href="/static/favicon.png" />
                    <script src="https://js.stripe.com/v3/"/>
                    {/*<script src="//code.jivosite.com/widget.js" data-jv-id="aZC2GqC7YF" async></script>*/}
                </Head>
                <body>
                    <div id="main-body" className="at-top">
                        <Main />
                        <NextScript />
                    </div>
                </body>
            </Html>
        )
    }

}

export default MyDocument
