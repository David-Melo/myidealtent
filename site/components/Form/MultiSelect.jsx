import React, {Fragment} from "react";
import Select from 'react-select';

export default class MultiSelect extends React.Component {
    id = 'values';
    constructor(props){
        super(props);
        this.id = this.props.id;
    }
    handleChange = value => {
        this.props.onChange(this.id, value);
    };
    handleBlur = () => {
        this.props.onBlur(this.id, true);
    };
    render() {
        const validClass = `${ this.props.valid ? 'is-valid' : this.props.touched ? 'is-invalid' : ''}`;
        return (
            <Fragment>
                <Select
                    className={`react-select ${validClass}`}
                    instanceId={this.props.id}
                    id={this.props.id}
                    options={this.props.options}
                    isMulti
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    value={this.props.value}
                    styles={
                        {
                            control: (styles, { data }) => ({
                                ...styles,
                                borderColor: this.props.invalid || ( this.props.touched && !this.props.valid ) ? '#dc3545' : this.props.valid ? '#28a745' : '#ced4da',
                            }),
                            multiValueLabel: (styles, { data }) => ({
                                ...styles,
                                color: 'black',
                                fontWeight: 400
                            })
                        }
                    }
                />
            </Fragment>
        );
    }
}