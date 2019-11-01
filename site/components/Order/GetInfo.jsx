import React from 'react';
import * as yup from 'yup';

import {NavButton} from "./NavButton";
import CartPage from "./CartPage";
import FormComponent from "../Form/FormComponent";

const userSchema = require('./json/userDetailsSchema.json');
const userOptions= require('./json/userDetailsOptions.json');

const formConfig = {
    schema: userSchema
};

const formValidation  = yup.object().shape({
    first_name: yup.string().required('First Name Is Required'),
    last_name: yup.string().required('Last Name Is Required'),
    email: yup.string().required('Email Is Required').email('Valid Email Is Required'),
    address1: yup.string().required('Address Is Required'),
    city: yup.string().required('City Is Required'),
    state: yup.string().required('State Is Required'),
    zip: yup.string().required('Zip Code Is Required'),
});

export default class extends CartPage {
    formSuccess = (data) => {
        this.sendEvent('COLLECTING_INFO',{user:data})
    };
    render() {
        let meta = this.getMeta();
        return (
            <React.Fragment>
                <h1>{meta.title}</h1>
                <FormComponent
                    config={formConfig}
                    validation={formValidation}
                    initialData={this.props.machineState.context.user}
                    previousAction={()=>this.sendEvent('PREVIOUS_STEP')}
                    nextActionLabel="Submit Payment Info"
                    submitForm={this.formSuccess}
                    submitLabel={meta.next}
                />
            </React.Fragment>
        )
    }

}