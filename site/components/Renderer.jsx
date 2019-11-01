import React, {Fragment} from "react";
import PropTypes from "prop-types";

import Section from "../components/Section";
import FormSection from "../components/FormSection";

class Renderer extends React.Component {
    constructor(props) {
        super(props);
        let defaultState = {};
        if ( typeof props.data === 'string' && props.data.length) {
            defaultState = JSON.parse(props.data);
        }
        this.state = {
            data: defaultState
        };
    }
    render() {
        return(
            <Fragment>
                {this.state.data.map((i,k)=>(
                    <Fragment key={k}>
                        { i.layout==='section' && <Section data={i.attributes} />}
                        { i.layout==='form_section' && <Section data={i.attributes} />}
                    </Fragment>
                ))}
            </Fragment>
        )
    }
}

Renderer.propTypes = {
    data: PropTypes.string.isRequired
};

export default Renderer;
