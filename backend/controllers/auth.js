const UserService = require('../services/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");


const apiLogin = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password /* || !validator.validate(email) */) return res.status(400).send("Invalid email or password")

    const user = await UserService.getUserByEmail(email)
    if(!user) return res.status(404).send("User not found");

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(404).send("User not found");

    const token = jwt.sign(
        { data: user.email }, 
        process.env.SECRET_KEY, 
        { expiresIn: '1h' }
    )
        
    res.status(200).json({ token });
}

const apiSignUp = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password /* || !validator.validate(email) */ ) return res.status(400).send("Invalid email or password")

    const user = await UserService.getUserByEmail(email)
    if (user) return res.status(409).send("Email already in use");

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = await UserService.saveUser({email,password:hashedPassword})

    const token = jwt.sign(
        { data: newUser.email }, 
        process.env.SECRET_KEY, 
        { expiresIn: '1h' }
    )

    res.status(201).json({ token })
}


module.exports = { 
    apiLogin,
    apiSignUp,
}