import React, {Fragment} from "react";
import posed from "react-pose";
import Burger from '@animated-burgers/burger-squeeze';
import {NavbarBrand} from "reactstrap";

const Nav = posed.div({
    open: {
        y: '0%',
        delayChildren: 200,
        staggerChildren: 50,
        transition: {
            y: {
                type: 'spring',
                stiffness: 300,
                damping: 50,
                mass: 1
            },
            default: {
                duration: 300
            }
        }
    },
    closed: {
        y: '-100%',
        delay: 300
    }
});

const Item = posed.li({
    open: {
        y: 0,
        opacity: 1
    },
    closed: {
        y: 20,
        opacity: 0
    }
});

const Div = posed.div({
    open: {
        y: 0,
        opacity: 1
    },
    closed: {
        y: 20,
        opacity: 0
    }
});

class FullScreenNav extends React.Component {
    state = {
        isOpen: false
    };
    toggleNav = () => this.setState({ isOpen: !this.state.isOpen });
    componentDidMount() {
        document.getElementById('full-nav').className = "";
    }
    componentWillUnmount() {}
    render() {
        let { collection, cta, app } = this.props;
        return (
            <div id="full-nav" className="hidden">
                <Burger style={{fontSize:'8px'}} isOpen={ this.state.isOpen } onClick={this.toggleNav} />

                <Nav className="sidebar" pose={this.state.isOpen ? 'open' : 'closed'}>

                    <Div className="full-nav-head">

                        <div className="text-center mb-3">
                            <img className="nav-icon" src={`/${app.favicon}`} alt={app.name} height="50" />
                        </div>

                        <Fragment>
                            <div className="text-center h2 bold-typed"><span className="text-logo">Dekor<span className="highlight">a</span></span></div>
                            <div className="text-center">{app.tagline}</div>
                        </Fragment>

                    </Div>

                   <div className="full-nav-menu my-3">

                       <ul>
                           {collection && collection.map((i,k)=>(
                               <Item key={k+1} >
                                   <a className="btn btn-primary btn-block" href={i.slug} title={i.title} onClick={this.toggleNav}>
                                       {i.title}
                                   </a>
                               </Item>
                           ))}

                       </ul>

                   </div>

                    {cta && ( app.cta_mode === 'both' || app.cta_mode === 'mobile' ) && (
                        <Div className="full-nav-cta text-center">
                            <div>{cta.title}</div>
                            <a onClick={this.toggleNav} href={cta.link} title={cta.title}>{cta.text}</a>
                        </Div>
                    )}

                </Nav>

            </div>
        )
    }
}

export default FullScreenNav;
