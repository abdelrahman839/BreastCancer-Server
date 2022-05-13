const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        name: { type: String,  default: 'unset'},
        email: { type: String,  default: 'unset'},
        phone: { type: String, default: 'unset',unique: true},
        birthData: { type: String, default: 'unset'},
        gender: { type: String, default: 'Female' },
        smoker: { type: Boolean, default: false, },
        hasCancer: { type: Boolean, default: false, },
        medicationList: [{
            name: { type: String, required: true, },
            numberOfTimes: { type: String, required: true, },
            medicationTime: { type: Array, default: [], },
            _id: false,
        }],
        doctorsList: [{
            name: { type: String, },
            DateOfVisit: { type: String, },
            _id: false,
        }],

    },
    {
        timestamps: true,
    }
);
const User = mongoose.model('User', userSchema);
module.exports = User;