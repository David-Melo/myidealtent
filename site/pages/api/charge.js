const stripe = require("stripe")(process.env.STRIPE_KEY);
const {decrypt} = require("./utils");
const {saveOrder} = require("./saveOrder");
const hri = require('human-readable-ids').hri;

export default (req, res) => {

    try {

        let payload = decrypt(req.body.payload);
        let data = JSON.parse(payload);

        stripe.customers.create({
            source: data.order.token,
            name: `${data.user.first_name} ${data.user.last_name}`,
            email: data.user.email,
            phone: data.user.phone,
            address: {
                line1: data.user.address1,
                line2: data.user.address2,
                city: data.user.city,
                state: data.user.state,
                postal_code: data.user.zip,
            },
            shipping: {
                name: `${data.user.first_name} ${data.user.last_name}`,
                phone: data.user.phone,
                address: {
                    line1: data.user.address1,
                    line2: data.user.address2,
                    city: data.user.city,
                    state: data.user.state,
                    postal_code: data.user.zip,
                },
            }
        }).then((customer)=>{

            stripe.charges.create({
                customer: customer.id,
                amount: data.order.total * 100,
                currency: "usd",
                description: "Your Custom Tent Order",
                statement_descriptor: "MyIdealTent",
                receipt_email: data.user.email
            }).then((charge)=>{

                saveOrder({
                    tent_id: data.tent.id,
                    tent_name: data.tent.name,
                    tent_price: data.tent.price,
                    sides_id: data.sides.id,
                    sides_name: data.sides.name,
                    sides_price: data.sides.price,
                    first_name: data.user.first_name,
                    last_name: data.user.last_name,
                    email: data.user.email,
                    phone: data.user.phone,
                    address1: data.user.address1,
                    address2: data.user.address2,
                    city: data.user.city,
                    state: data.user.state,
                    zip: data.user.zip,
                    subtotal: data.order.total,
                    total: data.order.subtotal,
                    charge_id: charge.id,
                    slug: hri.random(),
                    ip: req.connection.remoteAddress
                }).then((data) => {
                    return res.status(200).json({success: true, receipt: data});
                }).catch((error) => {
                    return res.status(200).json({success: false, message: error});
                });

            })
            .catch((e)=>{
                return res.status(200).json({success: false, message:'Error Charging Order: ' + e.message});
            });

        })
        .catch((e)=>{
            return res.status(200).json({success: false, message:'Error Creating Order: ' + e.message});
        });

    } catch (e) {
        return res.status(200).json({success: false, message:'Token Authorization Failed'});
    }

}