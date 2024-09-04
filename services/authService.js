const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const data = require('../models/dataModel');
const updatedData = require("../models/updatedDataModel")

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
const addUserAdminService = async (FirstName, MiddleName, LastName, Email, Password, confirmPassword, Role, Department) => {
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



    if (Role === 'Admin') {
        throw new Error("Cannot add Admin with User role.");
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

const userDataService = async(userId)=>{
     const user = await data.findById(userId);
     return user;
}


const deleteUserService = async (userId) => {
    await data.findByIdAndDelete(userId);
};
const UserProfileService = async (userId, updates) => {
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

const updatedDataService = async(oldData,newData,userId)=>{
  try {
    console.log(newData,"test");
    
    const  newUpdatedData = new updatedData({
        OldValue:oldData,
        newValue:newData,
        userId:userId,
        userName:newData.FirstName
    })
    const response = await newUpdatedData.save()
    console.log(response);
    
  } catch (error) {
    console.log(error);
    
  }
}

const getUpdatedData = async(Id)=>{
   try {
    const data = await updatedData.find({userId:Id})
    return data
   } catch (error) {
    
   }
}

const updateExistingData = async(oldData,newData,userId)=>{
    try {
        const response = await updatedData.updateOne(
            { userId: userId },
            {
                $set: {
                    OldValue: oldData,
                    newValue: newData,
                    userName: newData.FirstName
                }
            }
        );

       console.log(response, "updated exisiting data");
       
    } catch (error) {
        
    }
}


module.exports = { registerUserService, 
    loginUserService ,
    addUserAdminService,
    addUserService,
    updateUserService,
    deleteUserService,
    UserProfileService,
    userDataService,
    updatedDataService,
    getUpdatedData,
    updateExistingData};
