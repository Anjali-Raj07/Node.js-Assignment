const mongoose = require('mongoose');


    const UpdatedDataSchema = new mongoose.Schema({
        OldValue: {
            type: mongoose.Schema.Types.Mixed, 
            required: true
        },
        newValue: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'data', 
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        updatedTime: {
            type: Date,
            default: Date.now
        }
    
    });


UpdatedDataSchema.pre('save', function(next) {
    this.updatedTime = Date.now();
    next();
});

const UpdatedData = mongoose.model('updatedData', UpdatedDataSchema);



module.exports = UpdatedData;

// #User Activity logs
// 1. Save Last Login Details of the user using help of socketio package
// 2. Save in a different collection of the updated fields with user details when
// changed
// Example:
// 3 Feb 2021 is changed to 4 Feb 2021
// 3 Feb 2021 was updated by the user xxx to 4th Feb 2021 should be the response and save it
// in the database with FieldOldvalue,FieldNewvalue,Userid,Username