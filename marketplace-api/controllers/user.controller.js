const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usrmodel = require('../models/user.model');
const commandModel = require('../models/command.model')
const jwt_decode = require('jwt-decode');
const User = usrmodel.UsersList
const command = commandModel.commandModel
const {
        sendMail
} = require('./sendMail');
const register = async (req, res) => {

        try {
                const existingUser = await User.findOne({
                        email: req.body.email
                });
                if (existingUser) {
                        return res.status(200).json({
                                errorMessage: "An account whit this email exist "
                        });

                }
                const salt = await bcrypt.genSalt();
                const hashPassword = await bcrypt.hash(req.body.password, salt)

                const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        role: req.body.role,
                        phone: req.body.phone,
                        password: hashPassword,
                        address: req.body.address,
                        identiteFiscale: req.body.identiteFiscale,
                        "accountType": req.body.accountType

                });

                const saveUser = await newUser.save();

                // const userWithoutPassword = {password ...saveUser}

                res.json(saveUser);

                // ----------------------send email validation -------------------------------

                const token = jwt.sign({
                        name: req.body.name,
                        email: req.body.email
                }, process.env.JWT_SECRET_KEY);

                let subject = "Email verification";
                let text = "Email verification";
                let output;
                output = `
                <h2>Please click on below link to activate your account</h2>
                <p> http://localhost:2121/activateAccount/${token}</p>`;

                sendMail(req.body.email, subject, text, output);
                // ----------------------send email validation ------------------------------    
        } catch (err) {
                console.error(err);
                res.status(500).send();
        }

}



// -----------------activateAccount----------

const activateAccount = async (req, res) => {

        const token = req.params.token;

        jwt.verify(token, process.env.JWT_SECRET_KEY);

        let decoded = await jwt_decode(token);
        let email = decoded.email;

        await User.findOneAndUpdate({
                email: email
        }, {
                verified: true
        });

        res.json({
                message: "your account acctivated"
        });

}
// -----------------LoginUser----------
const login = async (req, res) => {

        try {
                let email = req.body.email;
                let password = req.body.password;
                const user = await User.findOne({
                        email: email
                })
                if (!user) {
                        return res.status(202).send({
                                message: 'User note found'
                        })
                }
                if (!await bcrypt.compare(password, user.password)) {
                        return res.status(202).send({
                                message: 'invalid credentials '
                        })
                }
                if (!user.verified) {
                        return res.send({
                                message: 'Please confirm your email to login '
                        })
                }
                const token = jwt.sign({
                        id: user._id,
                        role: user.role
                }, process.env.JWT_SECRET_KEY);

                res.cookie('jwt', token, {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000 //24h
                });
                res.send({
                        message: "login success",
                        "token": token
                })

        } catch (err) {
                console.error(err)
        }

}

const loggedInUser = async (req, res) => {

        try {
                const token = req.query.token;

                console.log(req.query.token + " : jwt");
                if (!token) return res.json({
                       
                });
                jwt.verify(token, process.env.JWT_SECRET_KEY);
                let decoded = await jwt_decode(token);
                let role = decoded.role;
                let id = decoded.id;
                console.log("role");
                if (role == "client" || role == "saler" ||
                        role == "Admin" || role == "superAdmin") {

                        res.send({
                                loggedIn: true,
                                role: role,
                                id: id
                        })
                } else
                        res.json({
                                loggedIn: false
                        })
        } catch (error) {
                console.log(error);
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



const becomeSeller = async (req, res) => {

        try {

                let id = req.params.id

                let seller = {
                        veryfiedSaller: true
                }

                await User.findByIdAndUpdate(id, seller);

                res.send({
                        message: 'the user has become a seller'
                });

        } catch (err) {
                console.error(err)
        }


}


const wantToBeSellerList = async (req, res) => {

        try {
                const role = 'root'
                // req.admin;

                if (role !== 'root') {
                        return res.status(403).json({
                                message: 'untheorized'
                        })
                }

                let sellersList = await User.find({
                        veryfiedSaller: false,
                        role: "saler"
                })
                if (!sellersList) {
                        return res.status(404).send({
                                message: 'sellers note found'
                        })
                }
                res.send(sellersList);

        } catch (err) {
                console.error(err)
        }

}
const getOne = async (req, res) => {
        let id = req.params.id
        try {
                let user = await User.findOne({_id: id})
                res.send(user);

        } catch (error) {
                console.log(error);
        }

}
const getALL = async (req, res) => {
        try {
                let users = await User.find()
                res.send(users);

        } catch (error) {
                console.log(error);
        }

}

const deleteUser = async (req, res) => {
        const id = req.params.id
        try {
                await User.findByIdAndRemove(id, {})

                res.send({
                        message: "User deteted ",
                })

        } catch (error) {
                console.log(error);
        }

}
const suspendUser = async (req, res) => {
        const id = req.params.id
        try {
                await User.findByIdAndUpdate(id, {
                        suspend: true
                })

                res.send({
                        message: "user activated ",
                })

        } catch (error) {
                console.log(error);
        }

}
const inSuspendUser = async (req, res) => {
        const id = req.params.id
        try {
                await User.findByIdAndUpdate(id, {
                        suspend: false
                })

                res.send({
                        message: "user suspended ",
                })

        } catch (error) {
                console.log(error);
        }

}
const upgradAccount = async (req, res) => {
        const id = req.params.id
        try {
                let newAccount;
                let user = await User.findById(id)
                if (user.accountType === "starter") {
                        newAccount = "Pro"
                } else if (user.accountType === "Pro") {
                        newAccount = "Expert"
                } else if (user.accountType === "Expert") {
                        newAccount = "Expert"
                }
                await User.findByIdAndUpdate(id, {
                        accountType: newAccount
                })

                res.send(user)

        } catch (error) {
                console.log(error);
        }

}

module.exports = {
        register,
        login,
        activateAccount,
        loggedInUser,
        logOut,
        becomeSeller,
        wantToBeSellerList,
        getOne,
        getALL,
        deleteUser,
        suspendUser,
        inSuspendUser,
        upgradAccount

}