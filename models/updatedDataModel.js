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

