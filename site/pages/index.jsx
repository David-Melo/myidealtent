import React from "react";

import Layout from '../layouts/Page';

import Navigation from "../components/Navigation";
import NavBackgroundHandler from "../utils/NavBackgroundHandler";
import Style from "../components/Style";
import Meta from "../components/Meta";
import Footer from "../components/Footer";

import AppData from '../app.json';
import {Col, Container, Row} from "reactstrap";
import ShoppingCart from "../components/Order/ShoppingCart";

class Index extends React.Component {
    constructor() {
        super();
        this.state = {stripe: null};
    }
    componentDidMount() {
        if (AppData.trans_menu) {
            window.addEventListener('scroll', NavBackgroundHandler);
        }
        this.setState({stripe: window.Stripe('pk_test_8h2mcy6VMmCJj3JIE5BcCWAW00UIbA2y3q')});
    }
    componentWillUnmount() {
        if (AppData.trans_menu) {
            window.removeEventListener('scroll', NavBackgroundHandler);
        }
    }
    render() {
        return (
            <Layout>

                <Style data={AppData}/>

                <Meta app={AppData} />

                <Navigation app={AppData} slug={null}/>

                <section>
                    <Container>
                        <ShoppingCart/>
                    </Container>
                </section>

                <Footer data={AppData}/>

            </Layout>
        );
    }
}

export default Index;