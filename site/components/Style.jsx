import React, { Fragment } from 'react';
import _ from "lodash";

const makeStyles = (colors) => {

    let textStyles = [];
    let bgStyles = [];
    let btnStyles = [];

    _.each(colors,function(i,k){
        textStyles.push(`.text-${k} { color: ${i} !important; }`);
        bgStyles.push(`.bg-${k} { background-color: ${i} !important; }`);
        btnStyles.push(`.btn-${k} { background-color: ${i}; border-color: ${i} !important; }`);
    });

    return [
        textStyles.join(' '),
        bgStyles.join(' '),
        btnStyles.join(' '),
    ].join(' ');

};

class Style extends React.Component {
    styles = '';
    constructor(props) {
        super(props);
        this.styles = makeStyles({
            black: props.data.color_black,
            danger: props.data.color_danger,
            info: props.data.color_info,
            primary: props.data.color_primary,
            secondary: props.data.color_secondary,
            success: props.data.color_success,
            warning: props.data.color_warning,
            white: props.data.color_white,
        });
    }
    render() {
        return (
            <Fragment>
                <style>{`${this.props.data.css} ${this.styles}`}</style>
            </Fragment>
        )
    }
}

export default Style;
