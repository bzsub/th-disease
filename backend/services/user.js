const User = require("../models/user");


const getUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.log(`Could not get Users ${ error }`)
    }
}


const getUserByEmail = async (email) => {
    try {
        const users = await User.findOne({email});
        return users;
    } catch (error) {
        console.log(`Could not get Users ${ error }`)
    }
}

const saveUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        console.log(`Could not save User ${ error }`)
    }
}

const updateUser = async (user_id, userData) => {
    try {
        const user = await User.findOneAndUpdate({ "_id": user_id}, userData, { new: true });
        return user;
    } catch (error) {
        console.log(`Could not save User ${ error }`)
    }
}

const deleteUser = async (user_id) => {
    try {
        const user = await User.findOneAndDelete({ "_id": user_id })
        return user;
    } catch (error) {
        console.log(`Could not delete user ${ error }`)
    }
}


module.exports = { 
    getUsers,
    getUserByEmail,
    saveUser,
    updateUser,
    deleteUser
}