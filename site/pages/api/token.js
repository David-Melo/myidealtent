const stripe = require("stripe")(process.env.STRIPE_KEY);
const {decrypt} = require("./utils");

export default (req, res) => {

    try {

        let payload = decrypt(req.body.payload);
        let data = JSON.parse(payload);

        stripe.tokens.create({
            card: {
                number: data.cc_number,
                exp_month: data.cc_exp_month,
                exp_year: data.cc_exp_year,
                cvc: data.cc_code
            }
        }).then((data)=>{
            res.status(200).json({success:true,token:data.id})
        })
        .catch((e)=>{
            return res.status(200).json({success: false, message:'Error Creating Charge Token: ' + e.message});
        });

    } catch (e) {
        return res.status(200).json({success:false, message:'Token Authorization Failed'});
    }

}