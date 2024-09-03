const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const data = require('../models/dataModel');

const registerUserService = async (FirstName, MiddleName, LastName, Email, Password, confirmPassword, Role, Department) => {
    if (!FirstName || !LastName || !Email || !Password || !confirmPassword || !Role) {
        throw new Error("Mandatory Fields should be filled!");
    }

    if (Password !== confirmPassword) {
        throw new Error("Passwords do not match!");
    }

    if (Password.length < 6 || Password.length > 12) {
        throw new Error("Password must be between 6 to 12 characters long!");
    }

    const userExists = await data.findOne({ Email });
    if (userExists) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const currentTime = new Date(); 


    const newUser = await data.create({
        FirstName,
        MiddleName,
        LastName,
        Email,
        Password: hashedPassword,
        Role,
        Department,
        createdTime: currentTime,  
        updatedTime: currentTime  
    });

    return newUser;
};

const loginUserService = async (Email, Password) => {
    if (!Email || !Password) {
        throw new Error("All fields are mandatory!");
    }

    const user = await data.findOne({ Email });
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const accessToken = jwt.sign(
        {
            user: {
                id: user._id,
                FirstName: user.FirstName,
                LastName: user.LastName,
                Email: user.Email,
                Role: user.Role
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
    );

    return {
        accessToken,
        user: {
            id: user._id,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            Role: user.Role
        }
    };
};
const addUserService = async (FirstName, MiddleName, LastName, Email, Password, confirmPassword, Role, Department) => {
    if (!FirstName || !LastName || !Email || !Password || !confirmPassword || !Role) {
        throw new Error("Mandatory Fields should be filled!");
    }

    if (Password !== confirmPassword) {
        throw new Error("Passwords do not match!");
    }

    if (Password.length < 6 || Password.length > 12) {
        throw new Error("Password must be between 6 to 12 characters long!");
    }

    const userExists = await data.findOne({ Email });
    if (userExists) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const currentTime = new Date(); 


    const newUser = await data.create({
        FirstName,
        MiddleName,
        LastName,
        Email,
        Password: hashedPassword,
        Role,
        Department,
        createdTime: currentTime,  
        updatedTime: currentTime  
    });

    return newUser;
};
const updateUserService = async (userId, updates) => {
    const { Password, ...userUpdates } = updates;
    const user = await data.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const updateObject = {
        ...userUpdates,
        updatedTime: new Date()  
    };

    const updatedUser = await data.findByIdAndUpdate(
        userId,
        updateObject,
        { new: true }  
    );

    return updatedUser;
};


const deleteUserService = async (userId) => {
    await data.findByIdAndDelete(userId);
};


module.exports = { registerUserService, loginUserService ,addUserService,updateUserService,deleteUserService};
