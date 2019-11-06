import {Machine,assign,send} from "xstate";
import axios from "axios";
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.CRYPT_KEY;
const ENCRYPTION_TOKEN = process.env.CRYPT_TOKEN;

function encrypt(data) {
    const IV = Buffer.from(ENCRYPTION_TOKEN).toString('hex').slice(0, 16);
    const mykey = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), IV);
    let p = mykey.update(JSON.stringify(data), 'utf8', 'hex');
    let payload = p + mykey.final('hex');
    return payload;
}

const rawData = {
    tent: {
        id: null,
        name: null,
        price: null,
        image: null
    },
    sides: {
        half: {
            id: null,
            name: null,
            price: 0,
            quantity: 0,
            cost: 0
        },
        full: {
            id: null,
            name: null,
            price: 0,
            quantity: 0,
            cost: 0
        },
        subtotal: 0,
        completed: false
    },
    user: {
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        address1: null,
        address2: null,
        city: null,
        state: null,
        zip: null
    },
    order: {
        tent: 0,
        sides: 0,
        subtotal: 0,
        total: 0,
        token: null
    },
    receipt: {},
    error: null
};

const testData = {
    tent: {
        id: 'small',
        name: '10x10 Advertising Tent',
        price: 999.00,
        image: '/10x10.jpg'
    },
    sides: {
        half: {
            id: null,
            name: null,
            price: 0,
            quantity: 0,
            cost: 0
        },
        full: {
            id: null,
            name: null,
            price: 0,
            quantity: 0,
            cost: 0
        },
        subtotal: 0,
        completed: false
    },
    user: {
        first_name: "David",
        last_name: "Melo",
        email: "davidmelo@desmdesigns.com",
        phone: "7864990590",
        address1: "1061 Wren Avenue",
        address2: '',
        city: "Miami",
        state: "FL",
        zip: "33166"
    }
};

const OrderMachine = Machine(
    {
        id: 'checkout',
        initial: 'getTent',
        context: {
            tent: {
                id: null,
                name: null,
                price: null,
                image: null
            },
            sides: {
                half: {
                    id: null,
                    name: null,
                    price: 0,
                    quantity: 0,
                    cost: 0
                },
                full: {
                    id: null,
                    name: null,
                    price: 0,
                    quantity: 0,
                    cost: 0
                },
                subtotal: 0,
                completed: false
            },
            user: {
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: ''
            },
            order: {
                tent: 0,
                sides: 0,
                subtotal: 0,
                total: 0,
                token: null
            },
            receipt: {},
            error: null
        },
        states: {
            getTent: {
                meta: {
                    title: 'Select Tent',
                    next: 'Select Sides'
                },
                on: {
                    SELECTING_TENT: {
                        actions: ['updateTent', send('TENT_SELECTED')],
                    },
                    TENT_SELECTED: {
                        target: 'getSides',
                        cond: 'tentSelected'
                    }
                }
            },
            getSides: {
                meta: {
                    title: 'Select Sides',
                    next: 'Provide Your Info'
                },
                on: {
                    PREVIOUS_STEP: {
                        target: 'getTent'
                    },
                    SELECTING_SIDES: {
                        actions: ['updateSides', send('SIDES_SELECTED')],
                    },
                    SIDES_SELECTED: {
                        target: 'getInfo'
                    }
                }
            },
            getInfo: {
                meta: {
                    title: 'User & Shipping Info',
                    next: 'Provide Payment Details'
                },
                on: {
                    PREVIOUS_STEP: {
                        target: 'getSides'
                    },
                    COLLECTING_INFO: {
                        actions: ['updateUser', send('INFO_COLLECTED')],
                    },
                    INFO_COLLECTED: {
                        target: 'getPayment',
                        cond: 'userVerified'
                    }
                }
            },
            getPayment: {
                meta: {
                    title: 'Payment Information',
                    next: 'Review Your Order'
                },
                on: {
                    PREVIOUS_STEP: {
                        target: 'getInfo'
                    },
                    PAYMENT_INFO_COLLECTED: {
                        target: 'getToken',
                    }
                }
            },
            getToken: {
                invoke: {
                    src: 'getToken',
                    onDone: {
                        target: 'reviewOrder',
                        actions: ['updateOrder']
                    },
                    onError: {
                        target: 'getPayment',
                        actions: ['onError']
                    }
                }
            },
            reviewOrder: {
                meta: {
                    title: 'Review Your Order',
                    next: 'Submit Order'
                },
                on: {
                    PREVIOUS_STEP: {
                        target: 'getPayment'
                    },
                    GET_TENT: {
                        target: 'getTent'
                    },
                    GET_SIDES: {
                        target: 'getSides'
                    },
                    GET_INFO: {
                        target: 'getInfo'
                    },
                    GET_PAYMENT: {
                        target: 'getPayment'
                    },
                    ORDER_APPROVED: {
                        target: 'processOrder'
                    }
                }
            },
            processOrder: {
                invoke: {
                    src: 'processOrder',
                    onDone: {
                        target: 'orderSummary',
                        actions: ['updateReceipt']
                    },
                    onError: {
                        target: 'reviewOrder',
                        actions: ['onError']
                    }
                }
            },
            orderSummary: {
                meta: {
                    title: 'Order Successful'
                },
                type: 'final'
            }
        },
    },
    {
        actions: {
            updateTent:  assign((context,event)=>{
                if(event.data.tent){
                    let tent = event.data.tent;
                    return  {
                        ...context,
                        tent,
                        order: {
                            ...context.order,
                            tent: tent.price,
                            subtotal: tent.price,
                            total: tent.price
                        }
                    };
                }
            }),
            updateSides:  assign((context,event)=>{
                if(event.data.sides){
                    let sides = event.data.sides;
                    return  {
                        ...context,
                        sides: {
                            ...sides,
                            completed: true
                        },
                        order: {
                            ...context.order,
                            sides: sides.subtotal,
                            subtotal: context.tent.price + sides.subtotal,
                            total: context.tent.price + sides.subtotal
                        }
                    };
                }
            }),
            updateUser:  assign((context,event)=>{
                if(event.data.user){
                    let user = event.data.user;
                    return  {
                        ...context,
                        user
                    };
                }
            }),
            updateOrder:  assign((context,event)=>{
                return  {
                    ...context,
                    order: {
                        ...context.order,
                        token: event.data
                    }
                };
            }),
            updateReceipt:  assign({ receipt: (_, event) => event.data }),
            onError:  assign({ error: (_, event) => event.data })
        },
        guards: {
            tentSelected: (context) => {
                return !!context.tent.id;
            },
            userVerified: (context) => {
                return !!context.user.email;
            }
        },
        services: {
            getToken: (_, event) => {
                let payload = encrypt(event.data);
                return new Promise((resolve, reject) => {
                    axios.post('/api/token', { payload: payload })
                        .then((res)=>{
                            if(res.data.success) {
                                return resolve(res.data.token);
                            } else {
                                return reject(res.data.message);
                            }
                        })
                        .catch((error)=>{
                            return reject(error.message);
                        });
                });
            },
            processOrder: (context) => {
                let { tent, sides, user, order } = context;
                let payload = encrypt({tent, sides, user, order});
                return new Promise((resolve, reject) => {
                    axios.post('/api/charge', { payload: payload })
                        .then((res)=>{
                            if(res.data.success) {
                                return resolve(res.data.receipt);
                            } else {
                                return reject(res.data.message);
                            }
                        })
                        .catch((error)=>{
                            return reject(error.message);
                        });
                })
            }
        }
    }
);

export default OrderMachine;