import React, {Fragment} from "react";
import Head from 'next/head';

class Waves extends React.Component {
    componentDidMount() {
        this.effect = window.VANTA.WAVES({
            el: "#waves-element",
            waveSpeed: 0.65
        });
    }
    componentWillUnmount() {
        if (this.effect) this.effect.destroy()
    }
    render() {
        return (
            <Fragment>
                <Head>
                    <script src="/static/three.r92.min.js"/>
                    <script src="/static/vanta.waves.min.js"/>
                </Head>
                <div id="waves-element">
                    <div className="waves-content">
                        <h1 className="text-center bold-typed text-white">The Best Partner Program Around</h1>
                        <h2 className="text-center">Guaranteed Consistent Income & Partner Growth</h2>
                        <div className="text-center d-md-none d-lg-none d-xl-none">
                            <a href="#find-out-more" className="btn btn-lg btn-success" title="Interested?">Get More
                                Information</a>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Waves;
