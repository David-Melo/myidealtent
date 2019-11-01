import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios';
import {NavButton} from "./NavButton";
import {Button} from "reactstrap";

class PaymentForm extends Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit(ev) {
        this.props.stripe.createToken({name: "Name"})
            .then((res)=>{
                this.props.onTokenSuccess(res.token.id)
            })
            .catch((err)=>{
                this.props.onTokenError(err);
            })
    }

    getToken = () => {
        alert('getToken')
    };

    render() {
        return (
            <div className="checkout">
                <CardElement />
                <div className="d-flex justify-content-between">
                    <NavButton type="previous" action={this.submit}>Review Order</NavButton>
                    <NavButton type="next" action={this.submit}>Review Order</NavButton>
                </div>

            </div>
        );
    }
}

export default injectStripe(PaymentForm);