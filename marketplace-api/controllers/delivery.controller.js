const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const delivery = require('../models/delivery.model');
const jwt_decode = require('jwt-decode');
const Ads = require('../models/ads.model')

const adddeliveryman = async (req, res) => {

    try {
        const role = 'admin'
        //  req.admin;
        if (role !== 'admin') {
            return res.status(403).json({
                message: 'untheorized'
            })
        }
        const newDelivery = new delivery.deliverymodel({

        full_name: req.body.full_name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,

        });

        const saveedDelivery = await newDelivery.save();
        res.json(saveedDelivery)

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }

}
const getAlldelivery = async (req, res) => {

    try {
     
        const  deliverymen =  await delivery.deliverymodel.find()

        res.send(deliverymen)
        

    } catch (error) {
        console.log(error);
    }

}
const deletedelivery = async (req, res) => {
    const id = req.params.id
    try {
        await delivery.deliverymodel.findByIdAndRemove(id, {})

        res.send({
            message: "delivery deteted ",
        })

    } catch (error) {
        console.log(error);
    }

}
module.exports = {
   adddeliveryman,
   deletedelivery,
   getAlldelivery
};