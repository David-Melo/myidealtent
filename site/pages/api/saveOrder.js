const axios = require("axios");

const mutation = `
    mutation insert_api_orders($objects: [api_orders_insert_input!]!) {
        insert_api_orders(objects: $objects) {
            returning {
                id
                slug
                charge_id
                created_at
            }
        }
    }
`;

function saveOrder(data) {

    return new Promise(((resolve, reject) => {

        axios.post( process.env.API_HOST,
            {
                query: mutation,
                variables: {
                    objects: [data]
                }
            },
            {
                headers: {
                    'x-hasura-admin-secret': process.env.API_KEY
                }
            }
        ).then((result) => {
            if (result.data.errors) {
                let errors = result.data.errors.map((e)=>{
                    return e.message;
                });
                return reject(errors.join(';'));
            }
            return resolve(result.data.data.insert_api_orders.returning[0]);
        }).catch((e)=>{
            return resolve(e.message);
        });

    }))

}

module.exports = {
    saveOrder
};