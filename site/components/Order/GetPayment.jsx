import React from 'react';
import cardValidator from "card-validator";
import * as yup from 'yup';

import {NavButton} from "./NavButton";
import CartPage from "./CartPage";
import FormComponent from "../Form/FormComponent";

const cardSchema = require('./json/cardDetailsSchema.json');

const formConfig = {
    schema: cardSchema
};

const formValidation  = yup.object().shape({
    cc_number: yup.string()
        .test('cc_number','Credit Card Number Is Invalid', (value)=>cardValidator.number(value,{maxLength: 16}).isValid)
        .required('Credit Card Number Is Required'),
    cc_exp_month: yup.string()
        .test('cc_exp_month','Expiration Month Is Invalid', (value)=>cardValidator.expirationMonth(value).isValid)
        .required('Expiration Month Is Required'),
    cc_exp_year: yup.string()
        .test('cc_exp_year','Expiration Year Is Invalid', (value)=>cardValidator.expirationYear(value).isValid)
        .required('Expiration Year Is Required'),
    cc_code: yup.string()
        .test('cc_code','CVV Is Invalid', (value)=>cardValidator.cvv(value,[3,4]).isValid)
        .required('CVV Is Required'),
});

export default class extends CartPage {
    formSuccess = (data) => {
        this.sendEvent('PAYMENT_INFO_COLLECTED', data);
    };
    render() {
        let meta = this.getMeta();
        return (
            <React.Fragment>
                <h1>{meta.title}</h1>
                <FormComponent
                    config={formConfig}
                    initialData={{
                        cc_number: '',
                        cc_exp_month: '',
                        cc_exp_year: '',
                        cc_code: '',
                    }}
                    validation={formValidation}
                    previousAction={()=>this.sendEvent('PREVIOUS_STEP')}
                    nextActionLabel="Review Order"
                    submitForm={this.formSuccess}
                    submitLabel={meta.next}
                />
            </React.Fragment>
        )
    }

}