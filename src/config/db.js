const mongoose = require('mongoose');

const Connection = async () => {
    return await mongoose.connect(`${process.env.DATABASEURL}`)
        .then(res => console.log("Connection established"))
        .catch(err => console.error(err));
}

module.exports = Connection;