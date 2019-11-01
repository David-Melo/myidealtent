import React, {Fragment} from 'react';
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import PropTypes from 'prop-types';

import FullScreenNav from "../components/FullScreenNav";

const parseCta = (app,page) => {

    let pageCtaMode = page && page.cta_mode ? page.cta_mode : 'both';

    let isAppCtaSet  = app && app.cta_mode && app.cta_link && app.cta_title && app.cta_text;
    let isPageCtaSet = page && page.cta_mode && page.cta_link && page.cta_title && page.cta_text;

    let appCta = isAppCtaSet ? {
        cta_mode: app.cta_mode,
        cta_link: app.cta_link,
        cta_title: app.cta_title,
        cta_text: app.cta_text
    } : null;

    let pageCta = isPageCtaSet ? {
        cta_mode: page.cta_mode,
        cta_link: page.cta_link,
        cta_title: page.cta_title,
        cta_text: page.cta_text
    } : null;

    if (pageCtaMode !== 'both') return false;

    let finalCta = appCta && !pageCta ? appCta : pageCta;

    if (!finalCta) return false;

    return finalCta.cta_link && finalCta.cta_title && finalCta.cta_text ? {link:finalCta.cta_link,title:finalCta.cta_title,text:finalCta.cta_text} : null;

};

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        let { app,page,slug } = this.props;

        let isPage = !!page;

        let navObj = app.nav_data ? app.nav_data : false;
        let navCollection = app.navcollection && app.navcollection.pages.length ? app.navcollection.pages : false;
        let nav = navObj ? navObj : navCollection ? navCollection : null;

        let cta = parseCta(app,isPage?page:null);

        return (
            <div className={app.trans_menu?'nav-transparent':''}>
                <Navbar id="main-nav" fixed="top" color="light" light={!app.trans_menu} dark={app.trans_menu} expand="lg">
                    <Container className="nav-container">
                        <NavbarBrand href="/">
                            <img className="nav-icon" src={`/static/${app.logo_image}`} alt={app.name} height="80" />
                        </NavbarBrand>
                        {cta && ( app.cta_mode === 'both' || app.cta_mode === 'desktop' ) && (
                            <div className="d-none d-lg-block">
                                <Nav className="nav-cta-wrapper ml-4" navbar>
                                    <NavItem>
                                        <NavLink href={cta.link} title={cta.title} className="nav-cta">{cta.text}</NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                        )}
                        {nav && (
                            <Fragment>

                                <FullScreenNav app={app} collection={nav} cta={cta}/>

                                <Collapse navbar>

                                    <Nav className="ml-auto" navbar>
                                        {nav.map((i,k)=>(
                                            <NavItem key={k}>
                                                <NavLink href={i.slug} title={i.title} active={i.slug===slug}>{i.title}</NavLink>
                                            </NavItem>
                                        ))}
                                    </Nav>

                                </Collapse>
                            </Fragment>
                        )}

                    </Container>
                </Navbar>
            </div>
        );
    }
}

Navigation.propTypes = {
    app: PropTypes.object
};

export default Navigation;
