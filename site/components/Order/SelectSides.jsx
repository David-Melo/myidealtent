import React from 'react';
import dynamic from 'next/dynamic'

import {NavButton} from "./NavButton";
import CartPage from "./CartPage";
import {Col, Row} from "reactstrap";

const ItemSelect = dynamic(
    () => import('./ItemSelect'),
    { ssr: false }
);

export default class extends CartPage {

    state = {
        item: null
    };

    items = {
        smallHalf: {
            id: 'smallHalf',
            tent: 'small',
            name: 'Half Wall',
            price: 139.00,
            image: '/static/HalfWall.jpg'
        },
        smallFull: {
            id: 'smallFull',
            tent: 'small',
            name: 'Full Wall',
            price: 79.00,
            image: '/static/FullWall.jpg'
        },
        mediumHalf: {
            id: 'mediumHalf',
            tent: 'medium',
            name: 'Half Wall',
            price: 137.00,
            image: '/static/HalfWall.jpg'
        },
        mediumFull: {
            id: 'mediumFull',
            tent: 'medium',
            name: 'Full Wall',
            price: 119.00,
            image: '/static/FullWall.jpg'
        },
        largeHalf: {
            id: 'largeHalf',
            tent: 'large',
            name: 'Half Wall',
            price: 139.00,
            image: '/static/HalfWall.jpg'
        },
        largeFull: {
            id: 'largeFull',
            tent: 'large',
            name: 'Full Wall',
            price: 149.00,
            image: '/static/FullWall.jpg'
        }
    };

    constructor(props) {
        super(props);
        if (props.machineState.context.sides) {
            this.state = {
                item: this.props.machineState.context.sides
            }
        }
    }

    mapItems = () => {
        let  tent =this.props.machineState.context.tent;
        console.log(tent.id);
        let itemsArray = Object.keys(this.items).map((itemId)=>{
            return this.items[itemId];
        });
        return itemsArray.filter((i)=>{
            return i.tent === tent.id;
        }).map((item)=>{
            return { value: item.id, label: `${item.name} ($${item.price})` };
        })
    };

    getItemValue = (itemId) => {
        return { value: this.items[itemId].id, label: `${this.items[itemId].name} ($${this.items[itemId].price})` };
    };

    selectItem = (id) => {
        if(!id) {
            this.setState({
                item: null
            })
        } else {
            this.setState({
                item: this.items[id]
            })
        }
    };

    render() {
        let meta = this.getMeta();
        return (
            <React.Fragment>
                <h1>{meta.title}</h1>
                <Row>
                    <Col>
                        {this.state.item&&(
                            <div>
                                <h1>{this.state.item.name} (${this.state.item.price})</h1>
                                <img src={this.state.item.image} height={300}/>
                            </div>
                        )}
                    </Col>
                    <Col>
                        <ItemSelect value={this.state.item?this.getItemValue(this.state.item.id):null} options={this.mapItems()} onItemSelected={this.selectItem}/>
                    </Col>
                </Row>
                <div className="d-flex justify-content-between">
                    <NavButton type="back" action={()=>this.sendEvent('PREVIOUS_STEP')}>Previous Step</NavButton>
                    <NavButton type="next" action={()=>this.sendEvent('SELECTING_SIDES',{sides:this.state.item})}>{meta.next}</NavButton>
                </div>
            </React.Fragment>
        )
    }

}