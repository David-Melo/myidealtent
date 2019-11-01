import React, {Fragment} from "react";
import Select from 'react-select';
import {stateOptions, ccMonthOptions, ccYearOptions} from "./select-options";

export default class SingleSelect extends React.Component {
    id = 'values';
    constructor(props){
        super(props);
        this.id = this.props.id;
    }
    handleChange = option => {
        this.props.onChange(this.id, option.value);
    };
    handleBlur = () => {
        this.props.onBlur(this.id, true);
    };
    getMonthValue = (month) => {
        let monthValue = ccMonthOptions.find((i)=>{
            return i.value === month;
        });
        return monthValue ? monthValue : null;
    };
    getYearValue = (year) => {
        let yearValue = ccYearOptions.find((i)=>{
           return i.value === year;
        });
        return yearValue ? yearValue : null;
    };
    getStateValue = (state) => {
        let stateValue = stateOptions.find((i)=>{
            return i.value === state;
        });
        return stateValue ? stateValue : null;
    };
    render() {
        const validClass = `${ this.props.valid ? 'is-valid' : this.props.touched ? 'is-invalid' : ''}`;
        let options = this.props.options;
        let value = this.props.value;
        if (this.props.mode) {
            switch (this.props.mode) {
                case 'cc_month':
                    options = ccMonthOptions;
                    value = this.getMonthValue(value);
                    break;
                case 'cc_year':
                    options = ccYearOptions;
                    value = this.getYearValue(value);
                    break;
                case 'state':
                    options = stateOptions;
                    value = this.getStateValue(value);
                    break;
            }
        }
        return (
            <Fragment>
                <Select
                    className={`react-select ${validClass}`}
                    instanceId={this.props.id}
                    id={this.props.id}
                    options={options}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    value={value}
                    styles={
                        {
                            control: (styles, { data }) => ({
                                ...styles,
                                borderColor: this.props.invalid || ( this.props.touched && !this.props.valid ) ? '#dc3545' : this.props.valid ? '#28a745' : '#ced4da',
                            })
                        }
                    }
                />
            </Fragment>
        );
    }
}