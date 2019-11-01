import React, {Fragment} from "react";

export default class CheckBoxGroup extends React.Component {
    render() {
        const validClass = `${ this.props.valid ? 'is-valid' : this.props.touched ? 'is-invalid' : ''}`;
        const props = this.props;
        return (
            <div className={`react-checkbox ${validClass}`}>
                {this.props.options.map((option,k) => (
                    <div key={k}>
                        <label>
                            <input
                                name={props.id}
                                type="checkbox"
                                value={option}
                                checked={props.values[props.id].includes(option)}
                                onChange={() => {
                                    if (props.values[props.id].includes(option)) {
                                        const nextValue = props.values[props.id].filter(
                                            value => value !== option
                                        );
                                        props.setFieldValue(props.id, nextValue);
                                    } else {
                                        const nextValue = props.values[props.id].concat(option);
                                        props.setFieldValue(props.id, nextValue);
                                    }
                                }}
                            />{" "}
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        )
    }
}