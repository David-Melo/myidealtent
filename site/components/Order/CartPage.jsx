import React from 'react';
import {mergeMeta} from "./utils";

export default class extends React.Component {

    getMeta = () => {
        return mergeMeta(this.props.machineState.meta)
    };

    sendEvent = (event,data={}) => {
        this.props.machine.send({
            type: event,
            data: data
        });
    };

}