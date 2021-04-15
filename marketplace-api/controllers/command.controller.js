const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Command = require('../models/command.model');
const user = require('../models/user.model');
const Product = require('../models/product.model')
const jwt_decode = require('jwt-decode');

const addCommand = async (req, res) => {

    try {
        const role = 'admin'
        //  req.admin;
        if (role !== 'admin') {
            return res.status(403).json({
                message: 'untheorized'
            })
        }

        // let buyer = await user.UsersList.findById(req.body.buyer);
        let client = await user.UsersList.findById(req.body.client);
        //console.log(saler);
        let product = await Product.productModel.findById(req.body.product);
        let idSaler =  product.saler._id
        const newCommand = new Command.commandModel({
         client,
         product

        });
        let curent = await user.UsersList.findById(idSaler)
        let updatedRevenue = curent.revenue + product.price;
        let updatedsales = curent.productsales + 1;
        await user.UsersList.findByIdAndUpdate(idSaler,{
           revenue: updatedRevenue,
           productsales: updatedsales
        })
        await newCommand.save();
        res.json(updatedRevenue)

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }

}

const allCommand = async (req, res) => {
    try {
        const role = 'admin'
        //  req.admin;
        if (role !== 'admin') {
            return res.status(403).json({
                message: 'untheorized'
            })
        }
         let commands = await Command.commandModel.find({
             ValidityState: false
            })
         res.send(commands);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}
const validateCommand = async (req, res) => {
    try {
        const role = 'admin'
        //  req.admin;
        if (role !== 'admin') {
            return res.status(403).json({
                message: 'untheorized'
            })
        }
        const id = req.params.id
        //const filter = { _id: id };
        const update = { ValidityState: true}; 
       const updated = await Command.commandModel.findByIdAndUpdate(id, update)
        res.send(updated)
    } 
    catch (err) {
        console.error(err);
        res.status(500).send();
    }

    }

module.exports = {
   addCommand,
   allCommand,
   validateCommand
}
