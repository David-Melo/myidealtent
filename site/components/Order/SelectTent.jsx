import React from 'react';
import dynamic from 'next/dynamic'

import {NavButton} from "./NavButton";
import CartPage from "./CartPage";
import {Row,Col} from "reactstrap";

const ItemSelect = dynamic(
    () => import('./ItemSelect'),
    { ssr: false }
);

export default class extends CartPage {

    state = {
        item: null
    };

    items = {
        small: {
            id: 'small',
            name: '10x10 Advertising Tent',
            price: 999.00,
            image: '/10x10.jpg'
        },
        medium: {
            id: 'medium',
            name: '10x15 Advertising Tent',
            price: 1299.00,
            image: '/10x15.jpg'
        },
        large: {
            id: 'large',
            name: '10x20 Advertising Tent',
            price: 1599.00,
            image: '/10x20.jpg'
        }
    };

    constructor(props) {
        super(props);
        if (props.machineState.context.tent) {
            this.state = {
                item: this.props.machineState.context.tent
            }
        }
    }

    mapItems = () => {
        return Object.keys(this.items).map((itemId)=>{
            return { value: this.items[itemId].id, label: `${this.items[itemId].name} ($${this.items[itemId].price})` };
        })
    };

    getItemValue = (itemId) => {
        if(!itemId) return null;
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
                    <div></div>
                    <NavButton type="next" action={()=>this.sendEvent('SELECTING_TENT',{tent:this.state.item})}>{meta.next}</NavButton>
                </div>
            </React.Fragment>
        )
    }

}