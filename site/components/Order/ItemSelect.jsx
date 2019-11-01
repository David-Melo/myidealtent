import React from 'react';
import Select from 'react-select';

export default class extends React.Component {

    state = {
        selectedOption: null,
    };

    componentDidMount() {
        if (this.props.value) {
            this.setState({
                selectedOption: this.props.value
            })
        }
    }

    handleChange = selectedOption => {
        this.setState(
            { selectedOption },
            () => {
                this.props.onItemSelected(selectedOption.value);
            })
    };

    render() {
        const { selectedOption } = this.state;
        const { options } = this.props;

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
            />
        );
    }
}