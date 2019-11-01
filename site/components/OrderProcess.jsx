import React from 'react';
import { Machine, interpret } from 'xstate';

export default class OrderProcess extends React.Component {

    state = {
        current: toggleMachine.initialState
    };

    render() {
        return (
            <h1>MyCart</h1>
        )
    }

}