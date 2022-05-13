const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../model/User');
const CLIENT_ID_GOOGLE = `${process.env.CLIENT_ID_GOOGLE}`;



const signIn = async (req, res) => {
    try {
        const { id_token } = req.query;
        const client = new OAuth2Client(CLIENT_ID_GOOGLE)
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID_GOOGLE,
        });
        const user = await User.findOne({ email: ticket.payload.email });
        if (!user) {
            await User.insertMany({ name: ticket.payload.name, email: ticket.payload.email, });
            res.status(200).json({ Message: 'User created successfully' })
        } else {
            res.status(200).json({ Message: 'logged in successfully', user })
        }

    } catch (error) {
        res.status(500).json({ error: "...Server error" })
        console.log(error)
    }
}
const add = async (req, res) => {
    try {
        const { email, category, phone } = req.query;
        const { body } = req;
        if (email != "null" && email != "unset") {
            const user = await User.findOne({ email });
            if (category == "doctor") {
                const doctorsList = user['doctorsList'];
                doctorsList.push(body);
                await User.updateOne({ email }, { doctorsList })
                res.status(200).json({ Message: 'Saved successfully' })
            } else if (category == "medication") {
                const medicationList = user['medicationList'];
                medicationList.push(body);
                await User.updateOne({ email }, { medicationList });
                res.status(200).json({ Message: 'Saved successfully' })
            } else {
                res.status(400).json({ Message: 'Please classify category first' })
            }
        } else {
            const user = await User.findOne({ phone });
            if (category == "doctor") {
                const doctorsList = user['doctorsList'];
                doctorsList.push(body);
                await User.updateOne({ phone }, { doctorsList })
                res.status(200).json({ Message: 'Saved successfully' })
            } else if (category == "medication") {
                const medicationList = user['medicationList'];
                medicationList.push(body);
                await User.updateOne({ phone }, { medicationList });
                res.status(200).json({ Message: 'Saved successfully' })
            } else {
                res.status(400).json({ Message: 'Please classify category first' })
            }
        }



    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "...Server error" })
    }
}
const Delete = async (req, res) => {
    try {
        const { email, category, phone } = req.query;
        const { index } = req.body;
        if (email != "null" && email != "unset") {
            const user = await User.findOne({ email });

            if (category == "doctor") {
                const doctorsList = user['doctorsList'];
                doctorsList.splice(index, 1)
                await User.updateOne({ email }, { doctorsList })
                res.status(200).json({ Message: 'Saved successfully' })
            } else if (category == "medication") {
                const medicationList = user['medicationList'];
                medicationList.splice(index, 1)
                await User.updateOne({ email }, { medicationList })
                res.status(200).json({ Message: 'Saved successfully' })
            } else {
                res.status(400).json({ Message: 'Please classify category first' })
            }
        } else {
            const user = await User.findOne({ phone });

            if (category == "doctor") {
                const doctorsList = user['doctorsList'];
                doctorsList.splice(index, 1)
                await User.updateOne({ phone }, { doctorsList })
                res.status(200).json({ Message: 'Saved successfully' })
            } else if (category == "medication") {
                const medicationList = user['medicationList'];
                medicationList.splice(index, 1)
                await User.updateOne({ phone }, { medicationList })
                res.status(200).json({ Message: 'Saved successfully' })
            } else {
                res.status(400).json({ Message: 'Please classify category first' })
            }
        }


    } catch (error) {
        res.status(500).json({ error: "...Server error" })
    }
}
const Update = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({ email })
        if (user) {
            const { phone, birthData, gender, smoker } = req.body;
            const user = await User.findOneAndUpdate({ email }, { phone, birthData, gender, smoker })
            if (user) {
                res.status(200).json({ message: "user Updated" })
            } else {
                res.status(404).json({ error: "...User not found" })
            }
        } else {
            const { phone, birthData, gender, smoker, name, email } = req.body;
            const user = await User.findOneAndUpdate({ phone: req.query.phone }, { phone, birthData, gender, smoker, name, email })
            if (user) {
                res.status(200).json({ message: "user Updated" })
            } else {
                res.status(404).json({ error: "...User not found" })
            }
        }



    } catch (error) {
        res.status(500).json({ error: "...Server error" })
    }
};
const UpdateCancer = async (req, res) => {
    try {
        const { email } = req.query;
        const { hasCancer } = req.body;
        const user = await User.findOneAndUpdate({ email }, { hasCancer });
        if (user) {
            res.status(200).json({ message: "user Updated" })
        } else {
            res.status(404).json({ error: "...User not found" })
        }
    } catch (error) {
        res.status(500).json({ error: "...Server error" })
    }
}

const signInMobile = async (req, res) => {
    try {
        const { phone } = req.query;
        const user = await User.findOne({ phone });
        if (!user) {
            await User.insertMany({ phone });
            res.status(200).json({ Message: 'User created successfully' })
        } else {
            res.status(200).json({ Message: 'logged in successfully', user })
        }

    } catch (error) {
        res.status(500).json({ error: "...Server error" })
    }
}
module.exports = {
    signIn,
    add,
    Delete,
    Update,
    UpdateCancer,
    signInMobile,
}
