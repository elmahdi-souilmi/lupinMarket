const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Adminmodel = require('../models/admin.model');
const jwt_decode = require('jwt-decode');
const Ads = require('../models/ads.model')
let Admin = Adminmodel.AdminsList

const addAdmin = async (req, res) => {

        try {
                const role = 'root'
                //  req.admin;

                if (role !== 'root') {
                        return res.status(403).json({
                                message: 'untheorized'
                        })
                }

                const existingAdmin = await Admin.findOne({
                        email: req.body.email
                });


                console.log(existingAdmin);

                if (existingAdmin) {
                        return res.status(400).json({
                                errorMessage: "An account whit this email exist "
                        });

                }

                const salt = await bcrypt.genSalt();
                const hashPassword = await bcrypt.hash(req.body.password, salt)

                const newAdmin = new Admin({

                        fullname: req.body.fullname,
                        email: req.body.email,
                        phone: req.body.phone,
                        password: hashPassword,

                });

                const saveAdmin = await newAdmin.save();
                res.json(saveAdmin)

        } catch (err) {
                console.error(err);
                res.status(500).send();
        }

}

const loginAdmin = async (req, res) => {

        try {
                let email = req.body.email;
                let password = req.body.password;

                const admin = await Admin.findOne({
                        email: email
                })

                if (!admin) {
                        return res.status(202).send({
                                message: 'Admin not found'
                        })


                }

                if (!await bcrypt.compare(password, admin.password)) {
                        return res.status(202).send({
                                message: 'invalid credentials '
                        })
                }


                const token = jwt.sign({
                        id: admin._id,
                        role: admin.role
                }, process.env.JWT_SECRET_KEY);

                res.cookie('jwt', token, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000 //24h
                });

                res.send({
                        message: "login success",
                        role: admin.role,
                        first_login: admin.first_login,
                        name: admin.fullname,
                        token: token

                })

        } catch (err) {
                console.error(err)

        }

}


const loggedIn = async (req, res) => {

        try {
               // const token = req.cookies['jwt'];
                const token = req.query.token;
                if (!token) return res.json({
                        loggedIn: false
                });

                jwt.verify(token, process.env.JWT_SECRET_KEY);

                let decoded = await jwt_decode(token);
                let role = decoded.role;


                if (role == "Admin" || role == "superAdmin") {

                        res.send({
                                loggedIn: true,
                                role: role
                        })
                }



                res.json({
                        loggedIn: false
                })


        } catch (error) {
                res.json({
                        loggedIn: false
                })
        }

}


const logOut = (req, res) => {

        res.cookie('jwt', "", {
                httpOnly: true,
                maxAge: 0
        });

        res.send();
}

const updatePassword = async (req, res) => {

        try {
                let decoded = await jwt_decode(req.cookies['jwt']);
                let id = decoded.id;

                let newPassword = req.body.password;

                const salt = await bcrypt.genSalt();
                const hashPassword = await bcrypt.hash(newPassword, salt)

                const admin = await Admin.findByIdAndUpdate(id, {
                        password: hashPassword,
                        first_login: true
                }, {
                        useFindAndModify: false
                })
                if (!admin) {
                        return res.status(404).send({
                                message: 'Admin note found'
                        })

                }
                res.send({
                        message: "Password Updated ",
                })

        } catch (err) {
                console.error(err)
        }

}




const getAllAdmin = async (req, res) => {

        try {
                const role = 'root'
                // req.admin;
                if (role !== 'root') {
                        return res.status(403).json({
                                message: 'untheorized'
                        })
                }
                let adminList = await Admin.find()
                if (!adminList) {
                        return res.status(404).send({
                                message: 'Admin note found'
                        })
                }
                res.send(adminList);

        } catch (err) {
                console.error(err)
        }

}


const deleteAdmin = async (req, res) => {
        const id = req.params.id
        try {
                await Admin.findByIdAndRemove(id, {
                        useFindAndModify: false
                })

                res.send({
                        message: "Admin deteted ",
                })

        } catch (err) {
                console.error(err)
        }

}
const AddAds = async (req, res) => {

        try {
                // add route verifiction access
                const newAds = new Ads({

                        startdate: req.body.startdate,
                        enddate: req.body.enddate,
                        description: req.body.description,
                        image: req.body.image,

                });

                const saveAds = await newAds.save();
                res.json(saveAds)

        } catch (err) {
                console.error(err)
        }

}
const AllAds = async (req, res) => {

        try {
                // add route verifiction access
                const ads = await Ads.find()
                res.send(ads)

        } catch (err) {
                console.error(err)
        }

}
const showAdd = async (req, res) => {

        try {
                let id = req.params.id;
                await Ads.findByIdAndUpdate(id, {
                        showen: true
                });

        } catch (err) {
                console.error(err)
        }

}
const hideAdd = async (req, res) => {

        try {
                let id= req.params.id;
                await Ads.findByIdAndUpdate(id, {
                        showen: false
                });
            
        }
         catch (err) {
                console.error(err)
        }

}

module.exports = {
        addAdmin,
        loginAdmin,
        getAllAdmin,
        logOut,
        loggedIn,
        updatePassword,
        deleteAdmin,
        AddAds,
        AllAds,
        showAdd,
        hideAdd
};