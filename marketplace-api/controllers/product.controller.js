const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../models/user.model');
const Product = require('../models/product.model')
const jwt_decode = require('jwt-decode');

const addProduct = async (req, res) => {

    try {
        const role = 'saler'
        //  req.admin;

        if (role !== 'saler') {
            return res.status(403).json({
                message: 'untheorized'
            })
        }
        let id = req.body.idsaler;
         let  saler = await user.UsersList.findById(id);
            console.log(id);
            console.log(saler);
         const newProduct = new Product.productModel({
             picture: req.body.picture,
             label: req.body.label,
             price: req.body.price,
             saler: saler
         });

         const savedProduct = await newProduct.save();
        res.send(savedProduct)

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }

}
const Products = async (req, res) => {
try {
        let products = await Product.productModel.find()
        res.send(products);

    } catch (error) {
        console.log(error);
    }

}
const getProductsbySeller = async (req, res) => {
    let idseller = req.params.id;
    try {
        console.log(idseller);
        let products = await Product.productModel.find({"saler._id": idseller})
        res.send(products);

    } catch (error) {
        console.log(error);
    }

}
const deleteProduct = async (req, res) => {
    let idproduct = req.params.id;
    try {
        let products = await Product.productModel.findByIdAndDelete({
            "_id": idproduct
        })
        res.send(products);

    } catch (error) {
        console.log(error);
    }

}
module.exports = {
addProduct,
Products,
getProductsbySeller,
deleteProduct
};