import React from 'react';
import {Formik} from 'formik';
import _ from 'lodash';
import InputMask from 'react-input-mask';
import creditCardType from 'credit-card-type';
import cardImages from './card-images';

import {
    Row,
    Col,
    Form,
    FormGroup,
    FormFeedback,
    Label,
    Input,
    Button,
    Alert,
    InputGroupAddon,
    InputGroup
} from "reactstrap";

import Select from "./SingleSelect";
import MultiSelect from "./MultiSelect";
import CheckBoxGroup from "./CheckBoxGroup";

export default class FormComponent extends React.Component {
    config = {};
    validation = {};
    fields = [];
    values = {};
    state = {
        errorMessage: null,
        successMessage: null,
        cardMode: 'default'
    };
    constructor(props) {
        super(props);
        if ( typeof props.config === 'string' && props.config.length) {
            this.config = JSON.parse(props.config);
        } else
        if ( typeof props.config === 'object' ) {
            this.config = props.config;
        }
        if (props.validation){
            this.validation = props.validation;
        }
        _.each(this.config.schema.properties,(i,k) => {
            switch (i.input) {
                case 'multi-select':
                case 'checkbox':
                    this.values[k] = [];
                    break;
                case 'text':
                case 'email':
                default:
                    this.values[k] = '';
                    break;
            }
            if ( i.type === 'array' ) {
                i.options = i.items.enum;
            }
            this.fields.push({
                id: k,
                label: i.title,
                type: i.type,
                input: i.input,
                autocomplete: i.autocomplete,
                grid: typeof i.grid != 'undefined' ? i.grid : 12,
                required: typeof i.grid != 'undefined' ? i.required : false,
                options: typeof i.options != 'undefined' && Array.isArray(i.options)  ? i.options : [],
                mask: i.mask
            });
        });
        if (this.props.initialData) {
            this.values = {
                ...this.values,
                ...this.props.initialData
            };
        }
    }
    onSubmit = (values, {setSubmitting,resetForm}) => {
        this.setState({
            errorMessage: null,
            successMessage: null
        });
        let payload = {
            ...values
        };
        _.each(this.config.schema.properties,function(i,k){
            switch (i.input) {
                case 'multi-select':
                    payload[k] = Array.isArray(values[k]) ? values[k].map(t => t.value).join('; ') : "";
                    break;
                case 'checkbox':
                    payload[k] = Array.isArray(values[k]) ? values[k].map(t => t).join('; ') : "";
                    break;
                default:
                    break;
            }
        });
        this.props.submitForm(payload);
        setSubmitting(false);
    };
    render() {
        return (
            <Formik
                initialValues={this.values}
                validationSchema={this.validation}
                onSubmit={this.onSubmit}
            >
                {({values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting,setFieldValue,setFieldTouched}) => (
                    <Form onSubmit={handleSubmit}>

                        {!this.state.successMessage &&
                        <Row>

                            {this.fields.map((i,k) => (
                                <Col key={k} md={i.grid}>
                                    <FormGroup >

                                        <Label for={i.id} className={!!errors[i.id]?'text-danger':''}>
                                            <strong>
                                                {i.label}
                                                {' '}
                                                {i.required && (
                                                    <span className="text-danger">*</span>
                                                )}
                                            </strong>
                                        </Label>

                                        {(()=>{

                                            switch (i.input) {

                                                case 'card':



                                                    let defaultMask = "9999 9999 9999 9999";
                                                    let amexMask = "9999 999999 99999";
                                                    let cards = creditCardType(values[i.id]);
                                                    let mask = (cards.length === 1) ? (cards[0].type === 'american-express') ? amexMask : defaultMask : defaultMask;
                                                    let image = cardImages.placeholder;
                                                    if (cards.length === 1) {
                                                        switch (cards[0].type) {
                                                            case 'visa':
                                                                image = cardImages.visa;
                                                                break;
                                                            case 'mastercard':
                                                                image = cardImages.mastercard;
                                                                break;
                                                            case 'american-express':
                                                                image = cardImages.amex;
                                                                break;
                                                        }
                                                    }
                                                    return (
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend" className={touched[i.id]&&!errors[i.id]?'is-valid':!!errors[i.id]?'is-invalid':''}><span className="input-group-text"><img src={image} alt="card-type" height={17}/></span></InputGroupAddon>
                                                            <Input type={i.input} name={i.id} onChange={handleChange} onBlur={handleBlur} value={values[i.id]} valid={touched[i.id]&&!errors[i.id]} invalid={!!errors[i.id]} autoComplete={i.autocomplete} mask={mask} tag={InputMask} maskChar=" "/>
                                                        </InputGroup>
                                                    );

                                                case 'text':
                                                case 'textarea':
                                                case 'email':
                                                    if(i.mask){
                                                        return <Input type={i.input} name={i.id} onChange={handleChange} onBlur={handleBlur} value={values[i.id]} valid={touched[i.id]&&!errors[i.id]} invalid={!!errors[i.id]} autoComplete={i.autocomplete} mask={i.mask} tag={InputMask} maskChar=" "/>;
                                                    }
                                                    return <Input type={i.input} name={i.id} onChange={handleChange} onBlur={handleBlur} value={values[i.id]} valid={touched[i.id]&&!errors[i.id]} invalid={!!errors[i.id]} autoComplete={i.autocomplete}/>;

                                                case 'multi-select':
                                                    return <MultiSelect
                                                        id={i.id}
                                                        value={values[i.id]}
                                                        options={i.options}
                                                        onChange={setFieldValue}
                                                        onBlur={setFieldTouched}
                                                        valid={touched[i.id]&&!errors[i.id]}
                                                        invalid={!!errors[i.id]}
                                                        touched={touched[i.id]}
                                                    />;

                                                case 'state_select':
                                                    return <Select
                                                        id={i.id}
                                                        value={values[i.id]}
                                                        mode="state"
                                                        options={i.options}
                                                        onChange={setFieldValue}
                                                        onBlur={setFieldTouched}
                                                        valid={touched[i.id]&&!errors[i.id]}
                                                        invalid={!!errors[i.id]}
                                                        touched={touched[i.id]}
                                                    />;

                                                case 'cc_month_select':
                                                    return <Select
                                                        id={i.id}
                                                        value={values[i.id]}
                                                        mode="cc_month"
                                                        options={i.options}
                                                        onChange={setFieldValue}
                                                        onBlur={setFieldTouched}
                                                        valid={touched[i.id]&&!errors[i.id]}
                                                        invalid={!!errors[i.id]}
                                                        touched={touched[i.id]}
                                                    />;

                                                case 'cc_year_select':
                                                    return <Select
                                                        id={i.id}
                                                        value={values[i.id]}
                                                        mode="cc_year"
                                                        options={i.options}
                                                        onChange={setFieldValue}
                                                        onBlur={setFieldTouched}
                                                        valid={touched[i.id]&&!errors[i.id]}
                                                        invalid={!!errors[i.id]}
                                                        touched={touched[i.id]}
                                                    />;

                                                case 'select':
                                                    return <Select
                                                        id={i.id}
                                                        value={values[i.id]}
                                                        options={i.options}
                                                        onChange={setFieldValue}
                                                        onBlur={setFieldTouched}
                                                        valid={touched[i.id]&&!errors[i.id]}
                                                        invalid={!!errors[i.id]}
                                                        touched={touched[i.id]}
                                                    />;

                                                case 'checkbox':
                                                    return <CheckBoxGroup
                                                        id={i.id}
                                                        options={i.options}
                                                        valid={touched[i.id]&&!errors[i.id]}
                                                        invalid={!!errors[i.id]}
                                                        touched={touched[i.id]}
                                                        values={values}
                                                        setFieldValue={setFieldValue}
                                                    />;

                                                default:
                                                    return null;

                                            }
                                        })()}

                                        {errors[i.id] && touched[i.id] && <FormFeedback>{errors[i.id]}</FormFeedback>}

                                    </FormGroup>
                                </Col>
                            ))}

                        </Row>
                        }

                        {this.state.successMessage &&
                        <Alert color="success" className="mb-0">
                            {this.state.successMessage}
                        </Alert>
                        }

                        {this.state.errorMessage &&
                        <Alert color="danger">
                            {this.state.errorMessage}
                        </Alert>
                        }

                        <div className="d-flex justify-content-between">

                            <Button onClick={this.props.previousAction} size="lg" outline color="secondary">Previous Step</Button>

                            <Button type="submit" size="lg" color="primary" disabled={isSubmitting}>
                                { isSubmitting ? 'Loading...' : this.props.nextActionLabel }
                            </Button>

                        </div>

                    </Form>
                )}
            </Formik>
        );
    }
}