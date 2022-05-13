const mongoose = require('mongoose');
const hospitalSchema = mongoose.Schema(
    {
        name: { type: String, required: true, },
        governorate: { type: String, required: true, },
        address: { type: String, required: true, },
        workingHours: { type: String, },
        phone: { type: String, },

    },
    {
        timestamps: true,
    }
);
const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;