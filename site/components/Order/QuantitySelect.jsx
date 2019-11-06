import React from 'react';
import Select from 'react-select';

export default class extends React.Component {

    state = {
        selectedOption: null,
    };

    componentDidMount() {
        if (this.props.value) {
            this.setState({
                selectedOption: {value:this.props.value,label:this.props.value}
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
                options={[
                    {value:1,label:1},
                    {value:2,label:2},
                    {value:3,label:3},
                    {value:4,label:4}
                ]}
            />
        );
    }
}