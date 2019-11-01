import React from 'react';
import {NavButton} from "./NavButton";
import CartPage from "./CartPage";

export default class extends CartPage {

    render() {
        let meta = this.getMeta();
        return (
            <React.Fragment>
                <h1>{meta.title}</h1>
            </React.Fragment>
        )
    }

}