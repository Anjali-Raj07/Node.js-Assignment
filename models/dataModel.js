const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({

    FirstName: {
        type: String,
        required: true
    },

    MiddleName: {
        type: String,
    },

    LastName: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true,
        unique: true
    },

    Password: {
        type: String,
        required: true
    },

    Role: {
        type: String,
        enum: ['Admin', 'User'],
        required: true
    },

    Department: {
        type: String,
    },

    createdTime: {
        type: Date,
        default: Date.now,
        required: true
    },

    UpdatedTime: {
        type: Date,
        default: Date.now,
        required: true
    },


})

dataSchema.pre('save', function(next) {
    this.updatedTime = Date.now();
    next();
});

const data = mongoose.model('data', dataSchema);



module.exports = data;