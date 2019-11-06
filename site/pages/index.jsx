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
    componentDidMount() {
        if (AppData.trans_menu) {
            window.addEventListener('scroll', NavBackgroundHandler);
        }
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
                        <Row>
                            <Col md={4}>
                                <ShoppingCart/>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <Footer data={AppData}/>

            </Layout>
        );
    }
}

export default Index;