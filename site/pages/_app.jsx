import React from 'react'
import App from 'next/app';

import "../scss/style.scss"

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faMinus } from '@fortawesome/pro-light-svg-icons';

library.add(faPlus, faMinus);



class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <Component {...pageProps} />
            </>
        )
    }
}

export default MyApp