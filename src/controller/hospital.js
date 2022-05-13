const Hospital = require("../model/hospital");

const add = async (req, res) => {
    try {
        const { body } = req;
        const hospital = await Hospital.insertMany(body);
        res.status(200).json({ Message: 'Saved successfully' })
    } catch (error) {
        res.status(500).json({ error: "...Server error" })
    }
}
const getAll = async (req, res) => {
    try {
        const data = await Hospital.find();
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ error: "...Server error" })
    }
}
module.exports = {
    add,
    getAll,
}