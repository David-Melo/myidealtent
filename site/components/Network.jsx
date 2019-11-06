import React, {Fragment} from "react";
import Head from 'next/head';

class Network extends React.Component {
    componentDidMount() {
        this.effect = window.VANTA.NET({
            el: "#net-element",
            color: 0x2c5a64,
            backgroundColor: 0x221e2a,
            points: 9.00,
            maxDistance: 22.00,
            spacing: 16.00,
            backgroundAlpha: 1.00
        });
    }
    componentWillUnmount() {
        if (this.effect) this.effect.destroy()
    }
    render() {
        return (
            <Fragment>
                <Head>
                    <script src="/three.r92.min.js"/>
                    <script src="/vanta.net.min.js"/>
                </Head>
                <div id="net-element" style={{backgroundColor: '#0073b8',height: '60vh'}}>
                    <div className="waves-content" dangerouslySetInnerHTML={{__html: this.props.config.content}}/>
                </div>
            </Fragment>
        )
    }
}

export default Network;
