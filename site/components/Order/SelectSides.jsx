import React from 'react';
import { object, number, string } from 'yup';

import {NavButton} from "./NavButton";
import CartPage from "./CartPage";
import {Button,  Input, InputGroup, InputGroupAddon } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let validationSchema = object().shape({
    name: string().required(),
    quantity: number().required().integer(),
    id: string().required(),
    price: number().required(),
    cost: number().required()
});

export default class extends CartPage {

    items = {
        small: {
            half: {
                id: 'smallHalf',
                name: 'Half Wall',
                price: 139.00
            },
            full: {
                id: 'smallFull',
                name: 'Full Wall',
                price: 79.00
            }
        },
        medium: {
            half: {
                id: 'mediumHalf',
                name: 'Half Wall',
                price: 137.00
            },
            full: {
                id: 'mediumFull',
                name: 'Full Wall',
                price: 119.00
            }
        },
        large: {
            half: {
                id: 'largeHalf',
                name: 'Half Wall',
                price: 139.00,
            },
            full: {
                id: 'largeFull',
                name: 'Full Wall',
                price: 149.00
            }
        }
    };

    constructor(props) {
        super(props);
        let tent = props.machineState.context.tent.id;
        let initialSides = this.items[tent];
        let initialState = {
            sides: {
                half: {
                    quantity: 0,
                    id: initialSides.half.id,
                    name: initialSides.half.name,
                    price: initialSides.half.price,
                    cost: 0
                },
                full: {
                    quantity: 0,
                    id: initialSides.full.id,
                    name: initialSides.full.name,
                    price: initialSides.full.price,
                    cost: 0
                },
                subtotal: 0,
                completed: false
            },
            validation: {
                half: true,
                full: true
            }
        };
        if (props.machineState.context.sides.completed) {
            let sides = this.items[props.machineState.context.tent.id];
            let halfCost = props.machineState.context.sides.half.quantity * sides.half.price;
            initialState.sides.half = {
                quantity: props.machineState.context.sides.half.quantity,
                id: sides.half.id,
                name: sides.half.name,
                price: sides.half.price,
                cost: halfCost
            };
            let fullCost = props.machineState.context.sides.full.quantity * sides.full.price;
            initialState.sides.full = {
                quantity: props.machineState.context.sides.full.quantity,
                id: sides.full.id,
                name: sides.full.name,
                price: sides.full.price,
                cost: fullCost
            };
            initialState.sides.subtotal = halfCost + fullCost;
        }
        this.state = initialState;
    }

    validateInput = (type) => {
        validationSchema
            .isValid(this.state.sides[type])
            .then((valid) => {
               this.setState({
                   validation: {
                       ...this.state.validation,
                       [type]: valid
                   }
               })
            });
    };

    updateValue = (type, currentQuantity) => {
        currentQuantity = currentQuantity ? currentQuantity : 0;
        let previousQuantity = this.state.sides[type].quantity;
        let tent = this.props.machineState.context.tent;
        let item = this.items[tent.id][type];
        let currentCost = currentQuantity * item.price;
        this.setState({
            sides: {
                ...this.state.sides,
                [type]: {
                    quantity: currentQuantity,
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    cost: currentCost
                }
            }
        },()=>{
            this.setState({
                sides: {
                    ...this.state.sides,
                    subtotal: this.state.sides.full.cost + this.state.sides.half.cost
                }
            });
            this.validateInput(type);
        })
    };

    increaseQuantity = (type) => {
        let previousQuantity = this.state.sides[type].quantity;
        let tent = this.props.machineState.context.tent;
        let item = this.items[tent.id][type];
        let currentQuantity = previousQuantity + 1;
        let currentCost = currentQuantity * item.price;
        this.setState({
            sides: {
                ...this.state.sides,
                [type]: {
                    quantity: currentQuantity,
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    cost: currentCost
                }
            }
        },()=>{
            this.setState({
                sides: {
                    ...this.state.sides,
                    subtotal: this.state.sides.full.cost + this.state.sides.half.cost
                }
            });
            this.validateInput(type);
        })
    };

    decreaseQuantity = (type) => {
        let previousQuantity = this.state.sides[type].quantity;
        let tent = this.props.machineState.context.tent;
        let item = this.items[tent.id][type];
        let currentQuantity = (previousQuantity > 1) ? previousQuantity - 1 : 0;
        let currentCost = currentQuantity * item.price;
        this.setState({
            sides: {
                ...this.state.sides,
                [type]: {
                    quantity: currentQuantity,
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    cost: currentCost
                }
            }
        },()=>{
            this.setState({
                sides: {
                    ...this.state.sides,
                    subtotal: this.state.sides.full.cost + this.state.sides.half.cost
                }
            })
        })
    };

    render() {
        let meta = this.getMeta();
        let sides = this.items[this.props.machineState.context.tent.id];
        return (
            <React.Fragment>
                <h1>{meta.title}</h1>

                <h3>{sides.half.name} (${sides.half.price})</h3>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <Button outline onClick={()=>this.decreaseQuantity('half')}>
                            <FontAwesomeIcon icon={['fal','minus']} />
                        </Button>
                    </InputGroupAddon>
                    <Input invalid={!this.state.validation.half} type="number" value={this.state.sides.half.quantity} onChange={(e)=>this.updateValue('half',e.target.value)}/>
                    <InputGroupAddon addonType="append">
                        <Button outline onClick={()=>this.increaseQuantity('half')}>
                            <FontAwesomeIcon icon={['fal','plus']} />
                        </Button>
                    </InputGroupAddon>
                </InputGroup>

                <h3>{sides.full.name} (${sides.full.price})</h3>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <Button outline onClick={()=>this.decreaseQuantity('full')}>
                            <FontAwesomeIcon icon={['fal','minus']} />
                        </Button>
                    </InputGroupAddon>
                    <Input invalid={!this.state.validation.full} type="number" value={this.state.sides.full.quantity} onChange={(e)=>this.updateValue('full',e.target.value)}/>
                    <InputGroupAddon addonType="append">
                        <Button outline onClick={()=>this.increaseQuantity('full')}>
                            <FontAwesomeIcon icon={['fal','plus']} />
                        </Button>
                    </InputGroupAddon>
                </InputGroup>

                <pre>{JSON.stringify(this.state,null,2)}</pre>

                <div className="d-flex justify-content-between">
                    <NavButton type="back" action={()=>this.sendEvent('PREVIOUS_STEP')}>Previous Step</NavButton>
                    <NavButton type="next" action={()=>this.sendEvent('SELECTING_SIDES',{sides:this.state.sides})}>{meta.next}</NavButton>
                </div>
            </React.Fragment>
        )
    }

}