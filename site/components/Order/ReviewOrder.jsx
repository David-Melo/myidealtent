import React from 'react';
import {NavButton} from "./NavButton";
import CartPage from "./CartPage";

export default class extends CartPage {

    render() {
        let meta = this.getMeta();
        return (
            <React.Fragment>
                <h1>{meta.title}</h1>
                <div className="d-flex justify-content-between">
                    <NavButton type="back" action={()=>this.sendEvent('PREVIOUS_STEP')}>Previous Step</NavButton>
                    <NavButton type="next" action={()=>this.sendEvent('ORDER_APPROVED')}>{meta.next}</NavButton>
                </div>
            </React.Fragment>
        )
    }

}