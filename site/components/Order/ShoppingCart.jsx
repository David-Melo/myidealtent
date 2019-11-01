import React from 'react';
import { Machine, interpret } from 'xstate';

import OrderMachine from './Machine';
import {mergeMeta} from "./utils";

import SelectTent from "./SelectTent";
import SelectSides from "./SelectSides";
import GetInfo from "./GetInfo";
import GetPayment from "./GetPayment";
import ReviewOrder from "./ReviewOrder";
import OrderSummary from "./OrderSummary";
import {Alert} from "reactstrap";

export default class ShoppingCart extends React.Component {

    state = {
        machineState: OrderMachine.initialState
    };

    machine = interpret(OrderMachine).onTransition(machineState =>{
        this.setState({ machineState })
    });

    componentDidMount() {
        this.machine.start();
    }

    componentWillUnmount() {
        this.machine.stop();
    }

    render() {
        let {value, context, matches, meta} = this.state.machineState;

        return (
            <div className="shopping-cart">

                {context.error&&(
                    <Alert color="danger">
                        {context.error}
                    </Alert>
                )}

                { ( matches('getToken') || matches('processOrder') ) &&
                    <div>Loading...</div>
                }

                { matches('getTent') &&
                    <SelectTent machineState={this.state.machineState} machine={this.machine}/>
                }

                { matches('getSides') &&
                    <SelectSides machineState={this.state.machineState} machine={this.machine}/>
                }

                { matches('getInfo') &&
                    <GetInfo machineState={this.state.machineState} machine={this.machine}/>
                }

                { matches('getPayment') &&
                    <GetPayment machineState={this.state.machineState} machine={this.machine}/>
                }

                { matches('reviewOrder') &&
                    <React.Fragment>
                        <ReviewOrder machineState={this.state.machineState} machine={this.machine}/>
                        <pre>{JSON.stringify(context, null, 2)}</pre>
                    </React.Fragment>
                }

                { matches('orderSummary') &&
                    <React.Fragment>
                        <OrderSummary machineState={this.state.machineState} machine={this.machine}/>
                        <pre>{JSON.stringify(context, null, 2)}</pre>
                    </React.Fragment>
                }

                {/*<pre>{JSON.stringify(context, null, 2)}</pre>*/}

            </div>

        )
    }

}